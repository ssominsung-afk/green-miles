import { Card, CardContent } from '@/components/ui/card';
import { COMPANY_NAME } from '@/lib/constants';
import { Truck, Factory, Calendar, Users } from 'lucide-react';

export const metadata = {
    title: 'About Us | Pallet Manufacturer in Atlanta',
    description: '15+ years of experience, 1M+ annual production capacity, and a private fleet of 250+ trailers.',
};

export default function AboutPage() {
    return (
        <div className="container mx-auto py-16 px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Manufacturer Direct</h1>
                <p className="text-muted-foreground text-lg">
                    We are not a middleman. We are a high-volume manufacturer and recycler dedicated to keeping the Southeast supply chain moving.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Our Scale</h2>
                    <p className="text-muted-foreground mb-6">
                        Founded in Atlanta over 15 years ago, {COMPANY_NAME} has grown from a small repair shop to a regional powerhouse.
                        By procuring lumber from multiple sawmills, we maintain assembly lines that output over 1 million pallets annually.
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 font-semibold">
                                <Calendar className="h-5 w-5 text-primary" /> 15+ Years
                            </div>
                            <p className="text-sm text-muted-foreground">Proven reliability</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 font-semibold">
                                <Factory className="h-5 w-5 text-primary" /> 1M+ Pallets
                            </div>
                            <p className="text-sm text-muted-foreground">Annual Capacity</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 font-semibold">
                                <Truck className="h-5 w-5 text-primary" /> In-House Fleet
                            </div>
                            <p className="text-sm text-muted-foreground">Trucks & 250+ Trailers</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 font-semibold">
                                <Users className="h-5 w-5 text-primary" /> 50+ Staff
                            </div>
                            <p className="text-sm text-muted-foreground">Dedicated Team</p>
                        </div>
                    </div>
                </div>
                <div className="bg-muted aspect-video rounded-lg flex items-center justify-center text-muted-foreground border-2 border-dashed">
                    [Facility Photo Placeholder]
                </div>
            </div>

            <div className="space-y-8">
                <h2 className="text-2xl font-bold text-center">Why Buy Direct?</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <Card>
                        <CardContent className="pt-6">
                            <h3 className="font-semibold text-lg mb-2">Better Pricing</h3>
                            <p className="text-sm text-muted-foreground">
                                Eliminate broker markups. You get factory-direct pricing on New and Recycled pallets.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <h3 className="font-semibold text-lg mb-2">Controlled Quality</h3>
                            <p className="text-sm text-muted-foreground">
                                We own the lumber and the labor. Our quality control team inspects every load before it hits the dock.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <h3 className="font-semibold text-lg mb-2">Guaranteed Logistics</h3>
                            <p className="text-sm text-muted-foreground">
                                We don't rely on spot-market freight. Our drivers and trailers ensure your delivery arrives when scheduled.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
