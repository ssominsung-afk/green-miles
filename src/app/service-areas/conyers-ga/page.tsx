import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin, Truck, ChevronRight, CheckCircle2, Warehouse, ArrowLeft } from 'lucide-react';

export const metadata = {
    title: 'Conyers, GA Pallet Supply & Sourcing | Rockdale County | A3 Pallet',
    description: 'Specialized pallet supply for Conyers, GA warehouses and manufacturing hubs. High-volume GMA and Recycled pallet programs near the I-20 East corridor.',
};

export default function ConyersGAPage() {
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
                        <Link href="/service-areas/i-20-east" className="hover:text-primary">I-20 East</Link></li>
                    <li className="flex items-center space-x-2 text-foreground font-medium">
                        <ChevronRight className="h-4 w-4" />
                        <span>Conyers</span>
                    </li>
                </ol>
            </nav>

            <div className="max-w-4xl mb-16">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Conyers, GA Pallet Supply & Sourcing</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Conyers serves as a primary industrial anchor for the I-20 East corridor, hosting a diverse mix of manufacturing hubs and regional distribution centers. Rockdale County's logistics infrastructure requires a reliable partner capable of providing both standard GMA pallets and custom spec solutions for specialized production. A3 Pallet provides the capacity-backed supply programs necessary to keep Conyers' industrial operations fully optimized.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12 mb-24">
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Warehouse className="h-6 w-6 text-primary" />
                            Tailored Pallet Solutions for Rockdale
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { title: "Standard 48x40 GMA", desc: "The reliable spec for Conyers distribution and warehouse nodes." },
                                { title: "Refycled Grade A/B", desc: "Economical sourcing for regional 3PL and shipping operations." },
                                { title: "Custom Manufacturing Specs", desc: "Build-to-spec solutions for Conyers' specialized production lines." },
                                { title: "Heat-Treated (ISPM-15)", desc: "Compliant pallets for international export from the eastern corridor." }
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
                            Conyers Delivery & Logistics
                        </h2>
                        <ul className="space-y-4 text-muted-foreground">
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>I-20 East Priority Routing:</strong> Conyers is a core destination for our eastern metro delivery loops.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>Flexible Supply Programs:</strong> Supporting both high-volume DCs and specialized manufacturing cells.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>Confirm by Quote:</strong> We verify availability and staging windows based on facility throughput.</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6">Who We Help in Conyers</h2>
                        <div className="prose prose-slate max-w-none text-muted-foreground">
                            <p>Our Conyers client base includes a range of industries:</p>
                            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 mt-4">
                                <li><strong>Industrial Manufacturing:</strong> Facilities requiring custom-sized and heavy-duty pallets.</li>
                                <li><strong>Consumer Distribution:</strong> Large-scale warehousing throughout Rockdale County.</li>
                                <li><strong>Automotive Parts:</strong> Suppliers requiring durable and graded GMA pallets.</li>
                                <li><strong>Building Products:</strong> Consistent supply for the region's expanding construction sector.</li>
                            </ul>
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <Card className="border-primary/20">
                        <CardContent className="pt-6 text-center">
                            <h3 className="font-bold mb-4">Conyers Pallet Quote?</h3>
                            <p className="text-sm text-muted-foreground mb-6">Secure volume and delivery for your Rockdale facility.</p>
                            <Link href="/contact">
                                <Button className="w-full font-bold">Request Pricing</Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Link href="/service-areas/i-20-east">
                        <Button variant="outline" className="w-full gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            I-20 East Corridor
                        </Button>
                    </Link>
                </div>
            </div>

            <section className="max-w-3xl mx-auto mb-24">
                <h2 className="text-3xl font-bold mb-12 text-center text-primary">Conyers Logistics FAQs</h2>
                <div className="space-y-8">
                    {[
                        { q: "How quickly can you deliver to a facility in Conyers?", a: "With Conyers being a primary stops on our I-20 East routing, we maintain frequent delivery loops for the area's industrial parks." },
                        { q: "Do you supply the manufacturing hubs near Salem Road?", a: "Yes, we prioritize routing for the industrial nodes throughout Conyers and Newton County." },
                        { q: "What pallet grade is recommended for heavy industrial parts?", a: "Most heavy manufacturing operations prefer Standard 48x40 GMA pallets (New or Premium Grade A) for their structural integrity." },
                        { q: "Are heat-treated pallets available for eastern corridor exporters?", a: "Absolutely. We supply certified ISPM-15 heat-treated pallets for companies shipping internationally from Conyers." }
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
