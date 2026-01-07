import { COMPANY_NAME, COMPANY_EMAILS, PHONE_NUMBER } from '@/lib/constants';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'SMS Opt-In (Internal Alerts)',
    description: 'A3 Pallet internal SMS opt-in disclosure for operational order/quote alerts.',
};

export default function SMSOptIn() {
    const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

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
                <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-primary">C) Consent / Opt-in method</h2>
                <p className="mb-2">
                    Opt-in is obtained via <strong>VERBAL consent</strong> from each internal recipient using the script below.
                </p>
                <p>
                    We record the date/time and recipient phone number for each verbal opt-in for compliance.
                </p>
            </section>

            <section className="mb-8 p-6 bg-slate-50 border rounded-lg">
                <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-primary">D) VERBAL CONSENT SCRIPT</h2>
                <div className="italic text-slate-700 space-y-4">
                    <p className="font-semibold not-italic underline mb-2">Verbal Consent Script — A3 Pallet (Internal Alerts Only)</p>
                    <p>
                        "Hi, this is A3 Pallet. We’d like your permission to send SMS text messages to this phone number for internal operational alerts (new quote/order request notifications)."
                    </p>
                    <p>
                        "Message frequency varies (typically 0–10/day). Msg & data rates may apply."
                    </p>
                    <p>
                        "You can opt out at any time by replying STOP. For help, reply HELP or email {COMPANY_EMAILS.SALES}."
                    </p>
                    <p>
                        "Do you agree to receive these SMS text messages from A3 Pallet at this phone number?"
                    </p>
                    <p>
                        <strong>If yes:</strong> "Thank you. You are opted in for internal alerts."
                    </p>
                    <p>
                        <strong>If no:</strong> "No problem. We will not send SMS to this number."
                    </p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-primary">E) Message purpose and frequency</h2>
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>Purpose:</strong> New quote/order request alerts to ensure fast response times.</li>
                    <li><strong>Frequency:</strong> Varies based on website activity (typically 0–10 messages per day).</li>
                    <li><strong>Msg & data rates may apply.</strong></li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-primary">F) Opt-out / Help</h2>
                <ul className="list-disc ml-6 space-y-2">
                    <li>Reply <strong>STOP</strong> to opt out.</li>
                    <li>Reply <strong>HELP</strong> for assistance.</li>
                </ul>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-primary">G) Contact</h2>
                <div className="p-4 bg-muted rounded-lg">
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
