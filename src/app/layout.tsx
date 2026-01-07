import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GTMClickTracker from "@/components/analytics/GTMClickTracker";

const inter = Inter({ subsets: ["latin"] });

// ✅ GA4 Measurement ID
const GA_ID = "G-N8P6KWL7LW";

export const metadata: Metadata = {
  title: {
    default: "A3 Pallet | Reliable Pallet Supply & Sourcing Partner Southeast",
    template: "%s | A3 Pallet",
  },
  description:
    "A3 Pallet provides capacity-backed pallet supply and sourcing for manufacturers across the Southeast US. Specialized in GMA, recycled, and custom-spec pallets.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://a3pallet.com",
    title: "A3 Pallet",
    description: "Pallet sourcing, recycling, and managed supply programs.",
    siteName: "A3 Pallet",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "A3 Pallet",
  "url": "https://a3pallet.com",
  "logo": "https://a3pallet.com/logo-a3-pallet.png",
  "image": "https://a3pallet.com/logo-a3-pallet.png",
  "description":
    "Atlanta-based custom and standard pallet supply and sourcing for warehouses, manufacturers, and 3PLs. Specializing in build-to-spec programs across the Southeast US (GA, FL, AL, NC, SC, TN).",
  "telephone": "+1-470-962-7000",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Atlanta",
    "addressRegion": "GA",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 33.7490,
    "longitude": -84.3880
  },
  "areaServed": [
    { "@type": "State", "name": "Georgia" },
    { "@type": "State", "name": "Florida" },
    { "@type": "State", "name": "Alabama" },
    { "@type": "State", "name": "North Carolina" },
    { "@type": "State", "name": "South Carolina" },
    { "@type": "State", "name": "Tennessee" },
    { "@type": "City", "name": "Atlanta" },
    { "@type": "City", "name": "Norcross" },
    { "@type": "City", "name": "Buford" },
    { "@type": "City", "name": "Braselton" },
    { "@type": "City", "name": "McDonough" },
    { "@type": "City", "name": "Locust Grove" },
    { "@type": "City", "name": "Union City" },
    { "@type": "City", "name": "Fairburn" },
    { "@type": "City", "name": "Lithia Springs" },
    { "@type": "City", "name": "Conyers" }
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-470-962-7000",
    "contactType": "sales",
    "email": "sales@a3pallet.com",
    "availableLanguage": "en"
  }
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* ✅ Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtag/js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID || 'GTM-N84F5R4B'}');
          `}
        </Script>

        {/* ✅ GA4 (있을 때만 실행) */}
        {GA_ID ? (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script id="ga4" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        ) : null}

        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID || 'GTM-N84F5R4B'}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* ✅ SEO JSON-LD */}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="flex min-h-screen flex-col">
          <GTMClickTracker />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
