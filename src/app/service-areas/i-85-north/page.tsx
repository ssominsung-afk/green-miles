import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin, Truck, ChevronRight, CheckCircle2, Warehouse, ArrowLeft } from 'lucide-react';

export const metadata = {
    title: 'I-85 North Pallet Supply | Gwinnett & Jackson County | A3 Pallet',
    description: 'Specialized pallet supply and sourcing along the I-85 North corridor, serving Norcross, Duluth, Suwanee, Buford, and Braselton distribution hubs.',
};

export default function I85NorthPage() {
    return (
        <div className="container mx-auto py-16 px-4">
            <nav className="flex mb-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                    <li><Link href="/" className="hover:text-primary">Home</Link></li>
                    <li className="flex items-center space-x-2">
                        <ChevronRight className="h-4 w-4" />
                        <Link href="/service-areas/atlanta-logistics" className="hover:text-primary">Atlanta Service Areas</Link></li>
                    <li className="flex items-center space-x-2 text-foreground font-medium">
                        <ChevronRight className="h-4 w-4" />
                        <span>I-85 North</span>
                    </li>
                </ol>
            </nav>

            <div className="max-w-4xl mb-16">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">I-85 North Pallet Supply & Sourcing (Atlanta Metro)</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    The I-85 North corridor is the backbone of Northeast Atlanta's logistics infrastructure. Stretching through Gwinnett and Jackson counties, this region hosts some of the Southeast's most critical distribution and manufacturing hubs. A3 Pallet provides dedicated support for operations located near the major intermodal and highway interfaces in this corridor.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12 mb-24">
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Warehouse className="h-6 w-6 text-primary" />
                            Common Pallet Programs Here
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { title: "Standard 48x40 GMA", desc: "The staple for Gwinnett's retail distribution centers." },
                                { title: "Recycled Grade A/B", desc: "Cost-effective solutions for high-volume 3PLs." },
                                { title: "Heat-Treated Pallets", desc: "ISPM-15 compliant for Norcross-based exporters." },
                                { title: "Custom Heavy-Duty", desc: "Engineered for Northeast GA's manufacturing sector." }
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
                            Delivery & Scheduling Notes
                        </h2>
                        <ul className="space-y-4 text-muted-foreground">
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>Priority Routing:</strong> We utilize frequent loops through Norcross, Buford, and Braselton for efficient delivery.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>Volume Availability:</strong> Capacity-backed programs ensure consistent supply even during peak seasonal surges along I-85.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>Confirm by Quote:</strong> All delivery windows are confirmed at the time of order based on current facility throughput.</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6">Who We Help (Northeast Corridor)</h2>
                        <div className="prose prose-slate max-w-none text-muted-foreground">
                            <p>We serve a diverse range of industries along the I-85 North corridor, including:</p>
                            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 mt-4">
                                <li><strong>Consumer Goods:</strong> Large-scale distribution in Gwinnett.</li>
                                <li><strong>Automotive:</strong> Suppliers serving the broader GA/SC manufacturing belt.</li>
                                <li><strong>E-commerce:</strong> Fulfillment centers in Buford and Braselton.</li>
                                <li><strong>3PL Providers:</strong> Multi-client warehouses requiring standardized GMA pallets.</li>
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
                                {['Norcross', 'Duluth', 'Suwanee', 'Buford', 'Braselton'].map(city => (
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
                            <h3 className="font-bold mb-4">Need a Quote?</h3>
                            <p className="text-sm text-muted-foreground mb-6">Confirm volume availability for I-85 North.</p>
                            <Link href="/contact">
                                <Button className="w-full font-bold">Request Pricing</Button>
                            </Link>
                        </CardContent>
                    </Card>
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
                <h2 className="text-3xl font-bold mb-12 text-center">I-85 North Corridor FAQs</h2>
                <div className="space-y-8">
                    {[
                        { q: "How often do you deliver to Buford and Braselton?", a: "We have multiple trailers moving through the Gwinnett and Jackson county areas weekly, allowing for relatively flexible routing for established accounts." },
                        { q: "Are your pallets heat-treated for export from Norcross?", a: "Yes, we provide ISPM-15 certified heat-treated pallets specifically for manufacturers in the Northeast corridor who need to ship internationally." },
                        { q: "Do you supply the large distribution centers in Suwanee?", a: "We work with many warehouse operators in the Suwanee area, providing high-quality Grade A GMA pallets that meet strict retail intake requirements." },
                        { q: "Can you handle drops and swaps in the I-85 corridor?", a: "Drop trailer programs are available for high-volume accounts depending on site logistics and trailer availability." }
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
                        <p className="font-bold">Not in the Northeast?</p>
                        <p className="text-sm text-muted-foreground">View all Atlanta logistics corridors.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Link href="/service-areas/atlanta-logistics">
                        <Button variant="outline">Back to Hub</Button>
                    </Link>
                    <Link href="/pallets">
                        <Button variant="outline">View All Pallets</Button>
                    </Link>
                </div>
            </div>
        </div >
    );
}
