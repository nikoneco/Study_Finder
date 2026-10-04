(() => {
  const panels = { home: document.getElementById('examHome'), written: document.getElementById('examWritten'), oral: document.getElementById('examOral') };
  const headings = { home: document.getElementById('examHomeHeading'), written: document.getElementById('examWrittenHeading'), oral: document.getElementById('examOralHeading') };
  const title = document.querySelector('.topbar h1');
  const navigation = document.getElementById('examNavigation');
  const modeLabel = document.getElementById('examModeLabel');
  const labels = { home: '737-800勉強', written: '筆記試験', oral: '口頭試験' };
  function renderMode(focusHeading) {
    const requested = window.location.hash.slice(1);
    const mode = Object.prototype.hasOwnProperty.call(panels, requested) ? requested : 'home';
    Object.entries(panels).forEach(([name, panel]) => { panel.hidden = name !== mode; });
    title.textContent = mode === 'written' ? '737 Study Finder' : '737-800勉強';
    modeLabel.textContent = labels[mode];
    navigation.hidden = mode === 'home';
    document.title = mode === 'home' ? labels.home : labels[mode] + ' | 737-800勉強';
    document.documentElement.dataset.examMode = mode;
    if (focusHeading) {
      headings[mode].focus({ preventScroll: true });
      window.scrollTo(0, 0);
    }
  }
  window.addEventListener('hashchange', () => renderMode(true));
  renderMode(false);
})();
