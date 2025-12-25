import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PencilRuler, Cog, Leaf } from 'lucide-react';
import Link from 'next/link';
import { CustomPalletForm } from '@/components/forms/CustomPalletForm';

export const metadata = {
    title: 'Custom Pallet Manufacturing | Built to Spec',
    description: 'We design and build custom wooden pallets for heavy machinery, oversized loads, and export.',
};

export default function CustomPage() {
    return (
        <div className="container mx-auto py-16 px-4">
            <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Custom Pallet Manufacturing</h1>
                    <p className="text-lg text-muted-foreground mb-6">
                        Off-the-shelf 48x40s don't fit everything.
                        With 15+ years of manufacturing experience, we design custom wood packaging for your specific load requirements.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex gap-3">
                            <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <PencilRuler className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Any Dimension</h3>
                                <p className="text-sm text-muted-foreground">From small 24x24 skids to massive 120-inch crates.</p>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <Cog className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Heavy Load Designs</h3>
                                <p className="text-sm text-muted-foreground">Thick deck boards and 4x6 stringers for machinery transport.</p>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <Leaf className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Export Ready</h3>
                                <p className="text-sm text-muted-foreground">In-house heat treatment chamber for ISPM-15 certification.</p>
                            </div>
                        </li>
                    </ul>
                    <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                        <p className="text-sm text-yellow-800">
                            <strong>Note:</strong> Minimum order quantity for custom dimensions is typically 50 units, depending on complexity.
                        </p>
                    </div>
                </div>

                <Card className="bg-slate-50 border-2 border-slate-200">
                    <CardHeader>
                        <CardTitle>Request a Design Quote</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CustomPalletForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
