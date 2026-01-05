import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin, Truck, ChevronRight, CheckCircle2, Warehouse, ArrowLeft, Plane } from 'lucide-react';

export const metadata = {
    title: 'Airport & I-85 South Pallet Supply | Union City & Fairburn | A3 Pallet',
    description: 'Specialized pallet supply and sourcing for the Airport / I-85 South corridor, serving Union City, Fairburn, and the South Fulton logistics region.',
};

export default function AirportI85SouthPage() {
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
                        <span>Airport / I-85 South</span>
                    </li>
                </ol>
            </nav>

            <div className="max-w-4xl mb-16">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Airport / I-85 South Pallet Supply & Sourcing</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Centrally located around Hartsfield-Jackson International Airport and stretching through South Fulton, the Airport / I-85 South corridor is one of the densest logistics regions in the country. With massive e-commerce fulfillment centers and air-cargo distribution hubs in Union City and Fairburn, reliable pallet supply is demand-critical.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12 mb-24">
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Plane className="h-6 w-6 text-primary" />
                            Pallet Solutions for Air-Cargo & Fulfillment
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { title: "Standard 48x40 GMA", desc: "The requirement for large fulfillment centers in Fairburn." },
                                { title: "High-Volume Recycled", desc: "Grade A and B pallets for rapid-turnover warehouse operations." },
                                { title: "Air-Cargo Optimized", desc: "Sourcing for lightweight and standardized air-freight needs." },
                                { title: "Custom Heavy-Duty", desc: "Built for the machinery and automotive parts sector near the airport." }
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
                                <span><strong>Airport Proximity Routing:</strong> We prioritize routing along I-85 South and I-285 for the South Fulton industrial parks.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>Just-In-Time Coordination:</strong> Supporting the high-velocity requirements of Union City's distribution landscape.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>Flexible Lead Times:</strong> Localized sourcing allows us to respond quickly to volume shifts in the South Metro area.</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6">Who We Help (South Fulton/Airport)</h2>
                        <div className="prose prose-slate max-w-none text-muted-foreground">
                            <p>We provide tailored pallet programs for:</p>
                            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 mt-4">
                                <li><strong>Global E-commerce:</strong> Major fulfillment hubs in Union City.</li>
                                <li><strong>Air Freight Forwarders:</strong> Cargo operations near Hartsfield-Jackson.</li>
                                <li><strong>3PL Warehousing:</strong> High-density storage facilities along I-85 South.</li>
                                <li><strong>Industrial Manufacturing:</strong> Parts and equipment suppliers in South Fulton.</li>
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
                                {['Union City', 'Fairburn', 'College Park'].map(city => (
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
                            <p className="text-sm text-muted-foreground mb-6">Secure Your Pallet Supply for the Airport Corridor.</p>
                            <Link href="/contact">
                                <Button className="w-full font-bold">Get Pricing Now</Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <section className="max-w-3xl mx-auto mb-24">
                <h2 className="text-3xl font-bold mb-12 text-center text-primary">Airport Corridor FAQs</h2>
                <div className="space-y-8">
                    {[
                        { q: "Do you deliver to the large industrial parks in Union City?", a: "Yes, Union City is a primary service area for our Atlanta-based routing, particularly for high-volume GMA pallet programs." },
                        { q: "Can you provide pallets for international air freight?", a: "We offer ISPM-15 heat-treated pallets specifically designed for international shipping compliance, vital for the air cargo sector." },
                        { q: "How do you handle high-volume surges in South Fulton?", a: "By maintaining a vetted partner network and localized routing, we can scale our supply to meet seasonal fulfillment demands in the Airport corridor." },
                        { q: "What are your delivery requirements for Fairburn facilities?", a: "We coordinate with facility managers to meet specific intake windows and trailer requirements (e.g., drop trailers) for the large distribution centers in the area." }
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
                        <p className="font-bold">Exploring Other Corridors?</p>
                        <p className="text-sm text-muted-foreground">See our full Atlanta logistics coverage.</p>
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
