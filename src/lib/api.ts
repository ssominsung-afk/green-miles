import { OrderRequestData, CustomRequestData } from './types';

// Fallback to the hardcoded URL if env var fails
const CRM_URL = process.env.NEXT_PUBLIC_CRM_URL || "https://script.google.com/macros/s/AKfycby_IirBUXN0vBM0-2eVXFaVuQJ048Xo5YMK4UcpltYpJWZn6Ej12PhTfgUN7mE04_ml5g/exec";
const API_TOKEN = process.env.NEXT_PUBLIC_CRM_TOKEN || "pall-secret-99";

export async function submitOrder(data: OrderRequestData) {
    if (!CRM_URL) throw new Error("CRM URL is not configured");

    const response = await fetch(CRM_URL, {
        method: "POST",
        headers: {
            "Content-Type": "text/plain;charset=utf-8", // text/plain to avoid CORS preflight issues with GAS
        },
        body: JSON.stringify({
            ...data,
            token: API_TOKEN,
            formType: "OrderRequest"
        }),
    });

    const result = await response.json();
    if (result.result !== 'success') {
        throw new Error(result.error || "Submission failed");
    }
    return result;
}

export async function submitCustomRequest(data: CustomRequestData) {
    if (!CRM_URL) throw new Error("CRM URL is not configured");

    const response = await fetch(CRM_URL, {
        method: "POST",
        headers: {
            "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
            ...data,
            token: API_TOKEN,
            formType: "CustomRequest"
        }),
    });

    const result = await response.json();
    if (result.result !== 'success') {
        throw new Error(result.error || "Submission failed");
    }
    return result;
}
