import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PencilRuler, Cog, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { CustomPalletForm } from '@/components/forms/CustomPalletForm';

export const metadata = {
    title: 'Custom Pallets Build-to-Spec | A3 Pallet Design Services',
    description: 'Spec-driven custom pallet design and manufacturing through vetted partner facilities. Engineered for your unique load and automation requirements.',
};

export default function CustomPage() {
    return (
        <div className="container mx-auto py-16 px-4">
            <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
                <div className="space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Custom-Engineered Pallet Solutions</h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Unique products require specialized handling. Our custom program leverages partner manufacturing expertise to build pallets precisely to your mechanical specifications. From massive machinery skids to specialized export packaging, we provide the technical oversight your program requires.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="h-12 w-12 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <PencilRuler className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Built to Your Exact Specifications</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">Whether you have detailed PDS prints or just load dimensions, we coordinate with partners to engineer the perfect build for your product.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="h-12 w-12 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <Cog className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Heavy Load & Specialized Designs</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">Support for oversized, over-weight, and automation-aligned pallets using specialized lumber and reinforced construction.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="h-12 w-12 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Certified Export Ready</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">ISPM-15 heat-treatment programs coordinated through certified partner facilities for compliant international shipping.</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-muted/50 border rounded-2xl">
                        <h4 className="font-bold mb-2 flex items-center gap-2">
                            Professional Minimums
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            To maintain manufacturing efficiency and cost-effectiveness, custom production runs typically start at **50–100 units** depending on design complexity.
                        </p>
                    </div>
                </div>

                <Card className="shadow-xl border-t-4 border-t-primary">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Request a Spec Quote</CardTitle>
                        <p className="text-sm text-muted-foreground">Our specialists aim to respond within 1 hour during business hours.</p>
                    </CardHeader>
                    <CardContent>
                        <CustomPalletForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

