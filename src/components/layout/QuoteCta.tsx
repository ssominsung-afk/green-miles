import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { PHONE_NUMBER, COMPANY_EMAILS } from '@/lib/constants';

interface QuoteCtaProps {
    title?: string;
    subtitle?: string;
}

/**
 * Shared bottom-of-page conversion block.
 * Drop on high-intent content pages (FAQ, About, Shipping, service areas)
 * so visitors always have a one-click path to a quote.
 */
export default function QuoteCta({
    title = 'Get Your Pallet Quote in Under an Hour',
    subtitle = 'Tell us your specs and volume — a specialist responds within 1 hour during business hours (Mon–Fri, 7:00 AM–4:30 PM EST).',
}: QuoteCtaProps) {
    return (
        <section className="mt-20 rounded-3xl border bg-primary/5 px-6 py-12 text-center shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-3">{title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">{subtitle}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/custom">
                    <Button size="lg" className="font-bold w-full sm:w-auto">
                        Get a Custom Quote
                    </Button>
                </Link>
                <Link href="/contact">
                    <Button size="lg" variant="outline" className="font-bold w-full sm:w-auto">
                        Request Standard Pricing
                    </Button>
                </Link>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
                Prefer to talk?{' '}
                <a href="tel:+14709627000" className="font-semibold text-primary hover:underline inline-flex items-center gap-1">
                    <Phone className="h-4 w-4" /> Call {PHONE_NUMBER}
                </a>
                {' '}or email{' '}
                <a href={`mailto:${COMPANY_EMAILS.SALES}`} className="font-semibold text-primary hover:underline">
                    {COMPANY_EMAILS.SALES}
                </a>
            </p>
        </section>
    );
}
