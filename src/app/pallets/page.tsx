import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Package, Check, Truck, MapPin, Settings } from 'lucide-react';

export const metadata = {
    title: 'Custom & Standard Pallet Programs | Atlanta & SE',
    description: 'Atlanta-based pallet supply programs for warehouses and distribution centers. Specializing in custom-engineered builds and standard GMA 48x40 supply across the Southeast.',
};

export default function PalletsPage() {
    return (
        <div className="container mx-auto py-16 px-4">
            <div className="text-center mb-16">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-primary">Pallet Supply & Sourcing Programs</h1>
                <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-6">
                    A3 Pallet is Atlanta-based and supports warehouse operations with reliable pallet programs. We specialize in custom build-to-spec programs and consistent standard GMA supply across the Southeast.
                </p>
            </div>

            {/* Custom Hero Block */}
            <div className="mb-20 bg-primary text-primary-foreground rounded-2xl p-10 shadow-xl relative overflow-hidden">
                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-3xl font-bold mb-4">Custom First: Engineered Specs</h2>
                    <p className="text-primary-foreground/90 text-lg mb-8">
                        While we supply standard GMA pallets at scale, our core focuses on <strong>engineered custom-spec programs</strong> (MOQ 50–100+). We bridge the gap between complex PDS requirements and multi-site Southeast delivery coordination.
                    </p>
                    <Link href="/custom">
                        <Button size="lg" variant="secondary" className="font-bold px-8">Review Custom Specs & Request Quote</Button>
                    </Link>
                </div>
                <Package className="absolute right-[-20px] bottom-[-20px] h-64 w-64 opacity-10 rotate-12" />
            </div>

            {/* Standard vs Custom Comparison */}
            <div className="mb-20 grid md:grid-cols-2 gap-8">
                <div className="p-8 rounded-2xl border bg-white shadow-sm">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Package className="h-6 w-6 text-primary" />
                        Standard 48x40 GMA
                    </h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-1 text-green-600 shrink-0" /> Ideal for common warehouse racking & storage</li>
                        <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-1 text-green-600 shrink-0" /> Fast deployment for retail & distribution</li>
                        <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-1 text-green-600 shrink-0" /> Cost-effective recycled & new options</li>
                    </ul>
                </div>
                <div className="p-8 rounded-2xl border-2 border-primary bg-primary/5 shadow-sm">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary">
                        <Settings className="h-6 w-6" />
                        Custom Build-to-Spec
                    </h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-1 text-primary shrink-0" /> Unique product footprints & heavy industrial loads</li>
                        <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-1 text-primary shrink-0" /> Strict automation & conveyor tolerances</li>
                        <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-1 text-primary shrink-0" /> Certified export heat-treatment (ISPM-15)</li>
                    </ul>
                </div>
            </div>

            {/* Logistics Corridors Section */}
            <div className="mb-20 bg-muted/50 border rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                    <MapPin className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold">Atlanta Logistics Corridors We Serve</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-3">
                        <Link href="/service-areas/i-85-north" className="text-primary hover:underline font-semibold block">
                            I-85 North (Gwinnett → Jackson)
                        </Link>
                        <p className="text-sm text-muted-foreground">Serving Norcross, Duluth, Suwanee, Buford, and Braselton.</p>
                    </div>
                    <div className="space-y-3">
                        <Link href="/service-areas/airport-i-85-south" className="text-primary hover:underline font-semibold block">
                            Airport / I-85 South
                        </Link>
                        <p className="text-sm text-muted-foreground">Serving Union City, Fairburn, and the College Park area.</p>
                    </div>
                    <div className="space-y-3">
                        <Link href="/service-areas/i-75-south-henry" className="text-primary hover:underline font-semibold block">
                            I-75 South / Henry County
                        </Link>
                        <p className="text-sm text-muted-foreground">Serving McDonough, Locust Grove, and Stockbridge.</p>
                    </div>
                    <div className="space-y-3">
                        <Link href="/service-areas/i-20-west" className="text-primary hover:underline font-semibold block">
                            I-20 West / Douglas County
                        </Link>
                        <p className="text-sm text-muted-foreground">Serving Lithia Springs and Douglasville.</p>
                    </div>
                    <div className="space-y-3">
                        <Link href="/service-areas/i-20-east" className="text-primary hover:underline font-semibold block">
                            I-20 East
                        </Link>
                        <p className="text-sm text-muted-foreground">Serving Conyers and Covington.</p>
                    </div>
                    <div className="flex items-center justify-center p-4 bg-white/50 rounded-lg border border-dashed border-primary/30">
                        <p className="text-xs text-muted-foreground text-center">
                            Regional Southeast support available for multi-site needs.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                {/* Product 1 */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Package className="h-6 w-6 text-primary" />
                            New 48x40 GMA
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            Fresh lumber, built to strict GMA specifications. Ideal for automated lines and high-value goods. <span className="text-primary font-medium italic">Also available as custom variants.</span>
                        </p>
                        <ul className="space-y-2 text-sm mb-6">
                            <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-600" /> 4-Way Entry</li>
                            <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-600" /> Hardwood Stringers</li>
                            <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-600" /> Heat-Treat Available (ISPM-15)</li>
                        </ul>
                        <Link href="/contact" className="w-full">
                            <Button className="w-full">Get Volume Pricing</Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Product 2 */}
                <Card className="border-primary/50 bg-primary/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Package className="h-6 w-6 text-primary" />
                            Recycled Grade A (#1)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">Best Seller</div>
                        <p className="text-sm text-muted-foreground mb-4">
                            Premium refurbished pallets. Clean appearance with no companion stringers. <span className="text-primary font-medium italic">Also available as custom variants.</span>
                        </p>
                        <ul className="space-y-2 text-sm mb-6">
                            <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-600" /> Structurally Sound</li>
                            <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-600" /> Clean Appearance</li>
                            <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-600" /> Consistent Supply</li>
                        </ul>
                        <Link href="/contact" className="w-full">
                            <Button className="w-full font-semibold">Request for Quote</Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Product 3 */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Package className="h-6 w-6 text-primary" />
                            Recycled Grade B (#2)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            Budget-friendly option for one-way shipping. Fully functional with companion stringer repairs.
                        </p>
                        <ul className="space-y-2 text-sm mb-6">
                            <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-600" /> Lowest Cost</li>
                            <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-600" /> Strong Decking</li>
                            <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-600" /> Warehouse Ready</li>
                        </ul>
                        <Link href="/contact" className="w-full">
                            <Button className="w-full" variant="outline">Consult a Specialist</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            {/* Custom CTA */}
            <div className="mt-20 bg-muted p-10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 border">
                <div className="max-w-xl">
                    <h3 className="text-2xl font-bold mb-3">Need a Custom Build-to-Spec?</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        Through our specialized partner facilities, we can coordinate the production of custom dimensions, specialized materials, and export-compliant heat-treatment programs.
                    </p>
                </div>
                <Link href="/custom">
                    <Button size="lg" className="px-8 font-bold">Review Custom Specs</Button>
                </Link>
            </div>

            {/* Service Area Cities Row */}
            <div className="mt-16 text-center border-t pt-16">
                <h3 className="text-xl font-bold mb-6">Outer-Ring Markets & High-Density Hubs</h3>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-primary/80">
                    <Link href="/service-areas/norcross-ga" className="hover:underline">Norcross</Link>
                    <Link href="/service-areas/buford-ga" className="hover:underline">Buford</Link>
                    <Link href="/service-areas/braselton-ga" className="hover:underline">Braselton</Link>
                    <Link href="/service-areas/union-city-ga" className="hover:underline">Union City</Link>
                    <Link href="/service-areas/fairburn-ga" className="hover:underline">Fairburn</Link>
                    <Link href="/service-areas/mcdonough-ga" className="hover:underline">McDonough</Link>
                    <Link href="/service-areas/locust-grove-ga" className="hover:underline">Locust Grove</Link>
                    <Link href="/service-areas/lithia-springs-ga" className="hover:underline">Lithia Springs</Link>
                    <Link href="/service-areas/conyers-ga" className="hover:underline">Conyers</Link>
                </div>
            </div>
        </div>
    );
}

