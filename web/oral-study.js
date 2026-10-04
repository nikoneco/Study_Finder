(() => {
  'use strict';
  const root = document.getElementById('oralStudy');
  if (!root) return;
  const ids = ['CatalogCount', 'Group', 'Search', 'Section', 'FilterCount', 'Status', 'Loading', 'StatusText', 'Retry', 'Workspace', 'ParentTitle', 'ParentMeta', 'Items', 'ItemPosition', 'ItemLevels', 'Subheading', 'QuestionHeading', 'Prompts', 'Reveal', 'Answer', 'AnswerStatus', 'AnswerPoints', 'AnswerGaps', 'GapList', 'ScopeNotes', 'ScopeNoteList', 'Previous', 'Next', 'NavigationPosition'];
  const ui = Object.fromEntries(ids.map(id => [id, document.getElementById('oral' + id)]));
  const coverageLabels = { supported: '根拠確認済み', partial: '一部の根拠が不足', insufficient: '根拠不足・要確認' };
  // Field labels are part of the REV-3 navigation, not copied learning content.
  // Keeping this tiny list local permits genuinely request-free startup.
  const groups = ['点検要領Ⅰ', '点検要領Ⅱ', '交換・調整', 'Servicing', 'Open / Close・Override・Deactivate', 'SYSTEM：機体', 'SYSTEM：通信・航法・計器', 'SYSTEM：装備', 'SYSTEM：発動機'];
  const state = { sections: [], groupRequest: 0, selectedId: '', revision: '', cache: new Map(), groups: new Map(), pending: new Map(), groupPositions: new Map(), positions: new Map(), retry: null };

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
      ui.Workspace.hidden = true;
      setStatus('条件に合う大問がありません。分野・検索語を変更してください。');
      return;
    }
    const selected = sections.some(section => section.sectionId === previousId) ? previousId : sections[0].sectionId;
    ui.Section.value = selected;
    if (selected !== previousId || ui.Workspace.hidden) loadSection(selected);
  }
  function groupPending(group) {
    if (!state.pending.has(group)) {
      const promise = callApi('apiGetOralGroupBundle', [group]);
      state.pending.set(group, promise);
      const cleanup = () => { if (state.pending.get(group) === promise) state.pending.delete(group); };
      promise.then(cleanup, cleanup);
    }
    return state.pending.get(group);
  }
  function validateGroup(data, group) {
    if (data.schemaVersion !== 1 || data.group !== group || !Array.isArray(data.sections) || !Array.isArray(data.bundles) ||
        data.sections.length !== data.bundles.length || data.sections.some(section => !section.sectionId || typeof section.title !== 'string' || section.group !== group) ||
        new Set(data.sections.map(section => section.sectionId)).size !== data.sections.length) throw new Error('分野データの形式を確認できませんでした。');
    if (state.revision && data.revision !== state.revision) throw new Error('学習データが更新されました。ページを再読み込みしてください。');
    const sections = sorted(data.sections);
    const bundles = data.bundles.map(bundle => validateBundle(bundle || {}, bundle && bundle.section && bundle.section.sectionId));
    if (new Set(bundles.map(bundle => bundle.section.sectionId)).size !== bundles.length || sections.some(section => {
      const bundle = bundles.find(value => value.section.sectionId === section.sectionId);
      return !bundle || bundle.section.group !== group || bundle.revision !== data.revision || bundle.items.length !== section.itemCount;
    })) throw new Error('大問と小問の対応を確認できませんでした。');
    const itemIds = bundles.flatMap(bundle => bundle.items.map(item => item.itemId));
    if (new Set(itemIds).size !== itemIds.length) throw new Error('小問の重複を確認しました。再読み込みしてください。');
    return { ...data, sections, bundles };
  }
  async function loadGroup() {
    const group = ui.Group.value;
    const request = ++state.groupRequest;
    state.sections = [];
    state.selectedId = '';
    ui.Workspace.hidden = true;
    ui.Search.value = '';
    ui.Search.disabled = true;
    ui.Section.disabled = true;
    ui.FilterCount.textContent = '';
    ui.Section.replaceChildren(element('option', '', group ? 'この分野を読み込んでいます' : '先に学習分野を選んでください'));
    if (!group) {
      ui.CatalogCount.textContent = '分野を選ぶと、その分野をまとめて読み込みます。';
      setStatus('学習分野を選んでください。選択するまで問題は読み込みません。');
      return;
    }
    ui.CatalogCount.textContent = group + ' · 読み込み中';
    setStatus('「' + group + '」のすべての大問・小問・回答をまとめて読み込んでいます。', 'loading');
    try {
      if (!groups.includes(group)) throw new Error('学習分野を選び直してください。');
      let data = state.groups.get(group);
      if (!data) {
        data = await groupPending(group);
        if (request !== state.groupRequest || ui.Group.value !== group) return;
        data = validateGroup(data, group);
        // Validate the complete group first; a partial response must not poison caches.
        data.bundles.forEach(bundle => state.cache.set(bundle.section.sectionId, bundle));
        state.groups.set(group, data);
      }
      if (request !== state.groupRequest || ui.Group.value !== group) return;
      state.sections = data.sections;
      state.selectedId = state.groupPositions.get(group) || '';
      state.revision = data.revision || '';
      const total = state.sections.reduce((count, section) => count + Number(section.itemCount || 0), 0);
      ui.CatalogCount.textContent = group + ' · ' + state.sections.length + '大問 · ' + total + '小問 · 読み込み済み';
      ui.Search.disabled = !state.sections.length;
      if (!state.sections.length) {
        ui.Section.firstChild.textContent = '口頭試験データは未登録です';
        state.groups.delete(group);
        setStatus('この分野の口頭試験データがまだ登録されていません。', 'info', loadGroup);
      } else renderSelection();
    } catch (error) {
      if (request === state.groupRequest && ui.Group.value === group) {
        ui.CatalogCount.textContent = group + ' · 読み込み未完了';
        setStatus('分野を読み込めませんでした。' + error.message, 'error', loadGroup);
      }
    }
  }
  function loadSection(sectionId) {
    state.selectedId = sectionId;
    state.groupPositions.set(ui.Group.value, sectionId);
    ui.Workspace.hidden = true;
    try {
      const data = state.cache.get(sectionId);
      if (!data || !state.sections.some(section => section.sectionId === sectionId)) throw new Error('この分野をもう一度読み込んでください。');
      if (!data.items.length) { setStatus('この大問には小問が登録されていません。別の大問を選択してください。'); return; }
      renderBundle(data);
      setStatus('この大問の' + data.items.length + '小問を学習できます。この分野の大問は読み込み済みです。');
    } catch (error) {
      setStatus('小問を表示できませんでした。' + error.message, 'error', loadGroup);
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
  ui.Group.addEventListener('change', loadGroup);
  ui.Search.addEventListener('input', renderSelection);
  ui.Retry.addEventListener('click', () => { if (state.retry) state.retry(); });
  options(ui.Group, groups, '分野選択');
  ui.Group.disabled = false;
  ui.Workspace.hidden = true;
})();
