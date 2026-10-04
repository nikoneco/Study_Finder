function doGet(e) {
  if (e && e.parameter && e.parameter.api) {
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
  const response = dispatchWebAppJsonpApi_(apiName, args);
  const body = callback + '(' + JSON.stringify(response) + ');';
  return ContentService
    .createTextOutput(body)
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function dispatchWebAppJsonpApi_(apiName, args) {
  const name = String(apiName || '').trim();
  switch (name) {
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
