// ─────────────────────────────────────────────────────────────────
// Quiz → Google Sheets collector
// Deploy as: Extensions > Apps Script > Deploy > New deployment
//   Type: Web App
//   Execute as: Me
//   Who has access: Anyone
// Then paste the Web App URL into index.html → SHEET_ENDPOINT
// ─────────────────────────────────────────────────────────────────

const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID_HERE"; // ← paste your Sheet ID
const SHEET_NAME     = "Responses";                 // ← tab name (create it first)

// ── Handle POST from the quiz ──────────────────────────────────
function doPost(e) {
  try {
    const data    = JSON.parse(e.postData.contents);
    const ss      = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet   = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    const responses = data.responses || [];

    // Write header row once (if sheet is empty)
    if (sheet.getLastRow() === 0) {
      const headers = ["Timestamp", ...responses.map(r => r.question)];
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length)
           .setFontWeight("bold")
           .setBackground("#f5f0e8");
      sheet.setFrozenRows(1);
    }

    // Write the answer row
    const row = [data.timestamp, ...responses.map(r => r.answer)];
    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── Handle GET (for browser / curl testing) ───────────────────
function doGet() {
  return ContentService
    .createTextOutput("Quiz endpoint is live.")
    .setMimeType(ContentService.MimeType.TEXT);
}
