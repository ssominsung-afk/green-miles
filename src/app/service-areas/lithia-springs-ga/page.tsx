import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin, Truck, ChevronRight, CheckCircle2, Warehouse, ArrowLeft } from 'lucide-react';

export const metadata = {
    title: 'Lithia Springs, GA Pallet Supply & Sourcing | Douglas County | A3 Pallet',
    description: 'Specialized pallet supply for Lithia Springs, GA fulfillment centers and distribution hubs. High-volume GMA and Recycled pallets near the I-20 West corridor.',
};

export default function LithiaSpringsGAPage() {
    return (
        <div className="container mx-auto py-16 px-4">
            <nav className="flex mb-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                    <li><Link href="/" className="hover:text-primary">Home</Link></li>
                    <li className="flex items-center space-x-2">
                        <ChevronRight className="h-4 w-4" />
                        <Link href="/service-areas/atlanta-logistics" className="hover:text-primary">Atlanta Service Areas</Link></li>
                    <li className="flex items-center space-x-2">
                        <ChevronRight className="h-4 w-4" />
                        <Link href="/service-areas/i-20-west" className="hover:text-primary">I-20 West</Link></li>
                    <li className="flex items-center space-x-2 text-foreground font-medium">
                        <ChevronRight className="h-4 w-4" />
                        <span>Lithia Springs</span>
                    </li>
                </ol>
            </nav>

            <div className="max-w-4xl mb-16">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Lithia Springs, GA Pallet Supply & Sourcing</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Lithia Springs has become a strategic hub for regional fulfillment and e-commerce distribution as part of the I-20 West corridor. With massive industrial parks hosting national retail and tech hubs, Lithia Springs warehouses require a high-velocity, reliable pallet supply chain. A3 Pallet specializes in meeting the capacity and stringent intake requirements of the sophisticated logistics facilities in the Lithia Springs area.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12 mb-24">
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Warehouse className="h-6 w-6 text-primary" />
                            Reliable Pallet Programs for Douglas County
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { title: "Standard 48x40 GMA", desc: "The requirement for Lithia Springs e-commerce fulfillment hubs." },
                                { title: "Premium Recycled Grade A", desc: "Meticulously graded for clean, retail-ready intake standards." },
                                { title: "High-Volume GMA Supply", desc: "Capacity-backed programs for facilities with massive throughput." },
                                { title: "Custom Sized Pallets", desc: "Build-to-spec solutions for specialized manufacturing and logistics." }
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
                            Lithia Springs Delivery & Logistics
                        </h2>
                        <ul className="space-y-4 text-muted-foreground">
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>I-20 West Corridor Priority:</strong> Lithia Springs is a central stop on our western delivery loops.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>Rapid Fulfillment Support:</strong> We maintain staging inventory to support the high-velocity requirements of digital retail.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>Flexible Intake Coordination:</strong> We work with your receiving teams for efficient trailer placement and timing.</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6">Who We Help in Lithia Springs</h2>
                        <div className="prose prose-slate max-w-none text-muted-foreground">
                            <p>We provide sourcing and supply for diverse industries:</p>
                            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 mt-4">
                                <li><strong>Global Tech & E-commerce:</strong> Major fulfillment hubs throughout Douglas County.</li>
                                <li><strong>Third-Party Logistics (3PL):</strong> Multi-tenant warehouses along the I-20 West corridor.</li>
                                <li><strong>Consumer Packaging:</strong> Efficient pallet programs for local production facilities.</li>
                                <li><strong>Industrial Supplies:</strong> Consistent supply for the region's manufacturing sector.</li>
                            </ul>
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <Card className="border-primary/20">
                        <CardContent className="pt-6 text-center">
                            <h3 className="font-bold mb-4">Lithia Springs Pallet Quote?</h3>
                            <p className="text-sm text-muted-foreground mb-6">Confirm volume and delivery for your Douglas County facility.</p>
                            <Link href="/contact">
                                <Button className="w-full font-bold">Request Pricing</Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Link href="/service-areas/i-20-west">
                        <Button variant="outline" className="w-full gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            I-20 West Corridor
                        </Button>
                    </Link>
                </div>
            </div>

            <section className="max-w-3xl mx-auto mb-24">
                <h2 className="text-3xl font-bold mb-12 text-center text-primary">Lithia Springs Logistics FAQs</h2>
                <div className="space-y-8">
                    {[
                        { q: "How quickly can you deliver to the industrial parks in Lithia Springs?", a: "By prioritizing I-20 West routing, we maintain frequent delivery staging for the major logistics nodes throughout the Lithia Springs region." },
                        { q: "Do your pallets meet the standards of major tech and retail brands?", a: "Yes, our Standard 48x40 GMA pallets are built and graded precisely for the stringent intake requirements of the area's largest hubs." },
                        { q: "Can you handle high-volume spikes in Douglas County?", a: "Our capacity-backed network is designed to scale with the seasonal fulfillment surges common in Lithia Springs' logistics landscape." },
                        { q: "Are heat-treated pallets available for international export?", a: "Absolutely. We supply certified ISPM-15 heat-treated pallets for companies shipping out of the Lithia Springs manufacturing hubs." }
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
