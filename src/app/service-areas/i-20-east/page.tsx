import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin, Truck, ChevronRight, CheckCircle2, Warehouse, ArrowLeft } from 'lucide-react';

export const metadata = {
    title: 'I-20 East Pallet Supply | Rockdale & Newton County',
    description: 'Specialized pallet supply and sourcing for the I-20 East corridor, serving Conyers and Covington manufacturing and logistics hubs.',
};

export default function I20EastPage() {
    const breadcrumbJson = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://a3pallet.com" },
            { "@type": "ListItem", "position": 2, "name": "Atlanta Service Areas", "item": "https://a3pallet.com/service-areas/atlanta-logistics" },
            { "@type": "ListItem", "position": 3, "name": "I-20 East Corridor", "item": "https://a3pallet.com/service-areas/i-20-east" }
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
                    <li className="flex items-center space-x-2 text-foreground font-medium">
                        <ChevronRight className="h-4 w-4" />
                        <span>I-20 East</span>
                    </li>
                </ol>
            </nav>

            <div className="max-w-4xl mb-16">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">I-20 East Pallet Supply & Sourcing (Metro Atlanta)</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    The I-20 East corridor is an established manufacturing and logistics hub serving the eastern metro Atlanta area. With significant industrial activity in Conyers and Covington, this region requires a mix of standard GMA pallets and custom solutions for specialized production lines. A3 Pallet provides reliable sourcing and supply programs tailored to the unique industrial landscape of Rockdale and Newton counties.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12 mb-24">
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Warehouse className="h-6 w-6 text-primary" />
                            Pallet Solutions for Eastern Metro Manufacturing
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { title: "Standard 48x40 GMA", desc: "The reliable choice for Conyers distribution hubs." },
                                { title: "Grade A/B Recycled", desc: "Cost-effective refurbished pallets for regional shipping." },
                                { title: "Custom Manufacturing Specs", desc: "Build-to-spec solutions for Covington's production facilities." },
                                { title: "Heat-Treated Pallets", desc: "Export-compliant (ISPM-15) for eastern corridor manufacturers." }
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
                            Logistics & Delivery Notes
                        </h2>
                        <ul className="space-y-4 text-muted-foreground">
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>I-20 East Routing:</strong> Optimized delivery loops through Conyers and Covington industrial zones.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>Flexible Supply Programs:</strong> Supporting both consistent high-volume DCs and specialized manufacturing cells.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>Confirm by Quote:</strong> All lead times and delivery windows are confirmed at the time of order based on facility capacity.</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6">Who We Help (East Metro / I-20)</h2>
                        <div className="prose prose-slate max-w-none text-muted-foreground">
                            <p>We serve variety of industries along the I-20 East corridor, including:</p>
                            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 mt-4">
                                <li><strong>Global Manufacturing:</strong> Production facilities in Newton County (Covington).</li>
                                <li><strong>Consumer Distribution:</strong> Large-scale warehousing in Rockdale County (Conyers).</li>
                                <li><strong>Automotive Suppliers:</strong> Specialized parts manufacturing and distribution.</li>
                                <li><strong>Building Products:</strong> Suppliers serving the eastern metro growth corridor.</li>
                            </ul>
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <Card className="bg-muted/30">
                        <CardHeader>
                            <CardTitle className="text-lg">Key Service Areas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {['Conyers', 'Covington'].map(city => (
                                    <li key={city}>
                                        <Link href={`/service-areas/${city.toLowerCase().replace(' ', '-')}-ga`} className="flex items-center justify-between p-2 rounded hover:bg-background transition-colors">
                                            <span>{city}</span>
                                            <ChevronRight className="h-4 w-4 text-primary" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="border-primary/20">
                        <CardContent className="pt-6 text-center">
                            <h3 className="font-bold mb-4">Request a Quote</h3>
                            <p className="text-sm text-muted-foreground mb-6">Confirm Volume Availability for I-20 East.</p>
                            <Link href="/contact">
                                <Button className="w-full font-bold">Get Pricing Now</Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Custom CTA Banner */}
            <div className="mb-24 bg-primary/5 border-2 border-primary/10 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="text-xl font-bold mb-2 text-primary">Custom Pallets for the I-20 East Corridor</h3>
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
                <h2 className="text-3xl font-bold mb-12 text-center text-primary">I-20 East Corridor FAQs</h2>
                <div className="space-y-8">
                    {[
                        { q: "How often do you deliver to Covington manufacturing plants?", a: "We maintain frequent routing along I-20 East, allowing us to support both daily production needs and weekly high-volume replenishment." },
                        { q: "Do you offer custom pallets for Newton County manufacturers?", a: "Yes, we specialize in building pallets to unique specs for the specialized manufacturing sector in Covington and surrounding areas." },
                        { q: "What is the typical lead time for Conyers warehouse deliveries?", a: "Lead times depend on the specific pallet grade and volume, but our eastern corridor routing helps ensure efficient staging and delivery." },
                        { q: "Can you provide ISPM-15 heat-treated pallets for export?", a: "Absolutely. We supply certified heat-treated pallets for companies along the I-20 East corridor that ship their products globally." }
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

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 bg-muted rounded-2xl">
                <div className="flex items-center gap-4">
                    <ArrowLeft className="h-5 w-5 text-primary" />
                    <div>
                        <p className="font-bold">Not in the East Corridor?</p>
                        <p className="text-sm text-muted-foreground">See all Atlanta logistics service areas.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Link href="/service-areas/atlanta-logistics">
                        <Button variant="outline">Back to Hub</Button>
                    </Link>
                    <Link href="/pallets">
                        <Button variant="outline">View Products</Button>
                    </Link>
                </div>
            </div>
        </div >
    );
}
