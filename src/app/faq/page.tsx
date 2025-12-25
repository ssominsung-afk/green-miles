import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata = {
    title: 'FAQ | Manufacturing & Delivery Questions',
    description: 'Answers about lead times, custom dimensions, and ISPM-15 heat treatment.',
};

const FAQS = [
    {
        question: "What is your minimum order quantity?",
        answer: "For standard delivery, we require a full truckload (approx. 400-600 pallets). For custom manufacturing runs, min quantities of 50-100 units may apply depending on complexity."
    },
    {
        question: "Do you sell used pallets?",
        answer: "Yes. We operate a high-volume recycling line. We grade, repair, and resell Grade A (#1) and Grade B (#2) 48x40 pallets."
    },
    {
        question: "Are you a broker?",
        answer: "No. We are a manufacturer with our own facility, sawmill, and fleet. Dealing with us means dealing directly with the source."
    },
    {
        question: "Can you make custom sizes?",
        answer: "Yes. We have specialized assembly equipment to build pallets to your exact dimensions. We use PDS software to ensure load ratings are met."
    },
    {
        question: "Do you offer heat treatment?",
        answer: "Yes. We have an on-site kiln certified for ISPM-15 Heat Treatment. We can stamp both new and recycled pallets for export."
    },
    {
        question: "How fast is delivery?",
        answer: "We typically deliver standard 48x40s within 24 hours for contracted accounts. Custom production lead times vary by volume and lumber availability."
    }
];

export default function FaqPage() {
    return (
        <div className="container mx-auto py-16 max-w-3xl px-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-8 text-center">Frequently Asked Questions</h1>

            <Accordion type="single" collapsible className="w-full">
                {FAQS.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left font-medium text-lg">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
