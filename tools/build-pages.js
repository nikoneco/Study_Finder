const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const DOCS = path.join(ROOT, 'docs');
const PAGES_BASE = '/Study_Finder/';
const APP = {
  id: 'study737',
  title: '737 Study Finder',
  sourceDir: path.join(ROOT, 'gas'),
  staticAssetsDir: path.join(ROOT, 'assets'),
  pwaMode: 'study',
  gasEndpoint: 'https://script.google.com/macros/s/AKfycbzPwkINDY--2PUYQg5xGoPDtkCLYvGoItobfEJocINxBFviRzcCrxb7Iu5lylirQ7tLOg/exec',
  bootstrap: { ok: true, data: {
    appName: '737 Study Finder', setup: {},
    preparedAtas: ['00', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '38', '47', '49', '5X', '7X']
  } }
};
const BUILD_VERSION = createBuildVersion();

function listFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(full) : entry.isFile() ? [full] : [];
  });
}

function createBuildVersion() {
  const hash = crypto.createHash('sha256');
  const files = [__filename, ...listFiles(APP.sourceDir).filter((file) => file.endsWith('.html')), ...listFiles(APP.staticAssetsDir)];
  files.sort().forEach((file) => {
    hash.update(path.relative(ROOT, file).replace(/\\/g, '/'));
    hash.update('\0');
    hash.update(/\.(js|html)$/.test(file) ? fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n') : fs.readFileSync(file));
    hash.update('\0');
  });
  return 'content-' + hash.digest('hex').slice(0, 12);
}

function main() {
  if (path.resolve(DOCS) !== path.join(ROOT, 'docs') || (fs.existsSync(DOCS) && fs.lstatSync(DOCS).isSymbolicLink())) {
    throw new Error('Refusing unsafe generated docs target');
  }
  fs.rmSync(DOCS, { recursive: true, force: true });
  fs.mkdirSync(DOCS, { recursive: true });
  fs.cpSync(APP.staticAssetsDir, path.join(DOCS, 'assets'), { recursive: true });
  for (const directory of ['assets/css', 'assets/js']) fs.mkdirSync(path.join(DOCS, directory), { recursive: true });
  write('assets/css/app.css', stripWrapper(readSource('style.html'), 'style'));
  write('assets/css/pwa.css', buildPwaCss(APP));
  write('assets/js/app.js', stripWrapper(readSource('script.html'), 'script'));
  write('assets/js/gas-run-shim.js', buildGasRunShim(APP));
  write('assets/js/pwa-client.js', buildPwaClient(APP));
  let html = readSource('index.html').replace(/<base\s+target="_top">\s*/i, '');
  html = html.replace(/<\?!=\s*include\('([^']+)'\);\s*\?>/g, (match, name) => {
    if (name === 'style') return '<link rel="stylesheet" href="./assets/css/app.css?v=' + BUILD_VERSION + '">\n<link rel="stylesheet" href="./assets/css/pwa.css?v=' + BUILD_VERSION + '">';
    if (name === 'script') return ['gas-run-shim', 'app', 'pwa-client'].map((name) => '<script src="./assets/js/' + name + '.js?v=' + BUILD_VERSION + '"></script>').join('\n');
    return readSource(name + '.html').trim();
  });
  html = html.replace(/data-bootstrap='\s*<\?=\s*bootstrapJson\s*;?\s*\?>'/g, "data-bootstrap='" + escapeAttr(JSON.stringify(APP.bootstrap)) + "'");
  const meta = [];
  if (!/<meta\s+charset=/i.test(html)) meta.push('<meta charset="utf-8">');
  if (!/<meta\s+name=["']viewport["']/i.test(html)) meta.push('<meta name="viewport" content="width=device-width, initial-scale=1">');
  if (!/<title(?:\s[^>]*)?>/i.test(html)) meta.push('<title>' + APP.title + '</title>');
  html = html.replace(/<head>/i, '<head>\n' + meta.join('\n'));
  html = html.replace(/<\/head>/i, '<link rel="manifest" href="./manifest.webmanifest">\n<link rel="apple-touch-icon" href="./assets/icons/icon-192.png?v=' + BUILD_VERSION + '">\n<meta name="theme-color" content="#15110e">\n<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="apple-mobile-web-app-title" content="737 Study Finder">\n</head>');
  write('index.html', html);
  write('manifest.webmanifest', JSON.stringify({
    id: PAGES_BASE, name: APP.title, short_name: 'Study737',
    start_url: PAGES_BASE, scope: PAGES_BASE, display: 'standalone',
    background_color: '#15110e', theme_color: '#15110e',
    icons: [192, 512].map((size) => ({ src: 'assets/icons/icon-' + size + '.png?v=' + BUILD_VERSION, sizes: size + 'x' + size, type: 'image/png', purpose: 'any maskable' }))
  }, null, 2));
  write('offline.html', '<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>737 Study Finder Offline</title></head><body><h1>通信が切れています</h1><p>問題・回答の取得には通信が必要です。接続が戻ったら再読み込みしてください。</p><a href="./">737 Study Finderへ戻る</a></body></html>');
  write('sw.js', buildServiceWorker());
  write('.nojekyll', '');
  console.log(JSON.stringify({ app: APP.title, pagesBase: PAGES_BASE, version: BUILD_VERSION }));
}

function write(file, value) { fs.writeFileSync(path.join(DOCS, file), value, 'utf8'); }
function readSource(file) { return fs.readFileSync(path.join(APP.sourceDir, file), 'utf8'); }
function relativeToRoot(app, file) { return './' + file; }
function buildStaticResponses() { return {}; }

function buildGasRunShim(app) {
  const jsonpRetryDelays = app.id === 'study737' ? [0, 1500] : [0];
  const jsonpAttemptTimeoutMs = app.id === 'study737' ? 50000 : 30000;
  return `(() => {
  const GAS_ENDPOINT = ${JSON.stringify(app.gasEndpoint)};
  const STATIC_RESPONSES = ${JSON.stringify(buildStaticResponses(app), null, 2)};
  const JSONP_RETRY_DELAYS = ${JSON.stringify(jsonpRetryDelays)};
${app.id === 'study737' ? `  const JSONP_ATTEMPT_TIMEOUT_MS = ${jsonpAttemptTimeoutMs};
` : ''}  let requestSeq = 0;
${app.id === 'study737' ? `
  function notifyProgress(method, phase, detail) {
    window.dispatchEvent(new CustomEvent('gas-api-progress', {
      detail: Object.assign({
        method,
        phase,
        maxAttempts: JSONP_RETRY_DELAYS.length,
        attemptTimeoutSeconds: JSONP_ATTEMPT_TIMEOUT_MS / 1000
      }, detail || {})
    }));
  }

` : '\n'}  function encodeArgs(args) {
    const json = JSON.stringify(args || []);
    const bytes = new TextEncoder().encode(json);
    let binary = '';
    bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
    return btoa(binary).replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/g, '');
  }

  function callJsonp(method, args, successHandler, failureHandler) {
    if (Object.prototype.hasOwnProperty.call(STATIC_RESPONSES, method)) {
      window.setTimeout(() => {
        if (successHandler) successHandler(STATIC_RESPONSES[method]);
      }, 0);
      return;
    }

    const callbackName = '__gasJsonp_' + Date.now() + '_' + (++requestSeq);
    let activeScript = null;
    let attemptTimeout = 0;
    let retryTimer = 0;
    let attempt = 0;
    let settled = false;

    function clearAttempt() {
      window.clearTimeout(attemptTimeout);
      attemptTimeout = 0;
      if (activeScript && activeScript.parentNode) activeScript.parentNode.removeChild(activeScript);
      activeScript = null;
    }

    function cleanup(keepLateCallback) {
      clearAttempt();
      window.clearTimeout(retryTimer);
      if (keepLateCallback) {
        window[callbackName] = () => {};
        window.setTimeout(() => { delete window[callbackName]; }, 5 * 60 * 1000);
      } else {
        delete window[callbackName];
      }
    }

    window[callbackName] = (response) => {
      if (settled) return;
      settled = true;
${app.id === 'study737' ? '      cleanup(attempt > 1);' : '      cleanup();'}
${app.id === 'study737' ? "      notifyProgress(method, 'success', { attempt });\n" : ''}      if (successHandler) successHandler(response);
    };

    function failAttempt(errorType) {
      if (settled) return;
      clearAttempt();
      if (attempt < JSONP_RETRY_DELAYS.length) {
${app.id === 'study737' ? "        notifyProgress(method, 'retry', { attempt, nextAttempt: attempt + 1, errorType });\n" : ''}        retryTimer = window.setTimeout(loadAttempt, JSONP_RETRY_DELAYS[attempt]);
        return;
      }
      settled = true;
      cleanup(errorType === 'timeout');
      if (failureHandler) failureHandler(new Error('GAS API ' + errorType + ': ' + method));
    }

    function loadAttempt() {
      if (settled) return;
      const attemptNumber = ++attempt;
${app.id === 'study737' ? "      notifyProgress(method, 'attempt', { attempt: attemptNumber });\n" : ''}      const script = document.createElement('script');
      activeScript = script;
      const url = new URL(GAS_ENDPOINT);
      url.searchParams.set('api', method);
      url.searchParams.set('callback', callbackName);
      url.searchParams.set('argsB64', encodeArgs(args));
      url.searchParams.set('_attempt', String(attemptNumber));
      url.searchParams.set('_ts', String(Date.now()));
      script.onerror = () => {
        if (activeScript !== script) return;
        failAttempt('load failed');
      };
      script.src = url.toString();
      document.head.appendChild(script);
      attemptTimeout = window.setTimeout(() => {
        if (activeScript !== script) return;
        failAttempt('timeout');
      }, ${app.id === 'study737' ? 'JSONP_ATTEMPT_TIMEOUT_MS' : '30000'});
    }

    loadAttempt();
  }

  function makeRunner(state) {
    return new Proxy({}, {
      get(_target, property) {
        if (property === 'withSuccessHandler') {
          return (handler) => makeRunner(Object.assign({}, state, { successHandler: handler }));
        }
        if (property === 'withFailureHandler') {
          return (handler) => makeRunner(Object.assign({}, state, { failureHandler: handler }));
        }
        return (...args) => callJsonp(String(property), args, state.successHandler, state.failureHandler);
      }
    });
  }

  window.google = window.google || {};
  window.google.script = window.google.script || {};
  window.google.script.run = makeRunner({});
})();`;
}

function buildPwaClient(app) {
  return `(() => {
  document.documentElement.classList.add('is-pages-pwa', 'pwa-${app.pwaMode}');
  ${buildModeScript(app)}

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(${JSON.stringify(relativeToRoot(app, 'sw.js'))}).catch(() => {});
    });
  }

  window.addEventListener('offline', () => document.body.classList.add('is-offline'));
  window.addEventListener('online', () => document.body.classList.remove('is-offline'));
})();`;
}

function buildModeScript() {
  return "const promptPanel = document.querySelector('.prompt-panel');\n  const studyShell = document.querySelector('.study-shell');\n  if (promptPanel && studyShell) {\n    const promptShell = document.createElement('section');\n    promptShell.className = 'pwa-prompt-shell';\n    promptShell.appendChild(promptPanel);\n    studyShell.appendChild(promptShell);\n  }\n  document.querySelectorAll('#setupButton, .admin-tools, .answer-editor, .import-panel').forEach((element) => { element.hidden = true; });";
}


function buildPwaCss(app) {
  return `html.is-pages-pwa #setupButton,
html.is-pages-pwa .admin-tools,
[hidden] {
  display: none !important;
}

.pwa-prompt-shell {
  margin-top: 14px;
}

body.is-offline::after {
  content: "オフラインです。表示中の画面は開けますが、最新データの取得には通信が必要です。";
  position: fixed;
  left: 12px;
  right: 12px;
  bottom: 12px;
  z-index: 9999;
  padding: 10px 12px;
  border: 1px solid rgba(234, 211, 162, 0.6);
  border-radius: 6px;
  background: rgba(21, 17, 14, 0.96);
  color: #f8efe0;
  font: 13px/1.5 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.35);
}`;
}

function stripWrapper(content, tagName) {
  return content
    .replace(new RegExp('^\\s*<' + tagName + '[^>]*>\\s*', 'i'), '')
    .replace(new RegExp('\\s*</' + tagName + '>\\s*$', 'i'), '');
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/'/g, '&#039;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildServiceWorker() {
  const urls = ['', 'index.html', 'offline.html', 'manifest.webmanifest', 'assets/icons/icon-192.png', 'assets/icons/icon-512.png', 'assets/css/app.css', 'assets/css/pwa.css', 'assets/js/gas-run-shim.js', 'assets/js/app.js', 'assets/js/pwa-client.js'].map((file) => PAGES_BASE + file);
  return [
    'const CACHE_PREFIX = "study-finder-pwa-";',
    'const CACHE_NAME = CACHE_PREFIX + ' + JSON.stringify(BUILD_VERSION) + ';',
    'const BASE = ' + JSON.stringify(PAGES_BASE) + ';',
    'const APP_SHELL = ' + JSON.stringify(urls) + ';',
    'self.addEventListener("install", (event) => {',
    '  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));',
    '  self.skipWaiting();',
    '});',
    'self.addEventListener("activate", (event) => {',
    '  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map((key) => caches.delete(key)))));',
    '  self.clients.claim();',
    '});',
    'self.addEventListener("fetch", (event) => {',
    '  const request = event.request;',
    '  const url = new URL(request.url);',
    '  if (request.method !== "GET" || url.origin !== self.location.origin || !url.pathname.startsWith(BASE)) return;',
    '  event.respondWith(fetch(request).then((response) => {',
    '    if (response.ok) { const copy = response.clone(); event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))); }',
    '    return response;',
    '  }).catch(async () => {',
    '    const cache = await caches.open(CACHE_NAME);',
    '    const cached = await cache.match(request, { ignoreSearch: true });',
    '    if (cached) return cached;',
    '    if (request.mode === "navigate") return (await cache.match(BASE + "index.html")) || cache.match(BASE + "offline.html");',
    '    return Response.error();',
    '  }));',
    '});'
  ].join('\n');
}

main();

