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
    const [isReadingFile, setIsReadingFile] = useState(false);
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
            fileData: '',
            fileName: '',
            fileType: '',
        },
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function onSubmit(data: CustomRequestData) {
        if (isReadingFile) {
            alert("Please wait for the file to finish processing.");
            return;
        }

        const submissionData = {
            ...data,
            files: data.fileData ? [{
                name: data.fileName || 'unnamed',
                mimeType: data.fileType || 'application/octet-stream',
                base64: data.fileData
            }] : []
        };

        console.log("Submitting Custom Request:", submissionData);
        setIsSubmitting(true);
        setErrorMessage(null); // Clear previous errors
        try {
            await submitCustomRequest(submissionData as any);
            setSubmitStatus('success');
            trackLead('quote');
            form.reset();
        } catch (error: any) {
            console.error(error);
            setSubmitStatus('error');
            setErrorMessage(error.message || "An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (submitStatus === 'success') {
        return (
            <div className="bg-blue-50 p-6 rounded-lg text-center border border-blue-200">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Design Request Sent</h3>
                <p className="text-blue-700">Our design team will review your specs and contact you to discuss the blueprint.</p>
                <p className="text-[12px] text-blue-600 mt-2 italic">Attached files are being synced to our secure master log.</p>
                <Button onClick={() => setSubmitStatus('idle')} variant="outline" className="mt-4">Submit Another</Button>
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* ... existing fields ... */}
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

                <div className="space-y-2">
                    <FormLabel>Attach Drawing or Specs (Optional, Max 10MB)</FormLabel>
                    <Input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                if (file.size > 10 * 1024 * 1024) {
                                    alert("File size exceeds 10MB limit.");
                                    e.target.value = "";
                                    return;
                                }
                                setIsReadingFile(true);
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    const base64String = (reader.result as string).split(',')[1];
                                    form.setValue('fileData', base64String);
                                    form.setValue('fileName', file.name);
                                    form.setValue('fileType', file.type);
                                    setIsReadingFile(false);
                                };
                                reader.onerror = () => {
                                    alert("Error reading file.");
                                    setIsReadingFile(false);
                                };
                                reader.readAsDataURL(file);
                            } else {
                                form.setValue('fileData', '');
                                form.setValue('fileName', '');
                                form.setValue('fileType', '');
                                setIsReadingFile(false);
                            }
                        }}
                        className="cursor-pointer"
                    />
                    <p className="text-[10px] text-muted-foreground">Supported: PDF, Images, Word docs.</p>
                </div>

                {/* Hidden fields for internal state */}
                <input type="hidden" {...form.register('fileData')} />
                <input type="hidden" {...form.register('fileName')} />
                <input type="hidden" {...form.register('fileType')} />

                <Button type="submit" className="w-full" variant="secondary" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Request Custom Quote'}
                </Button>
                {errorMessage && (
                    <div className="text-red-600 text-sm text-center mt-2 p-2 bg-red-50 rounded border border-red-200">
                        Error: {errorMessage}
                    </div>
                )}
            </form>
        </Form>
    );
}
