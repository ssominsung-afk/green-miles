import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin, Truck, ChevronRight, CheckCircle2, Warehouse, ArrowLeft } from 'lucide-react';

export const metadata = {
    title: 'Braselton, GA Pallet Supply & Sourcing | Jackson County | A3 Pallet',
    description: 'Specialized pallet supply for Braselton, GA distribution centers and manufacturing hubs. High-volume GMA and Recycled pallets near the I-85 North corridor.',
};

export default function BraseltonGAPage() {
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
                        <Link href="/service-areas/i-85-north" className="hover:text-primary">I-85 North</Link></li>
                    <li className="flex items-center space-x-2 text-foreground font-medium">
                        <ChevronRight className="h-4 w-4" />
                        <span>Braselton</span>
                    </li>
                </ol>
            </nav>

            <div className="max-w-4xl mb-16">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Braselton, GA Pallet Supply & Sourcing</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Braselton has become one of the premier logistics destinations in Jackson County, serving as a gateway to Northeast Georgia and the broader Southeast. With a concentration of large-scale distribution centers and corporate warehouse operations along the I-85 North corridor, Braselton requires a sophisticated pallet supply partner. A3 Pallet specializes in meeting the high-capacity needs of Braselton's extensive industrial landscape.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12 mb-24">
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Warehouse className="h-6 w-6 text-primary" />
                            Corridor-Ready Pallet Programs
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { title: "Standard 48x40 GMA", desc: "The requirement for Braselton's major retail and fashion DCs." },
                                { title: "Refycled Grade A/B", desc: "Economical sourcing for regional 3PL and storage hubs." },
                                { title: "High-Volume GMA Supply", desc: "Capacity-backed programs for multi-facility operations." },
                                { title: "Custom Sized Pallets", desc: "Built to spec for specialized manufacturing in Jackson County." }
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
                            Braselton Delivery & Cutoff Notes
                        </h2>
                        <ul className="space-y-4 text-muted-foreground">
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>Jackson County Priority:</strong> Braselton industrial nodes are a primary focus for our Northeast routing.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>Trailer Drop Programs:</strong> Available for established high-volume accounts in the region.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>Confirm by Quote:</strong> We verify availability and staging windows based on facility throughput.</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6">Who We Help in Braselton</h2>
                        <div className="prose prose-slate max-w-none text-muted-foreground">
                            <p>We provide supply and sourcing for:</p>
                            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 mt-4">
                                <li><strong>Global Apparel Brands:</strong> High-volume fulfillment centers in the region.</li>
                                <li><strong>Third-Party Logistics (3PL):</strong> Multi-tenant warehouses requiring consistent GMA pallets.</li>
                                <li><strong>Consumer Electronics:</strong> High-value distribution requiring clean, graded pallets.</li>
                                <li><strong>Specialized Manufacturing:</strong> Components and assembly operations in Jackson County.</li>
                            </ul>
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <Card className="border-primary/20">
                        <CardContent className="pt-6 text-center">
                            <h3 className="font-bold mb-4">Braselton Pallet Quote?</h3>
                            <p className="text-sm text-muted-foreground mb-6">Secure volume and delivery for your facility.</p>
                            <Link href="/contact">
                                <Button className="w-full font-bold">Get a Quote</Button>
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

            <section className="max-w-3xl mx-auto mb-24">
                <h2 className="text-3xl font-bold mb-12 text-center text-primary">Braselton Logistics FAQs</h2>
                <div className="space-y-8">
                    {[
                        { q: "How quickly can you deliver to Braselton hubs?", a: "Braselton is a core stop on our I-85 North delivery loops, allowing for efficient staging and routing once a quote is confirmed." },
                        { q: "Do your pallets meet strict retail intake standards?", a: "Yes, our Standard 48x40 GMA pallets (New and Grade A) are built and graded specifically for the stringent requirements of national retail DCs." },
                        { q: "Can you manage high-volume spikes in Jackson County?", a: "Our capacity-backed network is designed to scale with the seasonal fulfillment surges common in Braselton's industrial parks." },
                        { q: "Are heat-treated pallets available for international shipping?", a: "Absolutely. We supply certified ISPM-15 heat-treated pallets for manufacturers shipping out of the Braselton region." }
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
