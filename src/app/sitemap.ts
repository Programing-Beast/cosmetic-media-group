import type {MetadataRoute} from 'next'
import {getServices} from '@/lib/content'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const services = await getServices()
  // Media Hub (and its articles) is hidden for now (client, 8-10): unlinked from
  // navigation and left out of the sitemap, but the pages stay reachable by URL.
  const staticRoutes = ['', '/about', '/about/founder', '/cosmetic-pr', '/services', '/media-desk', '/diamond-awards', '/our-brands', '/toolkits', '/membership', '/contact']
  return [
    ...staticRoutes.map((route) => ({url: `${base}${route}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: route === '' ? 1 : .7})),
    // PR lives at /cosmetic-pr (already in staticRoutes); /services/pr is only a redirect.
    ...services.filter((service) => service.slug !== 'pr').map((service) => ({url: `${base}/services/${service.slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: .7}))
  ]
}
