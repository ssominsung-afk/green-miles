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
        '/service-areas/college-park-ga',
        '/service-areas/covington-ga',
        '/service-areas/douglasville-ga',
        '/service-areas/duluth-ga',
        '/service-areas/stockbridge-ga',
        '/service-areas/suwanee-ga',
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
