const assert = require('assert/strict');
const { validate, compile, makeSheetRequests } = require('../scripts/build_oral_data');
const { sectionHeaders } = require('../scripts/oral-contract');
const rows = Array.from({ length: 279 }, (_, number) => ({ assessment_id: 'fixture_' + number,
  source_item_number: number === 1 ? 1 : number + 1, source_row_order: number + 1, levels: ['Ⅰ', 'Ⅱ'],
  subheading: '', content_lines: [{ text: 'Condition A', level: 'Ⅰ' }, { text: 'Condition B', level: 'Ⅱ' }] }));
const index = { sections: Array.from({ length: 55 }, (_, number) => ({ section_id: 'parent_' + number,
  title: 'Parent ' + number, group: 'Fixture', ata_raw: '24', source_pdf_page: 4, ref_text: 'Fixture ref',
  assessment_rows: number === 0 ? rows : [] })) };
const source = { source_id: 'sg_fixture', type: 'SG', title: 'Fixture', file: 'PRIVATE_FILE', page_count: 1,
  pages: [{ text: 'Specific fixture evidence', repaired_text: '', needs_visual_check: false }] };
const entry = id => ({ assessment_id: id, question: 'Fixture question', answer: { status: 'supported',
  points: [{ prompt_indexes: [0, 1], summary: ['Fixture supported summary'], coverage: 'supported', gap: '',
    source_refs: [{ source_id: source.source_id, pdf_page: 1, locator: 'Fixture section', evidence_excerpt: 'Specific fixture evidence' }] }],
  gaps: [], scope_notes: [] } });
const input = { index, sources: [source], entries: [entry('fixture_0')] };
assert.equal(validate(input, true).authored, 1);
const copy = () => JSON.parse(JSON.stringify(input));
for (const defect of ['duplicate', 'missingPrompt', 'badPage', 'badAnchor', 'wrongStatus', 'unconfirmedSummary']) {
  const bad = copy();
  const point = bad.entries[0].answer.points[0];
  if (defect === 'duplicate') bad.entries.push(bad.entries[0]);
  if (defect === 'missingPrompt') point.prompt_indexes = [0];
  if (defect === 'badPage') point.source_refs[0].pdf_page = 2;
  if (defect === 'badAnchor') point.source_refs[0].evidence_excerpt = 'Not present';
  if (defect === 'wrongStatus') bad.entries[0].answer.status = 'partial';
  if (defect === 'unconfirmedSummary') point.coverage = 'insufficient';
  assert.throws(() => validate(bad, true), undefined, defect + ' not rejected');
}
assert.throws(() => validate(input, false), /Not all/);
const compiled = compile({ ...input, entries: rows.map(row => entry(row.assessment_id)) });
assert.equal(compiled.tables.oral_sections.length, 55);
assert.equal(compiled.tables.oral_questions.length, 279);
assert.equal(compiled.tables.oral_questions[1].item_number, 1, 'Original duplicate number lost');
assert(!JSON.stringify(compiled).includes('Specific fixture evidence'), 'Private evidence leaked');
const sheetIds = { oral_sections: 1, oral_questions: 2, oral_answers: 3, oral_sources: 4 };
const batches = makeSheetRequests(compiled, sheetIds);
assert(batches.every(batch => batch.rowCount <= 40));
assert.equal(batches[0].requests[0].updateCells.range.endColumnIndex, sectionHeaders.length);
assert(batches.every(batch => batch.requests[0].updateCells.fields === 'userEnteredValue'));
assert.throws(() => makeSheetRequests(compiled, {}), /grounded/);
console.log(JSON.stringify({ oralData: 'ok', checks: ['55/279 structure', 'source anchoring', 'prompt coverage',
  'duplicates', 'status derivation', 'private evidence stripping', 'bounded literal-only Sheet writes'] }));
