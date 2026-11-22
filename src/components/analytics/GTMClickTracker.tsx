'use client';

import { useEffect } from 'react';
import { trackEmailClick, trackQuoteClick } from '@/lib/gtm';

const QUOTE_TEXT_PATTERN =
    /(?:get|request|receive|start|submit|send).{0,24}(?:quote|pricing)|(?:quote|pricing).{0,24}(?:request|inquiry)|견적\s*(?:문의|요청)/i;

const QUOTE_PATH_PATTERN = /^\/(?:contact|custom)(?:\/|$)/;

export default function GTMClickTracker() {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target;
            if (!(target instanceof Element)) return;

            const link = target.closest('a');
            const button = target.closest('button');

            // Track mailto links once through the GTM dataLayer.
            if (link?.href.startsWith('mailto:')) {
                const email = link.href.slice('mailto:'.length).split('?')[0];
                trackEmailClick(email);
            }

            // Track quote/pricing CTAs, including links whose label is abbreviated.
            const interactiveElement = link || button;
            if (!interactiveElement) return;

            const text = interactiveElement.textContent?.replace(/\s+/g, ' ').trim() || '';
            const href = link?.getAttribute('href') || '';
            const isQuotePath = QUOTE_PATH_PATTERN.test(href);

            if (QUOTE_TEXT_PATTERN.test(text) || isQuotePath) {
                trackQuoteClick(text || href);
            }
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    return null;
}
