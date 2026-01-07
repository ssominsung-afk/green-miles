import { COMPANY_NAME, COMPANY_EMAILS, PHONE_NUMBER } from '@/lib/constants';
import { Metadata } from 'next';
import Link from 'next/link';
import SMSOptInForm from './SMSOptInForm';

export const metadata: Metadata = {
    title: 'SMS Opt-In (Internal Alerts)',
    description: 'A3 Pallet internal SMS opt-in disclosure for operational order/quote alerts.',
};

export default function SMSOptIn() {
    const today = "January 7, 2026";

    return (
        <div className="container mx-auto py-16 px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">SMS Opt-In (Internal Alerts)</h1>
            <p className="text-muted-foreground mb-8 text-sm">Last updated: {today}</p>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-primary">A) Overview</h2>
                <p>
                    {COMPANY_NAME} uses SMS strictly for internal operational alerts related to quote and order
                    requests submitted via our official website.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-primary">B) Who receives messages</h2>
                <ul className="list-disc ml-6 space-y-2">
                    <li>Messages are sent <strong>only</strong> to two authorized internal recipient phone numbers owned by the business (numbers are kept on file).</li>
                    <li>No customers or external users receive SMS from this toll-free number.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-primary">C) Web Form Opt-In</h2>
                <div className="mb-6">
                    <p className="mb-4 text-slate-700">
                        Internal personnel must provide explicit consent via the secure web form below to receive operational alerts.
                        The opt-in checkbox is optional and must be checked to initiate alerts.
                    </p>
                    <SMSOptInForm />
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-primary">D) Opt-out / Help</h2>
                <ul className="list-disc ml-6 space-y-2">
                    <li>Reply <strong>STOP</strong> to opt out.</li>
                    <li>Reply <strong>HELP</strong> for assistance.</li>
                </ul>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-primary">E) Contact</h2>
                <div className="p-4 bg-muted rounded-lg border">
                    <p><strong>Email:</strong> {COMPANY_EMAILS.SALES}</p>
                    <p><strong>Phone:</strong> {PHONE_NUMBER}</p>
                </div>
            </section>

            <section className="mt-12 pt-8 border-t flex flex-wrap gap-6 text-sm">
                <Link href="/privacy" className="underline hover:text-primary transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="underline hover:text-primary transition-colors">Terms of Service</Link>
            </section>
        </div>
    );
}
