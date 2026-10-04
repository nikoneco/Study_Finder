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
const canonical = JSON.parse(fs.readFileSync(path.join(root, 'data/oral/compiled.json'), 'utf8'));
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
  for (const point of JSON.parse(answer.points_json)) {
    const bindings = point.prompt_indexes;
    const bound = context.presentedPrompts(prompts, bindings);
    assert.equal(characters(bound.map(p => p.text).join('')), characters(bindings.map(i => prompts[i].text).join('')), 'Changed point ownership: ' + item.assessment_id);
    boundPoints++;
  }
  assert.equal(JSON.stringify({ prompts, answer }), before, 'Mutated original data');
  children++; rawLines += prompts.length; displayedLines += presented.length;
  blankLines += prompts.filter(p => p.text.trim() === '・').length;
}
assert.equal(children, 279);
assert.equal(rawLines, 714);
assert.equal(blankLines, 4);
console.log(JSON.stringify({ status: 'ok', children, rawLines, blankLines, displayedLines, wrappedContinuations: rawLines - blankLines - displayedLines, boundPoints, verified: ['all meaningful characters retained', 'all point ownership retained', 'no data mutation'] }));
