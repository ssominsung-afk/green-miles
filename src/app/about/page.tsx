import { Card, CardContent } from '@/components/ui/card';
import { COMPANY_NAME } from '@/lib/constants';
import { Truck, Factory, Users, CheckCircle, ShieldCheck } from 'lucide-react';

export const metadata = {
    title: 'About A3 Pallet | Your Southeast Sourcing Partner',
    description: 'Learn how A3 Pallet combines program management expertise with partner production capacity to solve pallet supply chain challenges in the Southeast.',
};

export default function AboutPage() {
    return (
        <div className="container mx-auto py-16 px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">The People Behind Your Pallet Program</h1>
                <p className="text-muted-foreground text-lg leading-relaxed">
                    A3 Pallet was built to eliminate the frustration of unreliable supply. We don't just find pallets; we manage programs through a vetted network of manufacturing and logistics partners.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">A Different Approach to Sourcing</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Founded on the principle of accountability, {COMPANY_NAME} provides a single point of contact for complex pallet needs. By vetting every partner facility in our network and coordinating regional logistics with professional rigour, we provide the stability that procurement teams depend on.
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 font-bold text-primary">
                                <Users className="h-5 w-5" /> Accountable
                            </div>
                            <p className="text-xs text-muted-foreground">Expert Program Managers</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 font-bold text-primary">
                                <Factory className="h-5 w-5" /> Capacity
                            </div>
                            <p className="text-xs text-muted-foreground">Vetted Partner Network</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 font-bold text-primary">
                                <Truck className="h-5 w-5" /> Coordinated
                            </div>
                            <p className="text-xs text-muted-foreground">Managed Carrier Network</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 font-bold text-primary">
                                <CheckCircle className="h-5 w-5" /> Quality
                            </div>
                            <p className="text-xs text-muted-foreground">Standardized Vetting</p>
                        </div>
                    </div>
                </div>
                <div className="bg-muted p-8 rounded-3xl flex flex-col items-center justify-center text-center border shadow-inner">
                    <div className="bg-primary/10 p-6 rounded-full mb-4">
                        <ShieldCheck className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Vetted for Reliability</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">Every facility in our manufacturing network undergoes a multi-point audit for quality, capacity, and service standards.</p>
                </div>
            </div>

            <div className="space-y-12">
                <h2 className="text-2xl font-bold text-center">The A3 Advantage: Managed Supply</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="pt-8">
                            <h3 className="font-bold text-lg mb-3">Professional Communication</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                No more chasing updates. We guarantee data-backed communication and a response within 1 hour during business hours.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="pt-8">
                            <h3 className="font-bold text-lg mb-3">Vetted Quality Standards</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                We implement standardized checklists across our partner network, ensuring the Grade A you order is the Grade A you receive.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="hover:shadow-md transition-shadow transition-shadow">
                        <CardContent className="pt-8">
                            <h3 className="font-bold text-lg mb-3">Integrated Logistics</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                By utilizing partner fleets and trusted carriers, we maintain delivery consistency even during regional freight volatility.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

