import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet'; // Added SheetTitle, SheetHeader
import { Menu, Truck } from 'lucide-react';
import { NAV_LINKS, COMPANY_NAME } from '@/lib/constants';

import Image from 'next/image';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-20 md:h-24 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src="/logo-a3-pallet.png"
                            alt={COMPANY_NAME}
                            width={300}
                            height={80}
                            className="h-16 md:h-20 w-auto object-contain"
                            priority
                            unoptimized
                        />
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    {NAV_LINKS.map((link) => (
                        <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground/80 text-foreground/60">
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <Link href="/custom">
                        <Button variant="default" size="sm" className="font-bold">
                            Get a Custom Quote
                        </Button>
                    </Link>
                    <Link href="/pallets">
                        <Button variant="outline" size="sm">
                            Standard Pricing
                        </Button>
                    </Link>
                </div>

                {/* Mobile Nav */}
                <Sheet>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <SheetHeader>
                            <SheetTitle>Navigation</SheetTitle>
                        </SheetHeader>
                        <nav className="flex flex-col gap-4 mt-4">
                            {NAV_LINKS.map((link) => (
                                <Link key={link.href} href={link.href} className="text-sm font-medium transition-colors hover:text-primary">
                                    {link.name}
                                </Link>
                            ))}
                            <hr className="my-2" />
                            <Link href="/custom" className="text-sm font-bold text-primary">Get a Custom Quote</Link>
                            <Link href="/pallets" className="text-sm font-medium">Standard Pricing</Link>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
