'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PencilRuler, Cog, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { CustomPalletForm } from '@/components/forms/CustomPalletForm';
import { InteractivePalletBuilder, BuilderRef, PalletSpecs } from '@/components/custom/InteractivePalletBuilder';

export function ClientCustomPage() {
    const [isAdvancedMode, setIsAdvancedMode] = useState(false);
    const [specData, setSpecData] = useState<PalletSpecs | null>(null);
    const builderRef = useRef<BuilderRef>(null);

    // This gets passed to the form child, which will call capturePDFDataUrl 
    // when it's submitting, or we can proactively capture it.
    // However, `html2canvas` is async. If the form relies on a sync value, we need to capture it ahead of time.
    // Instead of sync, we let the form read `specData` and for the PDF, we capture it whenever specs change (debounced) or we've exposed `pdfDataUrl` as a prop.
    const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

    const handleDownloadPdf = async () => {
        if (!builderRef.current) return;
        setIsGeneratingPdf(true);
        try {
            const dataUrl = await builderRef.current.capturePDFDataUrl();
            if (dataUrl) {
                const res = await fetch(dataUrl);
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'A3_Pallet_Spec_Preview.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                setTimeout(() => window.URL.revokeObjectURL(url), 100);
            } else {
                alert('Failed to generate PDF preview.');
            }
        } catch (err) {
            alert('Error generating PDF: ' + err);
        } finally {
            setIsGeneratingPdf(false);
        }
    };

    const handleSpecChange = async (specs: PalletSpecs) => {
        setSpecData(specs);
    };

    // To prevent blocking the UI, we capture the PDF when the user clicks 'Submit' (inside the form). 
    // Wait, the form doesn't know about `builderRef`.
    // Let's proactively capture the PDF whenever they toggle advanced mode or after 2 seconds of inactivity? No, it's easier to capture when they click a snapshot button, or we can just capture it whenever specs change with a small debounce.
    // Actually, capturing every time is expensive. Let's provide a wrapper function to the form to call onSubmit? The form expects `pdfDataUrl` synchronously. 
    // Let's implement an on-demand generation in the form by wrapping the submit logic. But we can't easily change the form's deep internals without rewriting more.
    // Alternative: since html2canvas takes ~100ms, let's just trigger it whenever specs change but debounce it by 1 second.
    
    // Simple state holding for now:
    // When the user clicks the toggle, they enter advanced mode.
    
    return (
        <div className="container mx-auto py-16 px-4">
            <div className={`grid gap-12 items-start mb-24 transition-all duration-500 ease-in-out ${isAdvancedMode ? 'lg:grid-cols-[1.5fr_1fr] md:grid-cols-1' : 'md:grid-cols-2'}`}>
                
                {/* Left Side */}
                <div className={`space-y-8 ${isAdvancedMode ? 'animate-in fade-in slide-in-from-left-4' : ''}`}>
                    {!isAdvancedMode ? (
                        <>
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 text-[#004d3d]">Custom Pallets Built to Your Mechanical Specs</h1>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Unique products require specialized handling. Our custom program leverages partner manufacturing expertise to build pallets precisely to your mechanical specifications. From massive machinery skids to specialized export packaging, we provide the technical oversight your program requires.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="h-12 w-12 shrink-0 rounded-2xl bg-[#004d3d]/10 flex items-center justify-center text-[#004d3d]">
                                        <PencilRuler className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Built to Your Exact Specifications</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">Whether you have detailed PDS prints or just load dimensions, we coordinate with partners to engineer the perfect build for your product.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="h-12 w-12 shrink-0 rounded-2xl bg-[#004d3d]/10 flex items-center justify-center text-[#004d3d]">
                                        <Cog className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Heavy Load & Specialized Designs</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">Support for oversized, over-weight, and automation-aligned pallets using specialized lumber and reinforced construction.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="h-12 w-12 shrink-0 rounded-2xl bg-[#004d3d]/10 flex items-center justify-center text-[#004d3d]">
                                        <ShieldCheck className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Certified Export Ready</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">ISPM-15 heat-treatment programs coordinated through certified partner facilities for compliant international shipping.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 bg-[#004d3d]/5 border border-[#004d3d]/20 rounded-2xl">
                                <h4 className="font-bold mb-2 flex items-center gap-2 text-[#004d3d]">Southeast-Wide Custom Programs</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-4">We coordinate custom pallet delivery across the Southeast via partner fleets and trusted carriers.</p>
                                <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-[#004d3d]/80">
                                    {['GA', 'FL', 'AL', 'SC', 'NC', 'TN', 'MS', 'LA'].map(st => (
                                        <div key={st} className="flex items-center gap-2">
                                            <div className="h-1 w-1 bg-[#004d3d] rounded-full" />{st} Coverage
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 overflow-hidden">
                            <h2 className="text-2xl font-bold text-[#004d3d] mb-6 flex items-center gap-3">
                                <Cog className="h-6 w-6 text-[#004d3d]" /> Advanced 3D Spec Builder
                            </h2>
                            <InteractivePalletBuilder ref={builderRef} onChange={handleSpecChange} />
                            
                            <div className="mt-6 flex justify-end gap-4 overflow-x-auto pb-2">
                                <button 
                                    onClick={handleDownloadPdf}
                                    disabled={isGeneratingPdf}
                                    className="flex items-center gap-2 text-sm font-semibold text-[#004d3d] bg-[#004d3d]/10 hover:bg-[#004d3d]/20 px-4 py-2 rounded transition-colors break-keep whitespace-nowrap"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/></svg>
                                    {isGeneratingPdf ? 'Generating...' : 'Download Preview PDF'}
                                </button>
                                <button 
                                    onClick={async () => {
                                        setIsGeneratingPdf(true);
                                        try {
                                            if (builderRef.current) {
                                                const dataUrl = await builderRef.current.capturePDFDataUrl();
                                                if (dataUrl) {
                                                    setPdfDataUrl(dataUrl);
                                                    alert("A3 Pallet Spec Sheet successfully attached to your quote request!");
                                                }
                                            }
                                        } catch (err) {
                                            alert("Failed to attach PDF: " + err);
                                        } finally {
                                            setIsGeneratingPdf(false);
                                        }
                                    }}
                                    disabled={isGeneratingPdf}
                                    className="flex items-center gap-2 text-sm font-semibold text-white bg-[#004d3d] hover:bg-[#003d30] px-4 py-2 rounded transition-colors shadow-sm break-keep whitespace-nowrap"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                                    {isGeneratingPdf ? 'Attaching...' : 'Attach PDF to Quote'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Side Sticky Form */}
                <div className="sticky top-28">
                    <Card className="shadow-xl border-t-4 border-t-[#004d3d]">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Request a Spec Quote</CardTitle>
                            <p className="text-sm text-muted-foreground">Our specialists aim to respond within 1 hour during business hours.</p>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <CustomPalletForm 
                                    isAdvancedMode={isAdvancedMode} 
                                    specData={specData} 
                                    pdfDataUrl={pdfDataUrl}
                                    onToggleAdvanced={() => setIsAdvancedMode(!isAdvancedMode)} 
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <div className="mt-6 text-center">
                        <p className="text-xs text-muted-foreground">
                            Atlanta corridor focus: <Link href="/service-areas/atlanta-logistics" className="underline font-medium">Atlanta Logistics Hub</Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Typical Build Types Section - kept simple below the fold */}
            <div className="mb-24">
                <h2 className="text-3xl font-bold text-center mb-12">Typical Custom Build Types</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Heavy-Duty Skids", desc: "For extreme weights and industrial machinery. Single-face construction with reinforced base." },
                        { title: "Block-Style Builds", desc: "True 4-way entry designs for maximum handling flexibility in complex warehouses." },
                        { title: "Notched Stringers", desc: "Custom-notched for specific forklift or pallet jack requirements." },
                        { title: "Reinforced 48x40s", desc: "GMA footprint with extra deck boards or thicker lumber for high-density loads." },
                        { title: "Oversized Footprints", desc: "Custom lengths and widths to accommodate machinery or bulk materials." },
                        { title: "Export Heat-Treated", desc: "Full ISPM-15 compliance for international transit with certified markings." },
                    ].map((type) => (
                        <div key={type.title} className="p-6 rounded-xl border bg-white hover:border-primary transition-colors">
                            <h3 className="font-bold mb-2">{type.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{type.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

