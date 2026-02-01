function getSheetNames() {
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  return sheets.map(function(sheet) {
    return sheet.getName();
  });
}