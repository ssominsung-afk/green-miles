import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Package, Check, Truck } from 'lucide-react';

export const metadata = {
    title: 'Standard & Recycled Pallet Supply | A3 Pallet Inventory',
    description: 'High-quality new and recycled pallets (Grade A, B, C) available through our partner production network. Consistent supply for warehouses and 3PLs in the Southeast.',
};

export default function PalletsPage() {
    return (
        <div className="container mx-auto py-16 px-4">
            <div className="text-center mb-16">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Standard Pallet Supply Programs</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Consistency is the foundation of our standard pallet programs. We coordinate production with vetted partner facilities to maintain high-volume availability across the Southeast.
                </p>
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
                            Fresh lumber, built to strict GMA specifications through our manufacturing partner network. Ideal for automated lines and high-value goods.
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
                            Premium refurbished pallets meticulously graded for quality. Clean appearance with no companion stringers (plugs). The cost-effective standard for retail.
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
                            Budget-friendly option for one-way shipping. Fully functional with companion stringer repairs, sourced through our regional repair network.
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
        </div>
    );
}

