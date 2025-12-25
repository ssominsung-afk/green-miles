import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Truck, Package, Settings, ShoppingCart, Car, Archive, Stethoscope } from 'lucide-react';
import { COMPANY_NAME } from '@/lib/constants';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Pallets in the Southeast — <span className="text-secondary font-bold">Standard & Custom</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-primary-foreground/90 md:text-xl">
              Atlanta-based manufacturer with 15+ years of experience. We supply new, recycled, and custom pallets with our own fleet of 250+ trailers.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/contact">
                <Button size="lg" className="w-full min-[400px]:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                  Request a Quote
                </Button>
              </Link>
              <Link href="/custom">
                <Button variant="outline" size="lg" className="w-full min-[400px]:w-auto text-black bg-white hover:bg-gray-100">
                  Custom Pallets
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
            <p className="text-3xl font-bold text-primary">15+</p>
            <p className="text-sm font-medium text-muted-foreground">Years Experience</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">1M+</p>
            <p className="text-sm font-medium text-muted-foreground">Annual Production</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">250+</p>
            <p className="text-sm font-medium text-muted-foreground">Drop Trailers</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">24hr</p>
            <p className="text-sm font-medium text-muted-foreground">Standard Delivery</p>
          </div>
        </div>
      </section>

      {/* Product Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Products</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">Direct from the sawmill and repair lines to your dock.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Package className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Standard GMA</CardTitle>
              </CardHeader>
              <CardContent>
                New and Recycled 48x40 pallets ready for immediate shipment.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Settings className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Custom Specs</CardTitle>
              </CardHeader>
              <CardContent>
                Built to your exact dimensions using our PDS design software.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Truck className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Logistics</CardTitle>
              </CardHeader>
              <CardContent>
                Reliable delivery and drop-trailer programs for high volume accounts.
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 text-center">
            <Link href="/pallets">
              <Button variant="secondary">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Industries We Serve</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-muted p-4 rounded-full">
                <ShoppingCart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold">E-commerce Fulfillment</h3>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="bg-muted p-4 rounded-full">
                <Car className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold">Automotive Manufacturing</h3>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="bg-muted p-4 rounded-full">
                <Archive className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold">Paper & Packaging</h3>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="bg-muted p-4 rounded-full">
                <Stethoscope className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold">Life Sciences & Healthcare</h3>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="relative">
              <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">1</div>
              <h3 className="font-semibold text-lg">Request</h3>
              <p className="text-muted-foreground text-sm">Submit your specs or schedule a site audit.</p>
            </div>
            <div>
              <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">2</div>
              <h3 className="font-semibold text-lg">Confirm</h3>
              <p className="text-muted-foreground text-sm">We provide a transparent quote and delivery timeline.</p>
            </div>
            <div>
              <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">3</div>
              <h3 className="font-semibold text-lg">Production</h3>
              <p className="text-muted-foreground text-sm">Your order is built or pulled from inventory.</p>
            </div>
            <div>
              <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">4</div>
              <h3 className="font-semibold text-lg">Delivery</h3>
              <p className="text-muted-foreground text-sm">Our fleet drops it at your dock. Inspect and sign.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Minimize Production Downtime Today</h2>
          <p className="mb-8 text-primary-foreground/90 text-lg">Join the hundreds of manufacturers relying on {COMPANY_NAME}.</p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="font-semibold">
              Get Pricing
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
