const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert/strict');
const contract = require('./oral-contract');
const ROOT = path.resolve(__dirname, '..');
const ORAL = path.join(ROOT, 'data', 'oral');
const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const normalized = text => String(text || '').normalize('NFKC').replace(/\s/g, '');

function loadInputs() {
  const index = readJson(path.join(ORAL, 'assessment_rev3.json'));
  const corpusDir = path.join(ORAL, 'corpus');
  const sources = fs.readdirSync(corpusDir).filter(name => /^(?:sg|amm)_[a-f0-9]+\.json$/.test(name))
    .map(name => readJson(path.join(corpusDir, name)));
  const batches = fs.readdirSync(ORAL).filter(name => /^answers_(?:procedures|systems)_.*\.json$/.test(name));
  const entries = batches.flatMap(name => {
    const batch = readJson(path.join(ORAL, name));
    assert.equal(batch.schema_version, 1, 'Bad batch schema: ' + name);
    assert(Array.isArray(batch.entries), 'Missing entries: ' + name);
    return batch.entries;
  });
  return { index, sources, entries, batches };
}

function deriveStatus(answer) {
  const any = answer.points.some(point => point.summary.length && point.source_refs.length);
  const all = answer.points.length && answer.points.every(point => point.coverage === 'supported' && !point.gap);
  return !any ? 'insufficient' : all && !answer.gaps.length ? 'supported' : 'partial';
}

function validate({ index, sources, entries }, partial = false) {
  assert.equal(index.sections.length, 55, 'Assessment parent count changed');
  const rows = index.sections.flatMap(section => section.assessment_rows);
  assert.equal(rows.length, 279, 'Assessment child count changed');
  const original = new Map(rows.map(row => [row.assessment_id, row]));
  const sourcesById = new Map(sources.map(source => [source.source_id, source]));
  const seen = new Set();
  const pendingSources = new Set();
  const counts = { supported: 0, partial: 0, insufficient: 0 };
  const sourceUses = new Set();
  for (const entry of entries) {
    const id = entry.assessment_id;
    assert(original.has(id), 'Unknown child: ' + id);
    assert(!seen.has(id), 'Duplicate child: ' + id);
    seen.add(id);
    assert(typeof entry.question === 'string' && entry.question.trim().length > 4, 'Empty question: ' + id);
    const answer = entry.answer;
    assert(answer && Array.isArray(answer.points) && answer.points.length, 'Missing answer points: ' + id);
    for (const field of ['gaps', 'scope_notes']) assert(Array.isArray(answer[field]) && answer[field].every(v => typeof v === 'string'), 'Bad ' + field + ': ' + id);
    assert(contract.statuses.includes(answer.status), 'Bad answer status: ' + id);
    const covered = new Set();
    for (const point of answer.points) {
      assert(Array.isArray(point.prompt_indexes) && point.prompt_indexes.length, 'Missing prompt binding: ' + id);
      for (const number of point.prompt_indexes) {
        assert(Number.isInteger(number) && number >= 0 && number < original.get(id).content_lines.length, 'Invalid prompt index: ' + id);
        assert(!covered.has(number), 'Duplicate prompt coverage: ' + id + ':' + number);
        covered.add(number);
      }
      assert(contract.statuses.includes(point.coverage), 'Bad point status: ' + id);
      assert(Array.isArray(point.summary) && point.summary.every(v => typeof v === 'string' && v.trim()), 'Bad summary: ' + id);
      assert(Array.isArray(point.source_refs), 'Bad refs: ' + id);
      assert(typeof point.gap === 'string', 'Missing point gap: ' + id);
      if (point.coverage !== 'insufficient') {
        assert(point.summary.length && point.source_refs.length, 'Unsupported summary: ' + id);
      } else {
        assert(!point.summary.length, 'Unconfirmed point presented as answer: ' + id);
        assert(point.gap.trim(), 'Insufficient point must explain gap: ' + id);
      }
      if (point.coverage === 'partial') assert(point.gap.trim(), 'Partial point must explain gap: ' + id);
      if (point.coverage === 'supported') assert(!point.gap.trim(), 'Supported point has gap: ' + id);
      for (const ref of point.source_refs) {
        sourceUses.add(ref.source_id);
        const source = sourcesById.get(ref.source_id);
        if (!source && partial) { pendingSources.add(ref.source_id); continue; }
        assert(source, 'Missing source: ' + id + ':' + ref.source_id);
        if (source.type === 'PAST' && point.coverage !== 'insufficient') {
          assert.equal(point.coverage, 'partial', 'Past material cannot be verified evidence: ' + id);
          assert(point.gap.includes('裏付け中'), 'Provisional answer must disclose pending corroboration: ' + id);
        }
        assert(Number.isInteger(ref.pdf_page) && ref.pdf_page > 0 && ref.pdf_page <= source.pages.length, 'Bad source page: ' + id);
        const page = source.pages[ref.pdf_page - 1];
        if (source.type === 'PAST') assert.equal(ref.page_code, page.page_code, 'Past paragraph locator mismatch: ' + id);
        assert(typeof ref.evidence_excerpt === 'string' && normalized(ref.evidence_excerpt).length >= 4, 'Missing evidence anchor: ' + id);
        const needle = normalized(ref.evidence_excerpt);
        const bodyAnchor = normalized(page.text).includes(needle) || normalized(page.repaired_text).includes(needle);
        const annotationAnchor = normalized(page.annotation_text).includes(needle);
        const visualAnchor = page.visual_text_verified === true && normalized(page.visual_text).includes(needle);
        assert(bodyAnchor || annotationAnchor || visualAnchor, 'Evidence anchor not on page: ' + id + ':' + ref.source_id + ':' + ref.pdf_page);
        if (!bodyAnchor) assert(ref.visual_verified === true, 'Annotation/visual evidence needs recorded visual verification: ' + id);
        assert(typeof ref.locator === 'string' && ref.locator.trim(), 'Missing evidence locator: ' + id);
        if (!partial && page.needs_visual_check) assert(ref.visual_verified === true, 'Ambiguous page needs recorded visual verification: ' + id + ':' + ref.source_id + ':' + ref.pdf_page);
      }
    }
    assert.equal(covered.size, original.get(id).content_lines.length, 'Requested conditions omitted: ' + id);
    assert.equal(answer.status, deriveStatus(answer), 'Answer status overstates evidence: ' + id);
    counts[answer.status]++;
  }
  if (!partial) {
    assert.equal(seen.size, 279, 'Not all assessment children have answers');
    const manifest = readJson(path.join(ORAL, 'corpus', 'manifest.json'));
    assert.equal(manifest.source_count, sources.length, 'Corpus not complete');
    for (const source of sources) {
      const file = path.resolve(ROOT, source.file);
      assert(file.startsWith(ROOT + path.sep), 'Source path escaped project');
      const hash = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
      assert.equal(hash, source.sha256, 'Source PDF changed: ' + source.title);
    }
  }
  return { parents: 55, children: 279, authored: seen.size, remaining: 279 - seen.size, counts,
    sourceUses: sourceUses.size, pendingSourceIds: [...pendingSources], evidenceComplete: !partial };
}

function compile(inputs) {
  const { index, sources, entries } = inputs;
  const answerById = new Map(entries.map(entry => [entry.assessment_id, entry]));
  const timestamp = new Date().toISOString();
  const sections = index.sections.map((section, order) => ({ section_id: section.section_id, group: section.group,
    title: section.title, ata: section.ata_raw, display_order: order + 1, assessment_page: section.source_pdf_page,
    original_refs: section.ref_text, updated_at: timestamp }));
  const questions = index.sections.flatMap(section => section.assessment_rows.map(row => ({
    assessment_id: row.assessment_id, section_id: section.section_id, item_number: row.source_item_number,
    display_order: row.source_row_order, levels_json: JSON.stringify(row.levels), subheading: row.subheading,
    question: answerById.get(row.assessment_id).question,
    prompts_json: JSON.stringify(row.content_lines.map(line => ({ text: line.text, level: line.level }))), updated_at: timestamp
  })));
  const answers = questions.map(question => {
    const answer = answerById.get(question.assessment_id).answer;
    // Strip review-only source quotes and visual annotations from production rows.
    const points = answer.points.map(point => ({ prompt_indexes: point.prompt_indexes, summary: point.summary,
      coverage: point.coverage, gap: point.gap, source_refs: point.source_refs.map(ref => ({
        source_id: ref.source_id, pdf_page: ref.pdf_page, page_code: ref.page_code || '', locator: ref.locator
      })) }));
    return { assessment_id: question.assessment_id, status: answer.status, points_json: JSON.stringify(points),
      gaps_json: JSON.stringify(answer.gaps), scope_notes_json: JSON.stringify(answer.scope_notes), updated_at: timestamp };
  });
  const usedSources = new Set(entries.flatMap(entry => entry.answer.points.flatMap(point => point.source_refs.map(ref => ref.source_id))));
  const sourceRows = sources.filter(source => usedSources.has(source.source_id)).map(source => ({ source_id: source.source_id,
    type: source.type, title: source.title, reference: source.reference, revision: source.revision,
    page_count: source.page_count, sha256: source.sha256, updated_at: timestamp }));
  const tables = { oral_sections: sections, oral_questions: questions, oral_answers: answers, oral_sources: sourceRows };
  for (const [table, rows] of Object.entries(tables)) {
    for (const row of rows) for (const [column, value] of Object.entries(row)) {
      assert(String(value).length <= 45000, 'Cell too long for Sheets: ' + table + ':' + column);
    }
  }
  const serialized = JSON.stringify(tables);
  assert(!/evidence_excerpt|repaired_text|annotation_text|visual_text|needs_visual_check|(?:[A-Z]:\\)|access_token|refresh_token/.test(serialized), 'Private review evidence leaked into compiled data');
  return { schema_version: 1, created_at: timestamp, source_assessment_sha256: index.source_sha256, tables };
}

function makeSheetRequests(compiled, sheetIds) {
  const schemas = { oral_sections: contract.sectionHeaders, oral_questions: contract.questionHeaders,
    oral_answers: contract.answerHeaders, oral_sources: contract.sourceHeaders };
  const batches = [];
  for (const [name, rows] of Object.entries(compiled.tables)) {
    assert(Number.isInteger(sheetIds[name]), 'Sheet must be grounded: ' + name);
    const values = [schemas[name], ...rows.map(row => schemas[name].map(column => String(row[column] ?? '')))];
    for (let start = 0; start < values.length; start += 40) {
      const chunk = values.slice(start, start + 40);
      batches.push({ sheet: name, startRow: start, rowCount: chunk.length, requests: [{ updateCells: {
        range: { sheetId: sheetIds[name], startRowIndex: start, endRowIndex: start + chunk.length,
          startColumnIndex: 0, endColumnIndex: schemas[name].length },
        rows: chunk.map(row => ({ values: row.map(value => ({ userEnteredValue: { stringValue: value } })) })),
        fields: 'userEnteredValue'
      } }] });
    }
  }
  return batches;
}

if (require.main === module) {
  const partial = process.argv.includes('--partial');
  const inputs = loadInputs();
  const report = validate(inputs, partial);
  if (!partial) {
    fs.writeFileSync(path.join(ORAL, 'compiled.json'), JSON.stringify(compile(inputs), null, 2));
    fs.writeFileSync(path.join(ORAL, 'validation.json'), JSON.stringify(report, null, 2));
  }
  console.log(JSON.stringify(report));
}
module.exports = { loadInputs, deriveStatus, validate, compile, makeSheetRequests };
