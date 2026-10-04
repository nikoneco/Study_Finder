const IMPORTABLE_STUDY_SHEETS = [
  'source_files',
  'textbook_pages',
  'textbook_sections',
  'question_bank',
  'candidate_links',
  'answer_notes',
  'confirmed_answers',
  'review_queue',
  'term_dictionary',
  'search_log'
];

function importCsvText(payload) {
  assertPrivateMutationAllowed_();
  const sheetName = payload.sheet_name || payload.sheetName;
  const csvText = normalizeCsvText_(payload.csv_text || payload.csvText || '');
  const mode = payload.mode || 'replace';
  if (IMPORTABLE_STUDY_SHEETS.indexOf(sheetName) === -1) {
    throw new Error('Unsupported import sheet: ' + sheetName);
  }
  if (!csvText) {
    throw new Error('CSV text is empty.');
  }

  const schema = STUDY_SCHEMA[sheetName];
  if (!schema) {
    throw new Error('Schema not found for sheet: ' + sheetName);
  }

  const values = Utilities.parseCsv(csvText);
  if (!values.length) {
    throw new Error('CSV has no rows.');
  }
  const headers = values[0].map(function (header) {
    return String(header || '').replace(/^\uFEFF/, '').trim();
  });
  validateCsvHeaders_(sheetName, schema, headers);

  const rows = values.slice(1).filter(function (row) {
    return row.some(function (cell) { return cell !== ''; });
  });
  const spreadsheet = openStudySpreadsheet_();
  const sheet = ensureSheet_(spreadsheet, sheetName, schema);
  writeImportedRows_(sheet, schema, headers, rows, mode, {
    ata: payload.ata || payload.ata_filter || payload.ataFilter || ''
  });

  return {
    sheet_name: sheetName,
    mode: mode,
    imported_rows: rows.length,
    imported_columns: schema.length
  };
}

function importTextbookPagesFromRows(rows) {
  assertPrivateMutationAllowed_();
  const spreadsheet = openStudySpreadsheet_();
  const sheet = getSheet_(spreadsheet, 'textbook_pages');
  rows.forEach(function (row) {
    appendObject_(sheet, STUDY_SCHEMA.textbook_pages, row);
  });
  return rows.length;
}

function importQuestionsFromRows(rows) {
  assertPrivateMutationAllowed_();
  const spreadsheet = openStudySpreadsheet_();
  const sheet = getSheet_(spreadsheet, 'question_bank');
  rows.forEach(function (row) {
    appendObject_(sheet, STUDY_SCHEMA.question_bank, row);
  });
  return rows.length;
}

function rebuildRelatedPageLinks() {
  return {
    status: 'not_implemented',
    note: 'D/F related page link rebuild will be implemented after CSV import validation.'
  };
}

function rebuildKeywordIndex() {
  return {
    status: 'not_implemented',
    note: 'Search helper column rebuild will be implemented after CSV import validation.'
  };
}

function normalizeCsvText_(csvText) {
  return String(csvText || '').replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
}

function validateCsvHeaders_(sheetName, schema, headers) {
  const missing = schema.filter(function (header) {
    return headers.indexOf(header) === -1;
  });
  if (missing.length) {
    throw new Error(sheetName + ' CSV missing columns: ' + missing.join(', '));
  }
}

function writeImportedRows_(sheet, schema, headers, csvRows, mode, options) {
  options = options || {};
  ensureHeaders_(sheet, schema);
  if (mode === 'replace') {
    clearDataRows_(sheet);
  } else if (mode === 'replace_ata') {
    clearRowsByAta_(sheet, schema, options.ata);
  }
  if (!csvRows.length) {
    return;
  }

  const mappedRows = csvRows.map(function (csvRow) {
    return schema.map(function (header) {
      const sourceIndex = headers.indexOf(header);
      return sourceIndex === -1 ? '' : csvRow[sourceIndex];
    });
  });

  const startRow = mode === 'append' || mode === 'replace_ata' ? sheet.getLastRow() + 1 : 2;
  ensureGridSize_(sheet, startRow + mappedRows.length - 1, schema.length);
  const chunkSize = 100;
  for (let index = 0; index < mappedRows.length; index += chunkSize) {
    const chunk = mappedRows.slice(index, index + chunkSize);
    sheet.getRange(startRow + index, 1, chunk.length, schema.length).setValues(chunk);
  }
}

function clearRowsByAta_(sheet, schema, ata) {
  const ataValue = normalizeAtaKey_(ata);
  if (!ataValue) {
    throw new Error('ATA is required for replace_ata import.');
  }

  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    return;
  }

  const ataColumnIndex = schema.indexOf('ata');
  const questionIdColumnIndex = schema.indexOf('question_id');
  if (ataColumnIndex === -1 && questionIdColumnIndex === -1) {
    throw new Error('replace_ata is not supported for sheet without ata/question_id column: ' + sheet.getName());
  }

  const values = sheet.getRange(2, 1, lastRow - 1, Math.max(schema.length, sheet.getLastColumn())).getValues();
  for (let index = values.length - 1; index >= 0; index--) {
    const row = values[index];
    const rowAta = ataColumnIndex === -1 ? '' : normalizeAtaKey_(row[ataColumnIndex]);
    const questionId = questionIdColumnIndex === -1 ? '' : String(row[questionIdColumnIndex] || '');
    if (rowAta === ataValue || questionId.indexOf('q_' + ataValue + '_') === 0) {
      sheet.deleteRow(index + 2);
    }
  }
}

function normalizeAtaKey_(value) {
  const text = String(value === null || value === undefined ? '' : value).trim().toUpperCase();
  if (/^5X$/.test(text)) {
    return '5X';
  }
  if (/^7X$/.test(text)) {
    return '7X';
  }
  const digits = text.replace(/\D/g, '');
  return digits ? digits.padStart(2, '0') : '';
}

function clearDataRows_(sheet) {
  const lastRow = sheet.getLastRow();
  const lastColumn = Math.max(sheet.getLastColumn(), 1);
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, lastColumn).clearContent();
  }
}

function ensureGridSize_(sheet, requiredRows, requiredColumns) {
  if (sheet.getMaxRows() < requiredRows) {
    sheet.insertRowsAfter(sheet.getMaxRows(), requiredRows - sheet.getMaxRows());
  }
  if (sheet.getMaxColumns() < requiredColumns) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), requiredColumns - sheet.getMaxColumns());
  }
}
