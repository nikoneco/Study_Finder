window.STUDY_CONFIG = {"oralFigures":{"schemaVersion":1,"figures":[{"questionId":"oral_rev3_p44_s01_r01","promptIndexes":[0],"file":"oral-ata22-autoflight-functions.webp","alt":"AutoflightのGuidance、Stability Augmentation、Thrust Managementと各機能の対応図。","caption":"Autoflightの3つの役割と、F/D・A/P・Trim・A/Tの対応。DFCSの6 Sub Systemとは別の機能分類。"},{"questionId":"oral_rev3_p44_s01_r01","promptIndexes":[1],"file":"oral-ata22-speed-autopilot-trim.webp","alt":"FCC A/BからSpeed TrimまたはAutopilot TrimがStabilizer Actuatorを制御する入出力図。","caption":"A/P OFFではSpeed Trim、A/P ONではA/P Stabilizer Trim。Limit Switch・Cutout Switch・Stabilizer位置のFeedbackも確認する。"},{"questionId":"oral_rev3_p44_s01_r01","promptIndexes":[1],"file":"oral-ata22-trim-command-flow.webp","alt":"FCCのTrim Up/DownとClutch信号がMain Electric Trim、Column Switch、Cutout Switch、Limit Switchを通る回路図。","caption":"緑はBrake Release/Clutch、桃色はTrim Up、水色はTrim Downの経路。Main Electric TrimによるCrew Inputを優先する。","note":"Column CutoutはColumn操作と逆方向のStabilizer Trimを遮断する。ElevatorとStabilizerの動きが常に逆という意味ではない。"},{"questionId":"oral_rev3_p44_s01_r02","promptIndexes":[1],"file":"oral-ata22-mcp.webp","alt":"MCPのCourse、A/T、IAS/Mach、Roll、Pitch、CMD/CWS、F/Dの配置を色分けした図。","caption":"MCPの操作部の配置。橙はA/T、青はRoll、赤はPitch、緑はA/P Engage、紫はF/D。SPD INTV・ALT INTVの位置も確認する。"},{"questionId":"oral_rev3_p44_s01_r03","promptIndexes":[0],"file":"oral-ata22-mcp.webp","alt":"MCPのMode SelectorとSelected Parameter表示、CMD/CWSとF/D Switchの配置図。","caption":"Mode選択と設定値の位置を確認する。ALT INTVはFlight Phaseに応じて作動し、1回の操作で解除できるAltitude Constraintは1つ。"},{"questionId":"oral_rev3_p44_s01_r03","promptIndexes":[1],"file":"oral-ata22-ap-synchronization.webp","alt":"MCPとFCC、Actuator LVDT、Control Surface Position Sensor、Main/Detent Pistonを結ぶAutopilot Actuator図。","caption":"A/P Engage前にActuator側と実際のControl Surface位置を同期させ、Engage時の急な舵面の動きを防ぐ。Main PistonのLVDTとControl Surface Position Sensorは別のFeedback。"},{"questionId":"oral_rev3_p44_s01_r04","promptIndexes":[2,3],"file":"oral-ata22-trim-warning.webp","alt":"Speed Trim FailとStabilizer Out of Trimの入力、比較、Delayと警告灯の回路図。","caption":"SPEED TRIM FAILとSTAB OUT OF TRIMの検出経路。片側Trim機能の故障はRecall、両側故障は通常点灯。","note":"この図のSTAB OUT OF TRIM検出条件とASAのA/P赤色警告条件は別。高度・Dual Pitch等の条件は回答本文で確認する。"},{"questionId":"oral_rev3_p44_s01_r04","promptIndexes":[2,3],"file":"oral-ata22-mach-trim-feedback.webp","alt":"Mach Trim Actuator、Neutral Shift、Elevator位置のFeedbackとFCC/IFSAUを結ぶ図。","caption":"Mach Trim Actuator位置、Neutral Shift位置、Elevator位置の3つのFeedbackを区別する。A/P ONではInput Torque Tubeが拘束され、Neutral ShiftとElevator位置のFeedbackを使ってA/Pが応答する。","note":"Mach Trimを担当するFCCは初期A、Landingごとに交代し、故障時は他系へ移る。EngageしているA/P側だけで選択が決まるという追記は採用していない。"},{"questionId":"oral_rev3_p47_s01_r02","promptIndexes":[0],"file":"ata34-adirs-component-locations.webp","alt":"ADIRSのISDU、MSU、表示器およびP61 IRS Master Caution Unitの配置図。","caption":"ISDU/MSUはP5 Aft Overhead、IRS Master Caution UnitはP61にある。操縦室の表示器と操作部の配置を確認する。","note":"この図は操縦室/P61の配置。ADIRUとADMのRack位置は回答本文を参照する。"},{"questionId":"oral_rev3_p47_s01_r02","promptIndexes":[1],"file":"oral-ata34-adirs-adr-ir-signal-flow.webp","alt":"Pitot、Static、TAT、AOA、ADM、ISDU、MSU、FMCとADIRUのADR/IR入出力を結ぶ図。","caption":"Pitot/StaticからADMを通るADR入力と、Gyro/Accelerometerを使うIRの流れ。FMC/ISDUの初期位置入力、MSUのMode選択も示す。"},{"questionId":"oral_rev3_p47_s01_r04","promptIndexes":[2],"file":"oral-ata34-wxr-control-panel.webp","alt":"WXR Control Panelの左右のMode、Tilt、Gain、TFR、GCと共通AUTO/TESTの配置図。","caption":"左右のMode/Tilt/Gain/TFRと共通AUTO/TEST。AUTOはTiltとGround Clutterを自動制御し、GainはCalibrated位置を推奨する。"},{"questionId":"oral_rev3_p47_s01_r04","promptIndexes":[3],"file":"oral-ata34-pws-warning-caution-areas.webp","alt":"離陸と進入のPWS Warning/Caution領域と0.5、1.5、3 NMの距離を比較する図。","caption":"左はTakeoff、右はApproach。前方のWarningと周辺のCaution領域を比較する。自動作動条件は本文のFlight Phase別条件に従う。"},{"questionId":"oral_rev3_p47_s01_r05","promptIndexes":[0],"file":"oral-ata34-egpws-terrain-clearance-floor.webp","alt":"滑走路周囲のTCF Envelopeと滑走路中心からの距離に応じたFloorを示す立体図と断面図。","caption":"TCFはRadio Altitudeと位置/Runway Databaseを用い、滑走路周囲に距離に応じたFloorを作る。Floorを下回る侵入を警告する。"},{"questionId":"oral_rev3_p47_s01_r05","promptIndexes":[0],"file":"oral-ata34-egpws-runway-field-clearance-floor.webp","alt":"滑走路標高を基準とするRFCF Alert Area、300 ft Ceiling、1.5/5 NM、KRF、滑走路端を示す断面図。","caption":"RFCFはGeometric Altitudeから滑走路標高を引いたField ClearanceでTCFを補う。滑走路端から5 NM、滑走路上方最大300 ftのFloorを示す。"},{"questionId":"oral_rev3_p44_s01_r06","promptIndexes":[0],"file":"oral-ata22-yaw-damper-interfaces.webp","alt":"SMYD 1とSMYD 2のCross-Channel比較、ADIRU/AOA/FMC入力、Main Rudder PCUのSolenoid/EHSV/LVDTを結ぶPrimary Yaw Damper図。","caption":"Primary Yaw Damperの入出力とSMYD間のCross Talk。SMYD 1がMain Rudder PCUを制御し、両SMYDの計算を比較する。","note":"この図はPrimaryの経路。Standby Yaw DamperはSMYD 2とStandby Rudder PCUを使う別経路で、Engage条件も異なる。"},{"questionId":"oral_rev3_p44_s01_r05","promptIndexes":[2],"file":"oral-ata22-autothrottle-connections.webp","alt":"FCC AのAutothrottleとFMC、DEU、EEC、A/T Servo Motor、Thrust Resolver Pack、MCPを結ぶ接続図。","caption":"A/Tの接続図。N1 ModeのFMC Target N1、EECのTarget TRA、FCC AからASMへの指令とFeedbackを本文と合わせて追う。","note":"N1 ModeではTarget TRAに向けてLeverを動かし、実際のN1による補正も行う。N1 Feedbackを使わないという意味ではない。"},{"questionId":"oral_rev3_p44_s01_r05","promptIndexes":[1],"file":"oral-ata22-autothrottle-mode-selection.webp","alt":"ARM、N1、Speed、THR HLD、RETARD、Go-AroundのA/T Mode選択条件を並べたブロック図。","caption":"A/TのMode選択。THR HLDはServo Powerを切り、RETARDはIdleへLeverを戻す。Go-Aroundの1回目と2回目のTO/GAも区別する。","note":"図のFlare RETARDは24 ftと示すが、SG本文を優先し回答では27 ftとする。THR HLDの開始判定とFMA表示も区別し、詳細条件は回答本文を参照する。"},{"questionId":"oral_rev3_p45_s01_r01","promptIndexes":[2],"file":"oral-ata23-acp-controls.webp","alt":"ACPのTransmit選択、Receive音量、PTT、Filter、NORMAL/ALT Switchを示す図。","caption":"ACPの操作部とNORMAL/ALT。ALTではCAPT・OBSはVHF 1、F/OはVHF 2を使う。","note":"ALTはREU内のAudio処理をBypassする経路。使用できる通信系統と制限は回答本文で確認する。"},{"questionId":"oral_rev3_p45_s01_r02","promptIndexes":[1],"file":"oral-ata23-service-interphone-flow.webp","alt":"Service Interphone JackからAAUへのMic LineとP5 SVC INT Switchを示す接続図。","caption":"P5 SVC INT Switchは、外部Service JackからAAU MixerへのMic Lineを制御する。","note":"OFFで遮断するのはこのMic入力。外部Jackで聞くAudio経路とは分けて考える。"},{"questionId":"oral_rev3_p45_s01_r03","promptIndexes":[2],"file":"oral-ata23-pa-gain-muting.webp","alt":"Engine RunningとCabin DecompressionによるPA Gain、およびAttendant Station Mutingの接続図。","caption":"PAのGainとMuting。本文ではEngine Runningで＋6 dB、Cabin Decompressionでさらに＋3 dBとなる。","note":"図の追記は＋3 dB／＋6 dBを本文と逆に示すため、数値は回答本文を優先する。N2≧50％もEngine Running判定の一条件。Muting経路は色付きの線で確認する。"},{"questionId":"oral_rev3_p45_s01_r04","promptIndexes":[2],"file":"oral-ata23-hf-coupler-modes.webp","alt":"HF Antenna CouplerのHome、Receive Standby、Tune、Receive Operate、Transmitと周波数変更時の遷移図。","caption":"HF Couplerの状態遷移。PTTでTuneを開始し、整合完了後にReceive Operate／Transmitへ進む。","note":"図の15秒はHome／TuneのFault判定限界。通常のTune所要時間や記憶周波数の扱いは装置型式別に回答本文で区別する。"},{"questionId":"oral_rev3_p45_s01_r05","promptIndexes":[2],"file":"oral-ata23-acars-power-interface.webp","alt":"ACARS CMUの電源、P6-1のCMU-1/AC CCB、およびVHF 3・SATCOM接続を示す図。","caption":"ACARSの電源と接続。授業追記のYellow CCBは、整備中に意図しないOOOI Reportを送信させないための弊社運用として確認する。"},{"questionId":"oral_rev3_p45_s01_r06","promptIndexes":[0],"file":"oral-ata23-cvr-signal-flow.webp","alt":"OBS、F/O、CAPT、Area Micの4 ChannelがCVRのA/D変換とCrash Survivable Memoryへ入る信号経路図。","caption":"CVRの4 Channelと記録経路。REUからの3 ChannelとArea Micの1 Channelをデジタル化して記憶する。"},{"questionId":"oral_rev3_p45_s01_r07","promptIndexes":[0],"file":"oral-ata23-elt-controls.webp","alt":"ELT Control PanelのON、ARMED、RESET SwitchとELT Annunciator Lightを示す図。","caption":"ELT Control Panel。ONによる手動作動、ARMEDでの衝撃検知、RESETによる復帰を区別する。","note":"評価シートのJA303J以降という適用条件で読む。試験・整備の実施手順は適用手順書に従う。"}]}};
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
  const figureConfig = window.STUDY_CONFIG && window.STUDY_CONFIG.oralFigures;
  const figures = figureConfig && figureConfig.schemaVersion === 1 && Array.isArray(figureConfig.figures) ? figureConfig.figures.filter(validFigure) : [];

  function element(tag, className, value) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value !== undefined) node.textContent = value == null ? '' : String(value);
    return node;
  }
  function strings(value) { return Array.isArray(value) ? value.filter(v => typeof v === 'string' && v.trim()) : []; }
  function validFigure(figure) {
    return !!figure && typeof figure.questionId === 'string' && /^oral_rev3_p\d{2}_s\d{2}_r\d{2}$/.test(figure.questionId) &&
      typeof figure.file === 'string' && /^[a-z0-9][a-z0-9_-]*\.webp$/.test(figure.file) &&
      Array.isArray(figure.promptIndexes) && figure.promptIndexes.length > 0 &&
      figure.promptIndexes.every(index => Number.isInteger(index) && index >= 0) && new Set(figure.promptIndexes).size === figure.promptIndexes.length &&
      ['alt', 'caption'].every(key => typeof figure[key] === 'string' && figure[key].trim() && figure[key].length <= 1200) &&
      (figure.note === undefined || typeof figure.note === 'string' && figure.note.trim() && figure.note.length <= 1200);
  }
  function figuresForItem(item, prompt) {
    return figures.filter(figure => {
      const visibleIndexes = presentedPrompts(item.prompts, figure.promptIndexes).flatMap(owner => owner.indexes);
      return figure.questionId === item.itemId && visibleIndexes.length > 0 && visibleIndexes.every(index => prompt.indexes.includes(index)) &&
      prompt.points.some(entry => {
        if (!['supported', 'partial'].includes(entry.point.coverage) || strings(entry.point.summary).length === 0 ||
            !Array.isArray(entry.point.sources) || !entry.point.sources.some(source => source && typeof source.type === 'string' && source.type.trim())) return false;
        const indexes = Array.isArray(entry.point.promptIndexes) ? entry.point.promptIndexes : [];
        // Exact reviewed bindings only. A broader or unresolved point must not
        // lend its figure to a different item or to an unmatched answer.
        return indexes.length === figure.promptIndexes.length && figure.promptIndexes.every(index => indexes.includes(index));
      });
    });
  }
  function renderFigure(figure) {
    const wrapper = element('figure', 'oral-answer-figure');
    const link = element('a', 'oral-figure-link');
    const url = './assets/answer-figures/' + encodeURIComponent(figure.file);
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', figure.caption + '：図を拡大（新しいタブ）');
    const image = element('img');
    image.src = url;
    image.alt = figure.alt;
    image.loading = 'lazy';
    image.decoding = 'async';
    link.appendChild(image);
    link.appendChild(element('span', 'oral-figure-expand', '図を拡大'));
    wrapper.appendChild(link);
    const caption = element('figcaption', 'oral-figure-caption', figure.caption);
    if (figure.note) caption.appendChild(element('span', 'oral-figure-note', figure.note));
    wrapper.appendChild(caption);
    return wrapper;
  }
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
      // REV-3 p.11 has a bullet before the verb-only continuation of
      // "Wing ... CK要領を". Keep the original indexes, but show one sentence.
      const verbContinuation = previous && /を$/.test(previous.text) && text === '述べられる。';
      if (previous && previous.lastIndex === index - 1 && previous.level === prompt.level &&
          (!raw.startsWith('・') || verbContinuation) && !/[。！？.!?]$/.test(previous.text)) {
        const separator = /[A-Za-z0-9]$/.test(previous.text) && /^[A-Za-z0-9]/.test(text) ? ' ' : '';
        previous.text += separator + text;
        previous.lastIndex = index;
        previous.indexes.push(index);
      } else result.push({ text, level: prompt.level, lastIndex: index, indexes: [index] });
    });
    return result;
  }
  function presentedAnswerItems(prompts, points) {
    const items = presentedPrompts(prompts).map((prompt, index) => ({ ...prompt, number: index + 1, points: [] }));
    const unassigned = [];
    points.forEach((point, pointIndex) => {
      const bindings = Array.isArray(point.promptIndexes) ? point.promptIndexes : [];
      // Item-specific content is authored in Sheets. A multi-item point does not
      // establish which of its clauses answers each item, so retain it separately.
      const owners = items.filter(item => item.indexes.some(index => bindings.includes(index)));
      const entry = { point, pointIndex, itemNumbers: owners.length === 1 ? [owners[0].number] : [] };
      if (owners.length === 1) owners[0].points.push(entry);
      else unassigned.push(entry);
    });
    return { items, unassigned };
  }
  function sorted(values) { return values.slice().sort((a, b) => Number(a.order || 0) - Number(b.order || 0)); }
  function provisionalPoint(point) {
    return !!point && point.coverage !== 'insufficient' && strings(point.summary).length > 0 &&
      Array.isArray(point.sources) && point.sources.some(source => source && source.type === 'PAST');
  }
  function provisionalAnswer(answer) {
    return Array.isArray(answer.points) && answer.points.some(provisionalPoint);
  }
  function coverage(node, value, provisional = false) {
    const key = Object.prototype.hasOwnProperty.call(coverageLabels, value) ? value : 'insufficient';
    node.dataset.coverage = key;
    node.dataset.provisional = String(provisional);
    node.textContent = provisional ? '裏付け中' : coverageLabels[key];
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
      coverage(badge, item.answer.status, provisionalAnswer(item.answer));
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
    presentedPrompts(item.prompts).forEach((prompt, index) => {
      const li = element('li');
      li.dataset.itemNumber = String(index + 1);
      li.appendChild(element('span', 'oral-prompt-number', '項目 ' + (index + 1)));
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
    if (source.type === 'PAST') {
      // DOCX references are logical text locations, not invented PDF pages.
      if (source.pageCode) location.push(source.pageCode);
      else if (source.pdfPage) location.push('資料区画 ' + source.pdfPage);
    } else {
      if (source.pdfPage) location.push('PDF p.' + source.pdfPage);
      if (source.pageCode) location.push('資料ページ ' + source.pageCode);
    }
    if (source.locator) location.push(source.locator);
    if (source.revision) location.push('REV ' + source.revision);
    wrapper.appendChild(element('p', 'oral-source-meta', location.join(' · ')));
    return wrapper;
  }
  function renderPoint(entry) {
    const point = entry.point;
    const section = element('div', 'oral-answer-point');
    const heading = element('div', 'oral-point-heading');
    heading.appendChild(element('h5', '', '回答の要点'));
    const badge = element('span', 'oral-coverage');
    coverage(badge, point.coverage, provisionalPoint(point));
    heading.appendChild(badge);
    section.appendChild(heading);
    const summary = element('ul', 'oral-point-summary');
    const summaries = strings(point.summary);
    summaries.forEach(text => summary.appendChild(element('li', '', text)));
    section.appendChild(summary);
    const sources = element('div', 'oral-sources');
    if (Array.isArray(point.sources) && point.sources.length) {
      sources.setAttribute('aria-label', 'この要点の根拠資料');
      sources.appendChild(element('h5', '', '根拠資料'));
      point.sources.forEach(source => sources.appendChild(renderSource(source)));
    } else sources.appendChild(element('p', 'exam-note', 'この要点を裏付ける資料は未確認です。'));
    section.appendChild(sources);
    if (point.gap) section.appendChild(element('p', 'oral-point-gap', '未確認：' + point.gap));
    else if (!summaries.length) section.appendChild(element('p', 'oral-point-gap', 'この要点の回答を確定できる根拠が不足しています。'));
    return section;
  }
  function renderAnswer(item) {
    const answer = item.answer;
    coverage(ui.AnswerStatus, answer.status, provisionalAnswer(answer));
    ui.AnswerPoints.replaceChildren();
    const points = Array.isArray(answer.points) ? answer.points : [];
    const presentation = presentedAnswerItems(item.prompts, points);
    presentation.items.forEach(prompt => {
      const section = element('section', 'oral-answer-item');
      section.dataset.itemNumber = String(prompt.number);
      section.appendChild(element('h4', 'oral-answer-item-heading', '項目 ' + prompt.number));
      section.appendChild(element('p', 'oral-answer-item-text', prompt.text));
      prompt.points.forEach(entry => section.appendChild(renderPoint(entry)));
      figuresForItem(item, prompt).forEach(figure => section.appendChild(renderFigure(figure)));
      if (!prompt.points.length) section.appendChild(element('p', 'oral-point-gap', 'この項目に対応する回答は未確認です。根拠資料の確認が必要です。'));
      ui.AnswerPoints.appendChild(section);
    });
    if (presentation.unassigned.length) {
      const section = element('section', 'oral-answer-item');
      section.appendChild(element('h4', 'oral-answer-item-heading', '項目との対応が未確認の回答'));
      presentation.unassigned.forEach(entry => section.appendChild(renderPoint(entry)));
      ui.AnswerPoints.appendChild(section);
    }
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
