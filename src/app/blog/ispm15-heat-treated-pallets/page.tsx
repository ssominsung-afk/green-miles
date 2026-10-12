import Link from 'next/link';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import QuoteCta from '@/components/layout/QuoteCta';

export const metadata = {
    title: 'ISPM-15 Heat Treated Pallets: What Atlanta Shippers Need to Know for Export Compliance',
    description:
        'ISPM-15 heat treated pallets explained for Atlanta shippers: the HT stamp, heat treatment rules, and how to keep exports compliant. Request a quote from A3 Pallet.',
    keywords: [
        'ISPM-15 heat treated pallets',
        'pallet supplier Atlanta',
        'heat treated pallets export',
    ],
    openGraph: {
        title: 'ISPM-15 Heat Treated Pallets: Export Compliance Guide for Atlanta Shippers',
        description:
            'The HT stamp, heat treatment rules, and common shipper mistakes — how to keep every export load compliant.',
        url: 'https://www.a3pallet.com/blog/ispm15-heat-treated-pallets',
        type: 'article',
    },
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'ISPM-15 Heat Treated Pallets: What Atlanta Shippers Need to Know for Export Compliance',
    description: metadata.description,
    author: { '@type': 'Organization', name: 'A3 Pallet' },
    publisher: { '@type': 'Organization', name: 'A3 Pallet', url: 'https://www.a3pallet.com' },
    datePublished: '2026-10-12',
    dateModified: '2026-10-12',
};

export default function BlogPostPage() {
    return (
        <div className="container mx-auto py-16 px-4">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <article className="max-w-3xl mx-auto">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
                >
                    <ArrowLeft className="h-4 w-4" /> Back to Blog
                </Link>

                <p className="text-sm text-muted-foreground mb-3">
                    October 12, 2026 · Export Compliance
                </p>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                    ISPM-15 Heat Treated Pallets: What Atlanta Shippers Need to Know for Export Compliance
                </h1>

                <div className="space-y-8 text-muted-foreground leading-relaxed">
                    <p>
                        Shipping goods overseas from Atlanta starts long before the container leaves the port. It
                        starts with the pallet your freight sits on. If that pallet doesn&rsquo;t meet the ISPM-15
                        phytosanitary standard, your shipment can be stopped at the border, quarantined, or even
                        destroyed. Here&rsquo;s what Atlanta-area shippers need to know about ISPM-15 heat treated
                        pallets &mdash; and how to make sure every export load stays compliant.
                    </p>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">What Is ISPM-15?</h2>
                        <p>
                            ISPM-15 (International Standards for Phytosanitary Measures No. 15) is a global standard
                            created by the International Plant Protection Convention to stop the spread of insects and
                            diseases that live in raw wood. When untreated wood packaging &mdash; pallets, crates,
                            dunnage &mdash; travels across borders, pests can hitch a ride and devastate forests and
                            agriculture in the destination country.
                        </p>
                        <p>
                            The standard requires all solid wood packaging used in international trade to be treated
                            and officially marked. It applies to essentially every export market: the EU, Canada,
                            Mexico, China, Australia, Korea, and many others. A few countries have additional
                            requirements, but ISPM-15 compliance is the baseline everywhere.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">
                            Heat Treatment vs. Other Approved Methods
                        </h2>
                        <p>ISPM-15 recognizes a small set of approved treatments for wood packaging:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <strong className="text-foreground">Heat treatment (HT):</strong> The core of the
                                lumber must reach a minimum of 56&deg;C (132.8&deg;F) for at least 30 minutes. This is
                                by far the most common method for pallets.
                            </li>
                            <li>
                                <strong className="text-foreground">Dielectric heating (DH):</strong> Microwave/radio-frequency
                                heating, approved for wood not exceeding certain dimensions.
                            </li>
                            <li>
                                <strong className="text-foreground">Methyl bromide (MB) fumigation:</strong> Once common,
                                this method is being phased out in many countries due to environmental concerns. Many
                                destination markets no longer accept MB-marked packaging.
                            </li>
                        </ul>
                        <p>
                            For most shippers, <strong className="text-foreground">ISPM-15 heat treated pallets</strong> are
                            the default choice. They are widely accepted, do not involve chemicals, and work with
                            standard GMA 48x40 and custom pallet designs.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">
                            How to Read the ISPM-15 Stamp (the HT Mark)
                        </h2>
                        <p>
                            Every compliant pallet carries the official IPPC mark, branded on at least two opposite
                            sides. The mark contains:
                        </p>
                        <ol className="list-decimal pl-6 space-y-2">
                            <li>
                                <strong className="text-foreground">The IPPC wheat-sheaf symbol</strong> &mdash;
                                identifies the mark as official.
                            </li>
                            <li>
                                <strong className="text-foreground">Country code</strong> &mdash; &ldquo;US&rdquo; for
                                the United States.
                            </li>
                            <li>
                                <strong className="text-foreground">Producer/facility number</strong> &mdash; a unique
                                number identifying the certified heat-treatment facility.
                            </li>
                            <li>
                                <strong className="text-foreground">Treatment code</strong> &mdash; &ldquo;HT&rdquo; for
                                heat treatment (or &ldquo;DH&rdquo; for dielectric heating).
                            </li>
                        </ol>
                        <p>
                            A valid mark looks something like: <code className="text-foreground font-mono text-sm">US-12345 HT</code>.
                            The mark must be legible, permanent (branded or heat-stamped, not painted on), and applied
                            after treatment &mdash; not before.
                        </p>
                        <h3 className="text-xl font-bold text-foreground mt-6 mb-3">What the stamp does not mean</h3>
                        <p>
                            The HT stamp certifies the wood packaging, not your freight. It also isn&rsquo;t a
                            one-time-per-company credential: the mark applies to pallets produced and treated by the
                            certified facility. If you buy pallets from an uncertified supplier, branding your own stamp
                            on them is a violation &mdash; and one that border authorities take seriously.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Debarked Lumber Requirements</h2>
                        <p>
                            ISPM-15 also requires that the lumber be debarked &mdash; bark is where many pests live. A
                            small tolerance exists for bark patches, but pallets with significant bark remnants can fail
                            inspection. A reliable pallet supplier Atlanta shippers work with will control this at the
                            lumber sourcing stage, so the finished pallet meets the standard as produced.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">
                            Why Heat Treated Pallets Matter for Your Exports
                        </h2>
                        <p>
                            Compliance failures are expensive and entirely avoidable. Common consequences of shipping on
                            non-compliant wood packaging include:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <strong className="text-foreground">Detention and inspection fees</strong> at the
                                destination port, billed to you.
                            </li>
                            <li>
                                <strong className="text-foreground">Re-export or destruction</strong> of the shipment in
                                serious cases.
                            </li>
                            <li>
                                <strong className="text-foreground">Treatment on arrival</strong> &mdash; some ports
                                will fumigate the load and pass the cost back to the shipper.
                            </li>
                            <li>
                                <strong className="text-foreground">Damaged customer relationships</strong>, since a
                                quarantined container means a missed delivery date.
                            </li>
                        </ul>
                        <p>
                            For regular exporters, these incidents are not rare exceptions &mdash; ports inspect wood
                            packaging routinely, and enforcement has tightened in recent years across the EU and Asia.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Common Mistakes Shippers Make</h2>
                        <ol className="list-decimal pl-6 space-y-3">
                            <li>
                                <strong className="text-foreground">Reusing domestic pallets for export.</strong> The
                                cheap pallets cycling through your warehouse are almost certainly not heat treated.
                                Export loads need dedicated ISPM-15 stock.
                            </li>
                            <li>
                                <strong className="text-foreground">Assuming a stamp is enough.</strong> Stamps can be
                                faked or applied by uncertified facilities. Work with a pallet supplier that can show
                                its certification and trace pallets back to treatment.
                            </li>
                            <li>
                                <strong className="text-foreground">Mixing treated and untreated components.</strong> A
                                pallet repaired with untreated replacement boards loses its compliant status. Repair
                                parts must be heat treated too.
                            </li>
                            <li>
                                <strong className="text-foreground">Forgetting about dunnage and crates.</strong> ISPM-15
                                covers all solid wood packaging material &mdash; blocking, bracing, and crates count,
                                not just pallets.
                            </li>
                            <li>
                                <strong className="text-foreground">Waiting until the booking is confirmed.</strong> If
                                your pallets arrive non-compliant the day before loading, you have no good options.
                                Build compliant pallets into your standing procurement.
                            </li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">How to Verify Compliance</h2>
                        <p>When evaluating a supplier for heat treated pallets for export, ask for:</p>
                        <ul className="space-y-3">
                            {[
                                'The facility\u2019s ISPM-15 certification through an accredited inspection agency (such as the American Lumber Standard Committee\u2019s WPM program).',
                                'Confirmation that the HT mark is applied in-house, after treatment, on at least two opposite sides of each pallet.',
                                'Traceability \u2014 documentation connecting the pallets you receive to treated lumber.',
                                'A clear policy on repairs: replacement components should be heat treated to the same standard.',
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3">
                                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-1" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p>
                            A credible pallet supplier Atlanta exporters trust will answer these questions without
                            hesitation.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">
                            Choosing ISPM-15 Compliant Pallets in Atlanta
                        </h2>
                        <p>
                            Atlanta&rsquo;s position as a logistics hub &mdash; with direct port access through
                            Savannah and Charleston and major air cargo capacity &mdash; makes export compliance a daily
                            concern for local shippers. The right supplier should be able to deliver both standard GMA
                            48x40 pallets and custom sizes with valid HT marking, on timelines that match your
                            production schedule.
                        </p>
                        <p>
                            A3 Pallet manufactures custom ISPM-15 heat treated pallets for Atlanta and Southeast US
                            shippers, with compliant marking applied on every export-grade unit. Whether you need
                            standard spec pallets or custom designs for heavy or oversized freight, every pallet leaves
                            the facility ready for international inspection.
                        </p>
                    </section>
                </div>
            </article>

            <div className="max-w-3xl mx-auto mt-16">
                <QuoteCta
                    title="Shipping internationally?"
                    subtitle="Request a quote from A3 Pallet for ISPM-15 compliant pallets built to your specs — and keep your next export load moving past every border checkpoint."
                />
            </div>
        </div>
    );
}
