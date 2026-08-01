import Link from 'next/link'
import {PageHero} from '@/components/CommonSections'
import {VideoGallery, type VideoCardData} from '@/components/VideoGallery'
import {getVideos} from '@/lib/content'
import {createMetadata} from '@/lib/metadata'
import {imageAlt, imageUrl} from '@/sanity/lib/image'

export const metadata = createMetadata('Video', 'Live broadcast, streaming, content and video production from across the aesthetics industry.', {noIndex: true}, '/video')

export default async function MediaHubPage() {
  const videos = await getVideos()
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
        title="Video"
        accent="Gallery."
        intro="Live broadcast, streaming, content and video production — a selection of work from across the aesthetics industry."
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
            <div className="eyebrow">For journalists</div>
            <h2>Need an expert comment or interview?</h2>
          </div>
          <div>
            <p>Use the dedicated media desk to submit your subject, deadline and required expertise.</p>
            <Link className="btn btn-dark" href="/media-desk">Open the media desk ↗</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
