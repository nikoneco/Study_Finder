function getQuestions(filters, spreadsheet) {
  spreadsheet = spreadsheet || openStudySpreadsheet_();
  const sheet = getSheet_(spreadsheet, 'question_bank');
  return readObjects_(sheet).filter(function (question) {
    if (filters.ata && normalizeAtaKey_(question.ata) !== normalizeAtaKey_(filters.ata)) {
      return false;
    }
    if (filters.status && String(question.check_status) !== String(filters.status)) {
      return false;
    }
    return true;
  });
}

function getQuestionsBundle(filters) {
  const spreadsheet = openStudySpreadsheet_();
  const questions = getQuestions(filters || {}, spreadsheet);
  const termDictionary = getTermDictionaryForClient_(spreadsheet);
  if (!filters || !filters.ata) {
    return {
      questions: questions,
      detailsById: {},
      termDictionary: termDictionary
    };
  }

  const questionIdSet = questions.reduce(function (set, question) {
    set[String(question.question_id)] = true;
    return set;
  }, {});

  const candidatesByQuestionId = groupRowsByQuestionId_(
    readObjects_(getSheet_(spreadsheet, 'candidate_links')).filter(function (row) {
      return questionIdSet[String(row.question_id)];
    }).sort(function (a, b) { return Number(a.rank) - Number(b.rank); })
  );
  const notesByQuestionId = groupRowsByQuestionId_(
    readObjects_(getSheet_(spreadsheet, 'answer_notes')).filter(function (row) {
      return questionIdSet[String(row.question_id)];
    })
  );
  const detailsById = questions.reduce(function (details, question) {
    const questionId = String(question.question_id);
    const answerNotes = notesByQuestionId[questionId] || [];
    details[questionId] = {
      question: question,
      candidates: groupCandidates_(candidatesByQuestionId[questionId] || []),
      answer: selectCanonicalAnswerNote_(answerNotes)
    };
    return details;
  }, {});

  return {
    questions: questions,
    detailsById: detailsById,
    termDictionary: termDictionary
  };
}

function getQuestionDetail(questionId) {
  const spreadsheet = openStudySpreadsheet_();
  const question = readObjectByColumnValue_(getSheet_(spreadsheet, 'question_bank'), 'question_id', questionId);
  if (!question) {
    throw new Error('Question not found: ' + questionId);
  }

  const candidates = readObjectsByColumnValue_(getSheet_(spreadsheet, 'candidate_links'), 'question_id', questionId)
    .sort(function (a, b) { return Number(a.rank) - Number(b.rank); });
  const notes = readObjectsByColumnValue_(getSheet_(spreadsheet, 'answer_notes'), 'question_id', questionId);

  return {
    question: question,
    candidates: groupCandidates_(candidates),
    answer: selectCanonicalAnswerNote_(notes),
    answerNotes: notes,
    termDictionary: getTermDictionaryForClient_(spreadsheet)
  };
}

function selectCanonicalAnswerNote_(notes) {
  if (!notes || !notes.length) {
    return null;
  }
  return notes.slice().sort(function (a, b) {
    const updatedDifference = String(b.updated_at || '').localeCompare(String(a.updated_at || ''));
    if (updatedDifference !== 0) {
      return updatedDifference;
    }
    return String(b.created_at || '').localeCompare(String(a.created_at || ''));
  })[0];
}

function getRandomQuestionDetail(filters) {
  const questions = getQuestions(filters || {});
  if (!questions.length) {
    throw new Error('No questions found for the selected filter.');
  }
  const question = questions[Math.floor(Math.random() * questions.length)];
  return getQuestionDetail(question.question_id);
}

function saveAnswerNote(payload) {
  assertPrivateMutationAllowed_();
  const spreadsheet = openStudySpreadsheet_();
  const sheet = getSheet_(spreadsheet, 'answer_notes');
  if (!payload.question_id) {
    throw new Error('question_id is required.');
  }
  const note = {
    note_id: generateId_('note'),
    question_id: payload.question_id,
    answer_text: payload.answer_text || '',
    evidence_page_codes: payload.evidence_page_codes || '',
    evidence_page_ids: payload.evidence_page_ids || '',
    evidence_excerpts: payload.evidence_excerpts || '',
    source_type: payload.source_type || 'manual_user',
    status: payload.status || 'draft',
    problem_reason: payload.problem_reason || '',
    created_at: nowIso_(),
    updated_at: nowIso_()
  };
  appendObject_(sheet, STUDY_SCHEMA.answer_notes, note);
  updateQuestionStatus(payload.question_id, CONFIG.STATUS.ANSWER_NOTE_READY);
  return note;
}

function updateAnswerNote(noteId, payload) {
  assertPrivateMutationAllowed_();
  if (!noteId) {
    throw new Error('note_id is required.');
  }
  const spreadsheet = openStudySpreadsheet_();
  const sheet = getSheet_(spreadsheet, 'answer_notes');
  const patch = {
    answer_text: payload.answer_text || '',
    evidence_page_codes: payload.evidence_page_codes || '',
    evidence_page_ids: payload.evidence_page_ids || '',
    evidence_excerpts: payload.evidence_excerpts || '',
    source_type: payload.source_type || 'manual_user',
    status: payload.status || 'reviewed_ok',
    problem_reason: payload.problem_reason || '',
    updated_at: nowIso_()
  };
  const updated = updateObjectById_(sheet, 'note_id', noteId, patch);
  if (!updated) {
    throw new Error('Answer note not found: ' + noteId);
  }
  return Object.assign({ note_id: noteId }, patch);
}

function saveConfirmedAnswer(payload) {
  assertPrivateMutationAllowed_();
  const spreadsheet = openStudySpreadsheet_();
  const sheet = getSheet_(spreadsheet, 'confirmed_answers');
  if (!payload.question_id) {
    throw new Error('question_id is required.');
  }
  const answer = {
    answer_id: generateId_('ans'),
    question_id: payload.question_id,
    final_answer_text: payload.final_answer_text || payload.answer_text || '',
    evidence_page_codes: payload.evidence_page_codes || '',
    evidence_page_ids: payload.evidence_page_ids || '',
    evidence_excerpts: payload.evidence_excerpts || '',
    user_note: payload.user_note || '',
    confidence_by_user: payload.confidence_by_user || 'medium',
    created_at: nowIso_(),
    updated_at: nowIso_()
  };
  appendObject_(sheet, STUDY_SCHEMA.confirmed_answers, answer);
  updateQuestionStatus(payload.question_id, CONFIG.STATUS.CONFIRMED, answer.answer_id);
  return answer;
}

function holdQuestion(questionId) {
  assertPrivateMutationAllowed_();
  updateQuestionStatus(questionId, CONFIG.STATUS.HOLD);
  return true;
}

function updateQuestionStatus(questionId, status, confirmedAnswerId) {
  assertPrivateMutationAllowed_();
  const spreadsheet = openStudySpreadsheet_();
  const sheet = getSheet_(spreadsheet, 'question_bank');
  const patch = {
    check_status: status,
    updated_at: nowIso_()
  };
  if (confirmedAnswerId !== undefined) {
    patch.confirmed_answer_id = confirmedAnswerId;
  }
  return updateObjectById_(sheet, 'question_id', questionId, patch);
}

function groupCandidates_(candidates) {
  return candidates.reduce(function (groups, candidate) {
    const key = candidate.candidate_group || 'manual';
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(candidate);
    return groups;
  }, {});
}

function groupRowsByQuestionId_(rows) {
  return rows.reduce(function (groups, row) {
    const key = String(row.question_id || '');
    if (!key) {
      return groups;
    }
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(row);
    return groups;
  }, {});
}

function getTermDictionaryForClient_(spreadsheet) {
  return readObjects_(getSheet_(spreadsheet, 'term_dictionary'))
    .filter(function (row) {
      const status = normalizeText(row.status || 'active');
      return status !== 'INACTIVE' &&
        String(row.term || '').trim() &&
        String(row.full_name || '').trim() &&
        String(row.location || '').trim() &&
        String(row.function || '').trim();
    })
    .map(function (row) {
      return {
        term: String(row.term || '').trim(),
        full_name: String(row.full_name || '').trim(),
        japanese: String(row.japanese || '').trim(),
        aliases: String(row.aliases || '').trim(),
        ata: normalizeAtaKey_(row.ata),
        location: String(row.location || '').trim(),
        function: String(row.function || '').trim(),
        evidence_page_codes: String(row.evidence_page_codes || '').trim()
      };
    });
}
