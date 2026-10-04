function safeRun_(label, fn) {
  try {
    return {
      ok: true,
      data: fn()
    };
  } catch (error) {
    logError_(label, error);
    return {
      ok: false,
      error: {
        label: label,
        message: error && error.message ? error.message : String(error),
        stack: error && error.stack ? error.stack : ''
      }
    };
  }
}

function logError_(label, error) {
  console.error(label + ': ' + (error && error.stack ? error.stack : error));
}
