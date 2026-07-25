import type {Metadata} from 'next'
import type {SEO} from '@/types'
import {imageUrl} from '@/sanity/lib/image'

export function createMetadata(title: string, description: string, seo?: SEO, path = '/'): Metadata {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/+$/, '')
  const normalizedPath = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}`
  const canonical = normalizedPath === '/' ? `${siteUrl}/` : `${siteUrl}${normalizedPath}`
  const metaTitle = seo?.metaTitle || `${title} — Cosmetic Media Group`
  const metaDescription = seo?.metaDescription || description
  const image = seo?.ogImage ? imageUrl(seo.ogImage, 1200, 630) : `${siteUrl}/images/hero.jpg`
  return {
    // `absolute` bypasses the root layout's `%s — Cosmetic Media Group` template — metaTitle already
    // carries the suffix, so without this the brand name would be appended twice.
    title: {absolute: metaTitle},
    description: metaDescription,
    robots: seo?.noIndex ? {index: false, follow: false} : undefined,
    alternates: {canonical},
    openGraph: {title: metaTitle, description: metaDescription, url: canonical, siteName: 'Cosmetic Media Group', images: [{url: image, width: 1200, height: 630}], type: 'website'},
    twitter: {card: 'summary_large_image', title: metaTitle, description: metaDescription, images: [image]}
  }
}
