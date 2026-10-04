function doGet(e) {
  if (e && e.parameter && e.parameter.api) {
    if (e.parameter.transport === 'studyFrame') return handleStudyReadFrame_(e.parameter);
    return handleWebAppJsonpRequest_(e.parameter.api, e.parameter);
  }

  const template = HtmlService.createTemplateFromFile('index');
  template.bootstrapJson = JSON.stringify(getClientBootstrap_());
  return template
    .evaluate()
    .setTitle(CONFIG.APP_NAME)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getClientBootstrap_() {
  return safeRun_('getClientBootstrap_', function () {
    return {
      appName: CONFIG.APP_NAME,
      setup: getSetupStatus(),
      preparedAtas: typeof getPreparedAtaList_ === 'function' ? getPreparedAtaList_() : ['24']
    };
  });
}

function setupProject() {
  return safeRun_('setupProject', function () {
    assertPrivateMutationAllowed_();
    return setupProject_();
  });
}

function apiGetQuestions(filters) {
  return safeRun_('apiGetQuestions', function () {
    return getQuestions(filters || {});
  });
}

function apiGetQuestionsBundle(filters) {
  return safeRun_('apiGetQuestionsBundle', function () {
    return getQuestionsBundle(filters || {});
  });
}

function apiGetQuestionDetail(questionId) {
  return safeRun_('apiGetQuestionDetail', function () {
    return getQuestionDetail(questionId);
  });
}

function apiGetRandomQuestionDetail(filters) {
  return safeRun_('apiGetRandomQuestionDetail', function () {
    return getRandomQuestionDetail(filters || {});
  });
}

function apiBuildReviewPrompt(questionId) {
  return safeRun_('apiBuildReviewPrompt', function () {
    return buildReviewPrompt(questionId);
  });
}

function apiSaveAnswerNote(payload) {
  return safeRun_('apiSaveAnswerNote', function () {
    assertPrivateMutationAllowed_();
    return saveAnswerNote(payload || {});
  });
}

function apiGetOralSections() {
  return safeOralRead_('apiGetOralSections', getOralSections_);
}

function apiGetOralStart() {
  return safeOralRead_('apiGetOralStart', getOralStudyStart_);
}

function apiGetOralSectionBundle(sectionId) {
  return safeOralRead_('apiGetOralSectionBundle', function () {
    return getOralSectionBundle_(sectionId);
  });
}

function apiGetOralGroupBundle(group) {
  return safeOralRead_('apiGetOralGroupBundle', function () {
    return getOralGroupBundle_(group);
  });
}

function apiUpdateAnswerNote(noteId, payload) {
  return safeRun_('apiUpdateAnswerNote', function () {
    assertPrivateMutationAllowed_();
    return updateAnswerNote(noteId, payload || {});
  });
}

function apiSaveConfirmedAnswer(payload) {
  return safeRun_('apiSaveConfirmedAnswer', function () {
    assertPrivateMutationAllowed_();
    return saveConfirmedAnswer(payload || {});
  });
}

function apiImportCsv(payload) {
  return safeRun_('apiImportCsv', function () {
    assertPrivateMutationAllowed_();
    return importCsvText(payload || {});
  });
}

function apiImportPreparedAta24Data() {
  return importPreparedAta24Data();
}

function apiImportPreparedAta32Data() {
  return apiImportPreparedAtaData('32');
}

function apiImportPreparedAtaData(ata) {
  assertPrivateMutationAllowed_();
  return importPreparedAtaData(ata || '24');
}

function handleWebAppJsonpRequest_(apiName, params) {
  const callback = normalizeWebAppJsonpCallback_(params && params.callback);
  const args = decodeWebAppJsonpArgs_(params && params.argsB64);
  const response = timedStudyRead_(apiName, args);
  const body = callback + '(' + JSON.stringify(response) + ');';
  return ContentService
    .createTextOutput(body)
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function dispatchWebAppJsonpApi_(apiName, args) {
  const name = String(apiName || '').trim();
  switch (name) {
    case 'apiGetOralGroupBundle':
      return apiGetOralGroupBundle(args[0]);
    case 'apiGetOralStart':
      return apiGetOralStart();
    case 'apiGetOralSections':
      return apiGetOralSections();
    case 'apiGetOralSectionBundle':
      return apiGetOralSectionBundle(args[0]);
    case 'bootstrap':
      return getClientBootstrap_();
    case 'questionsBundle':
    case 'apiGetQuestionsBundle':
      return apiGetQuestionsBundle(args[0] || {});
    case 'questionDetail':
    case 'apiGetQuestionDetail':
      return apiGetQuestionDetail(args[0]);
    case 'randomQuestionDetail':
    case 'apiGetRandomQuestionDetail':
      return apiGetRandomQuestionDetail(args[0] || {});
    case 'reviewPrompt':
    case 'apiBuildReviewPrompt':
      return apiBuildReviewPrompt(args[0]);
    case 'questions':
    case 'apiGetQuestions':
      return apiGetQuestions(args[0] || {});
    default:
      return {
        ok: false,
        error: {
          message: 'Unknown API: ' + name
        }
      };
  }
}

function timedStudyRead_(apiName, args) {
  const started = Date.now();
  const response = dispatchWebAppJsonpApi_(apiName, args);
  response.timing = { serverMs: Date.now() - started };
  return response;
}

function handleStudyReadFrame_(params) {
  const allowed = ['apiGetOralStart', 'apiGetOralSections', 'apiGetOralSectionBundle', 'apiGetOralGroupBundle',
    'apiGetQuestionsBundle', 'apiGetQuestionDetail', 'apiGetRandomQuestionDetail'];
  const api = String(params.api || '');
  const nonce = String(params.nonce || '');
  if (allowed.indexOf(api) < 0 || !/^[0-9a-f]{32}$/.test(nonce)) {
    return HtmlService.createHtmlOutput('Invalid read request.');
  }
  const response = timedStudyRead_(api, decodeWebAppJsonpArgs_(params.argsB64));
  // Literal JSON only, fixed recipient, no controls, no bootstrap/admin APIs.
  const message = JSON.stringify({ kind: 'STUDY_READ_FRAME_V1', api: api, nonce: nonce, response: response })
    .replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
  return HtmlService.createHtmlOutput('<!doctype html><html><head><meta charset="utf-8"></head><body><script>' +
    'window.top.postMessage(' + message + ',"https://nikoneco.github.io");</script></body></html>')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function normalizeWebAppJsonpCallback_(callback) {
  const value = String(callback || '').trim();
  if (/^[A-Za-z_$][0-9A-Za-z_$]*(\.[A-Za-z_$][0-9A-Za-z_$]*)*$/.test(value)) {
    return value;
  }
  throw new Error('Invalid JSONP callback.');
}

function decodeWebAppJsonpArgs_(argsB64) {
  if (!argsB64) {
    return [];
  }
  const json = Utilities.newBlob(Utilities.base64DecodeWebSafe(String(argsB64))).getDataAsString('UTF-8');
  const parsed = JSON.parse(json);
  return Array.isArray(parsed) ? parsed : [];
}
