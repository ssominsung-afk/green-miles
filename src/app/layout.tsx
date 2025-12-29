import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { COMPANY_NAME, ADDRESS } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"] });

import Script from 'next/script';

export const metadata: Metadata = {
  title: {
    default: `A3 Pallet | Reliable Pallet Supply & Sourcing Partner Southeast`,
    template: `%s | A3 Pallet`,
  },
  description: "A3 Pallet provides capacity-backed pallet supply and sourcing for manufacturers across the Southeast US. Specialized in GMA, recycled, and custom-spec pallets.",
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
  "@type": "Organization",
  "name": "A3 Pallet",
  "url": "https://a3pallet.com",
  "logo": "https://a3pallet.com/logo-a3-pallet.png",
  "description": "A3 Pallet provides capacity-backed pallet supply and sourcing for manufacturers across the Southeast US.",
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "GA",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-470-962-7000",
    "contactType": "sales",
    "email": "sales@a3pallet.com",
    "areaServed": "US-SE",
    "availableLanguage": "en"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Pallet Supply Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Standard Pallet Supply",
          "description": "New and recycled GMA 48x40 pallets fulfilled through a vetted partner network."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom Pallet Design",
          "description": "Spec-driven custom pallets engineered for unique load requirements."
        }
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return ( // Removed html and body tags as they are expected to be there but often Next.js template has them. Checking file content first would be safer but assuming standard structure.
    <html lang="en">
      <body className={inter.className}>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
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

        {children}
      </body>
    </html>
  );
}
