const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const STUDY_ROOT = fs.existsSync(path.join(ROOT, 'gas', 'StudyService.gs')) ? ROOT : path.join(ROOT, '737_Study_Finder');
const DATA_DIR = path.join(STUDY_ROOT, 'data');
const DEFAULT_EXPORT_DIR = path.join(STUDY_ROOT, 'tmp', 'sheet-sync');
const options = parseArgs(process.argv.slice(2));
const ATAS = options.atas;
const EXPORT_DIR = options.exportDir ? path.resolve(options.exportDir) : DEFAULT_EXPORT_DIR;

if (!ATAS.length) {
  throw new Error('Specify at least one ATA, for example: node scripts/sync_study_csv_from_sheet_export.js 22 24');
}

function parseArgs(args) {
  const atas = [];
  let exportDir = '';
  for (let index = 0; index < args.length; index += 1) {
    const value = args[index];
    if (value === '--export-dir') {
      exportDir = args[index + 1] || '';
      if (!exportDir) throw new Error('--export-dir requires a path.');
      index += 1;
    } else if (value.startsWith('--')) {
      throw new Error(`Unknown option: ${value}`);
    } else {
      atas.push(value);
    }
  }
  return { atas, exportDir };
}

function parseCsv(text) {
  const matrix = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
    if (quoted) {
      if (char === '"' && next === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n') {
      row.push(field.replace(/\r$/, ''));
      matrix.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }
  if (field || row.length) {
    row.push(field.replace(/\r$/, ''));
    matrix.push(row);
  }

  const headers = matrix.shift();
  if (!headers || !headers.length) throw new Error('CSV export has no header row.');
  return {
    headers,
    rows: matrix
      .filter((values) => values.some((value) => value !== ''))
      .map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] || ''])))
  };
}

function readExport(fileName) {
  const filePath = path.join(EXPORT_DIR, fileName);
  if (!fs.existsSync(filePath)) throw new Error(`Missing Sheet export: ${filePath}`);
  return parseCsv(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function csvCell(value) {
  const text = String(value == null ? '' : value);
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function writeCsv(fileName, headers, rows) {
  const output = [
    headers.join(','),
    ...rows.map((row) => headers.map((header) => csvCell(row[header])).join(','))
  ].join('\n') + '\n';
  fs.writeFileSync(path.join(DATA_DIR, fileName), `\uFEFF${output}`, 'utf8');
}

function assertUnique(rows, key, label) {
  const values = rows.map((row) => row[key]);
  if (values.some((value) => !value)) throw new Error(`${label} contains an empty ${key}.`);
  if (new Set(values).size !== values.length) throw new Error(`${label} contains duplicate ${key} values.`);
}

function main() {
  const sources = readExport('source_files_all.csv');
  const questions = readExport('question_bank_all.csv');
  const answers = readExport('answer_notes_all.csv');
  const candidates = readExport('candidate_links_all.csv');

  ATAS.forEach((ata) => {
    const ataKey = String(ata).toUpperCase();
    const ataSources = sources.rows.filter((row) => String(row.ata).toUpperCase() === ataKey);
    const ataQuestions = questions.rows.filter((row) => String(row.ata).toUpperCase() === ataKey);
    const questionIds = new Set(ataQuestions.map((row) => row.question_id));
    const ataAnswers = answers.rows.filter((row) => questionIds.has(row.question_id));
    const ataCandidates = candidates.rows.filter((row) => questionIds.has(row.question_id));

    if (!ataQuestions.length) throw new Error(`No questions found for ATA${ataKey}.`);
    if (!ataSources.length) throw new Error(`No source files found for ATA${ataKey}.`);
    assertUnique(ataSources, 'source_id', `ATA${ataKey} source_files`);
    assertUnique(ataQuestions, 'question_id', `ATA${ataKey} question_bank`);
    assertUnique(ataAnswers, 'question_id', `ATA${ataKey} answer_notes`);
    if (ataAnswers.length !== ataQuestions.length) {
      throw new Error(`ATA${ataKey} question/answer count differs: ${ataQuestions.length}/${ataAnswers.length}`);
    }

    writeCsv(`source_files_ata${ataKey}.csv`, sources.headers, ataSources);
    writeCsv(`question_bank_ata${ataKey}.csv`, questions.headers, ataQuestions);
    writeCsv(`question_bank_ata${ataKey}_prepared.csv`, questions.headers, ataQuestions);
    writeCsv(`answer_notes_ata${ataKey}.csv`, answers.headers, ataAnswers);
    writeCsv(`candidate_links_ata${ataKey}.csv`, candidates.headers, ataCandidates);

    console.log(JSON.stringify({
      ata: ataKey,
      sources: ataSources.length,
      questions: ataQuestions.length,
      answers: ataAnswers.length,
      candidates: ataCandidates.length
    }));
  });
}

main();
