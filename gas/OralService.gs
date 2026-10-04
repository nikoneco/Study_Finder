// Sheets is canonical. No source PDFs, extracted text or prepared answers live here.
const ORAL_SHEET_NAMES = ['oral_sections', 'oral_questions', 'oral_answers', 'oral_sources'];
const ORAL_ANSWER_STATUSES = ['supported', 'partial', 'insufficient'];

function safeOralRead_(label, fn) {
  try {
    return { ok: true, data: fn() };
  } catch (error) {
    logError_(label, error);
    // Do not expose stack traces, private filenames or row contents to anonymous clients.
    return { ok: false, error: { message: '口頭データを取得できませんでした。時間をおいて再読み込みしてください。' } };
  }
}

function readOralTables_() {
  const spreadsheet = openStudySpreadsheet_();
  const tables = {};
  ORAL_SHEET_NAMES.forEach(function (name) {
    const sheet = spreadsheet.getSheetByName(name);
    tables[name] = sheet ? readObjects_(sheet) : [];
  });
  return tables;
}

function oralArray_(text, field) {
  if (!text) return [];
  const parsed = JSON.parse(String(text));
  if (!Array.isArray(parsed)) throw new Error('Invalid oral array: ' + field);
  return parsed;
}

function oralStrings_(array) {
  return (Array.isArray(array) ? array : []).filter(function (value) {
    return typeof value === 'string' && value.trim();
  }).map(function (value) { return value.trim(); });
}

function oralAtaList_(value) {
  return String(value || '').match(/\d{2}|5X|7X/gi) || [];
}

function oralRevision_(tables) {
  const dates = ORAL_SHEET_NAMES.reduce(function (result, name) {
    return result.concat(tables[name].map(function (row) { return String(row.updated_at || ''); }));
  }, []);
  return dates.sort().pop() || '';
}

function oralSectionForClient_(row, detailed) {
  const section = { sectionId: String(row.section_id), group: String(row.group || ''),
    title: String(row.title || ''), atas: oralAtaList_(row.ata), order: Number(row.display_order) || 0 };
  if (detailed) {
    section.assessmentPage = Number(row.assessment_page) || 0;
    section.originalRefs = String(row.original_refs || '');
  }
  return section;
}

function getOralSections_() {
  return oralSectionsFromTables_(readOralTables_());
}

// One fresh Sheet snapshot supplies the catalog and its first parent. No stale
// persistent cache: a page reload still sees direct Sheet corrections.
function getOralStudyStart_() {
  const tables = readOralTables_();
  const catalog = oralSectionsFromTables_(tables);
  catalog.initialBundle = catalog.sections.length
    ? oralSectionBundleFromTables_(catalog.sections[0].sectionId, tables) : null;
  return catalog;
}

function oralSectionsFromTables_(tables) {
  const answerById = Object.create(null);
  const sourcesById = Object.create(null);
  tables.oral_sources.forEach(function (row) { sourcesById[String(row.source_id)] = row; });
  tables.oral_answers.forEach(function (row) { answerById[String(row.assessment_id)] = row; });
  const sections = tables.oral_sections.slice().sort(function (a, b) {
    return Number(a.display_order) - Number(b.display_order);
  }).map(function (row) {
    const section = oralSectionForClient_(row, false);
    const questions = tables.oral_questions.filter(function (question) {
      return String(question.section_id) === section.sectionId;
    });
    section.itemCount = questions.length;
    section.supportedCount = 0;
    section.partialCount = 0;
    section.insufficientCount = 0;
    questions.forEach(function (question) {
      const status = oralAnswerForClient_(answerById[String(question.assessment_id)], sourcesById,
        oralArray_(question.prompts_json, 'prompts_json').length).status;
      section[status + 'Count'] += 1;
    });
    return section;
  });
  const groups = [];
  sections.forEach(function (section) { if (groups.indexOf(section.group) < 0) groups.push(section.group); });
  return { schemaVersion: 1, revision: oralRevision_(tables), groups: groups, sections: sections };
}

function oralAnswerStatus_(row) {
  return row && ORAL_ANSWER_STATUSES.indexOf(String(row.status)) >= 0 ? String(row.status) : 'insufficient';
}

function oralSourceForClient_(ref, sourcesById) {
  if (!ref || typeof ref !== 'object') return null;
  const id = String(ref.source_id || '');
  const source = Object.prototype.hasOwnProperty.call(sourcesById, id) ? sourcesById[id] : null;
  const page = Number(ref.pdf_page);
  const pageCount = source && Number(source.page_count);
  if (!source || !Number.isInteger(pageCount) || pageCount < 1 || !Number.isInteger(page) || page < 1 || page > pageCount) return null;
  // Explicit whitelist. Evidence quotes, hashes, local paths and auth never cross this boundary.
  return { sourceId: id, type: String(source.type || ''), title: String(source.title || ''),
    reference: String(source.reference || ''), revision: String(source.revision || ''),
    pdfPage: page, pageCode: String(ref.page_code || ''), locator: String(ref.locator || '') };
}

function oralAnswerForClient_(row, sourcesById, promptCount) {
  if (!row) return { status: 'insufficient', points: [], gaps: ['この小問の根拠付き解答はまだ登録されていません。'], scopeNotes: [] };
  const points = oralArray_(row.points_json, 'points_json').map(function (point) {
    if (!point || typeof point !== 'object') throw new Error('Invalid oral answer point');
    let coverage = ORAL_ANSWER_STATUSES.indexOf(point.coverage) >= 0 ? point.coverage : 'insufficient';
    const refs = Array.isArray(point.source_refs) ? point.source_refs : [];
    const sources = refs.map(function (ref) { return oralSourceForClient_(ref, sourcesById); }).filter(Boolean);
    const indexes = Array.isArray(point.prompt_indexes) ? point.prompt_indexes : [];
    const validBinding = indexes.length && indexes.every(function (index) {
      return Number.isInteger(index) && index >= 0 && index < promptCount;
    });
    const summary = oralStrings_(point.summary);
    if (coverage !== 'insufficient' && (!sources.length || !summary.length || !validBinding)) {
      return { promptIndexes: [], summary: [], coverage: 'insufficient', sources: [],
        gap: '登録された根拠資料を確認できないため、この要点は表示していません。' };
    }
    let gap = String(point.gap || '');
    if (coverage !== 'insufficient' && sources.length !== refs.length) {
      coverage = 'partial';
      gap = [gap, '一部の登録根拠を確認できません。資料の対応を再確認してください。'].filter(Boolean).join(' ');
    }
    return { promptIndexes: validBinding ? indexes : [], summary: coverage === 'insufficient' ? [] : summary,
      coverage: coverage, sources: coverage === 'insufficient' ? [] : sources, gap: gap };
  });
  const gaps = oralStrings_(oralArray_(row.gaps_json, 'gaps_json'));
  const bindings = points.reduce(function (result, point) { return result.concat(point.promptIndexes); }, []);
  if (new Set(bindings).size !== promptCount || new Set(bindings).size !== bindings.length) {
    gaps.push('評価シートの全確認項目と解答の対応を確認できません。未対応・重複項目の再確認が必要です。');
  }
  points.forEach(function (point) { if (point.gap && gaps.indexOf(point.gap) < 0) gaps.push(point.gap); });
  const someSupported = points.some(function (point) { return point.summary.length && point.sources.length; });
  const allSupported = points.length && points.every(function (point) { return point.coverage === 'supported'; }) && !gaps.length;
  // A bad/missing source must not leave an unsupported answer looking confirmed.
  const declared = oralAnswerStatus_(row);
  const derived = !someSupported ? 'insufficient' : allSupported ? 'supported' : 'partial';
  const status = declared === 'insufficient' || derived === 'insufficient' ? 'insufficient'
    : declared === 'partial' || derived === 'partial' ? 'partial' : 'supported';
  return { status: status, points: points, gaps: gaps,
    scopeNotes: oralStrings_(oralArray_(row.scope_notes_json, 'scope_notes_json')) };
}

function getOralSectionBundle_(sectionId) {
  if (!/^oral_rev3_p\d{2}_s\d{2}$/.test(String(sectionId || ''))) throw new Error('Invalid oral section ID');
  return oralSectionBundleFromTables_(sectionId, readOralTables_());
}

function oralBundleContext_(tables) {
  const answersById = Object.create(null);
  const sourcesById = Object.create(null);
  tables.oral_answers.forEach(function (row) { answersById[String(row.assessment_id)] = row; });
  tables.oral_sources.forEach(function (row) { sourcesById[String(row.source_id)] = row; });
  return { answersById: answersById, sourcesById: sourcesById, revision: oralRevision_(tables) };
}

// Exactly one selected field, one fresh snapshot, no persistent answer cache.
function getOralGroupBundle_(group) {
  if (typeof group !== 'string' || !group.trim() || group.length > 80 || group !== group.trim()) throw new Error('Invalid oral group');
  const tables = readOralTables_();
  const parents = tables.oral_sections.filter(function (row) { return String(row.group || '') === group; })
    .sort(function (a, b) { return Number(a.display_order) - Number(b.display_order); });
  if (!parents.length) throw new Error('Oral group unavailable');
  const context = oralBundleContext_(tables);
  const bundles = parents.map(function (row) { return oralSectionBundleFromTables_(row.section_id, tables, context); });
  const sections = bundles.map(function (bundle, index) {
    const section = oralSectionForClient_(parents[index], false);
    section.itemCount = bundle.items.length;
    ORAL_ANSWER_STATUSES.forEach(function (status) {
      section[status + 'Count'] = bundle.items.filter(function (item) { return item.answer.status === status; }).length;
    });
    return section;
  });
  return { schemaVersion: 1, revision: context.revision, group: group, sections: sections, bundles: bundles };
}

function oralSectionBundleFromTables_(sectionId, tables, sharedContext) {
  const id = String(sectionId || '');
  if (!/^oral_rev3_p\d{2}_s\d{2}$/.test(id)) throw new Error('Invalid oral section ID');
  const section = tables.oral_sections.filter(function (row) { return String(row.section_id) === id; })[0];
  if (!section) throw new Error('Oral section unavailable');
  const context = sharedContext || oralBundleContext_(tables);
  const items = tables.oral_questions.filter(function (row) { return String(row.section_id) === id; })
    .sort(function (a, b) { return Number(a.display_order) - Number(b.display_order); })
    .map(function (row) {
      return { itemId: String(row.assessment_id), sourceItemNumber: String(row.item_number),
        order: Number(row.display_order) || 0, levels: oralStrings_(oralArray_(row.levels_json, 'levels_json')),
        subheading: String(row.subheading || ''), question: String(row.question || ''),
        prompts: oralArray_(row.prompts_json, 'prompts_json').map(function (prompt) {
          return { text: String(prompt.text || ''), level: String(prompt.level || '') };
        }), answer: oralAnswerForClient_(context.answersById[String(row.assessment_id)], context.sourcesById,
          oralArray_(row.prompts_json, 'prompts_json').length) };
    });
  return { schemaVersion: 1, revision: context.revision, section: oralSectionForClient_(section, true), items: items };
}
