/**
 * A3 Pallet - Master Lead Tracking System
 * This script appends leads to a master sheet and saves attachments to a specific folder.
 */

const CONFIG = {
  // SETTINGS
  MASTER_LOG_SHEET_ID: "1_d-MihtvegIGwBGgwa-ew0YEp5JNgxcgcRx4jryjsIs",
  UPLOAD_FOLDER_ID: "0AKNF15Nmiqz0Uk9PVA",
  SECRET_TOKEN: "a3-secure-token-2026-xyz",
  
  // Tab Names
  TAB_STANDARD: "Standard Orders",
  TAB_CUSTOM: "Custom Quotes",
  
  // Column Definitions
  COLS_STANDARD: [
    "Timestamp", "Name", "Company", "Email", "Phone", "ZIP Code", 
    "Pallet Type", "Quantity", "Frequency", "Delivery Method", "Notes"
  ],
  COLS_CUSTOM: [
    "Timestamp", "Name", "Company", "Email", "Phone", "ZIP Code", 
    "Dimensions", "Design Style", "Heat Treatment", "Quantity", 
    "Load Weight", "Wood Type", "Design Notes", "Attachment Links"
  ]
};

function doGet(e) {
  return ContentService.createTextOutput("CRM System Online v2");
}

function doPost(e) {
  try {
    const rawData = e.postData.contents;
    const data = JSON.parse(rawData);
    
    // 1. Security Check
    if (!data.token || data.token !== CONFIG.SECRET_TOKEN) {
      return responseError("403 Unauthorized", 403);
    }

    // 2. Open Spreadsheet
    const ss = SpreadsheetApp.openById(CONFIG.MASTER_LOG_SHEET_ID);
    
    // 3. Process Logic based on Type
    if (data.type === "custom_quote") {
      handleCustomOrder(ss, data);
    } else {
      // Default to Standard Order
      handleStandardOrder(ss, data);
    }

    return responseSuccess({ success: true });

  } catch (err) {
    console.error("Critical Error: " + err.toString());
    return responseError(err.toString(), 500);
  }
}

function handleStandardOrder(ss, data) {
  let sheet = ensureSheet(ss, CONFIG.TAB_STANDARD, CONFIG.COLS_STANDARD);
  
  const row = [
    data.timestamp || new Date().toISOString(),
    data.name,
    data.company,
    data.email,
    data.phone,
    data.zip,
    data.palletType,
    data.quantity,
    data.frequency,
    data.deliveryMode,
    data.notes
  ];
  
  sheet.appendRow(row);
  sendEmailNotification(data, [], "Standard Order");
}

function handleCustomOrder(ss, data) {
  let sheet = ensureSheet(ss, CONFIG.TAB_CUSTOM, CONFIG.COLS_CUSTOM);
  
  // Handle Attachments
  const links = processAttachments(data);
  
  const row = [
    data.timestamp || new Date().toISOString(),
    data.name,
    data.company,
    data.email,
    data.phone,
    data.zip,
    data.dimensions,
    data.designType,
    data.heatTreated,
    data.quantity,
    data.loadRating,
    data.woodType,
    data.notes,
    links.join(", ")
  ];
  
  sheet.appendRow(row);
  sendEmailNotification(data, links, "Custom Quote");
}

function ensureSheet(ss, tabName, headers) {
  let sheet = ss.getSheetByName(tabName);
  if (!sheet) {
    sheet = ss.insertSheet(tabName);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function processAttachments(data) {
  const links = [];
  if (data.files && Array.isArray(data.files) && data.files.length > 0) {
    const folder = DriveApp.getFolderById(CONFIG.UPLOAD_FOLDER_ID);
    data.files.forEach(fileObj => {
      if (fileObj.base64 && fileObj.name) {
        const decoded = Utilities.base64Decode(fileObj.base64);
        const blob = Utilities.newBlob(decoded, fileObj.mimeType, fileObj.name);
        const file = folder.createFile(blob);
        links.push(file.getUrl());
      }
    });
  }
  return links;
}

function sendEmailNotification(data, links, typeLabel) {
  try {
    const recipient = "sales@a3pallet.com";
    const subject = `[New Request] ${typeLabel} - ${data.company}`;
    
    let body = `New ${typeLabel} Received\n\n`;
    body += `From: ${data.name} (${data.company})\n`;
    body += `Email: ${data.email}\n`;
    body += `Phone: ${data.phone}\n`;
    body += `ZIP: ${data.zip}\n\n`;
    
    if (data.type === "custom_quote") {
      body += `Specs: ${data.dimensions}\n`;
      body += `Design: ${data.designType}\n`;
      body += `Qty: ${data.quantity}\n`;
    } else {
      body += `Type: ${data.palletType}\n`;
      body += `Qty: ${data.quantity}\n`;
      body += `Freq: ${data.frequency}\n`;
    }
    
    body += `\nNotes: ${data.notes}\n`;
    
    if (links.length > 0) {
      body += `\nAttachments:\n${links.join("\n")}`;
    }

    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      body: body,
      replyTo: data.email
    });
  } catch (e) {
    console.error("Email processing failed: " + e.toString());
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
