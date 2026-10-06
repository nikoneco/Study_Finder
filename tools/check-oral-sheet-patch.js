const assert = require('assert/strict');
const { planPatch } = require('../scripts/plan_oral_sheet_patch');
const base = { oral_sections: [{section_id:'parent',title:'Original',updated_at:'old'}],
  oral_questions: [{assessment_id:'q',question:'Original?',updated_at:'old'}],
  oral_answers: [{assessment_id:'q',status:'partial',points_json:'[]',gaps_json:'[]',scope_notes_json:'[]',updated_at:'old'}],
  oral_sources: [{source_id:'s',type:'AMM',title:'Old',updated_at:'old'}, {source_id:'unused',type:'AMM',title:'Keep',updated_at:'old'}] };
const props = { oral_answers:{sheetId:3,rowCount:400,columnCount:6},oral_sources:{sheetId:4,rowCount:200,columnCount:8} };
const copy = value => JSON.parse(JSON.stringify(value));
const after = copy(base);
after.oral_sections[0].updated_at = 'new'; after.oral_questions[0].updated_at = 'new';
after.oral_answers[0].points_json = '["=literal"]'; after.oral_answers[0].updated_at = 'new';
after.oral_sources = [{...after.oral_sources[0],updated_at:'new'}, {source_id:'past',type:'PAST',title:'Past',updated_at:'new'}];
const plan = planPatch(base, after, props);
assert.equal(plan.requests.length, 2);
assert.equal(plan.tables.oral_sources[1].source_id, 'unused', 'Previously registered metadata removed');
assert.equal(plan.tables.oral_sources[2].source_id, 'past');
assert.equal(plan.tables.oral_sections[0].updated_at, 'old');
assert.equal(plan.tables.oral_answers[0].updated_at, 'new');
assert.equal(plan.requests[0].updateCells.range.sheetId, 4);
assert(plan.requests.every(r => r.updateCells.fields === 'userEnteredValue'));
assert.equal(plan.requests[1].updateCells.rows[0].values[2].userEnteredValue.stringValue, '["=literal"]');
assert.equal(planPatch(plan.tables, plan.tables, props).requests.length, 0);
const bad = copy(after); bad.oral_questions[0].question = 'Wrong?';
assert.throws(() => planPatch(base,bad,props), /Question\/parent changed/);
assert.throws(() => planPatch(base,{...after,oral_answers:[]},props), /ID set/);
assert.throws(() => planPatch(base,after,{...props,oral_sources:{...props.oral_sources,rowCount:3}}), /capacity/);
assert.throws(() => planPatch(base,{...after,oral_sources:[after.oral_sources[0],after.oral_sources[0]]},props), /duplicate/);
console.log(JSON.stringify({oralSheetPatch:'ok',checks:['stable question/parent IDs','unchanged timestamps preserved','literal exact-row writes','source append without removal','capacity guard','idempotence']}));
