'use client';

import { useEffect, useState } from 'react';

export default function GaDebugPaxPage() {
  const [report, setReport] = useState('collecting...');

  useEffect(() => {
    const snap = (label: string) => {
      const w = window as unknown as Record<string, unknown>;
      const gtd = (w.google_tag_data || {}) as Record<string, unknown>;
      const ics = (gtd.ics || {}) as Record<string, unknown>;
      const entries = (ics.entries || {}) as Record<string, { currentState?: number; update?: boolean }>;
      const consent: Record<string, unknown> = {};
      for (const k of Object.keys(entries)) {
        consent[k] = entries[k] ? entries[k].currentState : null;
      }
      const resources = performance
        .getEntriesByType('resource')
        .map((e) => e.name)
        .filter((n) => !n.includes('a3pallet.com'));
      return {
        label,
        gtagType: typeof w.gtag,
        dataLayerLen: Array.isArray(w.dataLayer) ? (w.dataLayer as unknown[]).length : -1,
        consentStates: consent,
        gtdKeys: Object.keys(gtd),
        externalResources: resources,
        at: new Date().toISOString(),
      };
    };

    const t1 = setTimeout(() => {
      const first = snap('before-probe');
      try {
        const g = w_gtag();
        if (typeof g === 'function') {
          (g as (...a: unknown[]) => void)('event', 'pax_probe_event', { probe: '1' });
        }
      } catch {
        /* ignore */
      }
      const t2 = setTimeout(() => {
        const second = snap('after-probe');
        setReport(JSON.stringify([first, second], null, 2));
      }, 3000);
      return () => clearTimeout(t2);
    }, 4000);

    function w_gtag() {
      return (window as unknown as Record<string, unknown>).gtag;
    }
    return () => clearTimeout(t1);
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: 'monospace' }}>
      <h1>GA DEBUG PAX</h1>
      <pre id="ga-debug-output">{report}</pre>
    </main>
  );
}
