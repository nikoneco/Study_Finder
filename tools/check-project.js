const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert/strict');
const { execFileSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..');
const DOCS = path.join(ROOT, 'docs');
const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');
const exists = (file) => fs.existsSync(path.join(ROOT, file));
require('./check-exam-routes');
require('./check-oral-ui');
require('./check-oral-service');
require('./check-oral-data');
require('./check-oral-sheet-patch');
require('./check-read-transport');

for (const file of ['index.html', 'manifest.webmanifest', 'sw.js', 'offline.html', 'assets/css/app.css', 'assets/css/pwa.css', 'assets/css/exam-modes.css', 'assets/css/oral-study.css', 'assets/js/gas-run-shim.js', 'assets/js/app.js', 'assets/js/exam-modes.js', 'assets/js/oral-study.js', 'assets/js/pwa-client.js', 'assets/icons/icon-192.png', 'assets/icons/icon-512.png']) {
  assert(exists('docs/' + file), 'Missing generated file: ' + file);
}
for (const file of ['assets/js/gas-run-shim.js', 'assets/js/app.js', 'assets/js/exam-modes.js', 'assets/js/oral-study.js', 'assets/js/pwa-client.js', 'sw.js']) new vm.Script(read('docs/' + file), { filename: file });
for (const file of ['assets/css/app.css', 'assets/css/pwa.css', 'assets/css/exam-modes.css', 'assets/css/oral-study.css']) {
  const css = read('docs/' + file);
  assert(css.trim().length && !/<\/?style|<\?!=|<\?=/.test(css), 'Invalid CSS: ' + file);
}
const html = read('docs/index.html');
const js = read('docs/assets/js/app.js');
assert(!/<\?!=|<\?=/.test(html), 'Unexpanded GAS template');
assert((html.match(/<title>/g) || []).length === 1, 'Duplicate page title');
assert(html.includes('<title>737-800勉強</title>'), 'Wrong learning hub title');
for (const id of ['examHome', 'examWritten', 'examOral', 'writtenExamLink', 'oralExamLink', 'examNavigation']) assert(html.includes('id="' + id + '"'), 'Missing exam route: ' + id);
assert(html.includes('href="#written"') && html.includes('href="#oral"'), 'Missing exam selection links');
for (const id of ['oralSection', 'oralItems', 'oralQuestionHeading', 'oralAnswerPoints', 'oralGapList']) assert(html.includes('id="' + id + '"'), 'Missing oral learner control: ' + id);
assert(html.includes('大問（照査項目）') && html.includes('この大問の小問'), 'Oral main/subquestion hierarchy must remain grouped');
assert(!/data\/oral|assessment_rev3\.json|標準問題集\/.*\.pdf/.test(html), 'Local assessment data leaked into the public page');
assert(/<link rel="icon" type="image\/png" href="\.\/assets\/icons\/icon-192\.png\?v=content-[a-f0-9]+">/.test(html), 'Missing app-scoped browser icon');
assert(!/Answer Draft|AI \/ Draft Answers|回答作成用プロンプト/.test(html + js), 'Draft/prompt UI returned');
assert(html.includes('id="termDialog"') && js.includes('resolveTermDefinitions') && js.includes('term-trigger'), 'Missing abbreviation UI');
assert(js.includes('answerFigures') && js.includes('loading="lazy"'), 'Missing lazy answer images');
const figureFiles = [...js.matchAll(/\['([^']+\.webp)',\s*'[^']+'\]/g)].map((match) => match[1]);
assert(figureFiles.length >= 26, 'Missing reviewed image map');
for (const file of new Set(figureFiles)) assert(exists('docs/assets/answer-figures/' + file), 'Missing mapped figure: ' + file);
const oralJs = read('docs/assets/js/oral-study.js');
const configLine = oralJs.match(/^window\.STUDY_CONFIG = ([^\n]+);\r?\n/);
assert(configLine, 'Missing oral figure config');
const oralFigures = JSON.parse(configLine[1]).oralFigures;
const { validateOralFigures } = require('./build-pages');
assert.deepEqual(oralFigures, validateOralFigures(JSON.parse(read('web/oral-figures.json'))), 'Generated oral figures differ from reviewed metadata');
for (const figure of oralFigures.figures) assert(exists('docs/assets/answer-figures/' + figure.file), 'Missing oral figure: ' + figure.file);
const manifest = JSON.parse(read('docs/manifest.webmanifest'));
assert.equal(manifest.name, '737-800勉強');
assert.equal(manifest.start_url, '/Study_Finder/');
assert.equal(manifest.scope, '/Study_Finder/');
assert.equal(manifest.display, 'standalone');
const sw = read('docs/sw.js');
assert(sw.includes('study-finder-pwa-') && sw.includes('key.startsWith(CACHE_PREFIX)'), 'Cache cleanup must be app-scoped');
assert(!sw.includes('/hobby-hub/'), 'Service Worker must not cache HUB routes');
assert(sw.includes('url.origin !== self.location.origin'), 'GAS traffic must not enter the static cache');
assert(read('docs/assets/js/pwa-client.js').includes('./sw.js'), 'Wrong Service Worker registration');

const server = read('gas/Code.gs');
const begin = server.indexOf('function dispatchWebAppJsonpApi_');
const end = server.indexOf('\nfunction ', begin + 10);
const dispatcher = server.slice(begin, end);
for (const name of ['bootstrap', 'apiGetQuestions', 'apiGetQuestionsBundle', 'apiGetQuestionDetail', 'apiGetRandomQuestionDetail', 'apiBuildReviewPrompt', 'apiGetOralSections', 'apiGetOralSectionBundle', 'apiGetOralGroupBundle']) assert(dispatcher.includes("case '" + name + "'"), 'Missing public read API: ' + name);
for (const name of ['setupProject', 'apiSaveAnswerNote', 'apiUpdateAnswerNote', 'apiSaveConfirmedAnswer', 'apiImportCsv', 'apiImportPreparedAtaData']) assert(!dispatcher.includes("case '" + name + "'"), 'Mutation exposed publicly: ' + name);
assert(server.includes('normalizeWebAppJsonpCallback_') && server.includes('decodeWebAppJsonpArgs_'), 'Missing JSONP validation');
const importService = read('gas/ImportService.gs');
assert(importService.includes("digits.padStart(2, '0')"), 'ATA00 normalization lost');
assert(read('gas/StudyService.gs').includes('getTermDictionaryForClient_'), 'Dictionary sanitization lost');

// Execute the worker activation with mixed app caches, not just a string check.
const events = {};
const removed = [];
const cacheKeys = ['study-finder-pwa-old', 'hobby-hub-pwa-current', 'library-current'];
const swContext = { self: { addEventListener: (name, fn) => { events[name] = fn; }, clients: { claim() {} } }, caches: { keys: async () => cacheKeys, delete: async (key) => removed.push(key) } };
vm.runInNewContext(sw, swContext);
let activation;
events.activate({ waitUntil: (promise) => { activation = promise; } });
activation.then(() => {
  assert.deepEqual(removed, ['study-finder-pwa-old']);
  if (fs.existsSync(path.join(ROOT, '.git'))) {
    const files = execFileSync('git', ['ls-files', '-z'], { cwd: ROOT, encoding: 'utf8' }).split('\0').filter(Boolean);
    for (const file of files) assert(!/\.pdf$|(?:^|\/)\.clasp\.json$|\.clasprc\.json$|(?:^|\/)LOCAL_URLS\.md$|^data\/|^tmp\/|\.local(?:\.|$)|Codex 申し送り\.txt$/.test(file), 'Local material tracked: ' + file);
  }
  console.log(JSON.stringify({ status: 'ok', images: new Set(figureFiles).size, oralFigures: oralFigures.figures.length, pagesBase: manifest.scope, publicApis: 'read-only', cacheIsolation: 'ok' }));
}).catch((error) => { console.error(error); process.exitCode = 1; });
