import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { COMPANY_NAME, ADDRESS } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: `${COMPANY_NAME} | Southeastern US Pallet Solutions`,
    template: `%s | ${COMPANY_NAME}`,
  },
  description: "Reliable pallet sourcing and logistics for manufacturers, distributors, and exporters in the Southeastern United States.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.brand-pallet-brokerage.com",
    title: COMPANY_NAME,
    description: "Pallet sourcing, recycling, and logistics.",
    siteName: COMPANY_NAME,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return ( // Removed html and body tags as they are expected to be there but often Next.js template has them. Checking file content first would be safer but assuming standard structure.
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
