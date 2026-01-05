import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin, Truck, ChevronRight, CheckCircle2, Warehouse, ArrowLeft } from 'lucide-react';

export const metadata = {
    title: 'McDonough, GA Pallet Supply & Sourcing | Henry County Hub | A3 Pallet',
    description: 'Specialized pallet supply for McDonough, GA distribution centers. High-volume GMA and Recycled pallet programs with I-75 South corridor priority.',
};

export default function McDonoughGAPage() {
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
                        <Link href="/service-areas/i-75-south-henry" className="hover:text-primary">I-75 South</Link></li>
                    <li className="flex items-center space-x-2 text-foreground font-medium">
                        <ChevronRight className="h-4 w-4" />
                        <span>McDonough</span>
                    </li>
                </ol>
            </nav>

            <div className="max-w-4xl mb-16">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">McDonough, GA Pallet Supply & Sourcing</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    McDonough has emerged as one of the most significant logistics hubs in the Southeast, serving as a primary anchor for the I-75 South corridor. With massive distribution centers for major retail and consumer brands, McDonough's industrial landscape requires a sophisticated, high-capacity pallet partner. A3 Pallet provides the capacity and reliability needed to support the 1M+ square foot facilities that define McDonough's logistics footprint.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12 mb-24">
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Warehouse className="h-6 w-6 text-primary" />
                            Retail-Ready Pallet Solutions
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { title: "Standard 48x40 GMA", desc: "The requirement for McDonough's diverse retail distribution centers." },
                                { title: "Premium Recycled Grade A", desc: "Meticulously graded for clean, retail-ready intake standards." },
                                { title: "High-Volume GMA Supply", desc: "Capacity-backed programs for massive multi-facility operators." },
                                { title: "Custom Heavy-Duty", desc: "Built to spec for McDonough's manufacturing and parts sectors." }
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
                            McDonough Delivery & Logistics
                        </h2>
                        <ul className="space-y-4 text-muted-foreground">
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>I-75 South Prioritization:</strong> McDonough is a primary focus for our South Metro delivery loops.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>Staging for Volume:</strong> We maintain deep inventory to support the high-turnover needs of Henry County DCs.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><span><strong>Flexible Intake Support:</strong> Coordinating with facility teams for trailer drops and just-in-time routing.</span></span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6">Who We Help in McDonough</h2>
                        <div className="prose prose-slate max-w-none text-muted-foreground">
                            <p>We provide supply and sourcing for a range of industries:</p>
                            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 mt-4">
                                <li><strong>Big-Box Retail:</strong> National distribution hubs throughout Henry County.</li>
                                <li><strong>Third-Party Logistics (3PL):</strong> Multi-client facilities along the I-75 corridor.</li>
                                <li><strong>Consumer Goods:</strong> Rapid-fulfillment operations for household brands.</li>
                                <li><strong>Automotive & Parts:</strong> Durable pallets for heavy industrial parts distribution.</li>
                            </ul>
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <Card className="border-primary/20">
                        <CardContent className="pt-6 text-center">
                            <h3 className="font-bold mb-4">McDonough Pallet Quote?</h3>
                            <p className="text-sm text-muted-foreground mb-6">Secure volume and delivery for your Henry County facility.</p>
                            <Link href="/contact">
                                <Button className="w-full font-bold">Request Pricing</Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Link href="/service-areas/i-75-south-henry">
                        <Button variant="outline" className="w-full gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            I-75 South Corridor
                        </Button>
                    </Link>
                </div>
            </div>

            <section className="max-w-3xl mx-auto mb-24">
                <h2 className="text-3xl font-bold mb-12 text-center text-primary">McDonough Logistics FAQs</h2>
                <div className="space-y-8">
                    {[
                        { q: "How quickly can you deliver to the industrial parks in McDonough?", a: "McDonough is a central stop on our South Metro loops, allowing for frequent and efficient delivery staging." },
                        { q: "Do you supply the large distribution centers near I-75?", a: "Yes, we work with many facilities along the highway-oriented industrial zones in McDonough and Stockbridge." },
                        { q: "What pallet grade is recommended for retail fulfillment?", a: "Most McDonough-based retail DCs prefer Standard 48x40 GMA Grade A pallets for their consistency and clean appearance." },
                        { q: "Can you handle drops and swaps in Henry County?", a: "Drop trailer programs are available for established high-volume accounts depending on site logistics and trailer availability." }
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
