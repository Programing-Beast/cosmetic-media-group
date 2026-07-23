import type {Metadata} from 'next'
import type {SEO} from '@/types'
import {imageUrl} from '@/sanity/lib/image'

export function createMetadata(title: string, description: string, seo?: SEO): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const metaTitle = seo?.metaTitle || `${title} — Cosmetic Media Group`
  const metaDescription = seo?.metaDescription || description
  const image = seo?.ogImage ? imageUrl(seo.ogImage, 1200, 630) : `${siteUrl}/images/hero.jpg`
  return {
    title: metaTitle,
    description: metaDescription,
    robots: seo?.noIndex ? {index: false, follow: false} : undefined,
    openGraph: {title: metaTitle, description: metaDescription, url: siteUrl, siteName: 'Cosmetic Media Group', images: [{url: image, width: 1200, height: 630}], type: 'website'},
    twitter: {card: 'summary_large_image', title: metaTitle, description: metaDescription, images: [image]}
  }
}
