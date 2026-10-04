function normalizeText(text) {
  return String(text || '')
    .normalize('NFKC')
    .replace(/[‐-―−]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();
}

function searchCandidatePages(questionId) {
  const detail = getQuestionDetail(questionId);
  return detail.candidates;
}

function extractTerms(text) {
  const normalized = normalizeText(text);
  const matches = normalized.match(/[A-Z][A-Z0-9-]{1,}/g) || [];
  return Array.from(new Set(matches));
}

function expandTermsByDictionary(terms) {
  const spreadsheet = openStudySpreadsheet_();
  const dictionary = readObjects_(getSheet_(spreadsheet, 'term_dictionary'));
  const expanded = {};
  terms.forEach(function (term) {
    const row = dictionary.find(function (entry) { return normalizeText(entry.term) === normalizeText(term); });
    expanded[term] = row ? [row.term, row.full_name, row.aliases].filter(Boolean).join(',') : term;
  });
  return expanded;
}

function scorePage(question, page) {
  const questionText = normalizeText(question.question_text);
  const title = normalizeText(page.title);
  const body = normalizeText(page.body_text);
  const terms = extractTerms(questionText);
  let score = 0;
  terms.forEach(function (term) {
    if (title.indexOf(term) !== -1) score += 40;
    if (body.indexOf(term) !== -1) score += 10;
  });
  if (String(page.page_type) === 'text') score += 10;
  if (String(page.page_type) === 'figure') score += 5;
  if (/D0-|F0-|GENERAL/.test(String(page.page_code) + ' ' + title)) {
    score += String(question.question_type).match(/function|condition|rating|location/) ? -10 : 10;
  }
  return score;
}
