const STUDY_SCHEMA = {
  source_files: [
    'source_id',
    'source_type',
    'ata',
    'file_name',
    'drive_file_id',
    'local_path',
    'version',
    'note',
    'imported_at'
  ],
  textbook_pages: [
    'page_id',
    'ata',
    'source_id',
    'pdf_name',
    'pdf_page',
    'page_code',
    'page_type',
    'section_code',
    'section_title',
    'title',
    'body_text',
    'normalized_text',
    'keywords',
    'related_page_code',
    'related_page_id',
    'drive_url',
    'created_at',
    'updated_at'
  ],
  textbook_sections: [
    'section_id',
    'ata',
    'section_name',
    'start_page_code',
    'end_page_code',
    'source_id',
    'display_order',
    'keywords'
  ],
  question_bank: [
    'question_id',
    'ata',
    'source_id',
    'pdf_page',
    'section_name',
    'subsection_name',
    'question_text',
    'normalized_question',
    'question_type',
    'expected_answer_style',
    'check_status',
    'confirmed_answer_id',
    'created_at',
    'updated_at'
  ],
  candidate_links: [
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
  ],
  answer_notes: [
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
  ],
  confirmed_answers: [
    'answer_id',
    'question_id',
    'final_answer_text',
    'evidence_page_codes',
    'evidence_page_ids',
    'evidence_excerpts',
    'user_note',
    'confidence_by_user',
    'created_at',
    'updated_at'
  ],
  review_queue: [
    'review_id',
    'question_id',
    'ata',
    'section_name',
    'question_text',
    'current_answer_text',
    'candidate_page_codes',
    'candidate_excerpts',
    'problem_reason',
    'priority',
    'assigned_to',
    'status',
    'created_at',
    'updated_at'
  ],
  term_dictionary: [
    'term',
    'full_name',
    'japanese',
    'aliases',
    'ata',
    'note',
    'location',
    'function',
    'evidence_page_codes',
    'status'
  ],
  search_log: [
    'log_id',
    'action',
    'question_id',
    'query',
    'result_count',
    'selected_candidate_id',
    'status',
    'message',
    'created_at'
  ]
};

function getSetupStatus() {
  return {
    study737DbId: getScriptProperty_(CONFIG.PROPERTIES.STUDY737_DB_ID) || '',
    study737FolderId: getScriptProperty_(CONFIG.PROPERTIES.STUDY737_FOLDER_ID) || ''
  };
}

function setupProject_() {
  const folderId = getRequiredScriptProperty_(CONFIG.PROPERTIES.STUDY737_FOLDER_ID);

  const study = ensureSpreadsheetInFolder_(
    folderId,
    CONFIG.SPREADSHEETS.STUDY737_DB_TITLE
  );
  setScriptProperty_(CONFIG.PROPERTIES.STUDY737_DB_ID, study.getId());

  Object.keys(STUDY_SCHEMA).forEach(function (sheetName) {
    ensureSheet_(study, sheetName, STUDY_SCHEMA[sheetName]);
  });
  removeBlankDefaultSheet_(study);
  seedStudySamples_(study);

  return {
    study737Db: {
      id: study.getId(),
      url: study.getUrl()
    }
  };
}

function ensureSpreadsheetInFolder_(folderId, title) {
  const folder = DriveApp.getFolderById(folderId);
  const existing = folder.getFilesByName(title);
  while (existing.hasNext()) {
    const file = existing.next();
    if (file.getMimeType() === MimeType.GOOGLE_SHEETS) {
      return SpreadsheetApp.openById(file.getId());
    }
  }

  const spreadsheet = SpreadsheetApp.create(title);
  const file = DriveApp.getFileById(spreadsheet.getId());
  file.moveTo(folder);
  return spreadsheet;
}

function removeBlankDefaultSheet_(spreadsheet) {
  const sheet = spreadsheet.getSheetByName('シート1') || spreadsheet.getSheetByName('Sheet1');
  if (!sheet || spreadsheet.getSheets().length <= 1) {
    return;
  }
  const values = sheet.getDataRange().getValues();
  const isBlank = values.length === 1 && values[0].length === 1 && values[0][0] === '';
  if (isBlank) {
    spreadsheet.deleteSheet(sheet);
  }
}

function seedStudySamples_(spreadsheet) {
  const questionSheet = getSheet_(spreadsheet, 'question_bank');
  const pageSheet = getSheet_(spreadsheet, 'textbook_pages');
  const candidateSheet = getSheet_(spreadsheet, 'candidate_links');
  const sourceSheet = getSheet_(spreadsheet, 'source_files');
  const termSheet = getSheet_(spreadsheet, 'term_dictionary');

  if (!readObjects_(sourceSheet).some(function (row) { return row.source_id === 'src_sg_24_ref'; })) {
    appendObject_(sourceSheet, STUDY_SCHEMA.source_files, {
      source_id: 'src_sg_24_ref',
      source_type: 'study_guide_pdf',
      ata: '24',
      file_name: '24_REF.pdf',
      drive_file_id: '',
      local_path: 'Study_Guide/24_REF.pdf',
      version: 'sample',
      note: 'Initial local source. CSV import will replace sample rows later.',
      imported_at: nowIso_()
    });
  }

  if (!readObjects_(questionSheet).some(function (row) { return row.question_id === 'q_24_sample_standby_light'; })) {
    appendObject_(questionSheet, STUDY_SCHEMA.question_bank, {
      question_id: 'q_24_sample_standby_light',
      ata: '24',
      source_id: 'src_question_bank',
      pdf_page: 4,
      section_name: 'Electrical Power',
      subsection_name: 'Generator Drive and Standby Power Module',
      question_text: 'Explain the three lights on the Generator Drive and Standby Power Module.',
      normalized_question: normalizeText('Explain the three lights on the Generator Drive and Standby Power Module.'),
      question_type: 'condition_list',
      expected_answer_style: 'list',
      check_status: CONFIG.STATUS.CANDIDATE_READY,
      confirmed_answer_id: '',
      created_at: nowIso_(),
      updated_at: nowIso_()
    });
  }

  if (!readObjects_(pageSheet).some(function (row) { return row.page_id === 'pg_24_d0_09'; })) {
    appendObject_(pageSheet, STUDY_SCHEMA.textbook_pages, {
      page_id: 'pg_24_d0_09',
      ata: '24',
      source_id: 'src_sg_24_ref',
      pdf_name: '24_REF.pdf',
      pdf_page: 21,
      page_code: 'D0-09',
      page_type: 'text',
      section_code: '24-00',
      section_title: 'Electrical Power',
      title: 'GENERATOR DRIVE AND STANDBY POWER MODULE - GENERAL DESCRIPTION',
      body_text: 'The module includes the IDG low oil pressure indication, standby power off light, generator drive disconnect switch, and standby power switch.',
      normalized_text: normalizeText('Generator Drive and Standby Power Module DRIVE Light STANDBY PWR OFF Light Generator Drive Disconnect Switch Standby Power Switch'),
      keywords: 'Generator Drive,Standby Power Module,DRIVE Light,STANDBY PWR OFF Light',
      related_page_code: 'F0-09',
      related_page_id: 'pg_24_f0_09',
      drive_url: '',
      created_at: nowIso_(),
      updated_at: nowIso_()
    });
    appendObject_(pageSheet, STUDY_SCHEMA.textbook_pages, {
      page_id: 'pg_24_f0_09',
      ata: '24',
      source_id: 'src_sg_24_ref',
      pdf_name: '24_REF.pdf',
      pdf_page: 20,
      page_code: 'F0-09',
      page_type: 'figure',
      section_code: '24-00',
      section_title: 'Electrical Power',
      title: 'GEN DRIVE AND STANDBY POWER MODULE-DESCRIPTION',
      body_text: 'Generator Drive and Standby Power Module figure page.',
      normalized_text: normalizeText('Generator Drive and Standby Power Module figure DRIVE Light STANDBY PWR OFF Light'),
      keywords: 'Generator Drive,Standby Power Module,figure',
      related_page_code: 'D0-09',
      related_page_id: 'pg_24_d0_09',
      drive_url: '',
      created_at: nowIso_(),
      updated_at: nowIso_()
    });
  }

  if (!readObjects_(candidateSheet).some(function (row) { return row.candidate_id === 'cand_24_sample_d0_09'; })) {
    appendObject_(candidateSheet, STUDY_SCHEMA.candidate_links, {
      candidate_id: 'cand_24_sample_d0_09',
      question_id: 'q_24_sample_standby_light',
      page_id: 'pg_24_d0_09',
      ata: '24',
      candidate_group: 'best',
      page_code: 'D0-09',
      pdf_page: 21,
      title: 'GENERATOR DRIVE AND STANDBY POWER MODULE - GENERAL DESCRIPTION',
      section_title: 'Electrical Power',
      excerpt: 'The module includes the IDG low oil pressure indication and standby power off light.',
      score: 95,
      match_terms: 'Generator Drive,Standby Power Module,Light',
      rank: 1,
      generated_by: 'manual',
      generated_at: nowIso_(),
      user_status: 'none'
    });
    appendObject_(candidateSheet, STUDY_SCHEMA.candidate_links, {
      candidate_id: 'cand_24_sample_f0_09',
      question_id: 'q_24_sample_standby_light',
      page_id: 'pg_24_f0_09',
      ata: '24',
      candidate_group: 'related_figure',
      page_code: 'F0-09',
      pdf_page: 20,
      title: 'GEN DRIVE AND STANDBY POWER MODULE-DESCRIPTION',
      section_title: 'Electrical Power',
      excerpt: 'Related figure page for the Generator Drive and Standby Power Module.',
      score: 70,
      match_terms: 'Generator Drive,Standby Power Module',
      rank: 2,
      generated_by: 'manual',
      generated_at: nowIso_(),
      user_status: 'none'
    });
  }

  if (!readObjects_(termSheet).some(function (row) { return row.term === 'IDG'; })) {
    [
      [
        'IDG',
        'Integrated Drive Generator',
        '',
        'Generator Drive',
        '24',
        'Initial seed',
        'Each engine accessory gearbox.',
        'Converts variable engine speed to constant generator speed and supplies 115/200 V AC at 400 Hz.',
        'D2-02, D2-04, D2-09',
        'active'
      ],
      [
        'GCU',
        'Generator Control Unit',
        '',
        '',
        '24',
        'Initial seed',
        'EE compartment: GCU 1 on E2 rack, GCU 2 on E4 rack.',
        'Controls IDG excitation, GCB/BTB operation, electrical protection, indication, and BITE.',
        'D3-08',
        'active'
      ],
      [
        'BPCU',
        'Bus Power Control Unit',
        '',
        '',
        '24',
        'Initial seed',
        'EE compartment E4 rack.',
        'Controls external power distribution, EPC/BTB operation, load shed, indication, and protection.',
        'D1-03, D1-06',
        'active'
      ],
      [
        'TRU',
        'Transformer Rectifier Unit',
        '',
        '',
        '24',
        'Initial seed',
        'TRU 1 on E2 rack; TRU 2 and 3 on E4 rack.',
        'Converts 115 V AC to 28 V DC for the DC distribution system.',
        'D4-05, D4-06',
        'active'
      ]
    ].forEach(function (row) {
      appendObject_(termSheet, STUDY_SCHEMA.term_dictionary, {
        term: row[0],
        full_name: row[1],
        japanese: row[2],
        aliases: row[3],
        ata: row[4],
        note: row[5],
        location: row[6],
        function: row[7],
        evidence_page_codes: row[8],
        status: row[9]
      });
    });
  }
}
