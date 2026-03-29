import { ClientCustomPage } from './ClientCustomPage';

export const metadata = {
    title: 'Custom Pallets Build-to-Spec | Atlanta & Southeast',
    description: 'Custom-engineered pallets and skids built to your specs—heavy loads, automation, and ISPM-15 heat-treated export builds. Atlanta-based with Southeast-wide delivery coordination.',
};

export default function CustomPage() {
    return (
        <>
            <ClientCustomPage />

            {/* Design Inputs Section (preserved from original) */}
            <div className="container mx-auto px-4 mb-16">
                <div className="bg-muted/50 rounded-3xl p-10 border">
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
        </>
    );
}
