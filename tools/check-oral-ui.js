const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert/strict');
const source = fs.readFileSync(path.join(__dirname, '..', 'web', 'oral-study.js'), 'utf8');
const html = fs.readFileSync(path.join(__dirname, '..', 'web', 'exam-modes.html'), 'utf8');
const helpers = vm.createContext({});
vm.runInContext(source.slice(source.indexOf('  function presentedPrompts('), source.indexOf('  function sorted(')), helpers);
class Node {
  constructor(tag = 'div') { this.tagName = tag; this.children = []; this.dataset = {}; this.attributes = {}; this.events = {}; this.hidden = false; this.disabled = false; this.value = ''; this._text = ''; }
  get firstChild() { return this.children[0]; }
  get textContent() { return this._text + this.children.map(node => node.textContent).join(''); }
  set textContent(value) { this._text = String(value); this.children = []; }
  appendChild(node) { this.children.push(node); return node; }
  replaceChildren(...nodes) { this.children = nodes; this._text = ''; }
  setAttribute(name, value) { this.attributes[name] = String(value); }
  addEventListener(name, fn) { this.events[name] = fn; }
  focus() { this.focused = true; }
  fire(name) { this.events[name](); }
}
function harness(hash = '#oral') {
  const nodes = {};
  for (const [, id] of html.matchAll(/id="([^"]+)"/g)) nodes[id] = new Node();
  nodes.oralSection.appendChild(new Node('option'));
  nodes.examWritten = new Node();
  nodes.examWritten.studyState = { questionId: 'written-preserved', answerRevealed: true };
  const calls = [], timers = new Map(), events = {};
  function runner(success, failure) {
    return new Proxy({}, { get(_target, name) {
      if (name === 'withSuccessHandler') return fn => runner(fn, failure);
      if (name === 'withFailureHandler') return fn => runner(success, fn);
      return (...args) => calls.push({ name, args, success, failure });
    } });
  }
  let seq = 0;
  const window = { location: { hash }, google: { script: { run: runner() } },
    setTimeout(fn) { timers.set(++seq, fn); return seq; }, clearTimeout(id) { timers.delete(id); },
    addEventListener(name, fn) { events[name] = fn; } };
  vm.runInNewContext(source, { document: { getElementById: id => nodes[id], createElement: tag => new Node(tag) }, window, console });
  return { nodes, calls, timers, route(hash) { window.location.hash = hash; if (events.hashchange) events.hashchange(); } };
}
async function flush() { for (let i = 0; i < 5; i++) await Promise.resolve(); }
const G = 'Servicing', H = 'SYSTEM：機体';
function bundle(id, group = G, count = 2) {
  return { schemaVersion: 1, revision: 'one', section: { sectionId: id, title: 'Parent ' + id, group, atas: [id === 'B' ? '29' : '21'], assessmentPage: 4 },
    items: Array.from({ length: count }, (_, i) => ({ itemId: id + i, sourceItemNumber: 1, order: i + 1, levels: i ? ['II'] : ['I', 'II'], subheading: 'Context', question: id + ' question ' + i,
      prompts: [{ text: 'Original condition', level: 'I' }, { text: '737-800 only', level: 'II' }],
      answer: { status: i ? 'partial' : 'supported', points: [{ summary: ['Answer <script>not markup</script>'], coverage: i ? 'partial' : 'supported', sources: [{ type: 'AMM', title: 'Manual', reference: '00-00-00', pdfPage: 2 }], gap: i ? 'Historical procedure not established' : '' }], gaps: i ? ['AMM evidence incomplete'] : [], scopeNotes: ['Applicability'] } })) };
}
function response(group = G, bundles = [bundle('A'), bundle('B')]) {
  return { ok: true, data: { schemaVersion: 1, revision: 'one', group, sections: bundles.map((b, i) => ({ ...b.section, order: i + 1, itemCount: b.items.length })), bundles } };
}
function choose(h, group = G) { h.nodes.oralGroup.value = group; h.nodes.oralGroup.fire('change'); }
function parent(h, id) { h.nodes.oralSection.value = id; h.nodes.oralSection.fire('change'); }
(async () => {
  assert(!html.includes('Codexが資料を基に整理した学習用の回答です。'));
  assert(!html.includes('id="oralAta"'));
  const h = harness('#home');
  h.route('#written'); h.route('#oral');
  assert.equal(h.calls.length, 0, 'Opening any route must not fetch oral data');
  assert.equal(h.nodes.oralGroup.disabled, false);
  assert.equal(h.nodes.oralGroup.firstChild.textContent, '分野選択');
  assert.equal(h.nodes.oralGroup.children.length, 10);
  assert(!h.nodes.oralGroup.textContent.includes('すべての分野'));
  assert(h.nodes.oralWorkspace.hidden);
  choose(h);
  assert.equal(h.calls[0].name, 'apiGetOralGroupBundle');
  assert.equal(h.calls[0].args[0], G);
  assert.equal(h.nodes.oralLoading.hidden, false);
  h.calls[0].success(response()); await flush();
  assert.equal(h.calls.length, 1);
  assert.equal(h.nodes.oralQuestionHeading.textContent, 'A question 0');
  assert.equal(h.nodes.oralItems.children.length, 2, 'Duplicate source numbers remain distinct');
  assert.equal(h.nodes.oralPrompts.children.length, 2, 'Mixed-level conditions remain inside child');
  assert.equal(h.nodes.oralAnswer.hidden, true);
  assert.equal(h.nodes.oralPrevious.disabled, true);
  h.nodes.oralReveal.fire('click');
  assert.equal(h.nodes.oralReveal.attributes['aria-expanded'], 'true');
  assert(h.nodes.oralAnswerPoints.textContent.includes('PDF p.2'));
  assert(h.nodes.oralAnswerPoints.textContent.includes('<script>not markup</script>'));
  const pending = harness(); choose(pending);
  const past = bundle('P');
  past.items[0].answer.points[0].sources[0] = { type: 'PAST', title: '過去受験資料', reference: '過去受験資料（暫定）', pdfPage: 20, pageCode: '段落 42' };
  pending.calls[0].success(response(G, [past])); await flush();
  assert(pending.nodes.oralItems.children[0].textContent.includes('裏付け中'));
  assert.equal(pending.nodes.oralAnswerStatus.textContent, '裏付け中');
  assert(pending.nodes.oralAnswerPoints.textContent.includes('裏付け中'));
  assert(pending.nodes.oralAnswerPoints.textContent.includes('段落 42'));
  assert(!pending.nodes.oralAnswerPoints.textContent.includes('PDF p.20'));
  pending.nodes.oralNext.fire('click');
  assert.notEqual(pending.nodes.oralAnswerStatus.textContent, '裏付け中', 'Provisional badge leaked into primary answer');
  h.nodes.oralNext.fire('click');
  assert.equal(h.nodes.oralAnswer.hidden, true);
  assert.equal(h.nodes.oralNext.disabled, true);
  h.nodes.oralReveal.fire('click');
  assert.equal(h.nodes.oralAnswerGaps.hidden, false);
  assert(h.nodes.oralAnswerPoints.textContent.includes('Historical procedure'));
  parent(h, 'B'); parent(h, 'A');
  assert.equal(h.calls.length, 1, 'All parents already loaded');
  assert.equal(h.nodes.oralQuestionHeading.textContent, 'A question 1');
  assert.equal(h.nodes.oralAnswer.hidden, false);
  h.route('#home'); h.route('#written'); h.route('#oral');
  assert.equal(h.calls.length, 1);
  assert.deepEqual(h.nodes.examWritten.studyState, { questionId: 'written-preserved', answerRevealed: true });
  h.nodes.oralSearch.value = 'nothing'; h.nodes.oralSearch.fire('input');
  assert(h.nodes.oralWorkspace.hidden && h.nodes.oralSection.disabled);
  h.nodes.oralSearch.value = 'ATA29'; h.nodes.oralSearch.fire('input');
  assert.equal(h.nodes.oralQuestionHeading.textContent, 'B question 0');
  assert.equal(h.nodes.oralFilterCount.textContent, '1 / 2大問を表示');
  choose(h, H);
  assert.equal(h.nodes.oralSearch.value, '');
  assert(!h.nodes.oralCatalogCount.textContent.includes('読み込み済み'));
  h.calls[1].success(response(H, [bundle('C', H)])); await flush();
  choose(h, G); await flush();
  assert.equal(h.calls.length, 2, 'Revisiting loaded group uses page-local memory');
  assert.equal(h.nodes.oralQuestionHeading.textContent, 'B question 0');
  choose(h, ''); assert(h.nodes.oralWorkspace.hidden); assert.equal(h.calls.length, 2);
  const fresh = harness(); choose(fresh); assert.equal(fresh.calls.length, 1, 'Reload fetches latest Sheet');
  const formatted = bundle('A', G, 1);
  formatted.items[0].prompts = [{ text: 'Main condition', level: 'I' }, { text: '・ Safety condition。', level: 'I' }, { text: ' ・ ', level: 'I' }, { text: '・ Long statement describing an', level: 'I' }, { text: 'additional requirement。', level: 'I' }, { text: '・ Literal component acronym', level: 'I' }, { text: 'Other level condition。', level: 'II' }, { text: '  ', level: 'II' }];
  formatted.items[0].answer.points[0].promptIndexes = [1, 2, 3, 4, 5, 6];
  const original = JSON.stringify(formatted);
  const presentation = harness(); choose(presentation);
  presentation.calls[0].success(response(G, [formatted])); await flush();
  const visible = presentation.nodes.oralPrompts.children;
  assert.equal(visible.length, 5);
  assert(visible[2].textContent.includes('Long statement describing an additional requirement。'));
  assert(visible[4].textContent.includes('Other level condition。'));
  assert(!visible.some(n => n.textContent.includes('・')));
  assert.deepEqual(visible.map(n => n.firstChild.textContent), ['項目 1', '項目 2', '項目 3', '項目 4', '項目 5']);
  assert(presentation.nodes.oralAnswerPoints.textContent.includes('項目 2・3・4・5 に共通する回答'));
  assert.equal(presentation.nodes.oralAnswerPoints.children.length, visible.length);
  assert.equal(JSON.stringify(formatted), original);
  const isolated = harness(); choose(isolated);
  const partial = JSON.parse(original); partial.items[0].answer.points[0].promptIndexes = [3, 6];
  isolated.calls[0].success(response(G, [partial])); await flush();
  assert(!helpers.presentedPrompts(partial.items[0].prompts, [3, 6]).map(p => p.text).join('').includes('additional requirement'), 'Subset presentation must not pull unbound continuations');
  assert(isolated.nodes.oralAnswerPoints.children[2].textContent.includes('additional requirement'), 'Folded item heading retains its complete condition');
  assert(isolated.nodes.oralAnswerPoints.textContent.includes('項目 3・5 に共通する回答'));
  async function shownItem(prompts, points, status = 'supported') {
    const data = bundle('T', G, 1);
    data.items[0].prompts = prompts;
    data.items[0].answer = { status, points, gaps: ['Global gap'], scopeNotes: ['Global scope'] };
    const before = JSON.stringify(data);
    const view = harness(); choose(view);
    view.calls[0].success(response(G, [data])); await flush();
    assert.equal(JSON.stringify(data), before, 'Presentation changed source prompts/answers');
    assert.equal(view.calls.length, 1, 'Answer grouping must not make an API call');
    assert.equal(view.nodes.oralGapList.textContent, 'Global gap');
    assert.equal(view.nodes.oralScopeNoteList.textContent, 'Global scope');
    return view.nodes;
  }
  const four = [1, 2, 3, 4].map(n => ({ text: '・ Condition ' + n + '。', level: 'I' }));
  const point = { promptIndexes: [0, 1, 2, 3], summary: ['Full answer one <script>literal</script>', 'Full answer two'], coverage: 'partial', sources: [{ type: 'AMM', title: 'Manual <img>', pdfPage: 9 }], gap: 'Point gap <b>literal</b>' };
  const shared = await shownItem(four, [point]);
  assert.deepEqual(shared.oralAnswerPoints.children.map(section => section.firstChild.textContent), ['項目 1', '項目 2', '項目 3', '項目 4']);
  shared.oralAnswerPoints.children.forEach((section, index) => {
    assert.equal(section.dataset.itemNumber, String(index + 1));
    assert.equal(shared.oralPrompts.children[index].dataset.itemNumber, section.dataset.itemNumber);
    assert.equal(section.children[1].textContent, 'Condition ' + (index + 1) + '。');
    for (const value of [...point.summary, 'Manual <img>', 'PDF p.9', point.gap, '項目 1・2・3・4 に共通する回答']) assert(section.textContent.includes(value), 'Shared answer content missing: ' + value);
    assert.equal(section.children[2].firstChild.children[1].textContent, '一部の根拠が不足');
  });
  const separate = await shownItem(four, four.map((_p, index) => ({ ...point, promptIndexes: [index], summary: ['Only answer ' + (index + 1)] })).reverse());
  separate.oralAnswerPoints.children.forEach((section, index) => {
    assert(section.textContent.includes('Only answer ' + (index + 1)), 'Point array order overrode item numbering');
    assert(!section.textContent.includes('に共通する回答'));
    assert.equal(section.children.length, 3, 'Unrelated point assigned to item');
  });
  const wrappedPrompts = [{ text: '・ Wrapped condition starts', level: 'I' }, { text: 'and continues。', level: 'I' }];
  const wrapped = await shownItem(wrappedPrompts, [
    { ...point, promptIndexes: [0], coverage: 'supported', summary: ['Primary content'], gap: '' },
    { ...point, promptIndexes: [1], coverage: 'partial', summary: ['Past content'], sources: [{ type: 'PAST', title: 'Past manual', pdfPage: 20, pageCode: '段落 42' }], gap: '裏付け中' }
  ], 'partial');
  assert.equal(wrapped.oralPrompts.children.length, 1);
  const folded = wrapped.oralAnswerPoints.firstChild;
  assert.equal(folded.children.length, 4, 'Multiple owners of a folded item must both render');
  assert(folded.children[1].textContent.includes('starts and continues。'));
  assert.equal(folded.children[2].firstChild.children[1].textContent, '根拠確認済み');
  assert.equal(folded.children[3].firstChild.children[1].textContent, '裏付け中');
  assert(folded.children[2].textContent.includes('Primary content') && !folded.children[2].textContent.includes('裏付け中'));
  assert(folded.children[3].textContent.includes('Past content') && folded.children[3].textContent.includes('段落 42'));
  assert(!folded.children[3].textContent.includes('PDF p.20'));
  const blanks = [{ text: ' ・ ', level: 'I' }, { text: '', level: 'I' }, { text: '  ', level: 'I' }, { text: '・ Valid。', level: 'I' }];
  const edge = await shownItem(blanks, [
    { ...point, promptIndexes: [3, 3, -1, 99, '3', null], summary: ['Valid binding'] },
    { ...point, promptIndexes: [0, 1, 2], summary: ['Hidden-only binding'] },
    { ...point, promptIndexes: [-1, 99, '3', null, 3.5], summary: ['Invalid binding'] },
    { ...point, promptIndexes: undefined, summary: ['No binding'] }
  ]);
  assert.equal(edge.oralPrompts.children.length, 1);
  assert.equal(edge.oralAnswerPoints.children.length, 2);
  assert.equal(edge.oralAnswerPoints.firstChild.firstChild.textContent, '項目 1');
  assert.equal(edge.oralAnswerPoints.firstChild.children.length, 3, 'Repeated binding duplicated point');
  assert(edge.oralAnswerPoints.firstChild.textContent.includes('Valid binding'));
  const unmatched = edge.oralAnswerPoints.children[1];
  assert.equal(unmatched.firstChild.textContent, '項目との対応が未確認の回答');
  for (const value of ['Hidden-only binding', 'Invalid binding', 'No binding']) assert(unmatched.textContent.includes(value));
  assert(!unmatched.textContent.includes('に共通する回答'));
  const insufficient = await shownItem(four.slice(0, 1), [{ promptIndexes: [0], summary: [], coverage: 'insufficient', sources: [], gap: '' }], 'insufficient');
  assert(insufficient.oralAnswerPoints.textContent.includes('根拠が不足しています'));
  assert.equal(insufficient.oralAnswerPoints.firstChild.children[2].firstChild.children[1].textContent, '根拠不足・要確認');
  const noPoints = await shownItem(four.slice(0, 1), [], 'insufficient');
  assert(noPoints.oralAnswerPoints.textContent.includes('この項目に対応する回答は未確認'));
  assert(noPoints.oralAnswerPoints.textContent.includes('回答の要点がまだ登録されていません'));
  const noPrompts = await shownItem(blanks.slice(0, 3), [{ ...point, promptIndexes: [], summary: ['Retained unmatched answer'] }]);
  assert.equal(noPrompts.oralPrompts.children.length, 0);
  assert(noPrompts.oralAnswerPoints.textContent.includes('Retained unmatched answer'));
  const tags = node => [node.tagName, ...node.children.flatMap(tags)];
  assert(!tags(shared.oralAnswerPoints).some(tag => ['script', 'img', 'b'].includes(tag)), 'Source content became markup');
  assert(!/innerHTML|insertAdjacentHTML/.test(source), 'Rendering must remain text-only');
  const race = harness(); choose(race, G); choose(race, H);
  race.calls[1].success(response(H, [bundle('C', H)])); await flush();
  race.calls[0].success(response()); await flush();
  assert.equal(race.nodes.oralQuestionHeading.textContent, 'C question 0');
  const dedupe = harness(); choose(dedupe, G); choose(dedupe, H); choose(dedupe, G);
  assert.equal(dedupe.calls.length, 2);
  dedupe.calls[0].success(response()); await flush();
  dedupe.calls[1].failure({ message: 'late failure' }); await flush();
  assert.equal(dedupe.nodes.oralQuestionHeading.textContent, 'A question 0');
  assert(dedupe.nodes.oralRetry.hidden);
  const cleared = harness(); choose(cleared); choose(cleared, '');
  cleared.calls[0].success(response()); await flush(); assert(cleared.nodes.oralWorkspace.hidden);
  const failed = harness(); choose(failed);
  failed.calls[0].failure({ message: 'Connection failed' }); await flush();
  assert(!failed.nodes.oralRetry.hidden && failed.nodes.oralLoading.hidden);
  failed.nodes.oralRetry.fire('click');
  failed.calls[1].success({ ok: false, error: { message: 'Retry me' } }); await flush();
  failed.nodes.oralRetry.fire('click');
  failed.calls[2].success(response()); await flush(); assert(!failed.nodes.oralWorkspace.hidden);
  const timeout = harness(); choose(timeout);
  [...timeout.timers.values()][0](); await flush();
  timeout.calls[0].success(response()); await flush(); assert(timeout.nodes.oralWorkspace.hidden && !timeout.nodes.oralRetry.hidden);
  const empty = harness(); choose(empty); empty.calls[0].success(response(G, [])); await flush();
  assert(!empty.nodes.oralRetry.hidden && empty.nodes.oralStatusText.textContent.includes('まだ登録されていません'));
  for (const change of ['missing', 'duplicateParent', 'crossGroup', 'duplicateChild', 'wrongCount', 'nullBundle', 'revision']) {
    const broken = harness(); choose(broken); const bad = response();
    if (change === 'missing') bad.data.bundles.pop();
    if (change === 'duplicateParent') bad.data.bundles[1] = bad.data.bundles[0];
    if (change === 'crossGroup') bad.data.bundles[1].section.group = H;
    if (change === 'duplicateChild') bad.data.bundles[1].items[0].itemId = 'A0';
    if (change === 'wrongCount') bad.data.sections[1].itemCount++;
    if (change === 'nullBundle') bad.data.bundles[1] = null;
    if (change === 'revision') bad.data.bundles[1].revision = 'two';
    broken.calls[0].success(bad); await flush(); assert(broken.nodes.oralWorkspace.hidden && !broken.nodes.oralRetry.hidden, change);
    broken.nodes.oralRetry.fire('click'); assert.equal(broken.calls.length, 2, 'Invalid responses must not poison caches');
    broken.calls[1].success(response()); await flush(); assert(!broken.nodes.oralWorkspace.hidden);
  }
  const updated = harness(); choose(updated); updated.calls[0].success(response()); await flush();
  choose(updated, H); const changed = response(H, [bundle('C', H)]);
  changed.data.revision = 'two'; changed.data.bundles[0].revision = 'two';
  updated.calls[1].success(changed); await flush(); assert(updated.nodes.oralStatusText.textContent.includes('学習データが更新'));
  assert(updated.nodes.oralWorkspace.hidden);
  const invalid = harness(); choose(invalid, 'すべての分野'); await flush(); assert.equal(invalid.calls.length, 0);
  console.log(JSON.stringify({ oralUi: 'ok', verified: ['zero-request placeholder', 'one group API', 'instant parent switching', 'page-local cache', 'reload freshness', 'parent/child/reveal retention', 'matching item numbering', 'full shared answers in every item', 'folded item with multiple owners', 'unmatched/invalid bindings retained', 'isolated point coverage/PAST', 'empty/insufficient fallback', 'text-only sources/gaps', 'immutable prompt presentation', 'search', 'races and deduplication', 'cleared selection', 'retry/timeout', 'atomic validation', 'revision guard'], browserValidation: 'public browser verification required' }));
})().catch(error => { console.error(error); process.exitCode = 1; });
