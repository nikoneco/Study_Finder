const CONFIG = {
  APP_NAME: '737 Study Finder',
  SPREADSHEETS: {
    STUDY737_DB_TITLE: 'Study737_DB'
  },
  PROPERTIES: {
    STUDY737_DB_ID: 'STUDY737_DB_ID',
    STUDY737_FOLDER_ID: 'STUDY737_FOLDER_ID'
  },
  STATUS: {
    UNLINKED: 'unlinked',
    CANDIDATE_READY: 'candidate_ready',
    ANSWER_NOTE_READY: 'answer_note_ready',
    CONFIRMED: 'confirmed',
    HOLD: 'hold',
    NEEDS_REVIEW: 'needs_review'
  }
};

function getConfig() {
  return JSON.parse(JSON.stringify(CONFIG));
}

function getScriptProperty_(key) {
  return PropertiesService.getScriptProperties().getProperty(key);
}

function getRequiredScriptProperty_(key) {
  const value = getScriptProperty_(key);
  if (!value) {
    throw new Error('Script Property is not configured: ' + key);
  }
  return value;
}

function setScriptProperty_(key, value) {
  PropertiesService.getScriptProperties().setProperty(key, value);
}

function assertPrivateMutationAllowed_() {
  const enabled = String(getScriptProperty_('ALLOW_PRIVATE_MUTATIONS') || '').toLowerCase();
  if (enabled !== 'true') {
    throw new Error('Private mutation APIs are disabled for the public web app.');
  }
}
