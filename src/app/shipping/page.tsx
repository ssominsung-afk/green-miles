import { SERVICE_AREAS } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Truck } from 'lucide-react';

export const metadata = {
    title: 'Pallet Delivery & Shipping | Southeast US',
    description: 'Fast pallet delivery with our fleet of 250+ trailers. Serving GA, FL, AL, SC, NC, TN.',
};

export default function ShippingPage() {
    return (
        <div className="container mx-auto py-16 px-4">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Delivery & Shipping</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    We own our logistics. With a private fleet of trucks and over 250 drop-trailers,
                    we ensure your pallets arrive on time, every time.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Truck className="mr-2 text-primary" /> Delivery Capabilities
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p>
                            <strong>Private Fleet:</strong> We don't rely solely on third-party freight. Our in-house drivers prioritize your delivery.
                        </p>
                        <p>
                            <strong>Drop-Trailer:</strong> For high-volume accounts, we leave enterprise-grade trailers at your dock for you to load (cores) or unload (supply) at your pace.
                        </p>
                        <p>
                            <strong>Live Unload:</strong> Standard delivery for smaller warehouses. Driver waits while you unload (~1-2 hours).
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <MapPin className="mr-2 text-primary" /> Service Area
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-sm text-muted-foreground">
                            Based in Atlanta, we service the entire Southeastern region:
                        </p>
                        <ul className="grid grid-cols-2 gap-2 font-medium">
                            {SERVICE_AREAS.map((state) => (
                                <li key={state} className="flex items-center">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                                    {state}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
