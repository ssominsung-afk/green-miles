import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.a3pallet.com'

    // Static routes
    const routes = [
        '',
        '/about',
        '/blog',
        '/blog/ispm15-heat-treated-pallets',
        '/contact',
        '/custom',
        '/faq',
        '/pallets',
        '/privacy',
        '/service-areas/airport-i-85-south',
        '/service-areas/atlanta-logistics',
        '/service-areas/braselton-ga',
        '/service-areas/buford-ga',
        '/service-areas/college-park-ga',
        '/service-areas/conyers-ga',
        '/service-areas/covington-ga',
        '/service-areas/douglasville-ga',
        '/service-areas/duluth-ga',
        '/service-areas/fairburn-ga',
        '/service-areas/i-20-east',
        '/service-areas/i-20-west',
        '/service-areas/i-75-south-henry',
        '/service-areas/i-85-north',
        '/service-areas/lithia-springs-ga',
        '/service-areas/locust-grove-ga',
        '/service-areas/mcdonough-ga',
        '/service-areas/norcross-ga',
        '/service-areas/stockbridge-ga',
        '/service-areas/suwanee-ga',
        '/service-areas/union-city-ga',
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
