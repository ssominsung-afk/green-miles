import { COMPANY_NAME, COMPANY_EMAILS } from '@/lib/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: `Privacy Policy for ${COMPANY_NAME}. Learn about how we handle your data.`,
};

export default function PrivacyPolicy() {
    return (
        <div className="container mx-auto py-16 px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                <p>
                    Welcome to {COMPANY_NAME}. We respect your privacy and are committed to protecting your personal data.
                    This privacy policy informs you how we look after your personal data when you visit our website
                    (regardless of where you visit it from) and tells you about your privacy rights and how the law protects you.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Data We Collect</h2>
                <p>We may collect, use, store and transfer different kinds of personal data about you through our website forms:</p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                    <li><strong>Identity Data:</strong> Includes name and company name.</li>
                    <li><strong>Contact Data:</strong> Includes email address, phone number, and address.</li>
                    <li><strong>Request Details:</strong> Information regarding your pallet needs or quote requests.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">How We Use Your Data</h2>
                <p>We use the data collected from our website forms to:</p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                    <li>Respond to your quote or order requests.</li>
                    <li>Facilitate our internal operational workflows to provide our services.</li>
                    <li>Maintain communication regarding your orders.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                    <li><strong>No Sale of Data:</strong> We do not sell your personal data to third parties.</li>
                    <li><strong>Limited Sharing:</strong> Data sharing is limited to essential service providers needed to operate our website and messaging systems (such as email or SMS alerts) for the purpose of fulfilling your requests.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Contact</h2>
                <p>
                    For any privacy-related requests or questions, please contact us at:
                    <br />
                    <strong>Email:</strong> <a href={`mailto:${COMPANY_EMAILS.SALES}`} className="text-primary hover:underline">{COMPANY_EMAILS.SALES}</a>
                </p>
            </section>
        </div>
    );
}
