const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert/strict');
const ROOT = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(ROOT, 'docs/assets/js/gas-run-shim.js'), 'utf8');
function harness() {
  let seq = 0;
  const timers = new Map(), events = new Map(), nodes = [], responses = [], failures = [];
  const container = { appendChild(node) { nodes.push(node); node.parentNode = container; },
    removeChild(node) { nodes.splice(nodes.indexOf(node), 1); node.parentNode = null; } };
  const window = { setTimeout(fn, ms) { timers.set(++seq, { fn, ms }); return seq; }, clearTimeout(id) { timers.delete(id); },
    crypto: { getRandomValues(bytes) { bytes.fill(10); } },
    dispatchEvent() {}, addEventListener(name, fn) { events.set(name, fn); }, removeEventListener(name) { events.delete(name); } };
  const document = { head: container, body: container, createElement(tag) {
    const contentWindow = {}; contentWindow.parent = contentWindow;
    return { tag, contentWindow, style: {}, setAttribute() {} };
  } };
  vm.runInNewContext(source, { window, document, URL, TextEncoder, Uint8Array,
    btoa: value => Buffer.from(value, 'binary').toString('base64'), CustomEvent: class {}, console: { debug() {} } });
  function tick(ms) {
    const found = [...timers.entries()].find(([, timer]) => timer.ms === ms);
    assert(found, 'timer not found: ' + ms); timers.delete(found[0]); found[1].fn();
  }
  function call(method = 'apiGetOralStart', ...args) { window.google.script.run.withSuccessHandler(v => responses.push(v)).withFailureHandler(e => failures.push(e))[method](...args); }
  function jsonp(response) {
    const script = nodes.find(n => n.tag === 'script');
    window[new URL(script.src).searchParams.get('callback')](response);
  }
  function message(overrides = {}) {
    const frame = nodes.find(n => n.tag === 'iframe');
    const url = new URL(frame.src);
    const base = { origin: 'https://n-test-script.googleusercontent.com', source: frame.contentWindow,
      data: { kind: 'STUDY_READ_FRAME_V1', nonce: url.searchParams.get('nonce'), api: url.searchParams.get('api'), response: { ok: true, data: { test: 'frame' } } } };
    events.get('message')({ ...base, ...overrides });
  }
  return { window, nodes, events, timers, responses, failures, tick, call, jsonp, message };
}
const quick = harness(); quick.call(); quick.jsonp({ ok: true, data: 'fast' });
assert.equal(quick.responses.length, 1); assert.equal(quick.nodes.length, 0);
assert(![...quick.timers.values()].some(t => t.ms === 3000));
const race = harness(); race.call(); race.tick(3000);
assert.equal(race.nodes.filter(n => n.tag === 'iframe').length, 1);
race.message({ origin: 'https://attacker.invalid' });
race.message({ source: {} });
race.message({ data: { kind: 'STUDY_READ_FRAME_V1', nonce: 'wrong', api: 'apiGetOralStart', response: { ok: true, data: 1 } } });
race.message({ data: { kind: 'STUDY_READ_FRAME_V1', nonce: new URL(race.nodes.find(n => n.tag === 'iframe').src).searchParams.get('nonce'), api: 'apiImportCsv', response: { ok: true, data: 1 } } });
assert.equal(race.responses.length, 0, 'spoofed frame response accepted');
const callback = new URL(race.nodes.find(n => n.tag === 'script').src).searchParams.get('callback');
const frameWindow = race.nodes.find(n => n.tag === 'iframe').contentWindow;
race.message({ source: { parent: frameWindow } });
assert.equal(race.responses.length, 1); assert.equal(race.nodes.length, 0); assert.equal(race.events.size, 0);
race.window[callback]({ ok: true, data: 'late' }); assert.equal(race.responses.length, 1);
const jsonpWins = harness(); jsonpWins.call(); jsonpWins.tick(3000); jsonpWins.jsonp({ ok: true, data: 'jsonp' });
assert.equal(jsonpWins.nodes.length, 0); assert.equal(jsonpWins.events.size, 0);
const scriptErrors = harness(); scriptErrors.call();
scriptErrors.nodes.find(n => n.tag === 'script').onerror(); scriptErrors.tick(1500);
scriptErrors.nodes.find(n => n.tag === 'script').onerror();
assert.equal(scriptErrors.failures.length, 0, 'do not abandon a pending alternate response');
scriptErrors.message(); assert.equal(scriptErrors.responses.length, 1);
assert.equal(scriptErrors.nodes.length, 0); assert.equal(scriptErrors.events.size, 0);
const failed = harness(); failed.call(); failed.tick(3000); failed.tick(35000); failed.tick(50000); failed.tick(1500); failed.tick(50000);
assert.equal(failed.failures.length, 1); assert.equal(failed.nodes.length, 0); assert.equal(failed.events.size, 0);
const blocked = harness(); blocked.call('apiImportCsv'); blocked.tick(3000);
assert.equal(blocked.nodes.filter(n => n.tag === 'iframe').length, 0, 'non-read API entered alternate route');
blocked.tick(50000); blocked.tick(1500); blocked.tick(50000); assert.equal(blocked.failures.length, 1);

let dispatched = 0;
const htmlService = { XFrameOptionsMode: { ALLOWALL: 'ALLOWALL' }, createHtmlOutput(html) {
  return { html, setXFrameOptionsMode(mode) { this.mode = mode; return this; } };
} };
const context = { HtmlService: htmlService, Utilities: { base64DecodeWebSafe: () => [], newBlob: () => ({ getDataAsString: () => '[]' }) } };
vm.createContext(context); vm.runInContext(fs.readFileSync(path.join(ROOT, 'gas/Code.gs'), 'utf8'), context);
context.dispatchWebAppJsonpApi_ = () => { dispatched++; return { ok: true, data: '</script><script>bad</script>' }; };
for (const api of ['setupProject', 'apiImportCsv', 'bootstrap', 'constructor']) {
  assert.equal(context.handleStudyReadFrame_({ api, nonce: 'a'.repeat(32) }).html, 'Invalid read request.');
}
assert.equal(dispatched, 0);
assert.equal(context.handleStudyReadFrame_({ api: 'apiGetOralStart', nonce: 'bad' }).html, 'Invalid read request.');
const output = context.handleStudyReadFrame_({ api: 'apiGetOralStart', nonce: 'a'.repeat(32) });
assert.equal(dispatched, 1); assert.equal((output.html.match(/<\/script>/g) || []).length, 1);
assert(output.html.includes('"https://nikoneco.github.io"')); assert(output.html.includes('serverMs'));
assert(!output.html.includes('<script>bad'));
const group = harness(); group.call('apiGetOralGroupBundle', 'SYSTEM：機体'); group.tick(3000);
const groupUrl = new URL(group.nodes.find(n => n.tag === 'iframe').src);
assert.equal(groupUrl.searchParams.get('api'), 'apiGetOralGroupBundle');
assert.equal(Buffer.from(groupUrl.searchParams.get('argsB64'), 'base64url').toString('utf8'), '["SYSTEM：機体"]');
group.message(); assert.equal(group.responses.length, 1); assert.equal(group.nodes.length, 0);
assert(context.handleStudyReadFrame_({ api: 'apiGetOralGroupBundle', nonce: 'a'.repeat(32) }).html.includes('STUDY_READ_FRAME_V1'));
console.log(JSON.stringify({ readTransport: 'ok', checks: ['fast JSONP', '3s alternate route', 'origin/nonce/API/ancestry guards', 'first response wins', 'late callback', 'timeout cleanup', 'read-only server', 'HTML literal escaping'] }));
