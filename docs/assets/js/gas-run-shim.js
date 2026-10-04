(() => {
  const GAS_ENDPOINT = "https://script.google.com/macros/s/AKfycbzPwkINDY--2PUYQg5xGoPDtkCLYvGoItobfEJocINxBFviRzcCrxb7Iu5lylirQ7tLOg/exec";
  const STATIC_RESPONSES = {};
  const JSONP_RETRY_DELAYS = [0,1500];
  const JSONP_ATTEMPT_TIMEOUT_MS = 50000;
  let requestSeq = 0;

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

  function encodeArgs(args) {
    const json = JSON.stringify(args || []);
    const bytes = new TextEncoder().encode(json);
    let binary = '';
    bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
  }

  function callJsonp(method, args, successHandler, failureHandler) {
    if (Object.prototype.hasOwnProperty.call(STATIC_RESPONSES, method)) {
      window.setTimeout(() => {
        if (successHandler) successHandler(STATIC_RESPONSES[method]);
      }, 0);
      return;
    }

    const callbackName = '__gasJsonp_' + Date.now() + '_' + (++requestSeq);
    const startedAt = Date.now();
    let activeScript = null;
    let attemptTimeout = 0;
    let retryTimer = 0;
    let attempt = 0;
    let settled = false;
    let frameTimer = 0;
    let cancelFrame = null;
    let frameStarted = false;
    let frameFailed = false;
    let jsonpFailed = false;

    function finishResponse(response, transport) {
      if (settled) return;
      settled = true;
      // A removed script can still execute late. Keep a harmless callback.
      cleanup(true);
      notifyProgress(method, 'success', { attempt, transport });
      console.debug('Study API timing', JSON.stringify({ method, transport,
        totalMs: Date.now() - startedAt, serverMs: response && response.timing && response.timing.serverMs }));
      if (successHandler) successHandler(response);
    }
    function finishFailure() {
      if (settled) return;
      settled = true;
      cleanup(true);
      if (failureHandler) failureHandler(new Error('GAS API timeout: ' + method));
    }
    function fallback() {
      if (settled || frameStarted) return;
      frameStarted = true;
      window.clearTimeout(frameTimer);
      cancelFrame = startReadFrame(method, args, response => finishResponse(response, 'html-frame'), () => {
        frameFailed = true;
        if (jsonpFailed) finishFailure();
      });
    }

    function clearAttempt() {
      window.clearTimeout(attemptTimeout);
      attemptTimeout = 0;
      if (activeScript && activeScript.parentNode) activeScript.parentNode.removeChild(activeScript);
      activeScript = null;
    }

    function cleanup(keepLateCallback) {
      clearAttempt();
      window.clearTimeout(retryTimer);
      window.clearTimeout(frameTimer);
      if (cancelFrame) cancelFrame();
      if (keepLateCallback) {
        window[callbackName] = () => {};
        window.setTimeout(() => { delete window[callbackName]; }, 5 * 60 * 1000);
      } else {
        delete window[callbackName];
      }
    }

    window[callbackName] = (response) => {
      finishResponse(response, 'jsonp');
    };

    function failAttempt(errorType) {
      if (settled) return;
      clearAttempt();
      if (attempt < JSONP_RETRY_DELAYS.length) {
        notifyProgress(method, 'retry', { attempt, nextAttempt: attempt + 1, errorType });
        retryTimer = window.setTimeout(loadAttempt, JSONP_RETRY_DELAYS[attempt]);
        return;
      }
      jsonpFailed = true;
      fallback();
      if (frameFailed) finishFailure();
    }

    function loadAttempt() {
      if (settled) return;
      const attemptNumber = ++attempt;
      notifyProgress(method, 'attempt', { attempt: attemptNumber });
      const script = document.createElement('script');
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
      }, JSONP_ATTEMPT_TIMEOUT_MS);
    }

    loadAttempt();
    frameTimer = window.setTimeout(fallback, 3000);
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
  // A bounded read-only alternate route for delayed ContentService redirects.
  const FRAME_READ_METHODS = ['apiGetOralStart', 'apiGetOralSections', 'apiGetOralSectionBundle',
    'apiGetQuestionsBundle', 'apiGetQuestionDetail', 'apiGetRandomQuestionDetail'];
  function startReadFrame(method, args, success, failure) {
    let frame = null;
    let timer = 0;
    let finished = false;
    let nonce = '';
    function cleanup() {
      window.clearTimeout(timer);
      window.removeEventListener('message', receive);
      if (frame && frame.parentNode) frame.parentNode.removeChild(frame);
      frame = null;
    }
    function finish(error, response) {
      if (finished) return;
      finished = true;
      cleanup();
      if (error) failure(error); else success(response);
    }
    function belongsToFrame(source) {
      if (!frame || !frame.contentWindow || !source) return false;
      try {
        for (let depth = 0; depth <= 4; depth++) {
          if (source === frame.contentWindow) return true;
          const parent = source.parent;
          if (!parent || parent === source) return false;
          source = parent;
        }
      } catch (_error) { return false; }
      return false;
    }
    function receive(event) {
      if (finished || !/^https:\/\/(?:[a-z0-9-]+-)?script\.googleusercontent\.com$/.test(event.origin) || !belongsToFrame(event.source)) return;
      const message = event.data;
      if (!message || message.kind !== 'STUDY_READ_FRAME_V1' || message.nonce !== nonce || message.api !== method) return;
      const response = message.response;
      if (!response || typeof response.ok !== 'boolean' ||
          (response.ok && !Object.prototype.hasOwnProperty.call(response, 'data')) ||
          (!response.ok && !response.error)) return;
      finish(null, response);
    }
    try {
      if (!window.crypto || !window.crypto.getRandomValues || !FRAME_READ_METHODS.includes(method)) throw new Error('Read frame unavailable');
      const bytes = new Uint8Array(16);
      window.crypto.getRandomValues(bytes);
      nonce = Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
      const url = new URL(GAS_ENDPOINT);
      url.searchParams.set('transport', 'studyFrame');
      url.searchParams.set('api', method);
      url.searchParams.set('nonce', nonce);
      url.searchParams.set('argsB64', encodeArgs(args));
      frame = document.createElement('iframe');
      frame.hidden = true;
      frame.tabIndex = -1;
      frame.setAttribute('aria-hidden', 'true');
      frame.style.display = 'none';
      frame.onerror = () => finish(new Error('Read frame failed'));
      window.addEventListener('message', receive);
      timer = window.setTimeout(() => finish(new Error('Read frame timeout')), 35000);
      frame.src = url.toString();
      (document.body || document.head).appendChild(frame);
    } catch (error) { finish(error); }
    return () => { if (!finished) { finished = true; cleanup(); } };
  }

})();