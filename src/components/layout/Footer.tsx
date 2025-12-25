import Link from 'next/link';
import Image from 'next/image';
import { Truck } from 'lucide-react';
import { COMPANY_NAME } from '@/lib/constants';

export default function Footer() {
    return (
        <footer className="w-full border-t bg-background">
            <div className="container mx-auto py-10 px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/logo-green-miles-v2.png"
                                alt={COMPANY_NAME}
                                width={140}
                                height={45}
                                className="h-10 w-auto object-contain"
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
                <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
