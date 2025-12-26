import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Truck, Package, Settings, ShoppingCart, Car, Archive, Stethoscope, ShieldCheck, MessageSquare, BarChart4 } from 'lucide-react';
import { COMPANY_NAME, PHONE_NUMBER } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'A3 Pallet | Reliable Pallet Supply & Sourcing Partner Southeast',
  description: 'Streamline your supply chain with A3 Pallet. Capacity-backed pallet sourcing, custom specs, and reliable fulfillment across the Southeast US. Get a quote in 1 hour.',
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Your Accountable Partner in <span className="text-secondary font-bold">Pallet Supply & Sourcing</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-primary-foreground/90 md:text-xl">
              Capacity-backed fulfillment for modern supply chains. We streamline your procurement through vetted manufacturing partners and professional logistics coordination across the Southeast.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
              <Link href="/contact">
                <Button size="lg" className="w-full min-[400px]:w-auto bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-primary-foreground">
                  Request Your 1-Hour Quote
                </Button>
              </Link>
              <Link href="/pallets">
                <Button variant="outline" size="lg" className="w-full min-[400px]:w-auto text-black bg-white hover:bg-gray-100">
                  Browse Standard Pallets
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-muted py-8 border-b">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center px-4">
          <div>
            <p className="text-3xl font-bold text-primary">Vetted</p>
            <p className="text-sm font-medium text-muted-foreground">Partner Network</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">1-Hour</p>
            <p className="text-sm font-medium text-muted-foreground">Response Time</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">Southeast</p>
            <p className="text-sm font-medium text-muted-foreground">Regional Focus</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">Accountable</p>
            <p className="text-sm font-medium text-muted-foreground">Program Management</p>
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

      {/* Product Preview */}
      <section className="py-16 bg-muted/20 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Program-Driven Solutions</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">Backed by vetted partner production lines and regional logistics fleets.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Package className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Standard Pallets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Reliable supply of new and recycled 48x40 GMA pallets, fulfilled through our quality-controlled partner network.</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Settings className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Custom Specs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Build-to-spec pallets designed for your unique load requirements and manufactured at specialized partner facilities.</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Truck className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Fulfillment Logistics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Regional delivery coordination supported by partner fleets and trusted carriers, including drop-trailer options.</p>
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
                Get Your 1-Hour Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

