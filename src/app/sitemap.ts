import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.a3pallet.com'

    // Static routes
    const routes = [
        '',
        '/about',
        '/contact',
        '/custom',
        '/faq',
        '/pallets',
        '/privacy',
        '/service-areas',
        '/shipping',
        '/terms',
    ]

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
    }))
}
