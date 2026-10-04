const app = document.getElementById('app');
  const bootstrap = JSON.parse(app.dataset.bootstrap || '{}');
  const appState = bootstrap.data || {};
  let selectedQuestionId = '';
  let currentQuestions = [];
  let currentDetailsByQuestionId = {};
  let currentTermDictionary = [];
  let currentDetail = null;
  let answerRevealed = false;
  let questionListExpanded = false;
  let loadedAtaKey = null;
  let questionLoadRequestId = 0;
  let questionLoadTimer = 0;
  let questionLoadStartedAt = 0;
  let questionLoadAttemptStartedAt = 0;
  let questionLoadProgress = 0;
  let questionLoadStageIndex = 0;
  let questionLoadRetryAttempt = 0;
  let questionLoadRetryMax = 0;
  let questionLoadRetryStartedAt = 0;
  let questionLoadRetryTimeoutSeconds = 50;
  let questionLoadEstimateSeconds = 30;
  const QUESTION_LOAD_ESTIMATE_STORAGE_KEY = 'studyFinderLoadEstimatesV1';
  const QUESTION_LOAD_STAGES = [
    { after: 0, progress: 8, label: '接続を準備しています' },
    { after: 3, progress: 18, label: '問題データを取得しています' },
    { after: 12, progress: 36, label: '回答と根拠を読み込んでいます' },
    { after: 28, progress: 58, label: '用語辞書を照合しています' },
    { after: 45, progress: 74, label: '応答を待っています' },
    { after: 65, progress: 84, label: '処理の完了を待っています' },
    { after: 95, progress: 91, label: '通常より時間がかかっています' }
  ];
  const answerFigures = {
    q_00_6ee482ed421c: ['ata00-design-range.webp', 'Study Guide F0-02: Design Range'],
    q_00_5ad3e375ef3a: ['ata00-ship-dimensions.webp', 'Study Guide F0-03: Ship Dimensions'],
    q_00_0715efcf121d: ['ata00-fuselage-reference.webp', 'Study Guide F0-04: Fuselage Reference Dimensions'],
    q_00_20017a35a61d: ['ata00-zone-diagram.webp', 'Study Guide F0-09: Major Zone Diagram'],
    q_00_69ddf246718d: ['ata00-zone-diagram.webp', 'Study Guide F0-09: Major Zone Diagram'],
    q_00_0bef0d5f1f3c: ['ata00-loadable-software.webp', 'Study Guide F0-29: Loadable Software'],
    q_21_838f4b3a3583: ['ata21-cooling-diagram.webp', '標準問題集: Air Conditioning Cooling Diagram'],
    q_22_a6947b8fa37c: ['ata22-dfcs-component-locations.webp', 'Study Guide F2-03 / F2-04: DFCS Component Locations'],
    q_23_d0f057bd346f: ['ata23-flight-interphone-overview.webp', 'Study Guide F1-01 / F1-02: Flight Interphone Overview and Locations'],
    q_24_a59763ae0357: ['ata24-external-power-locations.webp', 'Study Guide F1-03: External Power Component Locations'],
    q_24_2a9c6e51d7f4: ['ata24-distribution-numbered-diagram.webp', '標準問題集: Electrical Power Distribution Numbered Diagram'],
    q_25_0475237e72aa: ['ata25-passenger-service-unit.webp', 'Study Guide F2-06: Passenger Service Unit'],
    q_26_1eebe0c95f41: ['ata26-engine-fire-detection.webp', 'Study Guide F1-01 / F1-02: Engine Fire Detection'],
    q_27_b54238b5e76e: ['ata27-aileron-numbered-diagram.webp', '標準問題集: Aileron and Aileron Trim Control System Diagram'],
    q_28_cfadba52bb0a: ['ata28-engine-fuel-feed-locations.webp', 'Study Guide F4-03: Engine Fuel Feed Component Locations'],
    q_29_602152f5db00: ['ata29-hydraulic-diagram.webp', '標準問題集: Hydraulic Power Diagram'],
    q_30_2fca2a9172b4: ['ata30-wing-anti-ice-locations.webp', 'Study Guide F1-02: Wing Thermal Anti-Ice Component Locations'],
    q_31_0c043ecbb656: ['ata31-cds-overview-locations.webp', 'Study Guide F6-01 / F6-03: Common Display System'],
    q_32_20d5a32a39dc: ['ata32-brake-diagrams.webp', '標準問題集: Brake System Diagrams'],
    q_33_fd7f9c395616: ['ata33-emergency-lighting.webp', 'Study Guide F5-02: Emergency Lighting'],
    q_34_e579f9a28714: ['ata34-adirs-component-locations.webp', 'Study Guide F1-02: ADIRS Component Locations'],
    q_35_45b3ec852915: ['ata35-crew-oxygen-flow.webp', 'Study Guide F1-01: Crew Oxygen Flow'],
    q_36_72e5e0db8d19: ['ata36-pneumatic-functional.webp', 'Study Guide F0-03: Pneumatic Functional Description'],
    q_38_a0429924c283: ['ata38-potable-water-system.webp', 'Study Guide F0-02: Potable Water System'],
    q_38_d1cbf6e5aa80: ['ata38-potable-water-system.webp', 'Study Guide F0-02: Potable Water System'],
    q_47_4ae050c41339: ['ata47-ngs-diagram.webp', '標準問題集: Nitrogen Generation System Diagram'],
    q_49_c537d346b817: ['ata49-apu-bleed-diagram.webp', '標準問題集: APU Bleed Air System Diagram'],
    q_5X_811baf332356: ['ata5x-flight-deck-door-lock.webp', 'Study Guide 52-F5-04: Flight Deck Door Lock System'],
    q_7X_ca444a6084ab: ['ata7x-engine-nameplate-specs.webp', 'Study Guide 71-F0-02: Engine Name Plate and Specifications'],
    q_7X_29f8376db360: ['ata7x-engine-nameplate-specs.webp', 'Study Guide 71-F0-02: Engine Name Plate and Specifications']
  };

  function normalizeAtaKey(value) {
    const text = String(value === null || value === undefined ? '' : value).trim().toUpperCase();
    if (/^5X$/.test(text)) return '5X';
    if (/^7X$/.test(text)) return '7X';
    const digits = text.replace(/\D/g, '');
    return digits ? digits.padStart(2, '0') : '';
  }

  function renderAtaFilterOptions() {
    const select = document.getElementById('ataFilter');
    const currentValue = select.value;
    const existingAtas = Array.from(select.options || [])
      .map((option) => normalizeAtaKey(option.value))
      .filter(Boolean);
    const atas = Array.from(new Set(existingAtas.concat((appState.preparedAtas || [])
      .map((ata) => normalizeAtaKey(ata))
      .filter(Boolean))))
      .sort(compareAtaKeys);

    select.innerHTML = '';
    const allOption = document.createElement('option');
    allOption.value = '';
    allOption.textContent = 'ATA All';
    select.appendChild(allOption);

    atas.forEach((ata) => {
      const option = document.createElement('option');
      option.value = ata;
      option.textContent = 'ATA ' + ata;
      select.appendChild(option);
    });

    if (atas.includes(currentValue)) {
      select.value = currentValue;
    }
  }

  function compareAtaKeys(a, b) {
    const numberA = ataSortValue(a);
    const numberB = ataSortValue(b);
    if (numberA !== numberB) return numberA - numberB;
    return String(a).localeCompare(String(b));
  }

  function ataSortValue(value) {
    const key = normalizeAtaKey(value);
    if (key === '5X') return 59;
    if (key === '7X') return 79;
    return Number(String(key).replace(/\D/g, ''));
  }

  function unwrap(response) {
    if (!response || !response.ok) {
      const message = response && response.error ? response.error.message : 'Unknown error';
      throw new Error(message);
    }
    return response.data;
  }

  function getSelectedAtaKey() {
    return normalizeAtaKey(document.getElementById('ataFilter').value);
  }

  function getSelectedAtaLabel() {
    const ata = getSelectedAtaKey();
    return ata ? 'ATA ' + ata : 'ATA All';
  }

  function setQuestionLoadState(state, message, countText, options) {
    const panel = document.getElementById('questionLoadPanel');
    const status = document.getElementById('questionLoadStatus');
    const count = document.getElementById('questionLoadCount');
    const stage = document.getElementById('questionLoadStage');
    const eta = document.getElementById('questionLoadEta');
    const progress = document.getElementById('questionLoadProgress');
    const bar = document.getElementById('questionLoadBar');
    const loadButton = document.getElementById('loadQuestions');
    const randomButton = document.getElementById('randomQuestionButton');
    const toggleButton = document.getElementById('toggleQuestionListButton');
    const settings = options || {};
    const progressValue = Number.isFinite(settings.progress) ? Math.max(0, Math.min(100, settings.progress)) : 0;
    panel.className = 'load-panel is-' + state;
    panel.setAttribute('aria-busy', state === 'loading' ? 'true' : 'false');
    status.textContent = message;
    count.textContent = countText || '';
    stage.textContent = settings.stage || defaultQuestionLoadStage(state);
    eta.textContent = settings.eta || '';
    bar.style.width = progressValue + '%';
    progress.setAttribute('aria-valuenow', String(Math.round(progressValue)));
    loadButton.disabled = state === 'loading';
    randomButton.disabled = state === 'loading';
    toggleButton.disabled = state === 'loading';
  }

  function defaultQuestionLoadStage(state) {
    if (state === 'loaded') return '準備完了';
    if (state === 'failed') return '読み込みを完了できませんでした';
    if (state === 'pending') return '読み込み待ち';
    return '待機中';
  }

  function startQuestionLoadProgress(requestId) {
    stopQuestionLoadProgress();
    questionLoadStartedAt = Date.now();
    questionLoadAttemptStartedAt = questionLoadStartedAt;
    questionLoadProgress = 0;
    questionLoadStageIndex = 0;
    questionLoadRetryAttempt = 0;
    questionLoadRetryMax = 0;
    questionLoadRetryStartedAt = 0;
    questionLoadEstimateSeconds = loadStoredQuestionEstimate(getSelectedAtaKey());
    updateQuestionLoadProgress(requestId);
    questionLoadTimer = window.setInterval(() => updateQuestionLoadProgress(requestId), 1000);
  }

  function stopQuestionLoadProgress() {
    window.clearInterval(questionLoadTimer);
    questionLoadTimer = 0;
  }

  function updateQuestionLoadProgress(requestId) {
    if (requestId !== questionLoadRequestId) {
      stopQuestionLoadProgress();
      return;
    }
    const elapsedSeconds = Math.max(0, Math.floor((Date.now() - questionLoadAttemptStartedAt) / 1000));
    while (
      questionLoadStageIndex + 1 < QUESTION_LOAD_STAGES.length
      && elapsedSeconds >= QUESTION_LOAD_STAGES[questionLoadStageIndex + 1].after
    ) {
      questionLoadStageIndex += 1;
    }
    const activeStage = QUESTION_LOAD_STAGES[questionLoadStageIndex];
    const nextStage = QUESTION_LOAD_STAGES[questionLoadStageIndex + 1];
    const stageSpan = nextStage ? Math.max(1, nextStage.after - activeStage.after) : 30;
    const stageProgressSpan = nextStage ? nextStage.progress - activeStage.progress : 5;
    const stageElapsed = Math.max(0, elapsedSeconds - activeStage.after);
    const targetProgress = Math.min(96, activeStage.progress + stageProgressSpan * Math.min(1, stageElapsed / stageSpan));
    questionLoadProgress = Math.max(questionLoadProgress, targetProgress);
    const remainingSeconds = Math.max(0, questionLoadEstimateSeconds - elapsedSeconds);
    let etaText = remainingSeconds > 0
      ? '目安 あと' + formatRemainingTime(remainingSeconds)
      : '通常より時間がかかっています';
    let stageLabel = activeStage.label;
    if (questionLoadRetryAttempt > 1) {
      stageLabel = '再接続して問題データを取得しています';
      const retryElapsedSeconds = questionLoadRetryStartedAt
        ? Math.max(0, Math.floor((Date.now() - questionLoadRetryStartedAt) / 1000))
        : 0;
      const retryRemainingSeconds = Math.max(1, questionLoadRetryTimeoutSeconds - retryElapsedSeconds);
      etaText = questionLoadRetryAttempt + '/' + questionLoadRetryMax + '回目・目安 あと'
        + formatRemainingTime(retryRemainingSeconds);
    }
    setQuestionLoadState(
      'loading',
      getSelectedAtaLabel() + ' を読み込み中',
      Math.round(questionLoadProgress) + '%',
      { progress: questionLoadProgress, stage: stageLabel, eta: etaText }
    );
  }

  function formatRemainingTime(seconds) {
    if (seconds < 10) return '10秒以内';
    if (seconds < 60) return '約' + Math.ceil(seconds / 5) * 5 + '秒';
    const minutes = Math.ceil(seconds / 30) / 2;
    return '約' + minutes + '分';
  }

  function loadStoredQuestionEstimate(ata) {
    try {
      const estimates = JSON.parse(window.localStorage.getItem(QUESTION_LOAD_ESTIMATE_STORAGE_KEY) || '{}');
      const stored = Number(estimates[normalizeAtaKey(ata) || 'all']);
      if (Number.isFinite(stored)) return Math.max(10, Math.min(90, stored));
    } catch (error) {
      // Storage can be unavailable in private browsing. The default still works.
    }
    return 30;
  }

  function rememberQuestionLoadDuration(ata) {
    const elapsedSeconds = Math.max(1, Math.round((Date.now() - questionLoadStartedAt) / 1000));
    const learnedEstimate = Math.ceil(Math.max(10, Math.min(90, elapsedSeconds * 1.4)) / 5) * 5;
    try {
      const estimates = JSON.parse(window.localStorage.getItem(QUESTION_LOAD_ESTIMATE_STORAGE_KEY) || '{}');
      estimates[normalizeAtaKey(ata) || 'all'] = learnedEstimate;
      window.localStorage.setItem(QUESTION_LOAD_ESTIMATE_STORAGE_KEY, JSON.stringify(estimates));
    } catch (error) {
      // The estimate is optional and must never block studying.
    }
  }

  function handleGasApiProgress(event) {
    const detail = event && event.detail ? event.detail : {};
    const panel = document.getElementById('questionLoadPanel');
    if (
      detail.method !== 'apiGetQuestionsBundle'
      || !panel
      || !panel.classList.contains('is-loading')
    ) return;

    if (detail.phase === 'retry') {
      questionLoadRetryAttempt = Number(detail.nextAttempt || 0);
      questionLoadRetryMax = Number(detail.maxAttempts || 0);
      questionLoadRetryStartedAt = Date.now();
      questionLoadRetryTimeoutSeconds = Number(detail.attemptTimeoutSeconds || 50);
      questionLoadAttemptStartedAt = questionLoadRetryStartedAt;
      questionLoadProgress = 0;
      questionLoadStageIndex = 0;
      setQuestionLoadState(
        'loading',
        getSelectedAtaLabel() + ' を再接続中',
        '0%',
        {
          progress: 0,
          stage: '再接続を準備しています',
          eta: questionLoadRetryAttempt + '/' + questionLoadRetryMax + '回目へ切り替え中'
        }
      );
      return;
    } else if (detail.phase === 'attempt' && Number(detail.attempt || 0) > 1) {
      questionLoadRetryAttempt = Number(detail.attempt);
      questionLoadRetryMax = Number(detail.maxAttempts || 0);
      questionLoadRetryStartedAt = Date.now();
      questionLoadRetryTimeoutSeconds = Number(detail.attemptTimeoutSeconds || 50);
      questionLoadAttemptStartedAt = questionLoadRetryStartedAt;
      questionLoadProgress = 8;
      questionLoadStageIndex = 0;
    }
    updateQuestionLoadProgress(questionLoadRequestId);
  }

  function resetStudySurface(message) {
    currentDetail = null;
    answerRevealed = false;
    const questionDetail = document.getElementById('questionDetail');
    questionDetail.className = 'empty-state';
    questionDetail.textContent = message || '問題を選択するか、ランダム出題を押してね。';
    document.getElementById('answer').innerHTML = '';
    document.getElementById('candidateList').textContent = '候補ページはここに表示します。';
    setAnswerVisibility(false);
  }

  function setAnswerVisibility(revealed) {
    const hasQuestion = Boolean(currentDetail && currentDetail.question);
    const revealButton = document.getElementById('revealAnswerButton');
    const hint = document.getElementById('revealHint');
    const placeholder = document.getElementById('answerRevealPlaceholder');
    const answer = document.getElementById('answer');
    const candidates = document.getElementById('candidateDetails');

    revealButton.disabled = !hasQuestion;
    placeholder.classList.toggle('is-hidden', Boolean(revealed && hasQuestion));
    answer.classList.toggle('is-hidden', !revealed);
    candidates.classList.toggle('is-hidden', !revealed);

    if (!hasQuestion) {
      revealButton.textContent = '回答を見る';
      hint.textContent = '問題を選ぶと回答確認できます。';
      placeholder.textContent = '問題を解いたら「回答を見る」で確認します。';
      return;
    }

    if (revealed) {
      revealButton.textContent = '回答を隠す';
      hint.textContent = '答え合わせ中。次の問題ではまた隠れます。';
      placeholder.textContent = '';
    } else {
      revealButton.textContent = '回答を見る';
      hint.textContent = '回答はまだ隠れています。頭の中で答えてから確認してね。';
      placeholder.textContent = '準備できたら「回答を見る」で回答と根拠候補を確認します。';
    }
  }

  function markQuestionsPending() {
    questionLoadRequestId += 1;
    stopQuestionLoadProgress();
    const label = getSelectedAtaLabel();
    if (loadedAtaKey === getSelectedAtaKey()) {
      setQuestionLoadState('loaded', label + ' 読み込み済み', currentQuestions.length + '問', { progress: 100 });
      return;
    }
    currentDetailsByQuestionId = {};
    currentTermDictionary = [];
    resetStudySurface(label + ' の問題はまだ読み込んでいません。');
    const countText = currentQuestions.length ? '表示中: ' + currentQuestions.length + '問' : '未読み込み';
    setQuestionLoadState('pending', label + ' を選択中。読み込みを押すと問題一覧を更新します。', countText, { progress: 0 });
  }

  function loadQuestions() {
    const ata = document.getElementById('ataFilter').value;
    const requestId = ++questionLoadRequestId;
    const label = getSelectedAtaLabel();
    startQuestionLoadProgress(requestId);
    resetStudySurface(label + ' の問題を読み込み中...');
    document.getElementById('questionList').textContent = '問題を読み込み中...';
    google.script.run
      .withSuccessHandler((response) => {
        if (requestId !== questionLoadRequestId) return;
        stopQuestionLoadProgress();
        let data;
        try {
          data = unwrap(response);
        } catch (error) {
          finishQuestionLoadFailure(label, error);
          return;
        }
        const questions = Array.isArray(data) ? data : (data.questions || []);
        currentDetailsByQuestionId = Array.isArray(data) ? {} : (data.detailsById || {});
        currentTermDictionary = Array.isArray(data) ? [] : (data.termDictionary || []);
        rememberQuestionLoadDuration(ata);
        renderQuestions(questions);
        loadedAtaKey = normalizeAtaKey(ata);
        setQuestionLoadState('loaded', label + ' 読み込み完了', questions.length + '問', {
          progress: 100,
          stage: '問題・回答・用語辞書の準備ができました',
          eta: formatElapsedLoadTime()
        });
        if (questions.length) {
          const questionDetail = document.getElementById('questionDetail');
          questionDetail.className = 'empty-state';
          questionDetail.textContent = '準備できました。「次のランダム問題」で始めます。';
        }
      })
      .withFailureHandler((error) => {
        if (requestId !== questionLoadRequestId) return;
        stopQuestionLoadProgress();
        finishQuestionLoadFailure(label, error);
      })
      .apiGetQuestionsBundle({ ata });
  }

  function finishQuestionLoadFailure(label, error) {
    document.getElementById('questionList').textContent = '読み込みに失敗しました。';
    setQuestionLoadState('failed', label + ' の読み込みに失敗しました。', '要確認', {
      progress: questionLoadProgress,
      stage: formatQuestionLoadFailure(error),
      eta: '読み込みボタンから再試行できます'
    });
  }

  function formatQuestionLoadFailure(error) {
    const message = String(error && error.message ? error.message : error || '');
    if (/timeout/i.test(message)) {
      return '応答に時間がかかりました。少し待ってから、もう一度試してください';
    }
    return '通信状態を確認して、もう一度試してください';
  }

  function formatElapsedLoadTime() {
    if (!questionLoadStartedAt) return '';
    const elapsedSeconds = Math.max(1, Math.round((Date.now() - questionLoadStartedAt) / 1000));
    return elapsedSeconds < 60 ? elapsedSeconds + '秒' : (Math.round(elapsedSeconds / 6) / 10) + '分';
  }

  function renderQuestions(questions) {
    currentQuestions = questions;
    const root = document.getElementById('questionList');
    root.innerHTML = '';
    if (!questions.length) {
      root.textContent = '問題がまだありません。';
      syncQuestionListVisibility();
      setQuestionLoadState('loaded', getSelectedAtaLabel() + ' 読み込み完了', '0問', { progress: 100 });
      return;
    }
    questions.forEach((question) => {
      const button = document.createElement('button');
      button.className = 'question-button';
      button.innerHTML = '<strong>' + escapeHtml(question.question_text) + '</strong>';
      button.addEventListener('click', () => loadDetail(question.question_id));
      root.appendChild(button);
    });
    syncQuestionListVisibility();
  }

  function toggleQuestionList() {
    questionListExpanded = !questionListExpanded;
    syncQuestionListVisibility();
  }

  function syncQuestionListVisibility() {
    const root = document.getElementById('questionList');
    const button = document.getElementById('toggleQuestionListButton');
    root.classList.toggle('is-collapsed', !questionListExpanded);
    button.setAttribute('aria-expanded', questionListExpanded ? 'true' : 'false');
    button.textContent = questionListExpanded ? '問題一覧を隠す' : '問題一覧';
  }

  function loadDetail(questionId, forceRefresh) {
    selectedQuestionId = questionId;
    if (!forceRefresh && currentDetailsByQuestionId[questionId]) {
      renderDetail(currentDetailsByQuestionId[questionId]);
      return;
    }
    resetStudySurface('問題詳細を読み込み中...');
    google.script.run
      .withSuccessHandler((response) => {
        const detail = unwrap(response);
        if (detail && detail.question && detail.question.question_id) {
          currentDetailsByQuestionId[detail.question.question_id] = detail;
        }
        if (detail && Array.isArray(detail.termDictionary)) {
          currentTermDictionary = detail.termDictionary;
        }
        renderDetail(detail);
      })
      .withFailureHandler((error) => {
        document.getElementById('questionDetail').textContent = '問題詳細の読み込みに失敗しました。';
        showError(error);
      })
      .apiGetQuestionDetail(questionId);
  }

  function renderDetail(detail) {
    currentDetail = detail;
    if (detail && Array.isArray(detail.termDictionary)) {
      currentTermDictionary = detail.termDictionary;
    }
    answerRevealed = false;
    const question = detail.question;
    const questionDetail = document.getElementById('questionDetail');
    questionDetail.className = 'question-content';
    questionDetail.innerHTML = [
      '<div class="question-meta">',
      '<span>ATA ' + escapeHtml(question.ata) + '</span>',
      '<span>' + escapeHtml(question.section_name || '') + '</span>',
      '</div>',
      '<h3>' + escapeHtml(question.question_text) + '</h3>'
    ].join('');
    document.getElementById('answer').innerHTML = '';
    document.getElementById('candidateList').textContent = '回答表示後に候補ページを確認できます。';
    setAnswerVisibility(false);
  }

  function toggleAnswerReveal() {
    if (!currentDetail) {
      showError(new Error('先に問題を選んでね。'));
      return;
    }
    answerRevealed = !answerRevealed;
    if (answerRevealed) {
      renderAnswer(currentDetail.answer || (currentDetail.answerNotes || [])[0] || null);
      renderCandidates(currentDetail.candidates || {});
    }
    setAnswerVisibility(answerRevealed);
  }

  function renderAnswer(answer) {
    const root = document.getElementById('answer');
    root.innerHTML = '';
    if (!answer) {
      const empty = document.createElement('p');
      empty.className = 'muted';
      empty.textContent = '回答はまだ登録されていません。';
      root.appendChild(empty);
      return;
    }
    const item = document.createElement('article');
    item.className = 'answer-card';
    const answerText = document.createElement('pre');
    renderLinkedAnswerText(answerText, answer.answer_text || '');
    item.appendChild(answerText);
    if (answer.evidence_page_codes) {
      const meta = document.createElement('div');
      meta.className = 'answer-meta';
      meta.textContent = '根拠ページ: ' + answer.evidence_page_codes;
      item.appendChild(meta);
    }
    root.appendChild(item);
    renderAnswerFigure(root);
  }

  function renderLinkedAnswerText(root, answerText) {
    const text = String(answerText || '');
    const currentAta = currentDetail && currentDetail.question
      ? currentDetail.question.ata
      : '';
    const definitions = resolveTermDefinitions(currentTermDictionary, currentAta);
    const terms = Object.keys(definitions).sort((a, b) => b.length - a.length);
    root.textContent = '';
    if (!terms.length) {
      root.textContent = text;
      return;
    }

    const pattern = new RegExp(
      '(^|[^A-Z0-9])(' + terms.map(escapeRegExp).join('|') + ')(?=$|[^A-Z0-9])',
      'g'
    );
    let cursor = 0;
    let match;
    while ((match = pattern.exec(text)) !== null) {
      if (match.index > cursor) {
        root.appendChild(document.createTextNode(text.slice(cursor, match.index)));
      }
      if (match[1]) {
        root.appendChild(document.createTextNode(match[1]));
      }
      const matchedTerm = match[2];
      const matchedDefinition = definitions[matchedTerm];
      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'term-trigger';
      trigger.textContent = matchedTerm;
      trigger.setAttribute('aria-label', matchedTerm + ' の用語説明を開く');
      trigger.addEventListener('click', () => openTermDialog(matchedDefinition));
      root.appendChild(trigger);
      cursor = match.index + match[0].length;
    }
    if (cursor < text.length) {
      root.appendChild(document.createTextNode(text.slice(cursor)));
    }
  }

  function resolveTermDefinitions(dictionary, currentAta) {
    const grouped = {};
    (dictionary || []).forEach((entry) => {
      const variants = [entry.term]
        .concat(String(entry.aliases || '').split(/[,;\n]/))
        .map((value) => String(value || '').trim())
        .filter(isAcronymToken);
      Array.from(new Set(variants)).forEach((variant) => {
        if (!grouped[variant]) grouped[variant] = [];
        grouped[variant].push(entry);
      });
    });

    return Object.keys(grouped).reduce((resolved, term) => {
      const definition = chooseTermDefinition(grouped[term], currentAta);
      if (definition) resolved[term] = definition;
      return resolved;
    }, {});
  }

  function chooseTermDefinition(entries, currentAta) {
    const ata = normalizeAtaKey(currentAta);
    const exact = entries.filter((entry) => normalizeAtaKey(entry.ata) === ata && ata);
    if (exact.length) return oneMeaningOrNull(exact);
    const global = entries.filter((entry) => !normalizeAtaKey(entry.ata));
    if (global.length) return oneMeaningOrNull(global);
    return oneMeaningOrNull(entries);
  }

  function oneMeaningOrNull(entries) {
    if (!entries.length) return null;
    const meanings = new Set(entries.map((entry) => [
      entry.full_name,
      entry.location,
      entry.function
    ].map((value) => String(value || '').trim()).join('|')));
    return meanings.size === 1 ? entries[0] : null;
  }

  function isAcronymToken(value) {
    return /^[A-Z][A-Z0-9/-]{1,}$/.test(String(value || ''));
  }

  function escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function openTermDialog(entry) {
    if (!entry) return;
    const dialog = document.getElementById('termDialog');
    document.getElementById('termDialogTerm').textContent = entry.term || '';
    document.getElementById('termDialogFullName').textContent = entry.full_name || '';
    document.getElementById('termDialogLocation').textContent = entry.location || '';
    document.getElementById('termDialogFunction').textContent = entry.function || '';
    const ataRow = document.getElementById('termDialogAtaRow');
    ataRow.hidden = !entry.ata;
    document.getElementById('termDialogAta').textContent = entry.ata ? 'ATA ' + entry.ata : '';
    const evidenceRow = document.getElementById('termDialogEvidenceRow');
    evidenceRow.hidden = !entry.evidence_page_codes;
    document.getElementById('termDialogEvidence').textContent = entry.evidence_page_codes || '';
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  }

  function closeTermDialog() {
    const dialog = document.getElementById('termDialog');
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
  }

  function renderAnswerFigure(root) {
    const questionId = currentDetail && currentDetail.question
      ? currentDetail.question.question_id
      : '';
    const figureData = answerFigures[questionId];
    if (!figureData) return;
    const isGasHost = /(?:script\.google\.com|googleusercontent\.com)$/i.test(window.location.hostname);
    const assetBase = isGasHost
      ? 'https://nikoneco.github.io/hobby-hub/737-study-finder/assets/answer-figures/'
      : './assets/answer-figures/';
    const figure = document.createElement('figure');
    figure.className = 'answer-figure';
    figure.innerHTML = [
      '<img loading="lazy" decoding="async" src="' + escapeHtml(assetBase + figureData[0]) + '" alt="' + escapeHtml(figureData[1]) + '">',
      '<figcaption>' + escapeHtml(figureData[1]) + '</figcaption>'
    ].join('');
    root.appendChild(figure);
  }

  function renderCandidates(groups) {
    const labels = {
      best: '本命候補',
      related_figure: '関連図',
      general_reference: 'General参照',
      neighbor: '近接ページ',
      manual: '手動候補',
      reviewed_reference: '確認済み根拠'
    };
    const root = document.getElementById('candidateList');
    root.innerHTML = '';
    const keys = Object.keys(groups || {});
    if (!keys.length) {
      root.textContent = '候補ページはまだありません。';
      return;
    }
    keys.forEach((key) => {
      const heading = document.createElement('h3');
      heading.textContent = labels[key] || key;
      root.appendChild(heading);
      groups[key].forEach((candidate) => {
        const item = document.createElement('div');
        item.className = 'candidate';
        const driveUrl = String(candidate.drive_url || '').trim();
        const linkHtml = driveUrl
          ? '<a class="candidate-link" href="' + escapeHtml(driveUrl) + '" target="_blank" rel="noopener">PDFを開く</a>'
          : '<span class="candidate-link is-muted">ページコード確認用</span>';
        item.innerHTML = [
          '<div class="candidate-head">',
          '<div class="candidate-code">' + escapeHtml(candidate.page_code) + '</div>',
          linkHtml,
          '</div>',
          '<strong>' + escapeHtml(candidate.title || '') + '</strong>',
          '<p class="muted">' + escapeHtml(candidate.excerpt || '') + '</p>'
        ].join('');
        root.appendChild(item);
      });
    });
  }

  function showError(error) {
    alert(error.message || String(error));
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function loadRandomQuestion() {
    const selectedAta = getSelectedAtaKey();
    if (currentQuestions.length && loadedAtaKey === selectedAta) {
      const question = currentQuestions[Math.floor(Math.random() * currentQuestions.length)];
      loadDetail(question.question_id);
      return;
    }
    selectedQuestionId = '';
    resetStudySurface('ランダム問題を読み込み中...');
    google.script.run
      .withSuccessHandler((response) => {
        const detail = unwrap(response);
        if (detail && detail.question && detail.question.question_id) {
          currentDetailsByQuestionId[detail.question.question_id] = detail;
        }
        if (detail && Array.isArray(detail.termDictionary)) {
          currentTermDictionary = detail.termDictionary;
        }
        renderDetail(detail);
      })
      .withFailureHandler((error) => {
        document.getElementById('questionDetail').textContent = 'ランダム問題の読み込みに失敗しました。';
        showError(error);
      })
      .apiGetRandomQuestionDetail({ ata: selectedAta });
  }

  document.getElementById('ataFilter').addEventListener('change', markQuestionsPending);
  window.addEventListener('gas-api-progress', handleGasApiProgress);
  document.getElementById('loadQuestions').addEventListener('click', loadQuestions);
  document.getElementById('randomQuestionButton').addEventListener('click', loadRandomQuestion);
  document.getElementById('toggleQuestionListButton').addEventListener('click', toggleQuestionList);
  document.getElementById('revealAnswerButton').addEventListener('click', toggleAnswerReveal);
  document.getElementById('termDialogClose').addEventListener('click', closeTermDialog);
  document.getElementById('termDialog').addEventListener('click', (event) => {
    if (event.target === event.currentTarget) closeTermDialog();
  });
  renderAtaFilterOptions();
  syncQuestionListVisibility();
  setAnswerVisibility(false);
  markQuestionsPending();