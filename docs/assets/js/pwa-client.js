(() => {
  document.documentElement.classList.add('is-pages-pwa', 'pwa-study');
  const promptPanel = document.querySelector('.prompt-panel');
  const studyShell = document.querySelector('.study-shell');
  if (promptPanel && studyShell) {
    const promptShell = document.createElement('section');
    promptShell.className = 'pwa-prompt-shell';
    promptShell.appendChild(promptPanel);
    studyShell.appendChild(promptShell);
  }
  document.querySelectorAll('#setupButton, .admin-tools, .answer-editor, .import-panel').forEach((element) => { element.hidden = true; });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    });
  }

  window.addEventListener('offline', () => document.body.classList.add('is-offline'));
  window.addEventListener('online', () => document.body.classList.remove('is-offline'));
})();