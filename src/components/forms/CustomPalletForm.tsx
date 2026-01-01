'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { customRequestSchema, CustomRequestData } from '@/lib/types';
import { submitCustomRequest } from '@/lib/api';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { trackLead } from '@/lib/gtm';
import { useState } from 'react';

export function CustomPalletForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const form = useForm<CustomRequestData>({
        resolver: zodResolver(customRequestSchema),
        defaultValues: {
            name: '',
            company: '',
            email: '',
            phone: '',
            zip: '',
            dimensions: '',
            loadRating: '',
            woodType: '',
            designType: 'Stringer',
            heatTreated: 'No',
            quantity: '',
            notes: '',
        },
    });

    async function onSubmit(data: CustomRequestData) {
        setIsSubmitting(true);
        try {
            await submitCustomRequest(data);
            setSubmitStatus('success');
            trackLead('quote');
            form.reset();
        } catch (error) {
            console.error(error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    }

    if (submitStatus === 'success') {
        return (
            <div className="bg-blue-50 p-6 rounded-lg text-center border border-blue-200">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Design Request Sent</h3>
                <p className="text-blue-700">Our design team will review your specs and contact you to discuss the blueprint.</p>
                <Button onClick={() => setSubmitStatus('idle')} variant="outline" className="mt-4">Submit Another</Button>
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name*</FormLabel>
                                <FormControl>
                                    <Input placeholder="Jane Smith" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company*</FormLabel>
                                <FormControl>
                                    <Input placeholder="Smith Mfg." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email*</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="jane@company.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone*</FormLabel>
                                <FormControl>
                                    <Input placeholder="(555) 987-6543" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="zip"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ZIP Code*</FormLabel>
                                <FormControl>
                                    <Input placeholder="30303" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dimensions"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Dimensions (L x W x H)*</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. 60 x 60 x 6" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="designType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Design Style</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select..." />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Stringer">Stringer (2-way/4-way)</SelectItem>
                                        <SelectItem value="Block">Block (True 4-way)</SelectItem>
                                        <SelectItem value="Not sure">Not sure</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="heatTreated"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Heat Treatment (ISPM-15)</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select..." />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Yes">Yes</SelectItem>
                                        <SelectItem value="No">No</SelectItem>
                                        <SelectItem value="Not sure">Not sure</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estimated Quantity</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. 50" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="loadRating"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Max Load Weight (lbs)</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. 2500 lbs" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Design Notes</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Describe the product being shipped, decking gap requirements, specific wood types, etc." className="resize-none" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" variant="secondary" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Request Custom Quote'}
                </Button>
            </form>
        </Form>
    );
}
