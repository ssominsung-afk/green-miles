import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Truck, Package, Settings, ShoppingCart, Car, Archive, Stethoscope, ShieldCheck, MessageSquare, BarChart4 } from 'lucide-react';
import { COMPANY_NAME, PHONE_NUMBER } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom & Standard Pallet Supply Atlanta | Build-to-Spec | A3 Pallet',
  description: 'Atlanta-based custom & standard pallet supply for warehouses, manufacturers, and 3PLs. Specialized in custom build-to-spec pallets and GMA 48x40 programs across the Southeast.',
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Atlanta-Based <span className="text-secondary font-bold">Custom & Standard Pallet Supply</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-primary-foreground/90 md:text-xl">
              Custom pallets built to your exact specs—delivered through a Southeast-wide partner network. Professional sourcing for warehouses, manufacturers, and 3PLs.
            </p>

            {/* Trust Block */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 text-sm font-medium">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4 text-secondary" />
                <span>Atlanta-first routing & responsive communication</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4 text-secondary" />
                <span>GMA 48x40 + recycled + custom programs</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4 text-secondary" />
                <span>Quoted lead times confirmed by spec & volume</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 min-[400px]:flex-row pt-8">
              <Link href="/custom">
                <Button size="lg" className="w-full min-[400px]:w-auto bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-primary-foreground font-bold">
                  Get a Custom Quote
                </Button>
              </Link>
              <Link href="/pallets">
                <Button variant="outline" size="lg" className="w-full min-[400px]:w-auto text-black bg-white hover:bg-gray-100">
                  Standard Pallet Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Corridor Links Section - Topic Cluster Strengthening */}
      <section className="bg-muted py-12 border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-center mb-8">Serving Atlanta Metro Logistics Corridors</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'I-85 North', href: '/service-areas/i-85-north' },
              { name: 'Airport / I-85 South', href: '/service-areas/airport-i-85-south' },
              { name: 'I-75 South', href: '/service-areas/i-75-south-henry' },
              { name: 'I-20 West', href: '/service-areas/i-20-west' },
              { name: 'I-20 East', href: '/service-areas/i-20-east' },
            ].map((corridor) => (
              <Link key={corridor.name} href={corridor.href} className="flex items-center justify-center p-4 bg-white rounded-lg border hover:border-primary hover:text-primary transition-colors text-center text-sm font-semibold">
                {corridor.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Core Advantage Section (E-E-A-T) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Capacity-Backed Fulfillment</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">We bridge the gap between complex procurement needs and diverse manufacturing capabilities.</p>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
              <ShieldCheck className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Supplier Vetting</h3>
              <p className="text-muted-foreground text-sm">Every facility in our network undergoes a rigorous 20-point quality and reliability audit to ensure consistent standards.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
              <MessageSquare className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Accountable Communication</h3>
              <p className="text-muted-foreground text-sm">No more ghosting. We guarantee professional, data-backed updates and a single point of contact for your entire program.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
              <BarChart4 className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Volume Consistency</h3>
              <p className="text-muted-foreground text-sm">By leveraging multiple partner production lines, we ensure your supply remains stable even during wood market volatility.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Pallets Spotlight */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Custom Pallets Built to Spec (Our Core Program)</h2>
              <p className="text-muted-foreground mt-4 text-lg">
                We specialize in engineered pallet solutions that standard programs can't handle. From unique footprints to heavy-duty industrial skids, we coordinate production across a specialized partner network.
              </p>
            </div>
            <Link href="/custom">
              <Button size="lg" className="font-bold px-8">Start a Custom Spec Quote</Button>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Any footprint / any load", desc: "Custom dimensions and reinforced builds for unique product dimensions.", icon: Package },
              { title: "Heavy-duty skids", desc: "Reinforced stringers and block-style builds for maximum load capacity.", icon: ShieldCheck },
              { title: "Export-ready ISPM-15", desc: "Heat-treated builds coordinated through certified partner facilities.", icon: CheckCircle },
              { title: "Multi-site Programs", desc: "Consistent custom specs delivered across your entire Southeast network.", icon: Truck },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl border bg-muted/30 hover:bg-muted/50 transition-colors">
                <item.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Preview */}
      <section className="py-16 bg-muted/20 pb-24 border-t">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Program-Driven Solutions</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">Backed by vetted partner production lines and regional logistics fleets.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-lg transition-shadow border-primary/20">
              <CardHeader>
                <Settings className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Custom Specs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Build-to-spec pallets designed for your unique load requirements and manufactured at specialized partner facilities. Our primary focus for complex operations.</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Package className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Standard Pallets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Reliable supply of new and recycled 48x40 GMA pallets, fulfilled through our quality-controlled partner network for standard warehouse needs.</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Truck className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Fulfillment Logistics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Regional delivery coordination supported by partner fleets and trusted carriers, including drop-trailer options across the Southeast.</p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-12 text-center">
            <Link href="/pallets">
              <Button variant="secondary" size="lg">Explore Our Supply Programs</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How Our Supply Program Works */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-16 text-center">How Our Supply Program Works</h2>
          <div className="grid md:grid-cols-5 gap-8">
            <div className="flex flex-col items-center text-center group">
              <div className="bg-secondary text-secondary-foreground w-12 h-12 rounded-full flex items-center justify-center mb-6 font-bold text-xl group-hover:scale-110 transition-transform">1</div>
              <h3 className="font-bold text-lg mb-2">Specs + Volume</h3>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">We audit your current specs and volume requirements to ensure perfect alignment with our partner capacity.</p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="bg-secondary text-secondary-foreground w-12 h-12 rounded-full flex items-center justify-center mb-6 font-bold text-xl group-hover:scale-110 transition-transform">2</div>
              <h3 className="font-bold text-lg mb-2">Rapid Quoting</h3>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">Receive a clear, transparent price backed by current market data and partner production capacity.</p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="bg-secondary text-secondary-foreground w-12 h-12 rounded-full flex items-center justify-center mb-6 font-bold text-xl group-hover:scale-110 transition-transform">3</div>
              <h3 className="font-bold text-lg mb-2">Vetted Sourcing</h3>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">We coordinate with vetted manufacturers and carriers to fit your exact dock schedule.</p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="bg-secondary text-secondary-foreground w-12 h-12 rounded-full flex items-center justify-center mb-6 font-bold text-xl group-hover:scale-110 transition-transform">4</div>
              <h3 className="font-bold text-lg mb-2">Fulfillment</h3>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">Your pallets arrive on time, with real-time communication and status updates throughout.</p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="bg-secondary text-secondary-foreground w-12 h-12 rounded-full flex items-center justify-center mb-6 font-bold text-xl group-hover:scale-110 transition-transform">5</div>
              <h3 className="font-bold text-lg mb-2">Management</h3>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">Ongoing program management to ensure consistency as your operations scale.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Industries We Serve</h2>
          <p className="text-muted-foreground mb-16 max-w-2xl mx-auto">Specialized pallet programs for high-efficiency operations across the Southeast.</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-muted p-6 rounded-2xl hover:bg-secondary/20 transition-colors">
                <ShoppingCart className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-bold text-lg">E-commerce Fulfillment</h3>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="bg-muted p-6 rounded-2xl hover:bg-secondary/20 transition-colors">
                <Car className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-bold text-lg">Automotive Manufacturing</h3>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="bg-muted p-6 rounded-2xl hover:bg-secondary/20 transition-colors">
                <Archive className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-bold text-lg">Paper & Packaging</h3>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="bg-muted p-6 rounded-2xl hover:bg-secondary/20 transition-colors">
                <Stethoscope className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-bold text-lg">Life Sciences & Healthcare</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-24 bg-muted border-y">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 tracking-tight text-primary">Minimize Production Downtime Today</h2>
          <p className="mb-10 text-muted-foreground text-xl max-w-2xl mx-auto">Join the manufacturers and 3PLs relying on {COMPANY_NAME} for accountable, partner-backed pallet supply programs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="font-bold px-12 py-8 text-lg">
                Get Pricing
              </Button>
            </Link>
            <a href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`} className="sm:inline-flex hidden">
              <Button size="lg" variant="outline" className="font-bold px-12 py-8 text-lg bg-white">
                Call {PHONE_NUMBER}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

