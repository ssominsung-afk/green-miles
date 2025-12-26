import Link from 'next/link';
import Image from 'next/image';
import { Truck } from 'lucide-react';
import { COMPANY_NAME, PHONE_NUMBER } from '@/lib/constants';

export default function Footer() {
    return (
        <footer className="w-full border-t bg-background">
            <div className="container mx-auto py-10 px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/logo-a3-pallet.png"
                                alt={COMPANY_NAME}
                                width={180}
                                height={55}
                                className="h-12 w-auto object-contain"
                                unoptimized
                            />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Reliable pallet sourcing and logistics solutions for the Southeastern United States.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-3">Company</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/pallets">Products</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-3">Resources</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/faq">FAQ</Link></li>
                            <li><Link href="/shipping">Shipping & Delivery</Link></li>
                            <li><Link href="/custom">Custom Specs</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-3">Legal</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/legal/privacy">Privacy Policy</Link></li>
                            <li><Link href="/legal/terms">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-10 border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
                    <a href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`} className="hover:text-primary">
                        {PHONE_NUMBER}
                    </a>
                </div>
            </div>
        </footer>
    );
}
