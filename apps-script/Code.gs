/**
 * A3 Pallet - Master Lead Tracking System
 * This script appends leads to a master sheet and saves attachments to a specific folder.
 */

const CONFIG = {
  // SETTINGS - UPDATE THESE
  MASTER_LOG_SHEET_ID: "INSERT_YOUR_SPREADSHEET_ID_HERE",
  UPLOAD_FOLDER_ID: "0AKNF15Nmiqz0Uk9PVA",
  MASTER_TAB_NAME: "Leads",
  SECRET_TOKEN: "SET_A_LONG_SECURE_TOKEN_HERE",
  
  // Columns Mapping for header creation
  COLUMNS: [
    "Timestamp", 
    "Type", 
    "Company", 
    "Name", 
    "Email", 
    "Phone", 
    "Notes", 
    "Attachment Links", 
    "Attachment Count", 
    "Drive Folder Link"
  ]
};

/**
 * Handle POST request from Next.js API
 */
function doPost(e) {
  try {
    const rawData = e.postData.contents;
    const data = JSON.parse(rawData);
    
    // 1. Security Token Validation
    if (!data.token || data.token !== CONFIG.SECRET_TOKEN) {
      return responseError("403 Unauthorized", 403);
    }

    // 2. Open Master Sheet and Tab
    const ss = SpreadsheetApp.openById(CONFIG.MASTER_LOG_SHEET_ID);
    let sheet = ss.getSheetByName(CONFIG.MASTER_TAB_NAME);
    
    if (!sheet) {
      sheet = ss.insertSheet(CONFIG.MASTER_TAB_NAME);
      sheet.appendRow(CONFIG.COLUMNS);
      sheet.getRange(1, 1, 1, CONFIG.COLUMNS.length).setFontWeight("bold");
    }

    // 3. Process Attachments
    const attachmentLinks = [];
    if (data.files && Array.isArray(data.files)) {
      const folder = DriveApp.getFolderById(CONFIG.UPLOAD_FOLDER_ID);
      
      data.files.forEach(fileObj => {
        if (fileObj.base64 && fileObj.name) {
          const decoded = Utilities.base64Decode(fileObj.base64);
          const blob = Utilities.newBlob(decoded, fileObj.mimeType || "application/octet-stream", fileObj.name);
          const file = folder.createFile(blob);
          attachmentLinks.push(file.getUrl());
        }
      });
    }

    // 4. Prepare Row Data
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.type || "unknown",
      data.company || "",
      data.name || "",
      data.email || "",
      data.phone || "",
      data.notes || "",
      attachmentLinks.join("\n"),
      attachmentLinks.length,
      `https://drive.google.com/drive/folders/${CONFIG.UPLOAD_FOLDER_ID}`
    ];

    // 5. Append to Sheet
    sheet.appendRow(rowData);

    return responseSuccess({
      success: true,
      attachments: attachmentLinks
    });

  } catch (err) {
    console.error("Critical Error: " + err.toString());
    return responseError(err.toString(), 500);
  }
}

function responseSuccess(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function responseError(message, code) {
  return ContentService.createTextOutput(JSON.stringify({
    success: false,
    error: message,
    code: code
  }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function to verify sheet access
 */
function testConnection() {
  try {
    const ss = SpreadsheetApp.openById(CONFIG.MASTER_LOG_SHEET_ID);
    console.log("Connected to: " + ss.getName());
  } catch (e) {
    console.error("Connection Failed: " + e.toString());
  }
}
