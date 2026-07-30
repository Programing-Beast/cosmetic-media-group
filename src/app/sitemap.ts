import type {MetadataRoute} from 'next'
import {getServices, getVideos} from '@/lib/content'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const [services, videos] = await Promise.all([getServices(), getVideos()])
  const staticRoutes = ['', '/about', '/about/founder', '/services', '/media-hub', '/media-desk', '/diamond-awards', '/our-brands', '/toolkits', '/membership', '/contact']
  return [
    ...staticRoutes.map((route) => ({url: `${base}${route}`, lastModified: new Date(), changeFrequency: route === '/media-hub' ? 'daily' as const : 'monthly' as const, priority: route === '' ? 1 : .7})),
    ...services.map((service) => ({url: `${base}/services/${service.slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: .7})),
    ...videos.map((video) => ({url: `${base}/media-hub/${video.slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: .8}))
  ]
}
