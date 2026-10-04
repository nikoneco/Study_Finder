const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert/strict');
const source = fs.readFileSync(path.join(__dirname, '..', 'web', 'exam-modes.js'), 'utf8');
for (const initialHash of ['', '#home', '#written', '#oral', '#unknown', '#constructor', '#__proto__']) {
  const nodes = {};
  for (const id of ['examHome', 'examWritten', 'examOral', 'examHomeHeading', 'examWrittenHeading', 'examOralHeading', 'examNavigation', 'examModeLabel']) {
    nodes[id] = { hidden: id !== 'examHome', textContent: '', focus() { this.focused = true; } };
  }
  nodes.examWritten.studyState = { ata: '24', questionId: 'unchanged', answerRevealed: true };
  const title = {};
  const listeners = {};
  const document = { getElementById: id => nodes[id], querySelector: () => title, documentElement: { dataset: {} } };
  const window = { location: { hash: initialHash }, addEventListener: (name, fn) => { listeners[name] = fn; }, scrollTo() {} };
  vm.runInNewContext(source, { document, window });
  const initialMode = ['#written', '#oral'].includes(initialHash) ? initialHash.slice(1) : 'home';
  assert.equal(document.documentElement.dataset.examMode, initialMode);
  assert(!nodes[{ home: 'examHome', written: 'examWritten', oral: 'examOral' }[initialMode]].hidden);
  for (const mode of ['written', 'home', 'oral', 'home', 'written']) {
    window.location.hash = '#' + mode;
    listeners.hashchange();
    assert.equal(document.documentElement.dataset.examMode, mode);
    assert.equal(['examHome', 'examWritten', 'examOral'].filter(id => !nodes[id].hidden).length, 1);
    assert.equal(nodes.examNavigation.hidden, mode === 'home');
    assert(nodes[{ home: 'examHomeHeading', written: 'examWrittenHeading', oral: 'examOralHeading' }[mode]].focused);
    assert.deepEqual(nodes.examWritten.studyState, { ata: '24', questionId: 'unchanged', answerRevealed: true });
  }
}
console.log(JSON.stringify({ examRoutes: 'ok', initialRoutes: 7, modeTransitions: 35, writtenStatePreserved: true }));
