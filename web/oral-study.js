(() => {
  'use strict';
  const root = document.getElementById('oralStudy');
  if (!root) return;
  const ids = ['CatalogCount', 'Group', 'Search', 'Section', 'FilterCount', 'Status', 'Loading', 'StatusText', 'Retry', 'Workspace', 'ParentTitle', 'ParentMeta', 'Items', 'ItemPosition', 'ItemLevels', 'Subheading', 'QuestionHeading', 'Prompts', 'Reveal', 'Answer', 'AnswerStatus', 'AnswerPoints', 'AnswerGaps', 'GapList', 'ScopeNotes', 'ScopeNoteList', 'Previous', 'Next', 'NavigationPosition'];
  const ui = Object.fromEntries(ids.map(id => [id, document.getElementById('oral' + id)]));
  const coverageLabels = { supported: '根拠確認済み', partial: '一部の根拠が不足', insufficient: '根拠不足・要確認' };
  const state = { sections: null, catalogLoading: false, catalogRequest: 0, bundleRequest: 0, selectedId: '', revision: '', cache: new Map(), positions: new Map(), retry: null };

  function element(tag, className, value) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value !== undefined) node.textContent = value == null ? '' : String(value);
    return node;
  }
  function strings(value) { return Array.isArray(value) ? value.filter(v => typeof v === 'string' && v.trim()) : []; }
  // Presentation only: keep the source array and its answer-binding indexes intact.
  function presentedPrompts(prompts, indexes = prompts.map((_prompt, index) => index)) {
    const result = [];
    indexes.forEach(index => {
      if (!Number.isInteger(index) || !prompts[index]) return;
      const prompt = prompts[index];
      const raw = typeof prompt.text === 'string' ? prompt.text.trim() : '';
      if (!raw || raw === '・') return;
      const text = raw.replace(/^・\s*/, '');
      const previous = result[result.length - 1];
      if (previous && previous.lastIndex === index - 1 && previous.level === prompt.level &&
          !raw.startsWith('・') && !/[。！？.!?]$/.test(previous.text)) {
        const separator = /[A-Za-z0-9]$/.test(previous.text) && /^[A-Za-z0-9]/.test(text) ? ' ' : '';
        previous.text += separator + text;
        previous.lastIndex = index;
      } else result.push({ text, level: prompt.level, lastIndex: index });
    });
    return result;
  }
  function sorted(values) { return values.slice().sort((a, b) => Number(a.order || 0) - Number(b.order || 0)); }
  function coverage(node, value) {
    const key = Object.prototype.hasOwnProperty.call(coverageLabels, value) ? value : 'insufficient';
    node.dataset.coverage = key;
    node.textContent = coverageLabels[key];
  }
  function setStatus(message, kind = 'info', retry = null) {
    ui.StatusText.textContent = message;
    ui.Status.dataset.kind = kind;
    ui.Loading.hidden = kind !== 'loading';
    ui.Retry.hidden = !retry;
    state.retry = retry;
    root.setAttribute('aria-busy', String(kind === 'loading'));
  }
  function callApi(method, args = []) {
    return new Promise((resolve, reject) => {
      let settled = false;
      const timer = window.setTimeout(() => done(new Error('読み込みに時間がかかっています。接続を確認して、もう一度読み込んでください。')), 125000);
      function done(error, response) {
        if (settled) return;
        settled = true;
        window.clearTimeout(timer);
        if (error) reject(error);
        else if (!response || response.ok !== true || !response.data) reject(new Error(response && response.error && response.error.message || '口頭試験データを取得できませんでした。'));
        else resolve(response.data);
      }
      try {
        const runner = window.google.script.run.withSuccessHandler(response => done(null, response)).withFailureHandler(error => done(new Error(error && error.message || '通信に失敗しました。接続を確認してください。')));
        runner[method](...args);
      } catch (_error) { done(new Error('口頭試験の接続を開始できませんでした。ページを再読み込みしてください。')); }
    });
  }
  function options(select, values, placeholder) {
    select.replaceChildren(element('option', '', placeholder));
    select.firstChild.value = '';
    values.forEach(value => {
      const option = element('option', '', value);
      option.value = value;
      select.appendChild(option);
    });
  }
  function filteredSections() {
    const query = ui.Search.value.trim().toLocaleLowerCase().normalize('NFKC');
    return (state.sections || []).filter(section => {
      if (ui.Group.value && section.group !== ui.Group.value) return false;
      const searchable = [section.title, section.group, ...strings(section.atas).map(ata => 'ATA' + ata)].join(' ').toLocaleLowerCase().normalize('NFKC');
      return !query || searchable.includes(query);
    });
  }
  function renderSelection() {
    const sections = filteredSections();
    const previousId = state.selectedId;
    ui.Section.replaceChildren();
    sections.forEach(section => {
      const option = element('option', '', section.title + ' · ' + section.itemCount + '小問');
      option.value = section.sectionId;
      ui.Section.appendChild(option);
    });
    ui.FilterCount.textContent = sections.length + ' / ' + (state.sections || []).length + '大問を表示';
    ui.Section.disabled = sections.length === 0;
    if (!sections.length) {
      const option = element('option', '', '該当する大問はありません');
      option.value = '';
      ui.Section.appendChild(option);
      state.selectedId = '';
      state.bundleRequest++;
      ui.Workspace.hidden = true;
      setStatus('条件に合う大問がありません。分野・検索語を変更してください。');
      return;
    }
    const selected = sections.some(section => section.sectionId === previousId) ? previousId : sections[0].sectionId;
    ui.Section.value = selected;
    if (selected !== previousId || ui.Workspace.hidden) loadSection(selected);
  }
  async function loadCatalog() {
    if (state.catalogLoading) return;
    state.catalogLoading = true;
    const request = ++state.catalogRequest;
    setStatus('大問一覧を読み込んでいます。', 'loading');
    try {
      const data = await callApi('apiGetOralStart');
      if (request !== state.catalogRequest) return;
      if (data.schemaVersion !== 1 || !Array.isArray(data.sections) || data.sections.some(section => !section.sectionId || typeof section.title !== 'string')) throw new Error('大問一覧の形式を確認できませんでした。');
      state.sections = sorted(data.sections);
      state.revision = data.revision || '';
      if (data.initialBundle) {
        const initialId = state.sections[0] && state.sections[0].sectionId;
        state.cache.set(initialId, validateBundle(data.initialBundle, initialId));
      }
      const total = state.sections.reduce((count, section) => count + Number(section.itemCount || 0), 0);
      ui.CatalogCount.textContent = state.sections.length + '大問 · ' + total + '小問';
      options(ui.Group, [...new Set(state.sections.map(section => section.group).filter(Boolean))], 'すべての分野');
      [ui.Group, ui.Search].forEach(node => { node.disabled = !state.sections.length; });
      if (!state.sections.length) {
        ui.Section.firstChild.textContent = '口頭試験データは未登録です';
        ui.FilterCount.textContent = '';
        setStatus('口頭試験データがまだ登録されていません。登録後に、もう一度読み込んでください。', 'info', loadCatalog);
      } else renderSelection();
    } catch (error) {
      if (request === state.catalogRequest) setStatus('大問一覧を読み込めませんでした。' + error.message, 'error', loadCatalog);
    } finally { if (request === state.catalogRequest) state.catalogLoading = false; }
  }
  async function loadSection(sectionId) {
    state.selectedId = sectionId;
    const request = ++state.bundleRequest;
    ui.Workspace.hidden = true;
    const selected = state.sections.find(section => section.sectionId === sectionId);
    setStatus('「' + (selected ? selected.title : '大問') + '」の小問を読み込んでいます。', 'loading');
    try {
      let data = state.cache.get(sectionId);
      if (!data) {
        data = await callApi('apiGetOralSectionBundle', [sectionId]);
        data = validateBundle(data, sectionId);
        state.cache.set(sectionId, data);
      }
      if (request !== state.bundleRequest || state.selectedId !== sectionId) return;
      if (!data.items.length) { setStatus('この大問には小問が登録されていません。別の大問を選択してください。'); return; }
      renderBundle(data);
      setStatus('この大問の' + data.items.length + '小問を学習できます。');
    } catch (error) {
      if (request === state.bundleRequest && state.selectedId === sectionId) setStatus('小問を読み込めませんでした。' + error.message, 'error', () => loadSection(sectionId));
    }
  }
  function validateBundle(data, sectionId) {
    if (data.schemaVersion !== 1 || !data.section || data.section.sectionId !== sectionId || !Array.isArray(data.items) || data.items.some(item => !item.itemId || typeof item.question !== 'string' || !Array.isArray(item.prompts) || !item.answer)) throw new Error('小問データの形式を確認できませんでした。');
    if (state.revision && data.revision && state.revision !== data.revision) throw new Error('学習データが更新されました。ページを再読み込みしてください。');
    return { ...data, items: sorted(data.items) };
  }
  function position() {
    if (!state.positions.has(state.selectedId)) state.positions.set(state.selectedId, { index: 0, revealed: false });
    return state.positions.get(state.selectedId);
  }
  function renderBundle(bundle) {
    ui.ParentTitle.textContent = bundle.section.title;
    const meta = [bundle.section.group, strings(bundle.section.atas).map(ata => 'ATA ' + ata).join(' / ')];
    if (bundle.section.assessmentPage) meta.push('評価シート PDF p.' + bundle.section.assessmentPage);
    ui.ParentMeta.textContent = meta.filter(Boolean).join(' · ');
    ui.Items.replaceChildren();
    bundle.items.forEach((item, index) => {
      const li = element('li');
      const button = element('button', 'oral-item-button');
      button.type = 'button';
      button.setAttribute('aria-label', '小問 ' + item.sourceItemNumber + '：' + item.question);
      button.appendChild(element('span', 'oral-item-number', item.sourceItemNumber));
      const description = element('span');
      description.appendChild(element('span', 'oral-item-label', item.question));
      const badge = element('span', 'oral-item-coverage');
      coverage(badge, item.answer.status);
      description.appendChild(badge);
      button.appendChild(description);
      button.addEventListener('click', () => selectItem(index, true));
      li.appendChild(button);
      ui.Items.appendChild(li);
    });
    position().index = Math.min(position().index, bundle.items.length - 1);
    renderItem();
    ui.Workspace.hidden = false;
  }
  function selectItem(index, focus) {
    const bundle = state.cache.get(state.selectedId);
    if (!bundle || index < 0 || index >= bundle.items.length) return;
    const current = position();
    if (current.index !== index) { current.index = index; current.revealed = false; }
    renderItem();
    if (focus) ui.QuestionHeading.focus();
  }
  function renderItem() {
    const bundle = state.cache.get(state.selectedId);
    const current = position();
    const item = bundle.items[current.index];
    [...ui.Items.children].forEach((li, index) => { li.firstChild.setAttribute('aria-current', String(index === current.index)); });
    ui.ItemPosition.textContent = '小問 ' + item.sourceItemNumber;
    ui.NavigationPosition.textContent = (current.index + 1) + ' / ' + bundle.items.length;
    ui.Previous.disabled = current.index === 0;
    ui.Next.disabled = current.index === bundle.items.length - 1;
    ui.ItemLevels.replaceChildren(...strings(item.levels).map(level => element('span', 'oral-tag', 'LEVEL ' + level)));
    ui.Subheading.hidden = !item.subheading;
    ui.Subheading.textContent = item.subheading || '';
    ui.QuestionHeading.textContent = item.question;
    ui.Prompts.replaceChildren();
    presentedPrompts(item.prompts).forEach(prompt => {
      const li = element('li');
      if (prompt.level) li.appendChild(element('span', 'oral-prompt-level', 'LEVEL ' + prompt.level));
      li.appendChild(element('span', '', prompt.text || ''));
      ui.Prompts.appendChild(li);
    });
    renderAnswer(item);
    renderReveal();
  }
  function renderSource(source) {
    const wrapper = element('div', 'oral-source');
    wrapper.appendChild(element('p', '', [source.type, source.title, source.reference].filter(Boolean).join(' · ')));
    const location = [];
    if (source.pdfPage) location.push('PDF p.' + source.pdfPage);
    if (source.pageCode) location.push('資料ページ ' + source.pageCode);
    if (source.locator) location.push(source.locator);
    if (source.revision) location.push('REV ' + source.revision);
    wrapper.appendChild(element('p', 'oral-source-meta', location.join(' · ')));
    return wrapper;
  }
  function renderAnswer(item) {
    const answer = item.answer;
    coverage(ui.AnswerStatus, answer.status);
    ui.AnswerPoints.replaceChildren();
    const points = Array.isArray(answer.points) ? answer.points : [];
    points.forEach((point, index) => {
      const section = element('section', 'oral-answer-point');
      const heading = element('div', 'oral-point-heading');
      heading.appendChild(element('h4', '', '要点 ' + (index + 1)));
      const badge = element('span', 'oral-coverage');
      coverage(badge, point.coverage);
      heading.appendChild(badge);
      section.appendChild(heading);
      const bindings = presentedPrompts(item.prompts, Array.isArray(point.promptIndexes) ? point.promptIndexes : [])
        .map(prompt => prompt.text);
      if (bindings.length) section.appendChild(element('p', 'oral-source-meta', '対応する評価項目：' + bindings.join(' ／ ')));
      const summary = element('ul', 'oral-point-summary');
      const summaries = strings(point.summary);
      summaries.forEach(text => summary.appendChild(element('li', '', text)));
      section.appendChild(summary);
      const sources = element('div', 'oral-sources');
      if (Array.isArray(point.sources) && point.sources.length) {
        sources.setAttribute('aria-label', 'この要点の根拠資料');
        sources.appendChild(element('h4', '', '根拠資料'));
        point.sources.forEach(source => sources.appendChild(renderSource(source)));
      } else sources.appendChild(element('p', 'exam-note', 'この要点を裏付ける資料は未確認です。'));
      section.appendChild(sources);
      if (point.gap) section.appendChild(element('p', 'oral-point-gap', '未確認：' + point.gap));
      else if (!summaries.length) section.appendChild(element('p', 'oral-point-gap', 'この要点の回答を確定できる根拠が不足しています。'));
      ui.AnswerPoints.appendChild(section);
    });
    if (!points.length) ui.AnswerPoints.appendChild(element('p', 'oral-point-gap', '回答の要点がまだ登録されていません。根拠資料の確認が必要です。'));
    const gaps = strings(answer.gaps);
    ui.GapList.replaceChildren(...gaps.map(gap => element('li', '', gap)));
    ui.AnswerGaps.hidden = !gaps.length;
    const scopeNotes = strings(answer.scopeNotes);
    ui.ScopeNoteList.replaceChildren(...scopeNotes.map(note => element('li', '', note)));
    ui.ScopeNotes.hidden = !scopeNotes.length;
  }
  function renderReveal() {
    const revealed = position().revealed;
    ui.Answer.hidden = !revealed;
    ui.Reveal.setAttribute('aria-expanded', String(revealed));
    ui.Reveal.textContent = revealed ? '回答の要点を隠す' : '回答の要点を見る';
  }
  ui.Reveal.addEventListener('click', () => { position().revealed = !position().revealed; renderReveal(); });
  ui.Previous.addEventListener('click', () => selectItem(position().index - 1, true));
  ui.Next.addEventListener('click', () => selectItem(position().index + 1, true));
  ui.Section.addEventListener('change', () => { if (ui.Section.value) loadSection(ui.Section.value); });
  ui.Group.addEventListener('change', renderSelection);
  ui.Search.addEventListener('input', renderSelection);
  ui.Retry.addEventListener('click', () => { if (state.retry) state.retry(); });
  function activate() { if (window.location.hash === '#oral' && !state.sections && !state.catalogLoading) loadCatalog(); }
  window.addEventListener('hashchange', activate);
  activate();
})();
