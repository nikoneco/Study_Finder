const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const STUDY_ROOT = fs.existsSync(path.join(ROOT, 'gas', 'StudyService.gs')) ? ROOT : path.join(ROOT, '737_Study_Finder');
const DATA_DIR = path.join(STUDY_ROOT, 'data');
const ATAS = ['00', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '38', '47', '49', '5X', '7X'];

const CAUSALITY_EXPECTATIONS = {
  q_00_6352bd22fdd7: ['PROGRAM SWITCH', 'PROGRAM SWITCH'],
  q_00_0bef0d5f1f3c: ['LOADABLE SOFTWARE', 'DATA LOADER'],
  q_23_d0f057bd346f: ['FI SYS', 'FI SYSTEM'],
  q_23_6fa9166a6c7a: ['REU', 'REU'],
  q_23_ba8a614b38c4: ['ACP', 'ACP'],
  q_23_145ee54e2d4f: ['SI SYS', 'SI SYSTEM'],
  q_23_19c3b2e59824: ['PA SYSTEM', 'PA SYSTEM'],
  q_23_67a8598753b6: ['VHF SYS', 'VHF SYSTEM'],
  q_23_aa2243903242: ['HF SYS', 'HF SYSTEM'],
  q_23_4e6bf8bafaa8: ['OFF SIDE', 'OFF SIDE'],
  q_23_15bfa3e82f63: ['HF SYS', 'TUNE SEQUENCE'],
  q_23_c7b4c67b70e4: ['SELCAL SYS', 'SELCAL SYSTEM'],
  q_23_89babf1cd5fa: ['HGA', 'HGA'],
  q_23_db91d96190d7: ['AUDIO BITE', 'AUDIO BITE'],
  q_23_ce9eacc91f55: ['DIU', 'DIU'],
  q_23_fc4b2f3373c4: ['IFE', 'AVOD'],
  q_23_75b788e9fe02: ['IFE', 'HEAD END'],
  q_23_f22b8be31d5f: ['IFE', 'MPEG1'],
  q_23_e7a3d3ce2c6b: ['IFE', 'POWER'],
  q_23_3f4cfd02c8ea: ['VIDEO SURVEILLANCE', 'FDEVSS'],
  q_23_8d1419a9b489: ['VIDEO SURVEILLANCE', 'CDS'],
  q_24_a59763ae0357: ['EXTERNAL POWER', 'BPCU'],
  q_24_97d3f71cc615: ['GENERATOR DRIVE', 'IDG'],
  q_24_780205016b20: ['AC GENERATION', 'GCU'],
  q_24_22f6e9cfbbd0: ['DC GENERATION', 'SPCU'],
  q_31_b1ac7a4725c4: ["OFF L'T", 'OFF LIGHT'],
  q_31_6d2a91f4c8e3: ['FDAU', 'FDAU'],
  q_31_4c484c182d44: ['AWM', 'AWM'],
  q_31_8e4b17c2d6a9: ['AWM', 'P9 FORWARD ELECTRONIC PANEL'],
  q_32_1248004fb6d7: ['MAIN L/G MANUAL EXT', 'MAIN L/G MANUAL EXT'],
  q_32_6a1f24c8d3e7: ['NOSE L/G MANUAL EXT', 'NOSE L/G MANUAL EXT'],
  q_32_9c4e17b2a6d8: ['ACCESS PANEL', 'ACCESS DOOR POSITION SWITCH'],
  q_32_c7846db4e5ee: ['NOSE WHL STRG', 'NOSE WHEEL STEERING'],
  q_32_3e8a61d7c2b5: ['RUD PDL', 'RUDDER PEDAL'],
  q_32_8b2d57a4e1c9: ['ALT NOSE WHL STRG', 'SYSTEM B'],
  q_32_95afd7c716bf: ['AIR/GND SYS', 'COMPRESSED SENSOR'],
  q_32_5d9a23e7b4c1: ['PSEU', 'BITE MENU'],
  q_32_5e32c40a6a31: ['L/G POSI IND', 'UP AND LOCKED SENSOR'],
  q_32_7f1c46a9d2e8: ['L/G POSITION INDICATION', 'PRIMARY POSITION LIGHT'],
  q_32_204a2cdafd09: ['MANUAL BRAKING', 'BRAKE PEDAL'],
  q_32_204db17de426: ['BRAKE PRESS IND', 'BRAKE PRESSURE TRANSDUCER'],
  q_32_4a7d19c6e3b2: ['RETRACTION BRK', 'GEAR RETRACT BRAKING ACTUATOR'],
  q_27_8692f2d3a1ae: ['FLIGHT SPOILER', 'FLIGHT SPOILER'],
  q_27_c512035ae123: ['SPEEDBRAKE', 'SPEEDBRAKE'],
  q_27_10f46d677d3a: ['RUDDER', 'RUDDER'],
  q_27_820d4eaacce9: ['ELEVATOR', 'ELEVATOR'],
  q_27_63f9cabda2b2: ['HORIZONTAL STABILIZER', 'HORIZONTAL STABILIZER'],
  q_27_e56f1b638293: ['TRAILING EDGE FLAP', 'TE FLAP'],
  q_27_76394140d1c1: ['LEADING EDGE FLAP', 'LE FLAP'],
  q_27_6b8fd0160525: ['STALL WARNING', 'STALL WARNING'],
  q_29_919b56e99980: ['MAIN HYDRAULIC', 'MAIN HYDRAULIC'],
  q_29_abddb4a59fe0: ['STANDBY HYDRAULIC', 'STANDBY HYDRAULIC'],
  q_33_fd7f9c395616: ['EMERGENCY LIGHT', 'EMERGENCY'],
  q_35_859772b4109f: ['PASSENGER OXYGEN', 'PASSENGER OXYGEN'],
  q_38_9d1fcc63d100: ['POTABLE WATER', 'WATER SERVICE PANEL'],
  q_34_e579f9a28714: ['ADIRU', 'ADIRU'],
  q_34_ed317e422748: ['OVERSPEED WARNING', 'OVERSPEED WARNING'],
  q_34_8fee352f5bf2: ['WEATHER RADAR', 'WXR'],
  q_34_96ec25fb4c1a: ['ADF MODE SELECTOR', 'ADF MODE SELECTOR'],
  q_34_94bc7bede788: ['MSU', 'ALIGN'],
  q_34_6c1d7e90a2b4: ['FAULT', 'FAULT'],
  q_34_e21066425fda: ['RADAR ECHO', 'WXR'],
  q_34_1f8a6d43c2e7: ['MOUNT FAN', 'FAN'],
  q_34_9215eeb6b503: ['TA ONLY', 'TA ONLY'],
  q_34_7b2e9c51d4a8: ['TCAS', 'TCAS'],
  q_34_e5e1332b37ce: ['BITE', 'BITE'],
  q_34_4d7a2c96e1f3: ['NAVIGATION', 'NAVIGATION'],
  q_7X_fefc40bbc708: ['ENGINE FUEL & CONTROL', 'FUEL NOZZLE'],
  q_7X_b4cf96f37399: ['ENGINE LUBRICATION', 'OIL TANK']
};

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        field += '"';
        i += 1;
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
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }
  if (field || row.length) {
    row.push(field.replace(/\r$/, ''));
    rows.push(row);
  }
  const headers = rows.shift();
  return rows.filter((values) => values.some(Boolean)).map((values) => Object.fromEntries(
    headers.map((header, index) => [header, values[index] || ''])
  ));
}

function readCsv(name) {
  return parseCsv(fs.readFileSync(path.join(DATA_DIR, name), 'utf8').replace(/^\uFEFF/, ''));
}

function normalize(value) {
  return String(value || '').normalize('NFKC').replace(/\s+/g, ' ').trim().toUpperCase();
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertUnique(rows, key, label) {
  const seen = new Set();
  rows.forEach((row) => {
    assert(row[key], `${label} has an empty ${key}`);
    assert(!seen.has(row[key]), `${label} has duplicate ${key}: ${row[key]}`);
    seen.add(row[key]);
  });
}

function main() {
  const questions = [];
  const preparedQuestions = [];
  const answers = [];
  const candidates = [];
  const pages = [];

  ATAS.forEach((ata) => {
    const raw = readCsv(`question_bank_ata${ata}.csv`);
    const prepared = readCsv(`question_bank_ata${ata}_prepared.csv`);
    assert(raw.length === prepared.length, `ATA${ata} raw/prepared question count differs`);
    raw.forEach((question, index) => {
      assert(question.question_id === prepared[index].question_id, `ATA${ata} question order/ID changed at row ${index + 2}`);
      assert(question.question_text === prepared[index].question_text, `ATA${ata} raw/prepared question text differs: ${question.question_id}`);
    });
    questions.push(...raw);
    preparedQuestions.push(...prepared);
    answers.push(...readCsv(`answer_notes_ata${ata}.csv`));
    candidates.push(...readCsv(`candidate_links_ata${ata}.csv`));
    pages.push(...readCsv(`textbook_pages_ata${ata}.csv`));
  });

  assert(questions.length === 804, `Expected 804 questions, got ${questions.length}`);
  assert(preparedQuestions.length === 804, `Expected 804 prepared questions, got ${preparedQuestions.length}`);
  assert(answers.length === 804, `Expected 804 answers, got ${answers.length}`);
  assertUnique(questions, 'question_id', 'question bank');
  assertUnique(answers, 'note_id', 'answer notes');
  assertUnique(candidates, 'candidate_id', 'candidate links');
  pages.forEach((page) => assert(page.page_id, 'textbook pages has an empty page_id'));

  const questionById = new Map(questions.map((question) => [question.question_id, question]));
  const answerByQuestionId = new Map();
  answers.forEach((answer) => {
    assert(questionById.has(answer.question_id), `Orphan answer: ${answer.note_id}`);
    assert(!answerByQuestionId.has(answer.question_id), `Multiple canonical answers: ${answer.question_id}`);
    assert(String(answer.answer_text || '').trim(), `Empty answer: ${answer.question_id}`);
    assert(!/(?:DRAFT|ドラフト|下書き|回答候補|最終表現)/i.test(answer.answer_text), `Draft wording remains: ${answer.question_id}`);
    answerByQuestionId.set(answer.question_id, answer);
  });
  questions.forEach((question) => assert(answerByQuestionId.has(question.question_id), `Missing answer: ${question.question_id}`));

  const pageIds = new Set(pages.map((page) => page.page_id));
  candidates.forEach((candidate) => {
    const question = questionById.get(candidate.question_id);
    assert(question, `Orphan candidate: ${candidate.candidate_id}`);
    assert(String(question.ata) === String(candidate.ata), `Candidate ATA mismatch: ${candidate.candidate_id}`);
    assert(pageIds.has(candidate.page_id), `Candidate page missing: ${candidate.candidate_id} -> ${candidate.page_id}`);
  });
  answers.forEach((answer) => {
    String(answer.evidence_page_ids || '').split(',').map((value) => value.trim()).filter(Boolean).forEach((pageId) => {
      assert(pageIds.has(pageId), `Answer evidence page missing: ${answer.question_id} -> ${pageId}`);
    });
  });

  Object.entries(CAUSALITY_EXPECTATIONS).forEach(([questionId, [questionTerm, answerTerm]]) => {
    const question = questionById.get(questionId);
    const answer = answerByQuestionId.get(questionId);
    assert(question, `Causality question missing: ${questionId}`);
    assert(answer, `Causality answer missing: ${questionId}`);
    assert(normalize(question.question_text).includes(normalize(questionTerm)), `Question context missing for ${questionId}: ${questionTerm}`);
    assert(normalize(answer.answer_text).includes(normalize(answerTerm)), `Answer causality mismatch for ${questionId}: ${answerTerm}`);
  });

  console.log(JSON.stringify({
    questions: questions.length,
    answers: answers.length,
    candidates: candidates.length,
    textbook_pages: pages.length,
    causality_checks: Object.keys(CAUSALITY_EXPECTATIONS).length,
    status: 'ok'
  }));
}

main();
