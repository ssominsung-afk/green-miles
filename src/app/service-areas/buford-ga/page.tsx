import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin, Truck, ChevronRight, CheckCircle2, Warehouse, ArrowLeft } from 'lucide-react';

export const metadata = {
    title: 'Buford, GA Pallet Supply & Sourcing | Northeast Gwinnett | A3 Pallet',
    description: 'Reliable pallet supply for Buford, GA warehouses and regional distribution hubs. Specializing in high-volume GMA and recycled pallet programs near I-85 North.',
};

export default function BufordGAPage() {
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
                        <span>Buford</span>
                    </li>
                </ol>
            </nav>

            <div className="max-w-4xl mb-16">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Buford, GA Pallet Supply & Sourcing</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Buford has evolved into a powerhouse for regional distribution and e-commerce fulfillment in Northeast Gwinnett. With its strategic position along the I-85 North corridor and proximity to major intermodal hubs, Buford warehouses require a high-velocity pallet supply chain. A3 Pallet provides capacity-backed programs for the massive industrial parks and 3PL providers that call Buford home.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12 mb-24">
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Warehouse className="h-6 w-6 text-primary" />
                            Common Pallet Orders in Buford
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { title: "Standard 48x40 GMA", desc: "The primary requirement for Buford's large fulfillment centers." },
                                { title: "Recycled Grade A/B", desc: "Consistent supply for high-turnover warehouse operations." },
                                { title: "Custom Heavy-Duty", desc: "Built to spec for the area's manufacturing and parts sectors." },
                                { title: "Heat-Treated (ISPM-15)", desc: "Compliant solutions for Buford-based international shippers." }
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
                            Buford Delivery & Logistics
                        </h2>
                        <ul className="space-y-4 text-muted-foreground">
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>I-85 North Priority:</strong> Buford is a central stop on our Northeast Atlanta delivery loops.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>High-Volume Staging:</strong> We maintain inventory to support the massive square footage of Buford's industrial nodes.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>Flexible Routing:</strong> Coordinating with facility intake for efficient trailer timing and drops.</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6">Who We Help in Buford</h2>
                        <div className="prose prose-slate max-w-none text-muted-foreground">
                            <p>We provide tailored pallet programs for:</p>
                            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 mt-4">
                                <li><strong>National Retailers:</strong> Fulfillment operations near the Mall of Georgia region.</li>
                                <li><strong>3PL Warehousing:</strong> Multi-client facilities requiring graded GMA pallets.</li>
                                <li><strong>Food & Beverage:</strong> Durable pallets for regional cold storage and distribution.</li>
                                <li><strong>E-commerce Hubs:</strong> Supporting the high-velocity needs of digital retail fulfillment.</li>
                            </ul>
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <Card className="border-primary/20">
                        <CardContent className="pt-6 text-center">
                            <h3 className="font-bold mb-4">Buford Pallet Quote?</h3>
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

            <section className="max-w-3xl mx-auto mb-24">
                <h2 className="text-3xl font-bold mb-12 text-center text-primary">Buford Logistics FAQs</h2>
                <div className="space-y-8">
                    {[
                        { q: "Do you deliver to the industrial parks near Gravel Springs Road?", a: "Yes, we prioritize routing for the expanding industrial nodes in Northern Gwinnett, including the areas near the newer I-85 interchanges." },
                        { q: "Can you provide Grade A pallets for retail-ready distribution?", a: "Absolutely. Our Grade A recycled pallets are meticulously graded to ensure they meet the intake standards of Buford's major retail fulfillment centers." },
                        { q: "What is your typical lead time for Buford facility deliveries?", a: "Being Atlanta-based with a focus on the I-85 North corridor allows us to coordinate regional delivery efficiently—contact us for a specific window." },
                        { q: "Do you handle custom build-to-spec for Buford manufacturers?", a: "Yes, we work with manufacturing clients in Buford to provide custom-sized and heavy-duty pallets built to their specific requirements." }
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
