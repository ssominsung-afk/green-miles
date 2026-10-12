import Link from 'next/link';
import { ArrowRight, CalendarDays, Tag } from 'lucide-react';

export const metadata = {
    title: 'Blog | Pallet Industry Insights',
    description:
        'Pallet industry insights from A3 Pallet: ISPM-15 compliance, GMA specs, warehouse efficiency, and sourcing guidance for Southeast shippers.',
};

export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    category: string;
}

// Newest first. Add future weekly posts to the top of this list.
export const BLOG_POSTS: BlogPost[] = [
    {
        slug: 'ispm15-heat-treated-pallets',
        title: 'ISPM-15 Heat Treated Pallets: What Atlanta Shippers Need to Know for Export Compliance',
        description:
            'The HT stamp, heat treatment rules, common shipper mistakes, and how to verify compliance — a practical guide for exporters.',
        date: 'October 12, 2026',
        category: 'Export Compliance',
    },
];

export default function BlogIndexPage() {
    return (
        <div className="container mx-auto py-16 px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Pallet Industry Insights</h1>
                <p className="text-muted-foreground text-lg leading-relaxed">
                    Practical guidance on pallet specs, export compliance, and supply chain efficiency —
                    written for procurement teams, warehouse managers, and logistics professionals.
                </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-8">
                {BLOG_POSTS.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="block group rounded-2xl border p-8 hover:shadow-md transition-shadow"
                    >
                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-3">
                            <span className="inline-flex items-center gap-1">
                                <CalendarDays className="h-3.5 w-3.5" /> {post.date}
                            </span>
                            <span className="inline-flex items-center gap-1">
                                <Tag className="h-3.5 w-3.5" /> {post.category}
                            </span>
                        </div>
                        <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                            {post.title}
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            {post.description}
                        </p>
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                            Read article <ArrowRight className="h-4 w-4" />
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
