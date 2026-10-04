// Oral answers live in private local files / Sheets, never in committed app assets.
// Stable assessment IDs join question, answer, source and parent main question.
module.exports = Object.freeze({
  schemaVersion: 1,
  sectionSheet: 'oral_sections',
  questionSheet: 'oral_questions',
  answerSheet: 'oral_answers',
  sourceSheet: 'oral_sources',
  statuses: ['supported', 'partial', 'insufficient'],
  sectionHeaders: ['section_id', 'group', 'title', 'ata', 'display_order', 'assessment_page', 'original_refs', 'updated_at'],
  questionHeaders: ['assessment_id', 'section_id', 'item_number', 'display_order', 'levels_json', 'subheading', 'question', 'prompts_json', 'updated_at'],
  answerHeaders: ['assessment_id', 'status', 'points_json', 'gaps_json', 'scope_notes_json', 'updated_at'],
  sourceHeaders: ['source_id', 'type', 'title', 'reference', 'revision', 'page_count', 'sha256', 'updated_at']
});
