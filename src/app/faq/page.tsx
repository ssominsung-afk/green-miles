import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata = {
    title: 'Pallet Supply FAQs | Sourcing & Logistics',
    description: 'Answers to common questions about pallet grades, lead times, custom builds, and Southeast regional supply coordination.',
};

const FAQS = [
    {
        question: "What is A3 Pallet’s role in the supply chain?",
        answer: "We are a managed sourcing partner. We handle spec-matching, quality vetting, and logistics coordination through our manufacturing partner network, providing a single point of accountability for your entire pallet program."
    },
    {
        question: "What is your typical lead time for quotes?",
        answer: "We pride ourselves on accountability and fast communication; expect a professional response or formal quote within 1 hour during business hours."
    },
    {
        question: "Do you provide heat-treated (ISPM-15) pallets?",
        answer: "Yes. Heat-treatment programs for export compliance are available upon request through our certified partner facilities."
    },
    {
        question: "What is your minimum order quantity (MOQ)?",
        answer: "MOQs vary by product and region, but standard supply programs typically start at half a truckload. Custom production runs generally require 50-100 units depending on complexity."
    },
    {
        question: "In which states do you offer delivery?",
        answer: "We primarily coordinate fulfillment across the Southeast, including Georgia, Florida, Alabama, South Carolina, North Carolina, Tennessee, Mississippi, and Louisiana."
    },
    {
        question: "How do you ensure pallet quality?",
        answer: "Every facility in our manufacturing network undergoes a rigorous 20-point quality audit. We implement standardized checklists for every grade (#1 Premium to #2 Standard) to ensure consistency."
    },
    {
        question: "Do you offer drop-trailer programs?",
        answer: "Yes. Drop-trailer programs are available for high-volume accounts to streamline wharfage, loading, and unloading without dock congestion."
    },
    {
        question: "Can you handle custom specifications?",
        answer: "Absolutely. We work with specialized partner facilities capable of building any spec-driven design, from oversized machinery skids to specialized automation-aligned pallets."
    },
    {
        question: "What factors influence pallet pricing?",
        answer: "Pricing is driven by daily wood market fluctuations, pallet grade, annual volume, and delivery logistics from our nearest partner facility."
    },
    {
        question: "What happens if there is an issue with an order?",
        answer: "You have a single point of contact at A3 Pallet. We resolve quality or scheduling issues directly with our partners so your warehouse team doesn't have to."
    },
    {
        question: "Do you buy used pallets?",
        answer: "We focus on supply programs, but we can often coordinate pallet retrieval or core buy-back programs through our regional recycling partners."
    },
    {
        question: "How do I get started?",
        answer: "Simply submit a 'Request for Quote' via our contact page. We will contact you within the hour to assess your specs, volume, and dock requirements."
    }
];

export default function FaqPage() {
    return (
        <div className="container mx-auto py-16 max-w-4xl px-4">
            <div className="text-center mb-16">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Frequently Asked Questions</h1>
                <p className="text-muted-foreground">Everything you need to know about our managed pallet programs.</p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
                {FAQS.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border rounded-xl px-6 bg-card shadow-sm">
                        <AccordionTrigger className="text-left font-bold text-lg hover:no-underline py-6">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": FAQS.map(faq => ({
                            "@type": "Question",
                            "name": faq.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": faq.answer
                            }
                        }))
                    })
                }}
            />
        </div>
    );
}

