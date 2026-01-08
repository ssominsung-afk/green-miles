import { OrderRequestData, CustomRequestData } from './types';

// Apps Script Web App URL (Simon's Account)
const CRM_URL = "https://script.google.com/macros/s/AKfycbwXJ0JqtbrKH7TUgAQrq7V1zdA_EewuFoJ0pxbZd_M5SNCTDipoCYC3TLS1zzbtZe1Y/exec";
const CRM_TOKEN = "a3-secure-token-2026-xyz";

async function handleResponse(response: Response) {
    const text = await response.text();
    let result;
    try {
        result = JSON.parse(text);
    } catch (e) {
        console.error("Failed to parse Apps Script response:", text);
        // Apps Script HTML error pages are long, so just take the title or substring
        const errorSummary = text.includes("<title>")
            ? text.split("<title>")[1].split("</title>")[0]
            : text.substring(0, 100);
        throw new Error(`Server Error: ${errorSummary}...`);
    }

    if (!result.success) {
        throw new Error(result.error || "Submission failed");
    }
    return result;
}

export async function submitOrder(data: OrderRequestData) {
    if (!CRM_URL) throw new Error("CRM URL is not configured");

    const payload = {
        ...data,
        type: "standard_order",
        timestamp: new Date().toISOString(),
        token: CRM_TOKEN
    };

    const response = await fetch(CRM_URL, {
        method: "POST",
        headers: {
            "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
    });

    return handleResponse(response);
}

export async function submitCustomRequest(data: CustomRequestData) {
    if (!CRM_URL) throw new Error("CRM URL is not configured");

    const payload = {
        ...data,
        type: "custom_quote",
        timestamp: new Date().toISOString(),
        token: CRM_TOKEN
    };

    const response = await fetch(CRM_URL, {
        method: "POST",
        headers: {
            "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
    });

    return handleResponse(response);
}
