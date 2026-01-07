import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PencilRuler, Cog, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { CustomPalletForm } from '@/components/forms/CustomPalletForm';

export const metadata = {
    title: 'Custom Pallets Build-to-Spec | Atlanta & Southeast',
    description: 'Custom-engineered pallets and skids built to your specs—heavy loads, automation, and ISPM-15 heat-treated export builds. Atlanta-based with Southeast-wide delivery coordination.',
};

export default function CustomPage() {
    return (
        <div className="container mx-auto py-16 px-4">
            <div className="grid md:grid-cols-2 gap-12 items-start mb-24">
                <div className="space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 text-primary">Custom Pallets Built to Your Mechanical Specs</h1>
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

                    <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                        <h4 className="font-bold mb-2 flex items-center gap-2 text-primary">
                            Southeast-Wide Custom Programs
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            We coordinate custom pallet delivery across the Southeast via partner fleets and trusted carriers.
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-primary/80">
                            {['GA', 'FL', 'AL', 'SC', 'NC', 'TN', 'MS', 'LA'].map(st => (
                                <div key={st} className="flex items-center gap-2">
                                    <div className="h-1 w-1 bg-primary rounded-full" />
                                    {st} Coverage
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-4 italic">
                            *Lead time varies by spec and volume. <Link href="/shipping" className="underline">View shipping notes</Link>.
                        </p>
                    </div>
                </div>

                <div className="sticky top-28">
                    <Card className="shadow-xl border-t-4 border-t-primary">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Request a Spec Quote</CardTitle>
                            <p className="text-sm text-muted-foreground">Our specialists aim to respond within 1 hour during business hours.</p>
                        </CardHeader>
                        <CardContent>
                            <CustomPalletForm />
                        </CardContent>
                    </Card>
                    <div className="mt-6 text-center">
                        <p className="text-xs text-muted-foreground">
                            Typical minimums: **50–100 units** | Atlanta corridor focus: <Link href="/service-areas/atlanta-logistics" className="underline font-medium">Atlanta Logistics Hub</Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Typical Build Types Section */}
            <div className="mb-24">
                <h2 className="text-3xl font-bold text-center mb-12">Typical Custom Build Types</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Heavy-Duty Skids", desc: "For extreme weights and industrial machinery. Single-face construction with reinforced base." },
                        { title: "Block-Style Builds", desc: "True 4-way entry designs for maximum handling flexibility in complex warehouses." },
                        { title: "Notched Stringers", desc: "Custom-notched for specific forklift or pallet jack requirements." },
                        { title: "Reinforced 48x40s", desc: "GMA footprint with extra deck boards or thicker lumber for high-density loads." },
                        { title: "Oversized Footprints", desc: "Custom lengths and widths to accommodate machinery or bulk materials." },
                        { title: "Export Heat-Treated", desc: "Full ISPM-15 compliance for international transit with certified markings." },
                    ].map((type) => (
                        <div key={type.title} className="p-6 rounded-xl border bg-white hover:border-primary transition-colors">
                            <h3 className="font-bold mb-2">{type.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{type.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Design Inputs Section */}
            <div className="bg-muted/50 rounded-3xl p-10 border mb-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-8 text-center">Design Inputs We Work With</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="font-bold mb-4">Technical Documentation</h3>
                            <ul className="space-y-4 text-sm text-muted-foreground">
                                <li className="flex items-center gap-3">
                                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-[10px]">1</div>
                                    PDS (Pallet Design System) Prints
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-[10px]">2</div>
                                    CAD Drawings or Blueprints
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-[10px]">3</div>
                                    Simple Load Dimensions & Weight
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4">Handling Environment</h3>
                            <ul className="space-y-4 text-sm text-muted-foreground">
                                <li className="flex items-center gap-3">
                                    <div className="h-2 w-2 bg-primary/40 rounded-full" />
                                    Automation & Conveyor constraints
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="h-2 w-2 bg-primary/40 rounded-full" />
                                    Racking type (selective, drive-in, push-back)
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="h-2 w-2 bg-primary/40 rounded-full" />
                                    Environmental notes (cold storage, moisture, outdoor)
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

