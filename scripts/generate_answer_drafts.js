const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const STUDY_ROOT = fs.existsSync(path.join(ROOT, 'gas', 'StudyService.gs')) ? ROOT : path.join(ROOT, '737_Study_Finder');
const DATA_DIR = path.join(STUDY_ROOT, 'data');
const ATA = process.argv[2] || '24';

const QUESTION_INPUT = path.join(DATA_DIR, `question_bank_ata${ATA}.csv`);
const PAGES_INPUT = path.join(DATA_DIR, `textbook_pages_ata${ATA}.csv`);
const QUESTION_OUTPUT = path.join(DATA_DIR, `question_bank_ata${ATA}_prepared.csv`);
const CANDIDATE_OUTPUT = path.join(DATA_DIR, `candidate_links_ata${ATA}.csv`);
const ANSWER_OUTPUT = path.join(DATA_DIR, `answer_notes_ata${ATA}.csv`);
const REVIEWED_ANSWERS = loadReviewedAnswers(ATA);

const CANDIDATE_HEADERS = [
  'candidate_id',
  'question_id',
  'page_id',
  'ata',
  'candidate_group',
  'page_code',
  'pdf_page',
  'title',
  'section_title',
  'excerpt',
  'score',
  'match_terms',
  'rank',
  'generated_by',
  'generated_at',
  'user_status'
];

const ANSWER_HEADERS = [
  'note_id',
  'question_id',
  'answer_text',
  'evidence_page_codes',
  'evidence_page_ids',
  'evidence_excerpts',
  'source_type',
  'status',
  'problem_reason',
  'created_at',
  'updated_at'
];

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let index = 0; index < text.length; index++) {
    const char = text[index];
    const next = text[index + 1];
    if (quoted) {
      if (char === '"' && next === '"') {
        field += '"';
        index++;
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
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else if (char !== '\r') {
      field += char;
    }
  }

  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function readCsv(filePath) {
  const rows = parseCsv(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
  const headers = rows.shift();
  return rows
    .filter((row) => row.some((cell) => cell !== ''))
    .map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] || ''])));
}

function stringifyCsv(rows, headers) {
  const lines = [headers.join(',')];
  rows.forEach((row) => {
    lines.push(headers.map((header) => csvCell(row[header])).join(','));
  });
  return `${lines.join('\n')}\n`;
}

function csvCell(value) {
  const text = String(value == null ? '' : value);
  if (/[",\r\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function normalize(text) {
  return String(text || '')
    .normalize('NFKC')
    .replace(/[‐-―−]/g, '-')
    .replace(/\s+/g, ' ')
    .toUpperCase();
}

function uniq(items) {
  return Array.from(new Set(items.filter(Boolean)));
}

function loadReviewedAnswers(ata) {
  const reviewedPath = path.join(__dirname, `reviewed_answers_ata${ata}.js`);
  if (!fs.existsSync(reviewedPath)) return {};
  return require(reviewedPath);
}

function termsForQuestion(question, index) {
  const text = `${question.question_text} ${question.normalized_question || ''}`;
  const normalized = normalize(text);
  const terms = [];
  terms.push(...(normalized.match(/[A-Z][A-Z0-9-]{1,}/g) || []));

  const phraseMap = [
    ['AC BUS', 'AC BUS'],
    ['DC BUS', 'DC BUS'],
    ['STANDBY BUS', 'STANDBY BUS'],
    ['POWER SOURCE', 'POWER SOURCE'],
    ['COMPONENT LOCATION', 'COMPONENT LOCATION'],
    ['INPUT SIGNAL', 'INPUT SIGNAL'],
    ['FUNCTION', 'FUNCTION'],
    ['LIGHT', 'LIGHT'],
    ['OIL SERVICE', 'SERVICING'],
    ['OIL SYSTEM', 'OIL SYSTEM'],
    ['CLOSE', 'CLOSE'],
    ['RATING', 'RATING'],
    ['NAME PLATE', 'NAME PLATE'],
    ['HAZARD', 'HAZARD'],
    ['ENTRY/EXIT CORRIDOR', 'ENTRY/EXIT CORRIDOR'],
    ['ENTRY', 'ENTRY'],
    ['EXIT CORRIDOR', 'EXIT CORRIDOR'],
    ['ENGINE MOUNT', 'ENGINE MOUNT'],
    ['INLET COWL', 'INLET COWL'],
    ['FAN COWL', 'FAN COWL'],
    ['PRESSURE RELIEF DOOR', 'PRESSURE RELIEF DOOR'],
    ['DRAIN SYSTEM', 'DRAIN SYSTEM'],
    ['ENGINE COWLING', 'ENGINE COWLING'],
    ['VORTEX CONTROL DEVICE', 'VORTEX CONTROL DEVICE'],
    ['MAIN BEARING', 'MAIN BEARING'],
    ['ACCESSORY GEAR BOX', 'ACCESSORY GEAR BOX'],
    ['AERODYNAMIC STATION', 'AERODYNAMIC STATION'],
    ['ACCESSORY DRIVE', 'ACCESSORY DRIVE'],
    ['FAN BLADE', 'FAN BLADE'],
    ['SPINNER', 'SPINNER'],
    ['EEC', 'EEC'],
    ['HMU', 'HMU'],
    ['IDLE', 'IDLE'],
    ['IGNITION', 'IGNITION'],
    ['HPTACC', 'HPTACC'],
    ['LPTACC', 'LPTACC'],
    ['VSV', 'VSV'],
    ['VBV', 'VBV'],
    ['TBV', 'TBV'],
    ['AUTOTHROTTLE', 'AUTOTHROTTLE'],
    ['START LEVER', 'START LEVER'],
    ['REVERSE THRUST', 'REVERSE THRUST'],
    ['N1', 'N1'],
    ['N2', 'N2'],
    ['EGT', 'EGT'],
    ['AVM', 'AVM'],
    ['THRUST REVERSER', 'THRUST REVERSER'],
    ['START VALVE', 'START VALVE'],
    ['STARTER', 'STARTER']
  ];
  phraseMap.forEach(([needle, term]) => {
    if (normalized.includes(needle)) terms.push(term);
  });

  if (text.includes('構成')) terms.push('DISTRIBUTION', 'SYSTEM');
  if (text.includes('機能')) terms.push('FUNCTION');
  if (text.includes('点灯条件')) terms.push('INDICATION', 'LIGHT');
  if (text.includes('定格')) terms.push('RATING', 'SPECIFICATION');
  if (text.includes('条件')) terms.push('CONDITION', 'CONTROL');
  if (text.includes('構造')) terms.push('GENERAL DESCRIPTION');

  return uniq([...terms, ...contextTerms(index, question.ata)]);
}

function contextTerms(index, ata) {
  if (String(ata).toUpperCase() === '7X') {
    const engineRanges = [
      [1, 8, 'ATA71'],
      [9, 14, 'ATA72'],
      [15, 25, 'ATA73'],
      [26, 31, 'ATA74'],
      [32, 42, 'ATA75'],
      [43, 47, 'ATA76'],
      [48, 51, 'ATA77'],
      [52, 60, 'ATA78'],
      [61, 64, 'ATA79'],
      [65, 68, 'ATA80']
    ];
    const match = engineRanges.find(([start, end]) => index >= start && index <= end);
    return match ? [match[2]] : [];
  }

  const table = {
    1: ['DISTRIBUTION', 'AC BUS', 'DC BUS', 'STANDBY BUS'],
    2: ['AIRPLANE', 'COMPONENT LOCATION', 'ELECTRICAL POWER'],
    3: ['BPCU', 'EXTERNAL POWER', 'INPUT'],
    4: ['BPCU', 'FUNCTION'],
    5: ['BPCU', 'EPC', 'EXTERNAL POWER CONTACTOR', 'CLOSE'],
    6: ['BPCU', 'POWER SOURCE'],
    7: ['EXTERNAL POWER PANEL', 'P19', 'LIGHT'],
    8: ['EXTERNAL POWER', 'COMPONENT LOCATION'],
    9: ['IDG', 'GENERATOR DRIVE', 'SERVICING', 'OIL'],
    10: ['IDG', 'GENERATOR DRIVE', 'OIL SYSTEM'],
    11: ['GENERATOR DRIVE', 'COMPONENT LOCATION', 'IDG'],
    12: ['GCU', 'AGCU', 'FUNCTION'],
    13: ['ELECTRICAL METERS', 'BATTERY', 'GALLEY POWER MODULE'],
    14: ['AC SYSTEMS', 'GENERATOR', 'APU MODULE', 'LIGHT'],
    15: ['GCU', 'FUNCTION'],
    16: ['GCB', 'AUTOMATIC CLOSE', 'BREAKER CONTROL'],
    17: ['APU START GENERATOR', 'FUNCTION'],
    18: ['START CONVERTER UNIT', 'SCU', 'LOCATION', 'FUNCTION'],
    19: ['POWER DISTRIBUTION PANEL', 'PDP', 'COMPONENT'],
    20: ['DC GENERATION', 'COMPONENT LOCATION'],
    21: ['MAIN BATTERY', 'AUXILIARY BATTERY', 'RATING'],
    22: ['STATIC INVERTER', 'RATING'],
    23: ['DC POWER SYSTEM', 'POWER SOURCE'],
    24: ['MAIN BATTERY CHARGER', 'FUNCTION']
  };
  return table[index] || [];
}

function scorePage(question, questionTerms, page) {
  if (!page.page_code || normalize(page.title).includes('INDEX')) return { score: 0, matches: [] };

  const questionText = normalize(question.question_text);
  const title = normalize(page.title);
  const section = normalize(page.section_title);
  const body = normalize(page.body_text);
  const pageType = String(page.page_type);
  let score = 0;
  const matches = [];

  questionTerms.forEach((term) => {
    const normalizedTerm = normalize(term);
    if (!normalizedTerm || normalizedTerm.length < 2) return;
    const ataMatch = normalizedTerm.match(/^ATA(\d{2})$/);
    if (ataMatch) {
      if (String(page.page_code || '').startsWith(ataMatch[1] + '-')) {
        score += 300;
        matches.push(term);
      }
      return;
    }
    if (title.includes(normalizedTerm)) {
      score += normalizedTerm.includes(' ') ? 55 : 35;
      matches.push(term);
    }
    if (section.includes(normalizedTerm)) {
      score += 20;
      matches.push(term);
    }
    if (body.includes(normalizedTerm)) {
      score += normalizedTerm.includes(' ') ? 18 : 8;
      matches.push(term);
    }
  });

  if (questionText.includes('FUNCTION') && body.includes('FUNCTION を持っている')) {
    score += 140;
    matches.push('explicit_function_list');
  }
  if (questionText.includes('MAIN BATTERY CHARGER') && body.includes('MAIN BATTERY CHARGER は、次の')) {
    score += 160;
    matches.push('exact_component_function');
  }
  if (questionText.includes('FUNCTION') && title.includes('FUNCTIONAL DESCRIPTION')) {
    score += 35;
    matches.push('functional_description');
  }

  if (pageType === 'text') score += 25;
  if (pageType === 'figure') score -= 55;
  return { score, matches: uniq(matches) };
}

function excerptFor(page, terms) {
  const body = String(page.body_text || '').replace(/\s+/g, ' ').trim();
  if (!body) return '';
  const normalized = normalize(body);
  const hit = terms
    .map((term) => normalize(term))
    .filter(Boolean)
    .find((term) => normalized.includes(term));
  const index = hit ? Math.max(0, normalized.indexOf(hit) - 120) : 0;
  return body.slice(index, index + 420).trim();
}

function candidateGroup(page, rank) {
  if (rank === 1) return 'best';
  if (String(page.page_type) === 'figure') return 'related_figure';
  return rank <= 3 ? 'general_reference' : 'neighbor';
}

function buildAnswer(question, candidates) {
  const directAnswer = extractDirectAnswer(question, candidates);
  const primaryCandidates = candidates.slice(0, 3);
  const answerLines = directAnswer
    ? directAnswer.items.map((item) => `- ${item}`)
    : primaryCandidates.map((candidate) => `- ${candidate.page_code}: ${compact(candidate.excerpt, 320)}`);
  return answerLines.join('\n').trim();
}

function buildReviewedAnswer(question, reviewed) {
  return (reviewed.answer_lines || []).join('\n').trim();
}

function mergeReviewedCandidates(question, candidates, pagesByCode, reviewed, now) {
  const reviewedCodes = reviewed.evidence_page_codes || [];
  const excerptTerms = reviewedExcerptTerms(question, reviewed);
  const reviewedCandidates = reviewedCodes
    .map((pageCode, index) => {
      const page = pagesByCode.get(pageCode);
      if (!page) return null;
      return {
        candidate_id: `cand_${question.question_id}_reviewed_${index + 1}`,
        question_id: question.question_id,
        page_id: page.page_id,
        ata: question.ata,
        candidate_group: index === 0 ? 'best' : 'reviewed_reference',
        page_code: page.page_code,
        pdf_page: page.pdf_page,
        title: page.title,
        section_title: page.section_title,
        excerpt: excerptFor(page, excerptTerms),
        body_text: page.body_text,
        score: 10000 - index,
        match_terms: 'reviewed_answer_reference',
        rank: index + 1,
        generated_by: `codex_reviewed_ata${question.ata}`,
        generated_at: now,
        user_status: 'reviewed_reference'
      };
    })
    .filter(Boolean);

  return reviewedCandidates;
}

function reviewedExcerptTerms(question, reviewed) {
  const questionText = normalize(`${question.question_text || ''} ${question.normalized_question || ''}`);
  const terms = [...(reviewed.evidence_terms || [])];
  [
    'FUNCTION',
    'CLOSE',
    'POWER SOURCE',
    'RATING',
    'LIGHT',
    'LOCATION',
    'CONTROL',
    'PURPOSE',
    'INPUT',
    'OIL SERVICE',
    'COMPONENT'
  ].forEach((term) => {
    if (questionText.includes(term)) terms.push(term);
  });
  terms.push(...(questionText.match(/[A-Z][A-Z0-9-]{1,}/g) || []));
  return uniq(terms);
}

function evidenceForReviewed(question, reviewed, pagesByCode) {
  const excerptTerms = reviewedExcerptTerms(question, reviewed);
  const pages = (reviewed.evidence_page_codes || [])
    .map((pageCode) => pagesByCode.get(pageCode))
    .filter(Boolean);
  return {
    pageCodes: pages.map((page) => page.page_code).join(', '),
    pageIds: pages.map((page) => page.page_id).join(', '),
    excerpts: pages.map((page) => `${page.page_code}: ${excerptFor(page, excerptTerms)}`).join('\n---\n')
  };
}

function extractDirectAnswer(question, candidates) {
  const questionText = normalize(question.question_text);
  if (!questionText.includes('FUNCTION')) return null;

  for (const candidate of candidates) {
    const body = String(candidate.body_text || candidate.excerpt || '').replace(/\s+/g, ' ').trim();
    const segment = extractFunctionBulletSegment_(body);
    if (!segment) continue;

    const items = [];
    const bulletPattern = /-\s*([^-]+?)(?=\s+-\s|$|\s+\()/g;
    let bullet;
    while ((bullet = bulletPattern.exec(segment)) !== null) {
      const item = bullet[1].replace(/\s+/g, ' ').replace(/[。.]+$/, '').trim();
      if (item && !/^INT\s*仕様機\)?$/i.test(item)) items.push(item);
    }

    if (items.length >= 2) {
      return {
        items: items.slice(0, expectedAnswerCount_(question) || 8),
        page_code: candidate.page_code,
        title: candidate.title
      };
    }
  }
  return null;
}

function extractFunctionBulletSegment_(body) {
  const lower = body.toLowerCase();
  let searchStart = 0;
  while (searchStart < lower.length) {
    const functionIndex = lower.indexOf('function', searchStart);
    if (functionIndex === -1) return '';

    const afterFunction = body.slice(functionIndex);
    const bulletStart = afterFunction.indexOf(' - ');
    if (bulletStart !== -1 && bulletStart < 120) {
      let segment = afterFunction.slice(bulletStart);
      [' B.', ' C.', ' D.', ' E.', ' MAIN BATT'].forEach((marker) => {
        const markerIndex = segment.indexOf(marker);
        if (markerIndex !== -1) {
          segment = segment.slice(0, markerIndex);
        }
      });
      return segment;
    }
    searchStart = functionIndex + 'function'.length;
  }
  return '';
}

function expectedAnswerCount_(question) {
  const text = String(question.question_text || '');
  if (/[２2]\s*つ/.test(text)) return 2;
  if (/[３3]\s*つ/.test(text)) return 3;
  if (/[５5]\s*つ/.test(text)) return 5;
  if (/[８8]\s*つ/.test(text)) return 8;
  return 0;
}

function compact(text, maxLength) {
  const value = String(text || '').replace(/\s+/g, ' ').trim();
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1)}…`;
}

function main() {
  const now = new Date().toISOString();
  const questions = readCsv(QUESTION_INPUT);
  const pages = readCsv(PAGES_INPUT);
  const pagesByCode = new Map(pages.map((page) => [page.page_code, page]));
  const candidateRows = [];
  const answerRows = [];
  const preparedQuestions = [];

  questions.forEach((question, questionIndex) => {
    const terms = termsForQuestion(question, questionIndex + 1);
    const scored = pages
      .map((page) => {
        const result = scorePage(question, terms, page);
        return { page, score: result.score, matches: result.matches };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    let candidates = scored.map((item, index) => {
      const page = item.page;
      return {
        candidate_id: `cand_${question.question_id}_${index + 1}`,
        question_id: question.question_id,
        page_id: page.page_id,
        ata: question.ata,
        candidate_group: candidateGroup(page, index + 1),
        page_code: page.page_code,
        pdf_page: page.pdf_page,
        title: page.title,
        section_title: page.section_title,
        excerpt: excerptFor(page, item.matches.length ? item.matches : terms),
        body_text: page.body_text,
        score: item.score,
        match_terms: item.matches.join(','),
        rank: index + 1,
        generated_by: 'codex_local_extractive',
        generated_at: now,
        user_status: 'none'
      };
    });

    const reviewed = REVIEWED_ANSWERS[question.question_id];
    if (reviewed) {
      candidates = mergeReviewedCandidates(question, candidates, pagesByCode, reviewed, now);
    }

    candidateRows.push(...candidates);
    const reviewedEvidence = reviewed ? evidenceForReviewed(question, reviewed, pagesByCode) : null;
    answerRows.push({
      note_id: `note_${question.question_id}_draft`,
      question_id: question.question_id,
      answer_text: reviewed ? buildReviewedAnswer(question, reviewed) : buildAnswer(question, candidates),
      evidence_page_codes: reviewed ? reviewedEvidence.pageCodes : candidates.slice(0, 3).map((row) => row.page_code).filter(Boolean).join(', '),
      evidence_page_ids: reviewed ? reviewedEvidence.pageIds : candidates.slice(0, 3).map((row) => row.page_id).filter(Boolean).join(', '),
      evidence_excerpts: reviewed ? reviewedEvidence.excerpts : candidates.slice(0, 3).map((row) => `${row.page_code}: ${row.excerpt}`).join('\n---\n'),
      source_type: reviewed ? `codex_reviewed_ata${question.ata}` : 'codex_local_extractive',
      status: reviewed ? (reviewed.status || 'answer_ready') : 'answer_ready',
      problem_reason: reviewed
        ? (reviewed.problem_reason || '')
        : 'Auto-generated from extracted Study Guide text.',
      created_at: now,
      updated_at: now
    });

    preparedQuestions.push({
      ...question,
      check_status: candidates.length ? 'answer_note_ready' : 'needs_review',
      updated_at: now
    });
  });

  fs.writeFileSync(QUESTION_OUTPUT, stringifyCsv(preparedQuestions, Object.keys(questions[0])), 'utf8');
  fs.writeFileSync(CANDIDATE_OUTPUT, stringifyCsv(candidateRows, CANDIDATE_HEADERS), 'utf8');
  fs.writeFileSync(ANSWER_OUTPUT, stringifyCsv(answerRows, ANSWER_HEADERS), 'utf8');

  console.log(`questions: ${questions.length}`);
  console.log(`candidate_links: ${candidateRows.length} -> ${path.relative(process.cwd(), CANDIDATE_OUTPUT)}`);
  console.log(`answer_notes: ${answerRows.length} -> ${path.relative(process.cwd(), ANSWER_OUTPUT)}`);
  console.log(`prepared question_bank: ${path.relative(process.cwd(), QUESTION_OUTPUT)}`);
}

main();
