import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin, Truck, ChevronRight, CheckCircle2, Warehouse, ArrowLeft } from 'lucide-react';

export const metadata = {
    title: 'Duluth, GA Pallet Supply & Sourcing | Central Gwinnett',
    description: 'Reliable pallet supply for Duluth, GA warehouses and regional distribution hubs. Specializing in high-volume GMA and recycled pallet programs near I-85 North.',
};

export default function DuluthGAPage() {
    const breadcrumbJson = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://a3pallet.com" },
            { "@type": "ListItem", "position": 2, "name": "Atlanta Service Areas", "item": "https://a3pallet.com/service-areas/atlanta-logistics" },
            { "@type": "ListItem", "position": 3, "name": "I-85 North Corridor", "item": "https://a3pallet.com/service-areas/i-85-north" },
            { "@type": "ListItem", "position": 4, "name": "Duluth", "item": "https://a3pallet.com/service-areas/duluth-ga" }
        ]
    };

    return (
        <div className="container mx-auto py-16 px-4">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
            />
            <nav className="flex mb-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                    <li><Link href="/" className="hover:text-primary">Home</Link></li>
                    <li className="flex items-center space-x-2">
                        <ChevronRight className="h-4 w-4" />
                        <Link href="/service-areas/atlanta-logistics" className="hover:text-primary">Atlanta Service Areas</Link></li>
                    <li className="flex items-center space-x-2">
                        <ChevronRight className="h-4 w-4" />
                        <Link href="/service-areas/i-85-north" className="hover:text-primary">I-85 North</Link></li>
                    <li className="flex items-center space-x-2 text-foreground font-medium">
                        <ChevronRight className="h-4 w-4" />
                        <span>Duluth</span>
                    </li>
                </ol>
            </nav>

            <div className="max-w-4xl mb-16">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Duluth, GA Pallet Supply & Sourcing</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Duluth stands as a key logistics and commercial hub in Gwinnett County. With its strategic position along the I-85 North corridor, Duluth warehouses differ slightly, often focusing on technology, assembly, and precise distribution. A3 Pallet provides capacity-backed programs for the diverse industrial parks that operate within Duluth's active supply chain network.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12 mb-24">
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Warehouse className="h-6 w-6 text-primary" />
                            Common Pallet Orders in Duluth
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { title: "Standard 48x40 GMA", desc: "The primary requirement for Duluth's distribution centers." },
                                { title: "Recycled Grade A", desc: "Clean, display-ready pallets for retail distribution." },
                                { title: "Custom Platforms", desc: "Built to spec for the area's tech and assembly sectors." },
                                { title: "Heat-Treated (ISPM-15)", desc: "Compliant solutions for Duluth-based international shippers." }
                            ].map((item, i) => (
                                <div key={i} className="p-4 rounded-xl border bg-card">
                                    <h3 className="font-bold mb-1">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Truck className="h-6 w-6 text-primary" />
                            Duluth Delivery & Logistics
                        </h2>
                        <ul className="space-y-4 text-muted-foreground">
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>I-85 North Priority:</strong> Duluth is a frequent stop on our Gwinnett delivery loops.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>Consistent Inventory:</strong> We maintain volume to support the steady flow of goods through Duluth's 3PLs.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>Flexible Routing:</strong> Coordinating with facility intake for efficient trailer timing and drops.</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6">Who We Help in Duluth</h2>
                        <div className="prose prose-slate max-w-none text-muted-foreground">
                            <p>We provide tailored pallet programs for:</p>
                            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 mt-4">
                                <li><strong>Technology Distribution:</strong> Clean pallet supply for high-value goods.</li>
                                <li><strong>3PL Warehousing:</strong> Multi-client facilities requiring standardized GMA pallets.</li>
                                <li><strong>Retail Supply Chain:</strong> Distribution to local and regional retail outlets.</li>
                                <li><strong>Light Manufacturing:</strong> Assembly operations requiring custom skid sizes.</li>
                            </ul>
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <Card className="border-primary/20">
                        <CardContent className="pt-6 text-center">
                            <h3 className="font-bold mb-4">Duluth Pallet Quote?</h3>
                            <p className="text-sm text-muted-foreground mb-6">Confirmation on volume availability for your facility.</p>
                            <Link href="/contact">
                                <Button className="w-full font-bold">Request Pricing</Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Link href="/service-areas/i-85-north">
                        <Button variant="outline" className="w-full gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            I-85 North Corridor
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Custom CTA Banner */}
            <div className="mb-24 bg-primary/5 border-2 border-primary/10 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="text-xl font-bold mb-2 text-primary">Need Custom Pallets in Duluth?</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                        <li>• Heat-treated (ISPM-15) for international export</li>
                        <li>• Heavy-duty skids and odd-sized footprints</li>
                        <li>• Custom-engineered builds for automation lines</li>
                    </ul>
                </div>
                <Link href="/custom">
                    <Button variant="default" className="font-bold px-8">Get Custom Quote</Button>
                </Link>
            </div>

            <section className="max-w-3xl mx-auto mb-24">
                <h2 className="text-3xl font-bold mb-12 text-center text-primary">Duluth Logistics FAQs</h2>
                <div className="space-y-8">
                    {[
                        { q: "Do you deliver to the industrial parks near Peachtree Industrial Blvd?", a: "Yes, we prioritize routing for the established industrial nodes along PIB and Pleasant Hill Road." },
                        { q: "Can you provide Grade A pallets for clean distribution?", a: "Absolutely. Our Grade A recycled pallets are meticulously graded to ensure they meet the intake standards of Duluth's tech and retail centers." },
                        { q: "What is your typical lead time for Duluth facility deliveries?", a: "Being Atlanta-based with a focus on the I-85 North corridor allows us to coordinate regional delivery efficiently—often with next-day options." },
                        { q: "Do you handle custom build-to-spec for Duluth assembly plants?", a: "Yes, we work with assembly clients in Duluth to provide custom-sized and specific-load pallets built to their requirements." }
                    ].map((faq, i) => (
                        <div key={i} className="border-b pb-6">
                            <h3 className="text-lg font-bold mb-3 flex gap-4">
                                <span className="text-primary opacity-50">Q:</span>
                                {faq.q}
                            </h3>
                            <p className="text-muted-foreground pl-10">
                                {faq.a}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <div className="text-center">
                <Link href="/service-areas/atlanta-logistics">
                    <Button variant="link" className="text-muted-foreground">View all Atlanta service areas</Button>
                </Link>
            </div>
        </div>
    );
}
