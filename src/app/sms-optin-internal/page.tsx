import { COMPANY_NAME, COMPANY_EMAILS, PHONE_NUMBER, ADDRESS } from '@/lib/constants';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'SMS Opt-In (Internal Alerts)',
    description: 'A3 Pallet internal SMS opt-in disclosure for operational order/quote alerts.',
};

export default function SMSOptIn() {
    return (
        <div className="container mx-auto py-16 px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">SMS Opt-In (Internal Alerts)</h1>
            <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Overview</h2>
                <p>
                    {COMPANY_NAME} uses SMS strictly for internal operational alerts related to quote and order
                    requests submitted via our official website. This system ensures our team can respond
                    to business inquiries promptly.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Who Receives Messages</h2>
                <ul className="list-disc ml-6 space-y-2">
                    <li>Messages are sent <strong>only</strong> to authorized internal recipient phone numbers owned by the business.</li>
                    <li>These recipient numbers are kept on file and are managed by {COMPANY_NAME} administration.</li>
                    <li><strong>No customers or external users receive SMS from this toll-free number.</strong></li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Consent / Opt-in Method</h2>
                <p>
                    Each internal recipient has provided explicit consent to receive SMS from {COMPANY_NAME} for operational alerts.
                    Consent is collected via:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                    <li>Written confirmation (via email or internal text message).</li>
                    <li>Verbal confirmation using a standard internal opt-in script.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Message Purpose and Frequency</h2>
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>Purpose:</strong> New quote/order request alerts to ensure fast response times.</li>
                    <li><strong>Frequency:</strong> Message frequency varies based on website activity (typically 0–10 messages per day).</li>
                    <li><strong>Cost:</strong> Msg & data rates may apply.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Opt-out / Help</h2>
                <p>Internal recipients can manage their subscription at any time:</p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                    <li>Reply <strong>STOP</strong> to opt out of further alerts.</li>
                    <li>Reply <strong>HELP</strong> for assistance or more information.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Contact</h2>
                <p>For questions regarding our internal messaging protocols, please contact us:</p>
                <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p><strong>Email:</strong> {COMPANY_EMAILS.SALES}</p>
                    <p><strong>Phone:</strong> {PHONE_NUMBER}</p>
                    <p><strong>Address:</strong> {ADDRESS}</p>
                </div>
            </section>

            <section className="mt-12 flex flex-wrap gap-4 text-sm underline text-muted-foreground">
                <Link href="/privacy">Privacy Policy</Link>
                <Link href="/terms">Terms of Service</Link>
            </section>
        </div>
    );
}
