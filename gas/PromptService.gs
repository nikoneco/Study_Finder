function buildReviewPrompt(questionId) {
  const detail = getQuestionDetail(questionId);
  const question = detail.question;
  const candidates = flattenCandidateGroups_(detail.candidates);
  const candidateText = candidates.map(function (candidate) {
    return [
      '[' + candidate.candidate_group + ']',
      candidate.page_code + ' ' + candidate.title,
      'PDF page: ' + candidate.pdf_page,
      'Excerpt: ' + candidate.excerpt
    ].join('\n');
  }).join('\n\n');

  return [
    '737-800 Study Guideの根拠確認と回答案作成をしてください。',
    '',
    '重要ルール:',
    '- Generalページだけで回答を確定しないでください。',
    '- Component, Function, Location, Condition, Ratingに関する問題では、最も具体的なページを根拠にしてください。',
    '- Study Guide本文に根拠がない場合は、根拠不足と明記してください。',
    '- 推測で断定しないでください。',
    '- 英語のComponent名、Unit名、Light名、Panel名、System名は保持してください。',
    '- 試験回答として見やすい短い箇条書きにしてください。',
    '- 根拠ページコードを必ず付けてください。',
    '',
    'Question:',
    'question_id: ' + question.question_id,
    'ATA: ' + question.ata,
    'section_name: ' + question.section_name,
    'question_type: ' + question.question_type,
    'question_text: ' + question.question_text,
    '',
    'Candidate pages:',
    candidateText || '候補ページなし',
    '',
    'Return JSON only:',
    buildJsonSchemaInstruction()
  ].join('\n');
}

function buildJsonSchemaInstruction() {
  return JSON.stringify({
    question_id: '',
    answer_text: '',
    evidence: [
      {
        page_code: '',
        pdf_page: '',
        title: '',
        excerpt: ''
      }
    ],
    terms_to_remember: [
      {
        term: '',
        full_name: '',
        japanese: ''
      }
    ],
    confidence: 'high|medium|low',
    needs_review: true,
    warnings: []
  }, null, 2);
}

function flattenCandidateGroups_(groups) {
  return Object.keys(groups || {}).reduce(function (items, key) {
    return items.concat(groups[key]);
  }, []);
}
