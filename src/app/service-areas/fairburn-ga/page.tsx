import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin, Truck, ChevronRight, CheckCircle2, Warehouse, ArrowLeft, Plane } from 'lucide-react';

export const metadata = {
    title: 'Fairburn, GA Pallet Supply & Sourcing | South Fulton | A3 Pallet',
    description: 'Specialized pallet supply for Fairburn, GA distribution centers and manufacturing hubs. High-volume GMA and Recycled pallets near the I-85 South corridor.',
};

export default function FairburnGAPage() {
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
                        <Link href="/service-areas/airport-i-85-south" className="hover:text-primary">Airport / I-85 South</Link></li>
                    <li className="flex items-center space-x-2 text-foreground font-medium">
                        <ChevronRight className="h-4 w-4" />
                        <span>Fairburn</span>
                    </li>
                </ol>
            </nav>

            <div className="max-w-4xl mb-16">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Fairburn, GA Pallet Supply & Sourcing</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Fairburn has become a hub for massive distribution and innovative manufacturing in South Fulton. Positioned strategically along the I-85 South corridor, Fairburn hosts large-scale facilities for some of the world's most recognizable consumer brands. A3 Pallet provides the capacity-backed supply programs necessary to maintain the high-volume throughput that Fairburn's industrial infrastructure demands.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12 mb-24">
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Warehouse className="h-6 w-6 text-primary" />
                            Industrial-Scale Pallet Solutions
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { title: "Standard 48x40 GMA", desc: "The requirement for Fairburn's extensive retail and FMCG hubs." },
                                { title: "Premium Recycled Grade A", desc: "Graded to the strict tolerances required by automated DCs." },
                                { title: "High-Volume GMA Supply", desc: "Sourcing for facilities with 1M+ sq. ft. of industrial space." },
                                { title: "Custom Spec Pallets", desc: "Build-to-order solutions for specialized production lines." }
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
                            Fairburn Delivery & Logistics
                        </h2>
                        <ul className="space-y-4 text-muted-foreground">
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>I-85 South Priority Routing:</strong> Fairburn is a core stop on our South Metro staging and delivery loops.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>Trailer Drop Programs:</strong> Available for established high-volume facilities in the Fairburn industrial zones.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>Confirm by Quote:</strong> We verify availability and routing windows based on current facility throughput.</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6">Who We Help in Fairburn</h2>
                        <div className="prose prose-slate max-w-none text-muted-foreground">
                            <p>We provide supply and sourcing for diverse industries:</p>
                            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 mt-4">
                                <li><strong>Consumer Fast-Moving Goods (FMCG):</strong> Supporting major national distribution hubs.</li>
                                <li><strong>Global 3PL Providers:</strong> Reliable supply for multi-tenant logistics parks.</li>
                                <li><strong>Food & Beverage:</strong> Durable pallets for regional grocery fulfillment.</li>
                                <li><strong>Specialized Manufacturing:</strong> Components and assembly operations in South Fulton.</li>
                            </ul>
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <Card className="border-primary/20">
                        <CardContent className="pt-6 text-center">
                            <h3 className="font-bold mb-4">Fairburn Pallet Quote?</h3>
                            <p className="text-sm text-muted-foreground mb-6">Confirm volume and delivery for your South Metro facility.</p>
                            <Link href="/contact">
                                <Button className="w-full font-bold">Request Pricing</Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Link href="/service-areas/airport-i-85-south">
                        <Button variant="outline" className="w-full gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Airport Corridor Info
                        </Button>
                    </Link>
                </div>
            </div>

            <section className="max-w-3xl mx-auto mb-24">
                <h2 className="text-3xl font-bold mb-12 text-center text-primary">Fairburn Logistics FAQs</h2>
                <div className="space-y-8">
                    {[
                        { q: "How quickly can you deliver to a distribution center in Fairburn?", a: "By prioritizing I-85 South routing, we maintain frequent delivery staging for the industrial parks throughout the Fairburn region." },
                        { q: "Do your pallets meet the standards of major consumer brands?", a: "Yes, our Standard 48x40 GMA pallets are built and graded precisely for the intake requirements of national retail and consumer fulfillment." },
                        { q: "Can you handle drops and swaps in South Fulton?", a: "Drop trailer programs are available for established high-volume accounts depending on site logistics and trailer availability." },
                        { q: "Are heat-treated pallets available for international export?", a: "Absolutely. We supply certified ISPM-15 heat-treated pallets for companies shipping out of the Fairburn region." }
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
