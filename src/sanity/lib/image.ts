import imageUrlBuilder from '@sanity/image-url'
import type {ImageValue} from '@/types'
import {client} from './client'

const builder = imageUrlBuilder(client)

export function imageUrl(source: ImageValue | undefined, width = 1600, height?: number): string {
  if (!source) return '/images/hero.jpg'
  if (typeof source === 'string') return source
  if (source.asset?.url) return source.asset.url
  if (!source.asset?._ref && !source.asset?._id) return '/images/hero.jpg'
  let image = builder.image(source).auto('format').width(width).quality(88)
  if (height) image = image.height(height).fit('crop')
  return image.url()
}

export function imageAlt(source: ImageValue | undefined, fallback = ''): string {
  return typeof source === 'object' && source?.alt ? source.alt : fallback
}
