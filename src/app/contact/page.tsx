import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, Phone, Calendar } from 'lucide-react';
import { COMPANY_EMAILS, PHONE_NUMBER } from '@/lib/constants';
import { OrderRequestForm } from '@/components/forms/OrderRequestForm';

export const metadata = {
    title: 'Contact Us | Pallet Ordering',
    description: 'Place an order or request a quote for standard 48x40 pallets.',
};

export default function ContactPage() {
    return (
        <div className="container mx-auto py-16 px-4">
            <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Contact Us</h1>
                    <p className="text-muted-foreground mb-8 text-lg">
                        Ready to order? Use the form to request current pricing. We typically respond within 1 hour during business hours.
                    </p>

                    <div className="space-y-6 mb-8">
                        <div className="flex items-start gap-4">
                            <Mail className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold">Email</h3>
                                <p className="text-muted-foreground mb-1">Sales & Orders</p>
                                <a href={`mailto:${COMPANY_EMAILS.SALES}`} className="text-primary hover:underline">
                                    {COMPANY_EMAILS.SALES}
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Phone className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold">Phone</h3>
                                <p className="text-muted-foreground mb-1">Mon-Fri, 7am - 4:30pm EST</p>
                                <a href={`tel:${PHONE_NUMBER}`} className="text-primary hover:underline">
                                    {PHONE_NUMBER}
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Calendar className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold">Facility Hours</h3>
                                <p className="text-muted-foreground">
                                    <strong>Shipping/Receiving:</strong><br />
                                    Mon-Fri: 7:00 AM - 4:00 PM<br />
                                    Sat-Sun: Closed
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Request Pricing / Place Order</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <OrderRequestForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
