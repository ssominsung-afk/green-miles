'use client';

// Define the dataLayer property on the window object
declare global {
    interface Window {
        dataLayer: any[];
    }
}

export const pushToDataLayer = (data: any) => {
    if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(data);
    }
};

export const trackLead = (formName: string) => {
    pushToDataLayer({
        event: 'generate_lead',
        form_name: formName,
        page_path: window.location.pathname,
        page_location: window.location.href,
    });
};

export const trackQuoteClick = (buttonText: string) => {
    pushToDataLayer({
        event: 'click_quote',
        button_text: buttonText,
        page_path: window.location.pathname,
    });
};

export const trackEmailClick = (email: string) => {
    pushToDataLayer({
        event: 'click_email',
        email: email,
        page_path: window.location.pathname,
    });
};
