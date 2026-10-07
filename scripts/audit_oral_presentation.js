// Local-only source-index regression audit. No content is emitted or uploaded.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert/strict');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'web/oral-study.js'), 'utf8');
const start = source.indexOf('  function presentedPrompts(');
const end = source.indexOf('  function sorted(', start);
assert(start >= 0 && end > start, 'Presentation helper missing');
const context = vm.createContext({});
vm.runInContext(source.slice(start, end), context);
const index = JSON.parse(fs.readFileSync(path.join(root, 'data/oral/assessment_rev3.json'), 'utf8'));
const compiledFile = process.argv[2] ? path.resolve(process.argv[2]) : path.join(root, 'data/oral/compiled.json');
const canonical = JSON.parse(fs.readFileSync(compiledFile, 'utf8'));
const answers = new Map(canonical.tables.oral_answers.map(row => [row.assessment_id, row]));
const characters = text => text.replace(/[\s・]+/g, '');
let children = 0, rawLines = 0, displayedLines = 0, blankLines = 0, boundPoints = 0;
for (const section of index.sections) for (const item of section.assessment_rows) {
  const prompts = item.content_lines;
  const answer = answers.get(item.assessment_id);
  assert(answer, 'Missing prepared answer: ' + item.assessment_id);
  const before = JSON.stringify({ prompts, answer });
  const presented = context.presentedPrompts(prompts);
  assert(presented.length, 'No meaningful prompt: ' + item.assessment_id);
  assert(presented.every(p => p.text.trim() && p.text !== '・'));
  assert.equal(characters(presented.map(p => p.text).join('')), characters(prompts.map(p => p.text).join('')), 'Lost or reordered source characters: ' + item.assessment_id);
  const points = JSON.parse(answer.points_json).map(point => ({ ...point, promptIndexes: point.prompt_indexes }));
  const pointsBefore = JSON.stringify(points);
  const presentation = context.presentedAnswerItems(prompts, points);
  assert.equal(presentation.items.length, presented.length);
  assert.equal(presentation.unassigned.length, 0, 'Answer still spans unrelated display items or has no item: ' + item.assessment_id);
  presentation.items.forEach((shown, index) => {
    assert.equal(shown.number, index + 1, 'Item numbering/order changed: ' + item.assessment_id);
    assert.equal(shown.text, presented[index].text);
    assert.deepEqual(Array.from(shown.indexes), Array.from(presented[index].indexes));
    const expected = points.map((point, pointIndex) => ({ point, pointIndex }))
      .filter(({ point }) => shown.indexes.some(raw => point.prompt_indexes.includes(raw)));
    assert.deepEqual(Array.from(shown.points, entry => entry.pointIndex), expected.map(entry => entry.pointIndex), 'Dropped or invented item ownership: ' + item.assessment_id);
    assert.equal(shown.points.length, 1, 'Expected one individually reviewed point per display item: ' + item.assessment_id + ':' + shown.number);
    shown.points.forEach(entry => {
      assert.strictEqual(entry.point, points[entry.pointIndex], 'Summary/source/gap changed');
    });
  });
  assert.deepEqual(Array.from(presentation.items, shown => Array.from(shown.indexes)).flat(),
    prompts.map((prompt, raw) => ({ prompt, raw })).filter(({ prompt }) => prompt.text.trim() && prompt.text.trim() !== '・').map(({ raw }) => raw), 'Raw indexes lost/reordered');
  for (const [pointIndex, point] of points.entries()) {
    const bindings = point.prompt_indexes;
    const bound = context.presentedPrompts(prompts, bindings);
    assert.equal(characters(bound.map(p => p.text).join('')), characters(bindings.map(i => prompts[i].text).join('')), 'Changed point ownership: ' + item.assessment_id);
    const expectedOwners = presentation.items.filter(shown => shown.indexes.some(raw => bindings.includes(raw))).map(shown => shown.number);
    const entries = presentation.items.flatMap(shown => shown.points.filter(entry => entry.pointIndex === pointIndex));
    assert.equal(expectedOwners.length, 1, 'Point must answer one display item: ' + item.assessment_id);
    assert.equal(entries.length, 1, 'Item-specific point lost or duplicated');
    entries.forEach(entry => assert.deepEqual(Array.from(entry.itemNumbers), Array.from(expectedOwners), 'Item number differs'));
    const unmatched = presentation.unassigned.filter(entry => entry.pointIndex === pointIndex);
    assert.equal(unmatched.length, expectedOwners.length ? 0 : 1, 'Unmatched point dropped or spuriously assigned');
    unmatched.forEach(entry => assert.strictEqual(entry.point, point, 'Unmatched summary/source/gap changed'));
    boundPoints++;
  }
  assert.equal(JSON.stringify({ prompts, answer }), before, 'Mutated original data');
  assert.equal(JSON.stringify(points), pointsBefore, 'Mutated point summaries/sources/gaps/bindings');
  children++; rawLines += prompts.length; displayedLines += presented.length;
  blankLines += prompts.filter(p => p.text.trim() === '・').length;
}
assert.equal(children, 279);
assert.equal(rawLines, 714);
assert.equal(blankLines, 4);
console.log(JSON.stringify({ status: 'ok', children, rawLines, blankLines, displayedLines, wrappedContinuations: rawLines - blankLines - displayedLines, boundPoints, verified: ['all meaningful characters retained', 'matching item numbering/order', 'one reviewed point per display item', 'no automatic answer repetition', 'no data mutation'], semanticReview: 'Meaning and evidence alignment require a separate human or agent review' }));
