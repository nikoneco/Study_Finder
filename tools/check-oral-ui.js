const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert/strict');
const source = fs.readFileSync(path.join(__dirname, '..', 'web', 'oral-study.js'), 'utf8');
const html = fs.readFileSync(path.join(__dirname, '..', 'web', 'exam-modes.html'), 'utf8');

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
function harness(hash = '#home') {
  const nodes = {};
  for (const [, id] of html.matchAll(/id="([^"]+)"/g)) nodes[id] = new Node();
  nodes.oralSection.appendChild(new Node('option'));
  nodes.examWritten = new Node();
  nodes.examWritten.studyState = { questionId: 'written-preserved', answerRevealed: true };
  const calls = [];
  function runner(success, failure) {
    return new Proxy({}, { get(_target, name) {
      if (name === 'withSuccessHandler') return fn => runner(fn, failure);
      if (name === 'withFailureHandler') return fn => runner(success, fn);
      return (...args) => { calls.push({ name, args, success, failure }); };
    } });
  }
  const events = {};
  const timers = new Map();
  let seq = 0;
  const window = {
    location: { hash }, google: { script: { run: runner() } },
    setTimeout(fn) { timers.set(++seq, fn); return seq; }, clearTimeout(id) { timers.delete(id); },
    addEventListener(name, fn) { events[name] = fn; }
  };
  const document = { getElementById: id => nodes[id], createElement: tag => new Node(tag) };
  vm.runInNewContext(source, { document, window, console });
  return { nodes, calls, timers, route(hash) { window.location.hash = hash; events.hashchange(); } };
}
async function flush() { await Promise.resolve(); await Promise.resolve(); }
function answer(status = 'supported') {
  return { status, points: [{ summary: ['A safe summarized answer <script>not markup</script>'], coverage: status, sources: [{ type: 'AMM', title: 'Manual', reference: '00-00-00', revision: 'A', pdfPage: 2, pageCode: 'P2', locator: 'Procedure' }], gap: status === 'supported' ? '' : 'Historical procedure not established' }], gaps: status === 'supported' ? [] : ['AMM evidence incomplete'], scopeNotes: ['Study only; applicability must be checked'] };
}
function section(id, group, atas, count = 2) { return { sectionId: id, title: 'Parent ' + id, group, atas, order: id === 'A' ? 1 : 2, itemCount: count }; }
function catalog(sections = [section('A', 'System', ['21']), section('B', 'Servicing', ['29'])]) { return { ok: true, data: { schemaVersion: 1, revision: 'one', sections, groups: ['System', 'Servicing'] } }; }
function bundle(id, count = 2) {
  return { ok: true, data: { schemaVersion: 1, revision: 'one', section: { sectionId: id, title: 'Parent ' + id, group: 'System', atas: ['21'], assessmentPage: 4 }, items: Array.from({ length: count }, (_, index) => ({ itemId: id + index, sourceItemNumber: index === 1 ? 1 : index + 1, order: index + 1, levels: index === 0 ? ['I', 'II'] : ['II'], subheading: 'Context', question: id + ' question ' + index, prompts: [{ text: 'Original condition', level: 'I' }, { text: '737-800 only', level: 'II' }], answer: answer(index === 0 ? 'supported' : 'partial') })) } };
}

(async () => {
  assert(!html.includes('Codexが資料を基に整理した学習用の回答です。'), 'Removed disclaimer returned');
  const combined = harness('#oral');
  const start = catalog();
  start.data.initialBundle = bundle('A').data;
  combined.calls[0].success(start); await flush();
  assert.equal(combined.calls.length, 1, 'initial oral study must take one request');
  assert.equal(combined.nodes.oralQuestionHeading.textContent, 'A question 0');
  assert.equal(combined.nodes.oralWorkspace.hidden, false);
  const h = harness();
  assert.equal(h.calls.length, 0, 'home must not fetch oral data');
  h.route('#written');
  assert.equal(h.calls.length, 0, 'written must not fetch oral data');
  h.route('#oral');
  assert.equal(h.calls[0].name, 'apiGetOralStart');
  assert.equal(h.nodes.oralLoading.hidden, false);
  h.calls[0].success(catalog()); await flush();
  assert.equal(h.calls[1].name, 'apiGetOralSectionBundle');
  assert.equal(h.calls[1].args[0], 'A');
  h.calls[1].success(bundle('A')); await flush();
  assert.equal(h.nodes.oralWorkspace.hidden, false);
  assert.equal(h.nodes.oralQuestionHeading.textContent, 'A question 0');
  assert.equal(h.nodes.oralItems.children.length, 2, 'duplicate original numbers must not merge');
  assert.equal(h.nodes.oralPrompts.children.length, 2, 'all conditions remain inside the child');
  assert.equal(h.nodes.oralPrevious.disabled, true);
  assert.equal(h.nodes.oralAnswer.hidden, true);
  h.nodes.oralReveal.fire('click');
  assert.equal(h.nodes.oralAnswer.hidden, false);
  assert.equal(h.nodes.oralReveal.attributes['aria-expanded'], 'true');
  assert(h.nodes.oralAnswerPoints.textContent.includes('PDF p.2'));
  assert(h.nodes.oralAnswerPoints.textContent.includes('<script>not markup</script>'), 'answer text stays literal text');
  h.nodes.oralNext.fire('click');
  assert.equal(h.nodes.oralQuestionHeading.textContent, 'A question 1');
  assert.equal(h.nodes.oralAnswer.hidden, true, 'new child should not reveal answer automatically');
  assert.equal(h.nodes.oralNext.disabled, true);
  h.nodes.oralReveal.fire('click');
  assert.equal(h.nodes.oralAnswerGaps.hidden, false);
  assert(h.nodes.oralAnswerPoints.textContent.includes('Historical procedure'));
  h.route('#home'); h.route('#written'); h.route('#oral');
  assert.equal(h.calls.length, 2, 'mode changes retain loaded oral state');
  assert.equal(h.nodes.oralAnswer.hidden, false);
  assert.equal(h.nodes.oralQuestionHeading.textContent, 'A question 1');
  assert.deepEqual(h.nodes.examWritten.studyState, { questionId: 'written-preserved', answerRevealed: true });
  h.nodes.oralSection.value = 'B'; h.nodes.oralSection.fire('change');
  assert.equal(h.calls[2].args[0], 'B');
  h.nodes.oralSection.value = 'A'; h.nodes.oralSection.fire('change'); await flush();
  h.calls[2].success(bundle('B')); await flush();
  assert.equal(h.nodes.oralQuestionHeading.textContent, 'A question 1', 'late B result must not overwrite A');
  h.nodes.oralSearch.value = 'no-matching-section'; h.nodes.oralSearch.fire('input');
  assert.equal(h.nodes.oralSection.disabled, true);
  assert.equal(h.nodes.oralWorkspace.hidden, true);
  assert(h.nodes.oralStatusText.textContent.includes('条件に合う大問'));
  h.nodes.oralSearch.value = 'ATA29'; h.nodes.oralSearch.fire('input'); await flush();
  assert.equal(h.nodes.oralQuestionHeading.textContent, 'B question 0');
  assert.equal(h.nodes.oralFilterCount.textContent, '1 / 2大問を表示');
  h.nodes.oralSearch.value = ''; h.nodes.oralGroup.value = 'System'; h.nodes.oralGroup.fire('change'); await flush();
  assert.equal(h.nodes.oralQuestionHeading.textContent, 'A question 1');
  h.nodes.oralAta.value = '29'; h.nodes.oralAta.fire('change');
  assert.equal(h.nodes.oralWorkspace.hidden, true, 'group and ATA filters combine');

  const failed = harness('#oral');
  failed.calls[0].failure({ message: 'Connection failed' }); await flush();
  assert.equal(failed.nodes.oralRetry.hidden, false);
  assert.equal(failed.nodes.oralLoading.hidden, true);
  failed.nodes.oralRetry.fire('click');
  assert.equal(failed.calls.length, 2);
  failed.calls[1].success(catalog()); await flush();
  failed.calls[2].success({ ok: false, error: { message: 'Retry me' } }); await flush();
  assert.equal(failed.nodes.oralRetry.hidden, false);
  failed.nodes.oralRetry.fire('click');
  failed.calls[3].success(bundle('A')); await flush();
  assert.equal(failed.nodes.oralWorkspace.hidden, false);

  const empty = harness('#oral');
  empty.calls[0].success(catalog([])); await flush();
  assert.equal(empty.nodes.oralRetry.hidden, false);
  assert(empty.nodes.oralStatusText.textContent.includes('まだ登録されていません'));
  assert.equal(empty.calls.length, 1);

  const stale = harness('#oral');
  stale.calls[0].success(catalog()); await flush();
  stale.nodes.oralSection.value = 'B'; stale.nodes.oralSection.fire('change');
  stale.calls[2].success(bundle('B')); await flush();
  stale.calls[1].failure({ message: 'late failure' }); await flush();
  assert.equal(stale.nodes.oralQuestionHeading.textContent, 'B question 0');
  assert.equal(stale.nodes.oralRetry.hidden, true);

  const timeout = harness('#oral');
  [...timeout.timers.values()][0](); await flush();
  assert.equal(timeout.nodes.oralRetry.hidden, false);
  timeout.calls[0].success(catalog()); await flush();
  assert.equal(timeout.calls.length, 1, 'timed-out late result must be ignored');

  const mismatch = harness('#oral');
  mismatch.calls[0].success(catalog()); await flush();
  const wrongRevision = bundle('A'); wrongRevision.data.revision = 'two';
  mismatch.calls[1].success(wrongRevision); await flush();
  assert(mismatch.nodes.oralStatusText.textContent.includes('学習データが更新'));
  assert.equal(mismatch.nodes.oralWorkspace.hidden, true);
  console.log(JSON.stringify({ oralUi: 'ok', verified: ['lazy loading', 'parent ownership', 'duplicate numbers', 'mixed levels and conditions', 'answer reveal', 'navigation bounds', 'sources and gaps', 'text-only rendering', 'mode state retention', 'combined filtering', 'out-of-order success/failure', 'empty catalog', 'error/retry', 'timeout', 'revision mismatch'], browserValidation: 'delegated to root' }));
})().catch(error => { console.error(error); process.exitCode = 1; });
