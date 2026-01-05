import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin, Truck, ChevronRight, CheckCircle2, Warehouse, ArrowLeft } from 'lucide-react';

export const metadata = {
    title: 'Norcross, GA Pallet Supply & Sourcing | Northeast Atlanta | A3 Pallet',
    description: 'Specialized pallet supply for Norcross, GA warehouses and distribution centers. High-quality GMA, recycled, and custom pallets with I-85 North corridor routing.',
};

export default function NorcrossGAPage() {
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
                        <span>Norcross</span>
                    </li>
                </ol>
            </nav>

            <div className="max-w-4xl mb-16">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Norcross, GA Pallet Supply & Sourcing</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    As one of Gwinnett County's most established industrial nodes, Norcross serves as a critical junction for Northeast Atlanta logistics. Positioned along the I-85 North corridor, Norcross warehouses require reliable, high-volume pallet supply to keep regional and national supply chains moving. A3 Pallet provides specialized sourcing for the diverse mix of distribution and manufacturing operations in the Norcross area.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12 mb-24">
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Warehouse className="h-6 w-6 text-primary" />
                            Common Orders in Norcross
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { title: "Standard 48x40 GMA", desc: "The requirement for most Norcross retail and consumer distribution centers." },
                                { title: "Recycled Grade A", desc: "Premium refurbished pallets for local 3PL and storage facilities." },
                                { title: "Heat-Treated (ISPM-15)", desc: "Essential for the international shipping needs of Norcross manufacturers." },
                                { title: "Custom Sized Pallets", desc: "Built to spec for the area's specialized industrial equipment." }
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
                            Delivery & Cutoff Notes
                        </h2>
                        <ul className="space-y-4 text-muted-foreground">
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>Daily I-85 North Loops:</strong> Norcross facilities benefit from frequent delivery windows due to our prioritized corridor routing.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>Rush Availability:</strong> We aim to accommodate urgent volume shifts for established Norcross accounts when possible.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>Confirm by Quote:</strong> Please contact us to confirm current delivery lead times for your specific location.</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6">Who We Help in Norcross</h2>
                        <div className="prose prose-slate max-w-none text-muted-foreground">
                            <p>Our Norcross client base includes a variety of verticals:</p>
                            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 mt-4">
                                <li><strong>Consumer Electronics:</strong> Distribution centers requiring clean, sized pallets.</li>
                                <li><strong>Industrial Machinery:</strong> Manufacturers needing custom and heavy-duty builds.</li>
                                <li><strong>Logostics Providers (3PL):</strong> General pallet supply for multi-tenant facilities.</li>
                                <li><strong>Print & Packaging:</strong> Efficient pallet programs for high-volume producers.</li>
                            </ul>
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <Card className="border-primary/20">
                        <CardContent className="pt-6 text-center">
                            <h3 className="font-bold mb-4">Need Pallets in Norcross?</h3>
                            <p className="text-sm text-muted-foreground mb-6">Confirm volume availability and delivery windows.</p>
                            <Link href="/contact">
                                <Button className="w-full font-bold">Request a Quote</Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Link href="/service-areas/i-85-north">
                        <Button variant="outline" className="w-full gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to I-85 North
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Custom CTA Banner */}
            <div className="mb-24 bg-primary/5 border-2 border-primary/10 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="text-xl font-bold mb-1 text-primary">Custom Build-to-Spec Pallets</h3>
                    <p className="text-muted-foreground text-sm">Available for this corridor and multi-site Southeast programs.</p>
                </div>
                <Link href="/custom">
                    <Button variant="default" className="font-bold px-8">Get Custom Quote</Button>
                </Link>
            </div>

            <section className="max-w-3xl mx-auto mb-24">
                <h2 className="text-3xl font-bold mb-12 text-center text-primary">Norcross Pallet FAQs</h2>
                <div className="space-y-8">
                    {[
                        { q: "How quickly can you deliver to a warehouse in Norcross?", a: "With Norcross being a primary stop on our I-85 North delivery loops, we can often schedule deliveries efficiently once a quote is confirmed." },
                        { q: "Do you supply the distribution centers near Jimmy Carter Blvd?", a: "Yes, we work with many facilities in the Norcross industrial parks near major highway interchanges like Jimmy Carter and Beaver Ruin." },
                        { q: "Are your pallets compatible with automated sorting lines?", a: "We provide high-quality Standard 48x40 GMA pallets (both New and Grade A) that are built to the strict tolerances required for most automated systems." },
                        { q: "Can you provide ISPM-15 certified pallets in Norcross?", a: "Absolutely. We supply certified heat-treated pallets for Norcross-based companies that ship to international markets." }
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
        </div >
    );
}
