import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin, Truck, ChevronRight, CheckCircle2, Factory, Warehouse } from 'lucide-react';
import { COMPANY_NAME } from '@/lib/constants';

export const metadata = {
    title: 'Atlanta Pallet Supply by Logistics Corridor | A3 Pallet',
    description: 'Atlanta-based pallet supply and sourcing across major industrial corridors: I-85 North, Airport/I-85 South, I-75 South, I-20 West, and I-20 East.',
};

const corridors = [
    {
        name: "I-85 North (Northeast)",
        slug: "i-85-north",
        cities: "Norcross, Duluth, Suwanee, Buford, Braselton",
        description: "Primary logistics artery for Gwinnett and Jackson counties, serving major distribution hubs."
    },
    {
        name: "Airport / I-85 South",
        slug: "airport-i-85-south",
        cities: "Union City, Fairburn, College Park",
        description: "High-density warehouse region centered around Hartsfield-Jackson International Airport."
    },
    {
        name: "I-75 South / Henry County",
        slug: "i-75-south-henry",
        cities: "McDonough, Locust Grove, Stockbridge",
        description: "Fast-growing industrial corridor with large-scale 3PL and retail distribution centers."
    },
    {
        name: "I-20 West / Douglas County",
        slug: "i-20-west",
        cities: "Lithia Springs, Douglasville",
        description: "Strategic western gateway focused on e-commerce and regional fulfillment."
    },
    {
        name: "I-20 East",
        slug: "i-20-east",
        cities: "Conyers, Covington",
        description: "Established manufacturing and logistics hub serving the eastern metro area."
    }
];

const faqs = [
    {
        q: "Do you offer delivery to all Atlanta logistics corridors?",
        a: "Yes, we prioritize routing along the major corridors (I-85, I-75, and I-20) to ensure efficient delivery for warehouse and distribution operations."
    },
    {
        q: "What is your typical lead time for metro Atlanta deliveries?",
        a: "Lead times vary based on spec and volume, but being Atlanta-based allows us to coordinate regional fulfillment quickly. Contact us for a specific quote."
    },
    {
        q: "Can you handle multi-site pallet programs across the Southeast?",
        a: "Absolutely. While we focus on Atlanta corridors, our network supports multi-site needs across the entire Southeastern U.S."
    },
    {
        q: "What pallet types are most common in these corridors?",
        a: "We heavily supply Standard 48x40 GMA pallets (New and Recycled Grade A/B) which are the industry standard for most warehouse operations in the region."
    },
    {
        q: "How do I request a quote for a specific location?",
        a: "Simply use our contact form or call us. Mention your specific corridor or city for more accurate logistics planning."
    }
];

export default function AtlantaLogisticsPage() {
    return (
        <div className="container mx-auto py-16 px-4">
            {/* Hero Section */}
            <div className="max-w-4xl mx-auto text-center mb-16">
                <nav className="flex mb-8 justify-center text-sm text-muted-foreground" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2">
                        <li><Link href="/" className="hover:text-primary">Home</Link></li>
                        <li className="flex items-center space-x-2">
                            <ChevronRight className="h-4 w-4" />
                            <Link href="/pallets" className="hover:text-primary">Pallets</Link>
                        </li>
                        <li className="flex items-center space-x-2 text-foreground font-medium">
                            <ChevronRight className="h-4 w-4" />
                            <span>Atlanta Service Areas</span>
                        </li>
                    </ol>
                </nav>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Atlanta Pallet Service Areas (Logistics Corridors)</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    A3 Pallet is Atlanta-based and warehouse-oriented. We provide capacity-backed pallet supply and sourcing for distribution centers, manufacturers, and 3PLs across the metro's primary industrial corridors.
                </p>
            </div>

            {/* Corridors Section */}
            <section className="mb-24">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold">Industrial Corridors We Cover</h2>
                    <div className="hidden md:block h-px flex-1 mx-8 bg-border" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {corridors.map((corridor) => (
                        <Card key={corridor.slug} className="flex flex-col hover:border-primary/50 transition-colors">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-primary" />
                                    {corridor.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col">
                                <p className="text-sm text-muted-foreground mb-4">{corridor.description}</p>
                                <p className="text-xs font-semibold text-primary/80 mb-6 uppercase tracking-wider">Serving: {corridor.cities}</p>
                                <div className="mt-auto">
                                    <Link href={`/service-areas/${corridor.slug}`}>
                                        <Button variant="outline" className="w-full">Explore Corridor Details</Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Hubs/Cities Section */}
            <section className="mb-24 bg-muted/50 rounded-3xl p-10 border">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Outer-Ring Cities with High Warehouse Density</h2>
                    <p className="text-muted-foreground">Strategic nodes where we provide consistent pallet supply and routing.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {[
                        'norcross-ga', 'buford-ga', 'braselton-ga', 'mcdonough-ga',
                        'locust-grove-ga', 'union-city-ga', 'fairburn-ga',
                        'lithia-springs-ga', 'conyers-ga'
                    ].map((slug) => (
                        <Link
                            key={slug}
                            href={`/service-areas/${slug}`}
                            className="bg-background border rounded-xl p-4 text-center hover:border-primary hover:text-primary transition-all font-medium text-sm capitalize"
                        >
                            {slug.replace('-ga', '').replace('-', ' ')}
                        </Link>
                    ))}
                </div>
            </section>

            {/* Supply Info Section */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold">What We Supply in Atlanta</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Our sourcing network is optimized for the high-volume needs of Atlanta's logistics infrastructure. We specialize in the standard specs that keep supply chains moving.
                    </p>
                    <ul className="space-y-4">
                        {[
                            'Standard 48x40 GMA (New & Recycled)',
                            'Grade A (#1) and Grade B (#2) Options',
                            'Heat-Treated (ISPM-15) for International Shipping',
                            'Custom Spec and Build-to-Order'
                        ].map((item) => (
                            <li key={item} className="flex items-center gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                                <span className="font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Truck className="h-6 w-6 text-primary" />
                        Lead Time & Delivery Notes
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                        While we aim for maximum efficiency, delivery schedules depend on volume, pallet specifications, and current facility throughput.
                    </p>
                    <div className="space-y-4">
                        <div className="p-4 bg-background rounded-lg border">
                            <p className="text-xs font-bold uppercase mb-1">Standard Stock</p>
                            <p className="text-sm">Typically available for next-available routing.</p>
                        </div>
                        <div className="p-4 bg-background rounded-lg border">
                            <p className="text-xs font-bold uppercase mb-1">Custom Specs</p>
                            <p className="text-sm">Varies by material availability and complexity.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <section className="mb-24 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center text-primary">Logistics Corridor FAQs</h2>
                <div className="space-y-8">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border-b pb-6">
                            <h3 className="text-lg font-bold mb-3 flex gap-4">
                                <span className="text-primary opacity-50">Q:</span>
                                {faq.q}
                            </h3>
                            <p className="text-muted-foreground pl-10">
                                {faq.a}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Custom CTA Banner */}
            <div className="mb-24 bg-muted border-2 border-primary/20 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-2xl text-center md:text-left">
                    <h3 className="text-2xl font-bold mb-2">Custom Build-to-Spec Pallets</h3>
                    <p className="text-muted-foreground">Available for this corridor and multi-site Southeast programs. Engineered for your unique load requirements.</p>
                </div>
                <Link href="/custom">
                    <Button size="lg" className="font-bold px-8">Get Custom Quote</Button>
                </Link>
            </div>

            {/* CTA Section */}
            <div className="bg-primary text-primary-foreground rounded-3xl p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Factory className="h-64 w-64" />
                </div>
                <h2 className="text-3xl font-bold mb-6">Streamline Your Atlanta Logistics</h2>
                <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                    Reliable pallet supply is the backbone of efficient warehousing. Tell us your needs, and we'll confirm availability along your logistics corridor.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/contact">
                        <Button size="lg" variant="secondary" className="px-8 font-bold">Request a Quote</Button>
                    </Link>
                    <Link href="/pallets">
                        <Button size="lg" variant="outline" className="px-8 font-bold bg-transparent text-white border-white hover:bg-white hover:text-primary">
                            View Products
                        </Button>
                    </Link>
                </div>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        "name": "A3 Pallet",
                        "image": "https://a3pallet.com/logo.png",
                        "@id": "https://a3pallet.com",
                        "url": "https://a3pallet.com",
                        "telephone": "(404) 555-0123",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Atlanta",
                            "addressRegion": "GA",
                            "addressCountry": "US"
                        },
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": 33.7490,
                            "longitude": -84.3880
                        },
                        "areaServed": [
                            { "@type": "City", "name": "Atlanta" },
                            { "@type": "City", "name": "Norcross" },
                            { "@type": "City", "name": "Buford" },
                            { "@type": "City", "name": "Braselton" },
                            { "@type": "City", "name": "McDonough" },
                            { "@type": "City", "name": "Locust Grove" },
                            { "@type": "City", "name": "Union City" },
                            { "@type": "City", "name": "Fairburn" },
                            { "@type": "City", "name": "Lithia Springs" },
                            { "@type": "City", "name": "Conyers" }
                        ],
                        "description": "Atlanta-based pallet supply and sourcing across major industrial corridors and outer-ring markets."
                    }),
                }}
            />
        </div>
    );
}
