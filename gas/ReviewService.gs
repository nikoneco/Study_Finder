function addToReviewQueue(payload) {
  assertPrivateMutationAllowed_();
  const spreadsheet = openStudySpreadsheet_();
  const sheet = getSheet_(spreadsheet, 'review_queue');
  const review = {
    review_id: generateId_('rev'),
    question_id: payload.question_id,
    ata: payload.ata || '',
    section_name: payload.section_name || '',
    question_text: payload.question_text || '',
    current_answer_text: payload.current_answer_text || '',
    candidate_page_codes: payload.candidate_page_codes || '',
    candidate_excerpts: payload.candidate_excerpts || '',
    problem_reason: payload.problem_reason || 'evidence_not_enough',
    priority: payload.priority || 'normal',
    assigned_to: payload.assigned_to || 'codex',
    status: 'needs_review',
    created_at: nowIso_(),
    updated_at: nowIso_()
  };
  appendObject_(sheet, STUDY_SCHEMA.review_queue, review);
  updateQuestionStatus(payload.question_id, CONFIG.STATUS.NEEDS_REVIEW);
  return review;
}

function getReviewQueue() {
  const spreadsheet = openStudySpreadsheet_();
  return readObjects_(getSheet_(spreadsheet, 'review_queue'));
}

function markReviewed(reviewId) {
  assertPrivateMutationAllowed_();
  const spreadsheet = openStudySpreadsheet_();
  const sheet = getSheet_(spreadsheet, 'review_queue');
  return updateObjectById_(sheet, 'review_id', reviewId, {
    status: 'reviewed',
    updated_at: nowIso_()
  });
}
