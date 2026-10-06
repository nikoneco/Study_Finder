const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert/strict');
const ROOT = path.resolve(__dirname, '..');
const sectionId = 'oral_rev3_p04_s01';
const tables = {
  oral_sections: [{ section_id: sectionId, group: '点検', title: 'Fixture parent', ata: '28(47)', display_order: 1, assessment_page: 4, original_refs: 'TASK fixture' }],
  oral_questions: [{ assessment_id: sectionId + '_r01', section_id: sectionId, item_number: '3', display_order: 1,
    levels_json: '["Ⅰ","Ⅱ"]', question: 'Fixture question?', subheading: 'Condition', prompts_json: '[{"text":"Condition preserved","level":"Ⅱ"}]' }],
  oral_answers: [{ assessment_id: sectionId + '_r01', status: 'supported', points_json: JSON.stringify([
    { prompt_indexes: [0], coverage: 'supported', summary: ['Supported fixture summary'], gap: '', source_refs: [
      { source_id: 'sg_fixture', pdf_page: 2, page_code: 'D1-01', locator: 'A. General', evidence_excerpt: 'PRIVATE_EXCERPT', file: 'PRIVATE_PATH' }
    ] }]), gaps_json: '[]', scope_notes_json: '[]' }],
  oral_sources: [{ source_id: 'sg_fixture', type: 'SG', title: 'Fixture title', reference: 'ATA fixture', revision: 'Rev fixture', page_count: 3,
    file: 'PRIVATE_PATH', sha256: 'PRIVATE_HASH', access_token: 'PRIVATE_TOKEN' }]
};
function context(data) {
  let reads = 0;
  const result = { openStudySpreadsheet_: () => ({ getSheetByName: name => data[name] ? { name } : null }),
    readObjects_: sheet => { reads++; return data[sheet.name]; }, readCount: () => reads,
    logError_: () => {}, safeRun_: (_label, fn) => ({ ok: true, data: fn() }) };
  vm.createContext(result);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'gas/OralService.gs'), 'utf8'), result);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'gas/Code.gs'), 'utf8'), result);
  return result;
}
const service = context(tables);
const catalog = service.apiGetOralSections();
assert(catalog.ok);
assert.equal(catalog.data.sections[0].itemCount, 1);
assert.equal(catalog.data.sections[0].supportedCount, 1);
assert.equal(catalog.data.sections[0].atas.join(','), '28,47');
const bundle = service.apiGetOralSectionBundle(sectionId);
assert(bundle.ok);
assert.equal(bundle.data.items[0].sourceItemNumber, '3');
assert.equal(bundle.data.items[0].levels.join(','), 'Ⅰ,Ⅱ');
assert.equal(bundle.data.items[0].prompts[0].text, 'Condition preserved');
assert.equal(bundle.data.items[0].answer.points[0].sources[0].pdfPage, 2);
assert(!JSON.stringify(bundle).includes('PRIVATE_'), 'Private source material leaked');
const pastTables = JSON.parse(JSON.stringify(tables));
pastTables.oral_sources[0].type = 'PAST';
const pastBundle = context(pastTables).apiGetOralSectionBundle(sectionId);
assert.equal(pastBundle.data.items[0].answer.status, 'partial', 'PAST evidence cannot be verified');
assert.equal(pastBundle.data.items[0].answer.points[0].coverage, 'partial');
assert(pastBundle.data.items[0].answer.points[0].gap.includes('裏付け中'));
assert(!JSON.stringify(pastBundle).includes('PRIVATE_'));
pastTables.oral_sources = [];
assert.equal(context(pastTables).apiGetOralSectionBundle(sectionId).data.items[0].answer.status, 'insufficient');
const once = context(tables);
const start = once.apiGetOralStart();
assert(start.ok);
assert.equal(once.readCount(), 4, 'startup must read each oral table only once');
assert.equal(JSON.stringify(start.data.initialBundle), JSON.stringify(bundle.data));
const withoutBundle = { ...start.data }; delete withoutBundle.initialBundle;
assert.equal(JSON.stringify(withoutBundle), JSON.stringify(catalog.data));
assert(!JSON.stringify(start).includes('PRIVATE_'));
assert.equal(service.dispatchWebAppJsonpApi_('apiGetOralSections', []).ok, true);
for (const name of ['apiImportOralData', 'oral_sources', 'readOralTables_', 'setupProject']) {
  assert.equal(service.dispatchWebAppJsonpApi_(name, []).ok, false, 'Anonymous mutation/internal exposed');
}
for (const id of ['constructor', '__proto__', '', 'oral_rev3_p04_s01_r01']) {
  const response = service.apiGetOralSectionBundle(id);
  assert.equal(response.ok, false);
  assert(!response.error.stack);
  if (id) assert(!JSON.stringify(response).includes(id), 'Private error details leaked');
}
const empty = context({}).apiGetOralSections();
assert(empty.ok && !empty.data.sections.length);
const badSource = JSON.parse(JSON.stringify(tables));
badSource.oral_sources = [];
const downgraded = context(badSource);
assert.equal(downgraded.apiGetOralSectionBundle(sectionId).data.items[0].answer.status, 'insufficient');
assert.equal(downgraded.apiGetOralSections().data.sections[0].insufficientCount, 1);
for (const id of ['constructor', '__proto__', 'toString']) {
  assert.equal(service.oralSourceForClient_({ source_id: id, pdf_page: 1 }, {}), null, 'Inherited source accepted');
}
for (const count of [undefined, '', 'not-a-number', Infinity, -1, 1.5]) {
  const badCount = JSON.parse(JSON.stringify(tables));
  badCount.oral_sources[0].page_count = count;
  assert.equal(context(badCount).apiGetOralSectionBundle(sectionId).data.items[0].answer.status, 'insufficient', 'Invalid page_count accepted');
}
const malformed = JSON.parse(JSON.stringify(tables));
malformed.oral_answers[0].points_json = '{}';
assert.equal(context(malformed).apiGetOralSectionBundle(sectionId).ok, false);
for (const change of ['emptySummary', 'badBinding', 'missingPrompt', 'missingOneSource', 'unconfirmedSummary']) {
  const changed = JSON.parse(JSON.stringify(tables));
  const points = JSON.parse(changed.oral_answers[0].points_json);
  if (change === 'emptySummary') points[0].summary = [];
  if (change === 'badBinding') points[0].prompt_indexes = [5];
  if (change === 'missingPrompt') changed.oral_questions[0].prompts_json = '[{"text":"A"},{"text":"B"}]';
  if (change === 'missingOneSource') points[0].source_refs.push({ source_id: 'missing', pdf_page: 1 });
  if (change === 'unconfirmedSummary') points[0].coverage = 'insufficient';
  changed.oral_answers[0].points_json = JSON.stringify(points);
  const answer = context(changed).apiGetOralSectionBundle(sectionId).data.items[0].answer;
  assert.notEqual(answer.status, 'supported', change + ' overstates evidence');
  if (change === 'unconfirmedSummary') assert(!answer.points[0].summary.length, 'Unconfirmed summary exposed');
}
const twoParents = JSON.parse(JSON.stringify(tables));
twoParents.oral_questions.push({ ...twoParents.oral_questions[0], assessment_id: 'other', section_id: 'oral_rev3_p05_s01' });
assert.equal(context(twoParents).apiGetOralSectionBundle(sectionId).data.items.length, 1, 'Child escaped parent');
const grouped = JSON.parse(JSON.stringify(tables));
for (const [suffix, group, order] of [['p05', '点検', 2], ['p06', 'Servicing', 3]]) {
  const id = 'oral_rev3_' + suffix + '_s01';
  grouped.oral_sections.push({ ...grouped.oral_sections[0], section_id: id, group, display_order: order });
  grouped.oral_questions.push({ ...grouped.oral_questions[0], assessment_id: id + '_r01', section_id: id });
  grouped.oral_answers.push({ ...grouped.oral_answers[0], assessment_id: id + '_r01' });
}
const groupService = context(grouped);
const groupResponse = groupService.apiGetOralGroupBundle('点検');
assert(groupResponse.ok);
assert.equal(groupService.readCount(), 4, 'One snapshot reads each table once, not per parent');
assert.equal(groupResponse.data.sections.length, 2);
for (const [i, b] of groupResponse.data.bundles.entries()) {
  assert.equal(JSON.stringify(b), JSON.stringify(context(grouped).apiGetOralSectionBundle(b.section.sectionId).data));
  assert.equal(groupResponse.data.sections[i].itemCount, b.items.length);
  assert.equal(groupResponse.data.sections[i].supportedCount, 1);
  assert.equal(b.revision, groupResponse.data.revision);
}
assert(!JSON.stringify(groupResponse).includes('PRIVATE_'));
assert(groupService.dispatchWebAppJsonpApi_('apiGetOralGroupBundle', ['Servicing']).ok);
for (const group of [null, [], {}, '', ' 点検', '点検 ', 'すべての分野', 'x'.repeat(81), '__proto__']) {
  const result = groupService.apiGetOralGroupBundle(group);
  assert.equal(result.ok, false); assert(!result.error.stack);
}
const outsideMalformed = JSON.parse(JSON.stringify(grouped));
outsideMalformed.oral_answers[2].points_json = '{}';
assert(context(outsideMalformed).apiGetOralGroupBundle('点検').ok, 'Do not parse answers outside selected group');
const before = groupService.apiGetOralGroupBundle('点検').data;
grouped.oral_questions[0].question = 'Updated directly in Sheet';
grouped.oral_questions[0].updated_at = '2026-10-05T01:00:00Z';
const after = groupService.apiGetOralGroupBundle('点検').data;
assert.notEqual(before.revision, after.revision);
assert.equal(after.bundles[0].items[0].question, 'Updated directly in Sheet');
const groupDowngrade = context(badSource).apiGetOralGroupBundle('点検');
assert(groupDowngrade.ok && groupDowngrade.data.sections[0].insufficientCount === 1);
console.log(JSON.stringify({ oralService: 'ok', checks: ['one-snapshot group','exact legacy equivalence','group/parent isolation','fresh Sheet reads','levels/conditions','source whitelist','anonymous allowlist','missing-source downgrade','malformed JSON','invalid ID/group','empty data'] }));
