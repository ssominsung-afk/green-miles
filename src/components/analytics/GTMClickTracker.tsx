'use client';

import { useEffect } from 'react';
import { trackEmailClick, trackQuoteClick } from '@/lib/gtm';

export default function GTMClickTracker() {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a');
            const button = target.closest('button');

            // 1. Track mailto links
            if (link && link.href && link.href.startsWith('mailto:')) {
                const email = link.href.replace('mailto:', '');
                trackEmailClick(email);
            }

            // 2. Track "Get a Quote" or "Request Quote" buttons/links
            if (link || button) {
                const text = (link || button)?.innerText || '';
                if (/get a quote|request quote|견적 문의/i.test(text)) {
                    trackQuoteClick(text.trim());
                }
            }
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    return null;
}
