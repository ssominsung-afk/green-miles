/**
 * A3 Pallet - CRM & Automation FINAL
 * This script handles order submissions, logs data to Sheets, and sends Email/SMS alerts.
 */
const CONFIG = {
  API_TOKEN: "pall-secret-99",
  EMAILS: ["sales@a3pallet.com"], // Primary notification email
  TWILIO: {
    SID: "REPLACE_WITH_YOUR_TWILIO_SID",
    TOKEN: "REPLACE_WITH_YOUR_TWILIO_TOKEN",
    PHONE: "+18884380855"
  },
  SMS_RECIPIENTS: ["+14049330098", "+14045425914"],
  SHEETS: {
    STANDARD: "Leads_StandardOrders",
    CUSTOM: "Leads_CustomRequests",
    LOG: "Activity_Log",
    DEBUG: "Debug_Log"
  }
};

/**
 * GET Request handler for testing connection directly in a browser.
 */
function doGet() {
  return ContentService.createTextOutput("CONNECTION SUCCESSFUL - A3 CRM LIVE")
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * POST Request handler for incoming form submissions.
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const timestamp = new Date();
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const debugSheet = ss.getSheetByName(CONFIG.SHEETS.DEBUG) || ss.insertSheet(CONFIG.SHEETS.DEBUG);
    
    // 1. Log Raw Request for Debugging
    const rawData = e.postData.contents;
    debugSheet.appendRow([timestamp, "RECEIVED", rawData]);
    
    const data = JSON.parse(rawData);
    if (data.token !== CONFIG.API_TOKEN) return responseError("Invalid Token");

    const formType = data.formType;
    let sheetName = (formType === "CustomRequest") ? CONFIG.SHEETS.CUSTOM : CONFIG.SHEETS.STANDARD;
    let sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);
    
    // Header check
    if (sheet.getLastRow() === 0) {
      const headers = (formType === "CustomRequest") 
        ? ["Timestamp", "Name", "Company", "Email", "Phone", "ZIP", "Dimensions", "Design", "Load", "Wood", "HT", "Qty", "Notes", "File"]
        : ["Timestamp", "Name", "Company", "Email", "Phone", "ZIP", "Type", "Qty", "Freq", "Mode", "Addr", "Notes"];
      sheet.appendRow(headers);
    }

    // 2. Append Data Record
    const row = [
      timestamp, 
      data.name, 
      data.company, 
      data.email, 
      data.phone, 
      data.zip, 
      data.palletType || data.dimensions, 
      data.quantity, 
      data.frequency || data.designType, 
      data.deliveryMode || data.loadRating, 
      data.deliveryAddress || data.woodType, 
      data.notes,
      data.fileName || ""
    ];
    sheet.appendRow(row);

    // 3. Record to Activity Log
    const logSheet = ss.getSheetByName(CONFIG.SHEETS.LOG) || ss.insertSheet(CONFIG.SHEETS.LOG);
    if (logSheet.getLastRow() === 0) logSheet.appendRow(["Timestamp", "Activity", "Form Type", "Email"]);
    logSheet.appendRow([timestamp, "Order Received", formType, data.email]);

    // 4. Trigger Notifications
    sendFinalNotifications(data, timestamp);

    return responseSuccess();
  } catch (err) {
    return responseError(err.toString());
  } finally {
    lock.releaseLock();
  }
}

/**
 * Core notification logic for Email and SMS.
 */
function sendFinalNotifications(data, timestamp) {
  const subject = `New Website Inquiry - ${data.company}`;
  const body = `Details for ${data.formType}:\n\n` +
               `Customer: ${data.name}\n` +
               `Company: ${data.company}\n` +
               `Phone: ${data.phone}\n` +
               `Email: ${data.email}\n` +
               `ZIP: ${data.zip}\n` +
               `Quantity: ${data.quantity}\n` +
               `Notes: ${data.notes || "N/A"}\n` +
               `File Attachment: ${data.fileName ? "YES (" + data.fileName + ")" : "NO"}\n\n` +
               `Database: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}`;
  
  // 1. Send Email via MailApp (Reliable & simple)
  const myEmail = Session.getActiveUser().getEmail();
  const options = {};
  
  if (data.fileData && data.fileName) {
    try {
      const blob = Utilities.newBlob(
        Utilities.base64Decode(data.fileData),
        data.fileType || "application/octet-stream",
        data.fileName
      );
      options.attachments = [blob];
    } catch (e) {
      console.error("Attachment processing error: " + e.toString());
    }
  }

  try {
    MailApp.sendEmail(CONFIG.EMAILS[0], subject, body, options);
    if (CONFIG.EMAILS[0] !== myEmail) {
      MailApp.sendEmail(myEmail, "Copy: " + subject, body, options);
    }
  } catch (e) {
    console.error("Email Error: " + e.toString());
  }

  // 2. Send SMS via Twilio API
  const smsBody = `[A3] New Inquiry: ${data.name} (${data.zip}) Qty:${data.quantity}`;
  CONFIG.SMS_RECIPIENTS.forEach(num => {
    try {
      const auth = "Basic " + Utilities.base64Encode(CONFIG.TWILIO.SID + ":" + CONFIG.TWILIO.TOKEN);
      UrlFetchApp.fetch(`https://api.twilio.com/2010-04-01/Accounts/${CONFIG.TWILIO.SID}/Messages.json`, {
        method: "post",
        headers: { Authorization: auth },
        payload: { To: num, From: CONFIG.TWILIO.PHONE, Body: smsBody },
        muteHttpExceptions: true
      });
    } catch(e) {}
  });
}

function responseSuccess() { 
  return ContentService.createTextOutput(JSON.stringify({result:"success"}))
    .setMimeType(ContentService.MimeType.JSON); 
}

function responseError(m) { 
  return ContentService.createTextOutput(JSON.stringify({result:"error",error:m}))
    .setMimeType(ContentService.MimeType.JSON); 
}

/**
 * TEST FUNCTION: Simulates a form submission.
 */
function testSubmission() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        token: CONFIG.API_TOKEN,
        formType: "OrderRequest",
        name: "Test User",
        company: "Test Co",
        email: Session.getActiveUser().getEmail(),
        phone: "555-0000",
        zip: "00000",
        palletType: "New 48x40",
        quantity: "100",
        notes: "Test run"
      })
    }
  };
  console.log(doPost(mockEvent).getContent());
}
