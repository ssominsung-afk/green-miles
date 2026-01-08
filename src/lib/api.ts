import { OrderRequestData, CustomRequestData } from './types';

// Apps Script Web App URL (Simon's Account)
const CRM_URL = process.env.NEXT_PUBLIC_CRM_URL || "https://script.google.com/macros/s/AKfycbz_XXXXXXXXXX_XXXXXXX/exec"; // REPLACE THIS after deployment
const CRM_TOKEN = process.env.NEXT_PUBLIC_CRM_TOKEN || "a3-secure-token-2026-xyz"; // NEW SECRET TOKEN

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

    const result = await response.json();
    if (!result.success) {
        throw new Error(result.error || "Submission failed");
    }
    return result;
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

    const result = await response.json();
    if (!result.success) {
        throw new Error(result.error || "Submission failed");
    }
    return result;
}
