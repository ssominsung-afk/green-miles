import { COMPANY_NAME, COMPANY_EMAILS } from '@/lib/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: `Terms of Service for ${COMPANY_NAME}.`,
};

export default function TermsOfService() {
    const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="container mx-auto py-16 px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground mb-8 text-sm">Last updated: {today}</p>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Website Use</h2>
                <p>
                    By accessing this website, you agree to use it for lawful purposes related to pallet supply and sourcing inquiries.
                    You must not use this site for any fraudulent or harmful activities.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. SMS Communications (Internal Only)</h2>
                <p>
                    {COMPANY_NAME} uses a toll-free number for <strong>internal operational alerts only</strong>.
                    These alerts are sent to authorized internal personnel to notify them of new web-form submissions (quote/order requests).
                </p>
                <p className="mt-2">
                    Internal recipients can opt-out by replying <strong>STOP</strong> or get assistance by replying <strong>HELP</strong>.
                    Message and data rates may apply.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Disclaimers</h2>
                <p>
                    The materials on this website are provided on an 'as is' basis. {COMPANY_NAME} makes no warranties,
                    expressed or implied, and hereby disclaims all other warranties including, without limitation,
                    implied warranties or conditions of merchantability or fitness for a particular purpose.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Limitation of Liability</h2>
                <p>
                    In no event shall {COMPANY_NAME} or its suppliers be liable for any damages
                    (including, without limitation, damages for loss of data or profit, or due to business interruption)
                    arising out of the use or inability to use the materials on this website.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Contact Information</h2>
                <p>
                    If you have any questions about these Terms, please contact us at:
                    <br />
                    <strong>Email:</strong> <a href={`mailto:${COMPANY_EMAILS.SALES}`} className="text-primary hover:underline">{COMPANY_EMAILS.SALES}</a>
                </p>
            </section>
        </div>
    );
}
