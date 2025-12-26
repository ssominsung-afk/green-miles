import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, Phone, CheckCircle } from 'lucide-react';
import { COMPANY_EMAILS, PHONE_NUMBER } from '@/lib/constants';
import { OrderRequestForm } from '@/components/forms/OrderRequestForm';

export const metadata = {
    title: 'Contact A3 Pallet | Request a Pallet Quote in 1 Hour',
    description: 'Ready to optimize your pallet program? Contact A3 Pallet today for reliable supply in the Southeast. Sales and support responding in 1 hour.',
};

export default function ContactPage() {
    return (
        <div className="container mx-auto py-16 px-4">
            <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Get the Supply Security You Need</h1>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                            Ready for a pallet partner that actually picks up the phone? Fill out the form below or reach out directly. We aim to respond to all professional inquiries within one hour during standard business hours.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="flex items-start gap-4 p-4 rounded-xl border bg-muted/20">
                            <Mail className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-bold">Managed Accounts & Quoting</h3>
                                <p className="text-sm text-muted-foreground mb-2">For volume pricing and spec assessments:</p>
                                <a href={`mailto:${COMPANY_EMAILS.SALES}`} className="text-primary font-semibold hover:underline">
                                    {COMPANY_EMAILS.SALES}
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-xl border bg-muted/20">
                            <Phone className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-bold">Operations Support</h3>
                                <p className="text-sm text-muted-foreground mb-2">Business Hours: Mon-Fri, 7am - 4:30pm EST</p>
                                <a href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`} className="text-primary font-semibold hover:underline">
                                    {PHONE_NUMBER}
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-xl border bg-muted/20">
                            <CheckCircle className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-bold">Standard Lead Times</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Standard inventory items coordinate for dispatch within **24–48 hours** for contracted accounts. Custom production runs vary—ask your specialist for a current schedule.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <Card className="shadow-2xl border-t-8 border-t-primary">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-2xl font-bold">Request Pricing / Place Order</CardTitle>
                        <p className="text-sm text-muted-foreground">Fast Quotes. Accountable Communication.</p>
                    </CardHeader>
                    <CardContent>
                        <OrderRequestForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

