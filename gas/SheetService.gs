function openStudySpreadsheet_() {
  const id = getScriptProperty_(CONFIG.PROPERTIES.STUDY737_DB_ID);
  if (!id) {
    throw new Error('Study737_DB is not configured. Run setupProject first.');
  }
  return SpreadsheetApp.openById(id);
}

function getSheet_(spreadsheet, sheetName) {
  const sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    throw new Error('Sheet not found: ' + sheetName);
  }
  return sheet;
}

function ensureSheet_(spreadsheet, sheetName, headers) {
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }
  ensureHeaders_(sheet, headers);
  return sheet;
}

function ensureHeaders_(sheet, headers) {
  if (!headers || !headers.length) {
    return;
  }
  const range = sheet.getRange(1, 1, 1, headers.length);
  const values = range.getValues()[0];
  const needsWrite = headers.some(function (header, index) {
    return values[index] !== header;
  });
  if (needsWrite) {
    range.setValues([headers]);
    sheet.setFrozenRows(1);
  }
}

function readObjects_(sheet) {
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) {
    return [];
  }
  const headers = values[0].map(String);
  return values.slice(1).filter(function (row) {
    return row.some(function (cell) {
      return cell !== '';
    });
  }).map(function (row) {
    return rowToObject_(headers, row);
  });
}

function readObjectsByColumnValue_(sheet, columnName, columnValue) {
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  if (lastRow < 2 || lastColumn < 1) {
    return [];
  }
  const headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0].map(String);
  const columnIndex = headers.indexOf(columnName);
  if (columnIndex === -1) {
    throw new Error('Column not found: ' + columnName);
  }

  const matches = sheet
    .getRange(2, columnIndex + 1, lastRow - 1, 1)
    .createTextFinder(String(columnValue))
    .matchEntireCell(true)
    .findAll();

  return matches.map(function (match) {
    const row = sheet.getRange(match.getRow(), 1, 1, lastColumn).getValues()[0];
    return rowToObject_(headers, row);
  });
}

function readObjectByColumnValue_(sheet, columnName, columnValue) {
  const rows = readObjectsByColumnValue_(sheet, columnName, columnValue);
  return rows.length ? rows[0] : null;
}

function rowToObject_(headers, row) {
  return headers.reduce(function (obj, header, index) {
    obj[header] = row[index];
    return obj;
  }, {});
}

function appendObject_(sheet, headers, object) {
  const row = headers.map(function (header) {
    return object[header] !== undefined ? object[header] : '';
  });
  sheet.appendRow(row);
}

function updateObjectById_(sheet, idColumn, idValue, patch) {
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) {
    return false;
  }
  const headers = values[0].map(String);
  const idIndex = headers.indexOf(idColumn);
  if (idIndex === -1) {
    throw new Error('ID column not found: ' + idColumn);
  }
  for (let rowIndex = 1; rowIndex < values.length; rowIndex++) {
    if (String(values[rowIndex][idIndex]) === String(idValue)) {
      Object.keys(patch).forEach(function (key) {
        const columnIndex = headers.indexOf(key);
        if (columnIndex !== -1) {
          sheet.getRange(rowIndex + 1, columnIndex + 1).setValue(patch[key]);
        }
      });
      return true;
    }
  }
  return false;
}

function generateId_(prefix) {
  return prefix + '_' + Utilities.getUuid().replace(/-/g, '').slice(0, 16);
}

function nowIso_() {
  return new Date().toISOString();
}
