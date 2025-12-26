import { COMPANY_NAME } from '@/lib/constants';

export default function PrivacyPolicy() {
    return (
        <div className="container mx-auto py-16 px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p>Welcome to {COMPANY_NAME}. We value your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. The Data We Collect</h2>
                <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                    <li><strong>Identity Data:</strong> first name, last name, company name.</li>
                    <li><strong>Contact Data:</strong> email address and telephone numbers.</li>
                    <li><strong>Usage Data:</strong> information about how you use our website, products and services.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Data</h2>
                <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to:</p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                    <li>Process and deliver your order requests.</li>
                    <li>Manage our relationship with you.</li>
                    <li>Improve our website, services, and customer experiences.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Contact Us</h2>
                <p>If you have any questions about this privacy policy or our privacy practices, please contact us via our contact page.</p>
            </section>
        </div>
    );
}
