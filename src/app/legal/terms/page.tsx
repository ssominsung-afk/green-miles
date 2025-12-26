import { COMPANY_NAME } from '@/lib/constants';

export default function TermsOfService() {
    return (
        <div className="container mx-auto py-16 px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
                <p>By accessing our website at https://www.a3pallet.com/, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
                <p>Permission is granted to temporarily download one copy of the materials (information or software) on {COMPANY_NAME}'s website for personal, non-commercial transitory viewing only.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Disclaimer</h2>
                <p>The materials on {COMPANY_NAME}'s website are provided on an 'as is' basis. {COMPANY_NAME} makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Limitations</h2>
                <p>In no event shall {COMPANY_NAME} or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on {COMPANY_NAME}'s website.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Governing Law</h2>
                <p>These terms and conditions are governed by and construed in accordance with the laws of [State of Georgia] and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
            </section>
        </div>
    );
}
