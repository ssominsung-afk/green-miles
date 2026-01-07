import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin, Truck, ChevronRight, CheckCircle2, Warehouse, ArrowLeft } from 'lucide-react';

export const metadata = {
    title: 'I-75 South Pallet Supply | Henry County & McDonough',
    description: 'Specialized pallet supply and sourcing for the I-75 South corridor, serving McDonough, Locust Grove, and Stockbridge distribution hubs.',
};

export default function I75SouthHenryPage() {
    const breadcrumbJson = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://a3pallet.com" },
            { "@type": "ListItem", "position": 2, "name": "Atlanta Service Areas", "item": "https://a3pallet.com/service-areas/atlanta-logistics" },
            { "@type": "ListItem", "position": 3, "name": "I-75 South Corridor", "item": "https://a3pallet.com/service-areas/i-75-south-henry" }
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
                        <span>I-75 South / Henry County</span>
                    </li>
                </ol>
            </nav>

            <div className="max-w-4xl mb-16">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">I-75 South / Henry County Pallet Supply & Sourcing</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    The I-75 South corridor, particularly Henry County, has emerged as a powerhouse for large-scale distribution and retail fulfillment. With expansive industrial parks in McDonough and Locust Grove, this region requires high-volume pallet consistency. A3 Pallet specializes in meeting the capacity needs of 3PLs and major retailers operating in this critical south-metro artery.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12 mb-24">
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Warehouse className="h-6 w-6 text-primary" />
                            Pallet Programs for Large-Scale Distribution
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { title: "Standard 48x40 GMA", desc: "The gold standard for McDonough's massive retail DCs." },
                                { title: "Grade A Recycled", desc: "Premium refurbished pallets for high-turnover logistics." },
                                { title: "Custom Sized Pallets", desc: "Built to spec for unique manufacturing and heavy equipment." },
                                { title: "Volume GMA Supply", desc: "Capacity-backed programs for multi-facility operations." }
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
                            Delivery & Logistics Insights
                        </h2>
                        <ul className="space-y-4 text-muted-foreground">
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>Henry County Priorities:</strong> Dedicated routing through McDonough and Locust Grove industrial corridors.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>High-Capacity Staging:</strong> We maintain inventory levels sufficient to support the large-scale needs of the area's 1M+ sq. ft. facilities.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>Flexible Intake Coordination:</strong> We work with your receiving teams to ensure efficient trailer placement and timing.</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6">Who We Help (Henry County / I-75 South)</h2>
                        <div className="prose prose-slate max-w-none text-muted-foreground">
                            <p>Our Henry County clients typically include:</p>
                            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 mt-4">
                                <li><strong>Big-Box Retail DC:</strong> Supporting major national retail chains in McDonough.</li>
                                <li><strong>Third-Party Logistics (3PL):</strong> Reliable supply for multi-client warehouse operators.</li>
                                <li><strong>Food & Beverage:</strong> Durable pallets for grocery distribution hubs.</li>
                                <li><strong>Industrial Suppliers:</strong> Consistent sourcing for the growing manufacturing sector.</li>
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
                                {['McDonough', 'Locust Grove', 'Stockbridge'].map(city => (
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
                            <h3 className="font-bold mb-4">Volume Quote?</h3>
                            <p className="text-sm text-muted-foreground mb-6">Confirm supply for your Henry County facility.</p>
                            <Link href="/contact">
                                <Button className="w-full font-bold">Request a Quote</Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Custom CTA Banner */}
            <div className="mb-24 bg-primary/5 border-2 border-primary/10 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="text-xl font-bold mb-2 text-primary">Custom Pallets for the I-75 South Corridor</h3>
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
                <h2 className="text-3xl font-bold mb-12 text-center text-primary">I-75 South Corridor FAQs</h2>
                <div className="space-y-8">
                    {[
                        { q: "How quickly can you deliver to Locust Grove?", a: "By prioritizing I-75 South routing, we maintain frequent delivery loops through McDonough and Locust Grove to meet high-volume demands." },
                        { q: "Do you offer Grade B pallets for one-way shipping from Henry County?", a: "Yes, our Grade B recycled pallets are a popular, cost-effective choice for regional shippers focused on one-way transit." },
                        { q: "Can you manage multi-site programs for 3PLs along I-75?", a: "Absolutely. We specialize in coordinating pallet supply for providers with multiple warehouses in the Henry and Clayton county regions." },
                        { q: "What is your typical GMA pallet quality for retail DCs?", a: "We provide meticulously graded GMA pallets that meet or exceed the strict intake standards of national retail distribution centers." }
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
                        <p className="font-bold">Not in the South Corridor?</p>
                        <p className="text-sm text-muted-foreground">Explore all Atlanta logistics service areas.</p>
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
