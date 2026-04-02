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
import { useState, useEffect } from 'react';

interface CustomPalletFormProps {
    isAdvancedMode?: boolean;
    specData?: any;
    pdfDataUrl?: string | null;
    onToggleAdvanced?: () => void;
}

export function CustomPalletForm({ isAdvancedMode, specData, pdfDataUrl, onToggleAdvanced }: CustomPalletFormProps) {
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
            additionalNotes: '',
            fileData: '',
            fileName: '',
            fileType: '',
        },
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (isAdvancedMode && specData) {
            form.setValue('dimensions', `${specData.length} x ${specData.width} x ${specData.overallHeight.toFixed(1)}`);
            let notes = `[Advanced Spec Attached]\nTop Decks: ${specData.topDeckCount}, Bottom: ${specData.bottomDeckCount}\nStringers: ${specData.stringerCount}\nTruck Qty: ${specData.truckQty}`;
            notes += `\nTop Leads: ${specData.topLeadThickness}" x ${specData.topLeadWidth}" (Interior: ${specData.topDeckThickness}" x ${specData.topDeckWidth}")`;
            notes += `\nBot Leads: ${specData.bottomLeadThickness}" x ${specData.bottomLeadWidth}" (Interior: ${specData.bottomDeckThickness}" x ${specData.bottomDeckWidth}")`;
            if (specData.customBoardSize) notes += `\nCustom Note: ${specData.customBoardSize}`;
            form.setValue('notes', notes);
            form.setValue('designType', specData.palletType.includes('Block') ? 'Block' : 'Stringer');
            form.setValue('heatTreated', specData.ht === 'Yes' ? 'Yes' : 'No');
        }
    }, [isAdvancedMode, specData, form]);

    useEffect(() => {
        if (pdfDataUrl) {
            form.setValue('fileName', 'A3_Pallet_Spec_Sheet.pdf');
            form.setValue('fileType', 'application/pdf');
            form.setValue('fileData', pdfDataUrl.split(',')[1] || '');
        }
    }, [pdfDataUrl, form]);

    async function onSubmit(data: CustomRequestData) {
        if (isReadingFile) {
            alert("Please wait for the file to finish processing.");
            return;
        }

        // Collect attached file from RHF state
        const filesToSubmit = [...(data.fileData ? [{
            name: data.fileName || 'unnamed',
            mimeType: data.fileType || 'application/octet-stream',
            base64: data.fileData
        }] : [])];

        // Merge Notes
        const finalNotes = data.additionalNotes 
            ? `${data.notes}\n\n--- Customer Comments ---\n${data.additionalNotes}`
            : data.notes;

        const submissionData = {
            ...data,
            notes: finalNotes,
            files: filesToSubmit
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
                 {/* Dual-Track Banner */}
                 {!isAdvancedMode ? (
                     <div className="bg-primary/5 rounded-xl p-4 border flex flex-col items-center justify-center text-center space-y-3">
                         <span className="text-sm font-semibold">Need precise drawings?</span>
                         <Button type="button" onClick={onToggleAdvanced} className="bg-[#004d3d] hover:bg-[#004d3d]/90 text-white shadow-md">
                              Open 3D Builder Mode
                         </Button>
                     </div>
                 ) : (
                     <div className="bg-[#004d3d]/5 rounded-xl p-4 border border-[#004d3d]/20 flex flex-col items-center justify-center text-center space-y-2">
                         <span className="text-[#004d3d] font-bold text-sm">✓ Advanced Mode Active</span>
                         <span className="text-xs text-[#004d3d]/80">Dimensions and design specs are synced with the 3D Builder.</span>
                         <Button type="button" onClick={onToggleAdvanced} variant="outline" className="text-xs h-7 border-[#004d3d] text-[#004d3d] hover:bg-[#004d3d] hover:text-white">Return to Simple Form</Button>
                     </div>
                 )}
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
                                    <Input placeholder="e.g. 60 x 60 x 6" {...field} readOnly={isAdvancedMode} className={isAdvancedMode ? "bg-slate-100" : ""} />
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
                                <Select onValueChange={field.onChange} value={field.value} disabled={isAdvancedMode}>
                                    <FormControl>
                                        <SelectTrigger className={isAdvancedMode ? "bg-slate-100" : ""}>
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
                                <Select onValueChange={field.onChange} value={field.value} disabled={isAdvancedMode}>
                                    <FormControl>
                                        <SelectTrigger className={isAdvancedMode ? "bg-slate-100" : ""}>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#004d3d] font-bold">Auto-Generated Design Specs</FormLabel>
                                <FormControl>
                                    <Textarea 
                                        {...field} 
                                        readOnly={isAdvancedMode} 
                                        className={`resize-none h-32 text-xs font-mono ${isAdvancedMode ? 'bg-slate-50' : ''}`} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="additionalNotes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#004d3d] font-bold underline">Your Additional Requirements / Notes</FormLabel>
                                <FormControl>
                                    <Textarea 
                                        placeholder="Add any specific requirements, delivery notes, or questions here..." 
                                        className="resize-none h-32" 
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="space-y-2">
                    <FormLabel>Attach Drawing or Specs (Optional, Max 10MB)</FormLabel>
                    {form.watch('fileName') ? (
                        <div className="flex items-center justify-between p-3 border rounded-md bg-[#004d3d]/5 border-[#004d3d]/20 transition-all">
                            <span className="text-sm font-medium text-[#004d3d] flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
                                <span className="truncate max-w-[200px]">{form.watch('fileName')}</span>
                            </span>
                            <button 
                                type="button" 
                                onClick={() => {
                                    form.setValue('fileName', '');
                                    form.setValue('fileData', '');
                                    form.setValue('fileType', '');
                                    const fileInput = document.getElementById('file-upload-input') as HTMLInputElement;
                                    if(fileInput) fileInput.value = '';
                                }}
                                className="text-[#004d3d] hover:text-red-500 font-bold px-2 rounded hover:bg-red-50 transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                    ) : (
                        <Input
                            id="file-upload-input"
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
                    )}
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
