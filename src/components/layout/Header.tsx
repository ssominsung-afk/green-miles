import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet'; // Added SheetTitle, SheetHeader
import { Menu, Truck } from 'lucide-react';
import { NAV_LINKS, COMPANY_NAME } from '@/lib/constants';

import Image from 'next/image';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src="/logo-a3-pallet.png"
                            alt={COMPANY_NAME}
                            width={220}
                            height={60}
                            className="h-14 w-auto object-contain"
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
                        <Button variant="ghost" size="sm">
                            Custom Orders
                        </Button>
                    </Link>
                    <Link href="/contact">
                        <Button size="sm">
                            Order Now
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
                            <Link href="/custom" className="text-sm font-medium">Custom Orders</Link>
                            <Link href="/contact" className="text-sm font-medium">Order Now</Link>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
