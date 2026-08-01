import Link from 'next/link'
import {PageHero} from '@/components/CommonSections'
import {VideoGallery, type VideoCardData} from '@/components/VideoGallery'
import {getVideos, getVideoPage} from '@/lib/content'
import {createMetadata} from '@/lib/metadata'
import {imageAlt, imageUrl} from '@/sanity/lib/image'

const DEFAULT_INTRO = 'Live broadcast, streaming, content and video production — a selection of work from across the aesthetics industry.'

export async function generateMetadata() {
  const page = await getVideoPage()
  return createMetadata('Video', page?.intro || DEFAULT_INTRO, {...page?.seo, noIndex: true}, '/video')
}

export default async function VideoGalleryPage() {
  const [videos, page] = await Promise.all([getVideos(), getVideoPage()])
  const cards: VideoCardData[] = videos.map((video) => ({
    slug: video.slug,
    title: video.title,
    category: video.category,
    img: imageUrl(video.poster, 760, 480),
    alt: imageAlt(video.poster, video.title)
  }))
  return (
    <div className="page-enter">
      <PageHero
        title={page?.heroTitle || 'Video'}
        accent={page?.heroAccent || 'Gallery.'}
        intro={page?.intro || DEFAULT_INTRO}
        crumbs={[{label: 'Home', href: '/'}, {label: 'Video'}]}
      />
      <section>
        <div className="shell">
          <VideoGallery cards={cards} />
        </div>
      </section>
      <section className="media-hub-desk-cta">
        <div className="shell">
          <div>
            <div className="eyebrow">{page?.ctaEyebrow || 'For journalists'}</div>
            <h2>{page?.ctaHeading || 'Need an expert comment or interview?'}</h2>
          </div>
          <div>
            <p>{page?.ctaText || 'Use the dedicated media desk to submit your subject, deadline and required expertise.'}</p>
            <Link className="btn btn-dark" href={page?.ctaButtonHref || '/media-desk'}>{page?.ctaButtonLabel || 'Open the media desk'} ↗</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
