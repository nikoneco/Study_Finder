const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const STUDY_ROOT = fs.existsSync(path.join(ROOT, 'gas', 'StudyService.gs')) ? ROOT : path.join(ROOT, '737_Study_Finder');
const DATA_DIR = path.join(STUDY_ROOT, 'data');

const REPAIRS = {
  q_00_96f8ed7c2362: ['GENERAL', 'Max Ramp、Takeoff、Landing、Zero Fuel Weight、Air Speed、ALTを答えなさい。（DOM、INT）'],
  q_00_5ad3e375ef3a: ['GENERAL', 'ShipのDimension（全長、全幅、全高）を答えなさい。'],
  q_00_c8ddf581c98d: ['GENERAL', 'Fuselage STA、Wing STA、Stabilizer STAなど、各STA基準の違いを答えなさい。'],
  q_00_a26c91d389fa: ['Panel', 'Flight Compartment Panelの番号を、CCBを含めて答えなさい。'],
  q_00_6352bd22fdd7: ['Program SW Module', 'Program Switch Moduleの目的を答えなさい。'],
  q_00_0bef0d5f1f3c: ['Loadable Software', 'Loadable Softwareの構成ComponentとLocationを答えなさい。'],
  q_00_9e235bce3bac: ['Towing', 'Nose TowingおよびMain Gear Towing時の許容Angleを答えなさい。'],
  q_00_d37d66d97694: ['Towing', 'Nose TowingおよびMain Gear Towing時の注意事項を、Study Guide記載範囲で答えなさい。'],

  q_24_a59763ae0357: ['EXTERNAL POWER', 'External Power Systemの主要Component、Locationおよび機能を答えなさい。'],
  q_24_97d3f71cc615: ['GENERATOR DRIVE', 'Generator Drive Systemの主要Component、Locationおよび機能を答えなさい。'],
  q_24_780205016b20: ['AC GENERATION SYSTEM', 'AC Generation Systemの主要Component、Locationおよび機能を答えなさい。'],
  q_24_22f6e9cfbbd0: ['DC GENERATION SYSTEM', 'DC Generation Systemの主要Component、Locationおよび機能を答えなさい。'],

  q_27_8692f2d3a1ae: ['FLIGHT SPOILER CONTROL SYSTEM', 'Flight Spoiler Control Systemの主要Component、Locationおよび機能を記入しなさい。'],
  q_27_c512035ae123: ['SPEEDBRAKE CONTROL SYSTEM', 'Speedbrake Control Systemの主要Component、Locationおよび機能を記入しなさい。'],
  q_27_10f46d677d3a: ['RUDDER & RUDDER TRIM CONTROL SYSTEM', 'Rudder & Rudder Trim Control Systemの主要Component、Locationおよび機能を記入しなさい。'],
  q_27_820d4eaacce9: ['ELEVATOR & TAB CONTROL SYSTEM', 'Elevator & Tab Control Systemの主要Component、Locationおよび機能を記入しなさい。'],
  q_27_63f9cabda2b2: ['HORIZONTAL STABILIZER TRIM CONTROL SYSTEM', 'Horizontal Stabilizer Trim Control Systemの主要Component、Locationおよび機能を記入しなさい。'],
  q_27_e56f1b638293: ['TRAILING EDGE FLAP SYSTEM', 'Trailing Edge Flap Systemの主要Component、Locationおよび機能を記入しなさい。'],
  q_27_76394140d1c1: ['LEADING EDGE FLAP & SLAT CONTROL SYSTEM', 'Leading Edge Flap & Slat Control Systemの主要Component、Locationおよび機能を記入しなさい。'],
  q_27_6b8fd0160525: ['STALL WARNING SYSTEM', 'Stall Warning Systemの主要Component、Locationおよび機能を記入しなさい。'],

  q_29_919b56e99980: ['MAIN HYDRAULIC SYSTEM', 'Main Hydraulic Systemの主要Component、Locationおよび機能を記入しなさい。'],
  q_29_abddb4a59fe0: ['STANDBY HYDRAULIC SYSTEM', 'Standby Hydraulic Systemの主要Component、Locationおよび機能を説明しなさい。'],
  q_33_fd7f9c395616: ['EMERGENCY LIGHT', 'Emergency Light Systemの主要Component、Locationおよび機能を記入しなさい。'],
  q_35_859772b4109f: ['PASSENGER OXYGEN SYSTEM', 'Passenger Oxygen System作動時の、他SystemへのControlおよびIndicationを説明しなさい。'],
  q_38_9d1fcc63d100: ['POTABLE WATER SYSTEM', 'Potable Water Systemの主要Component（Service Panelを含む）、Locationおよび概要を説明しなさい。'],

  q_34_e579f9a28714: ['ADIRU & OVER SPEED WARNING', 'ADIRUおよび関連ComponentのLocationを記入しなさい。'],
  q_34_ed317e422748: ['ADIRU & OVER SPEED WARNING', 'Overspeed Warning Systemの目的を記入しなさい。'],
  q_34_8fee352f5bf2: ['WEATHER RADAR SYSTEM', 'Weather Radar SystemをOFFにする方法を3つ記入しなさい。'],
  q_34_96ec25fb4c1a: ['ADF SYSTEM', 'ADF Mode Selectorの「ANT」と「ADF」の違いを記入しなさい。'],

  q_7X_fefc40bbc708: ['ENGINE FUEL & CONTROL', 'Engine Fuel & Control Systemで、Fuel Spar ValveからFuel Nozzleまでにある各Componentの作動概要とLocationを記入しなさい。'],
  q_7X_b4cf96f37399: ['LUBRICATION SYSTEM', 'Engine Lubrication Systemの主要Component、Locationおよび機能を説明しなさい。']
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
  return rows;
}

function csvCell(value) {
  const text = String(value == null ? '' : value);
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function normalizeQuestion(value) {
  return String(value || '')
    .normalize('NFKC')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();
}

function repairFile(filePath, seen) {
  const matrix = parseCsv(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
  const headers = matrix[0];
  const idIndex = headers.indexOf('question_id');
  const subsectionIndex = headers.indexOf('subsection_name');
  const questionIndex = headers.indexOf('question_text');
  const normalizedIndex = headers.indexOf('normalized_question');
  if ([idIndex, subsectionIndex, questionIndex, normalizedIndex].some((index) => index < 0)) {
    throw new Error(`Missing required question columns: ${filePath}`);
  }

  let changed = 0;
  matrix.slice(1).forEach((row) => {
    const questionId = row[idIndex];
    const repair = REPAIRS[questionId];
    if (!repair) return;
    row[subsectionIndex] = repair[0];
    row[questionIndex] = repair[1];
    row[normalizedIndex] = normalizeQuestion(repair[1]);
    seen.add(questionId);
    changed += 1;
  });

  const output = matrix.map((row) => row.map(csvCell).join(',')).join('\r\n') + '\r\n';
  fs.writeFileSync(filePath, '\uFEFF' + output, 'utf8');
  return changed;
}

function main() {
  const seen = new Set();
  const files = fs.readdirSync(DATA_DIR)
    .filter((name) => /^question_bank_ata(?:00|24|27|29|33|34|35|38|7X)(?:_prepared)?\.csv$/i.test(name))
    .map((name) => path.join(DATA_DIR, name));
  const changed = files.reduce((total, filePath) => total + repairFile(filePath, seen), 0);
  const missing = Object.keys(REPAIRS).filter((questionId) => !seen.has(questionId));
  if (missing.length) {
    throw new Error(`Question repairs were not applied: ${missing.join(', ')}`);
  }
  console.log(`question_context_repaired,${changed},unique_questions,${seen.size}`);
}

main();
