'use client';

import { useEffect, useState } from 'react';

export default function GaDebugPaxPage() {
  const [report, setReport] = useState('collecting...');

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        const w = window as unknown as Record<string, unknown>;
        const resources = performance
          .getEntriesByType('resource')
          .map((e) => e.name);
        const data = {
          title: document.title,
          gtagType: typeof w.gtag,
          dataLayerLen: Array.isArray(w.dataLayer) ? (w.dataLayer as unknown[]).length : -1,
          cookies: document.cookie
            .split(';')
            .map((c) => c.trim().split('=')[0])
            .filter((n) => n.startsWith('_ga') || n.startsWith('_gid')),
          gaResources: resources,
          ua: navigator.userAgent,
          at: new Date().toISOString(),
        };
        setReport(JSON.stringify(data, null, 2));
      } catch (err) {
        setReport('error: ' + String(err));
      }
    }, 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: 'monospace' }}>
      <h1>GA DEBUG PAX</h1>
      <pre id="ga-debug-output">{report}</pre>
    </main>
  );
}
