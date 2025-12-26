import { SERVICE_AREAS } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Truck } from 'lucide-react';

export const metadata = {
    title: 'Reliable Delivery & Logistics Coordination | A3 Pallet',
    description: 'Southeast logistics support for your pallet program. Coordinated through partner fleets and trusted carriers for on-time delivery to GA, FL, AL, and more.',
};

export default function ShippingPage() {
    return (
        <div className="container mx-auto py-16 px-4">
            <div className="text-center mb-16">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Coordinated Logistics & Fulfillment</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                    Logistics is where most supply programs fail—A3 Pallet is where they excel. we coordinate theater-wide delivery across the Southeast, supported by partner fleets and a network of trusted carriers.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center text-primary text-xl font-bold">
                            <Truck className="mr-3 h-6 w-6" /> Regional Fulfillment Capabilities
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="font-bold">Coordinated Dispatch</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                We manage the complexity of regional freight, utilizing partner fleets and vetted carriers to ensure your pallet supply arrives exactly when your production schedule requires.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-bold">Drop-Trailer Programs</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                For high-volume accounts, we coordinate drop-trailer placements at your dock. This allows for staged loading of pallet cores or seamless unloading of new supply without dock congestion.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-bold">Real-Time Accountability</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                No more guessing. Our logistics program prioritize communication, providing professional updates on every shipment from dispatch to delivery.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-lg border-2 border-muted">
                    <CardHeader>
                        <CardTitle className="flex items-center text-xl font-bold">
                            <MapPin className="mr-3 h-6 w-6 text-primary" /> Service Area Focus
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-6 text-muted-foreground leading-relaxed">
                            Centered in Atlanta, our coordinated logistics network provides robust coverage across the Southeast United States:
                        </p>
                        <ul className="grid grid-cols-2 gap-4 font-semibold text-primary">
                            {SERVICE_AREAS.map((state) => (
                                <li key={state} className="flex items-center bg-muted/30 p-3 rounded-lg border">
                                    <span className="h-2 w-2 rounded-full bg-primary mr-3" />
                                    {state}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/20">
                            <p className="text-xs text-center text-muted-foreground italic">
                                *Expedited options available for major manufacturing corridors within our core service area.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

