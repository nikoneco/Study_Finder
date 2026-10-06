// Existing Sheets are canonical. This planner never clears rows or replays all tables.
const assert = require('assert/strict');
const contract = require('./oral-contract');
const schemas = { oral_sections: contract.sectionHeaders, oral_questions: contract.questionHeaders,
  oral_answers: contract.answerHeaders, oral_sources: contract.sourceHeaders };
const ids = { oral_sections: 'section_id', oral_questions: 'assessment_id', oral_answers: 'assessment_id', oral_sources: 'source_id' };
function semantic(row, columns) {
  return JSON.stringify(columns.filter(key => key !== 'updated_at').map(key => String(row[key] ?? '')));
}
function keyed(rows, key) {
  const map = new Map();
  for (const row of rows) { assert(row[key] && !map.has(row[key]), 'Missing/duplicate ID: ' + key); map.set(row[key], row); }
  return map;
}
function planPatch(baseline, candidate, sheetProperties) {
  const tables = {}, requests = [], changes = [];
  for (const name of Object.keys(schemas)) {
    assert(Array.isArray(baseline[name]) && Array.isArray(candidate[name]), 'Missing table: ' + name);
    const columns = schemas[name], key = ids[name];
    const before = keyed(baseline[name], key), after = keyed(candidate[name], key);
    const rows = baseline[name].map(row => ({ ...row }));
    const positions = new Map(rows.map((row, i) => [row[key], i]));
    if (name !== 'oral_sources') {
      assert.equal(before.size, after.size, 'ID set changed: ' + name);
      for (const id of before.keys()) assert(after.has(id), 'ID removed: ' + id);
    }
    if (name === 'oral_sections' || name === 'oral_questions') {
      for (const [id, row] of before) assert.equal(semantic(row, columns), semantic(after.get(id), columns), 'Question/parent changed: ' + id);
      tables[name] = rows;
      continue;
    }
    const props = sheetProperties[name];
    assert(props && Number.isInteger(props.sheetId) && Number.isInteger(props.rowCount), 'Grounded Sheet properties required: ' + name);
    assert(props.columnCount >= columns.length, 'Sheet too narrow: ' + name);
    for (const [id, row] of after) {
      if (before.has(id) && semantic(before.get(id), columns) === semantic(row, columns)) continue;
      const index = positions.has(id) ? positions.get(id) : rows.length;
      assert(index + 2 <= props.rowCount, 'Sheet capacity exceeded: ' + name);
      const clean = Object.fromEntries(columns.map(column => [column, row[column] ?? '']));
      for (const value of Object.values(clean)) assert(String(value).length <= 45000, 'Cell too long: ' + id);
      rows[index] = clean;
      changes.push({ table: name, id, row: index + 2, appended: !before.has(id) });
      requests.push({ updateCells: { range: { sheetId: props.sheetId, startRowIndex: index + 1, endRowIndex: index + 2,
        startColumnIndex: 0, endColumnIndex: columns.length }, rows: [{ values: columns.map(column => ({ userEnteredValue: { stringValue: String(clean[column]) } })) }], fields: 'userEnteredValue' } });
    }
    tables[name] = rows;
  }
  // Publish source metadata before answer rows within the same atomic batch.
  requests.sort((a, b) => Number(a.updateCells.range.sheetId === sheetProperties.oral_answers.sheetId) - Number(b.updateCells.range.sheetId === sheetProperties.oral_answers.sheetId));
  return { tables, changes, requests };
}
module.exports = { planPatch, semantic };
