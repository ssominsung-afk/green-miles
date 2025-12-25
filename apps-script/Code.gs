/**
 * Pallet Sales CRM Backend
 * Handles POST requests from website forms and appends to Google Sheets.
 */

const API_TOKEN = "pall-secret-99"; // Must match NEXT_PUBLIC_CRM_TOKEN

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    
    // Parse Request
    const rawData = e.postData.contents;
    const jsonData = JSON.parse(rawData);
    
    // Auth Check
    if (jsonData.token !== API_TOKEN) {
      return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': 'Invalid Token' })).setMimeType(ContentService.MimeType.JSON);
    }

    // Determine Form Type
    const formType = jsonData.formType; // "OrderRequest" or "CustomRequest"
    let sheetName = "Leads_StandardOrders"; // Default
    
    if (formType === "CustomRequest") {
      sheetName = "Leads_CustomRequests";
    }

    // Get or Create Sheet
    let sheet = doc.getSheetByName(sheetName);
    if (!sheet) {
      sheet = doc.insertSheet(sheetName);
      // Create Headers if new
      if (formType === "CustomRequest") {
         sheet.appendRow(["Timestamp", "Name", "Company", "Email", "Phone", "ZIP", "Dimensions", "DesignType", "LoadRating", "Qty", "Notes"]);
      } else {
         sheet.appendRow(["Timestamp", "Name", "Company", "Email", "Phone", "ZIP", "PalletType", "Qty", "Frequency", "DeliveryMode", "Notes"]);
      }
    }

    // Prepare Row Data
    const timestamp = new Date();
    let rowData = [];
    
    if (formType === "CustomRequest") {
       rowData = [
         timestamp,
         jsonData.name,
         jsonData.company,
         jsonData.email,
         jsonData.phone,
         jsonData.zip,
         jsonData.dimensions,
         jsonData.designType,
         jsonData.loadRating,
         jsonData.quantity,
         jsonData.notes
       ];
    } else {
       // Standard Order
       rowData = [
         timestamp,
         jsonData.name,
         jsonData.company,
         jsonData.email,
         jsonData.phone,
         jsonData.zip,
         jsonData.palletType,
         jsonData.quantity,
         jsonData.frequency,
         jsonData.deliveryMode,
         jsonData.notes
       ];
    }

    // Append
    sheet.appendRow(rowData);

    // Log to Activity Log (optional)
    const logSheet = doc.getSheetByName("Activity_Log") || doc.insertSheet("Activity_Log");
    logSheet.appendRow([timestamp, "New Submission", formType, jsonData.email]);

    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' })).setMimeType(ContentService.MimeType.JSON);

  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': e.toString() })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
