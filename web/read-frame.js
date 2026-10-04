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
