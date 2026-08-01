import {notFound} from 'next/navigation'
import Link from 'next/link'
import {ExternalVideo} from '@/components/ExternalVideo'
import {getVideo, getVideos} from '@/lib/content'
import {createMetadata} from '@/lib/metadata'

export async function generateStaticParams() {
  const videos = await getVideos()
  return videos.map((video) => ({slug: video.slug}))
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const video = await getVideo(slug)
  if (!video) return {}
  return createMetadata(video.title, video.intro || `${video.title} — video from Cosmetic Media Group.`, {...video.seo, noIndex: true}, `/video/${slug}`)
}

export default async function VideoPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const video = await getVideo(slug)
  if (!video) notFound()
  return (
    <div className="page-enter">
      <div className="video-hero">
        <div className="shell">
          <div className="crumbs"><Link href="/">Home</Link><span>/</span><Link href="/video">Video</Link><span>/</span><span>{video.title}</span></div>
          <h1>{video.title}</h1>
          {video.category && <p className="video-hero-sub">{video.category}</p>}
        </div>
      </div>
      <section>
        <div className="shell video-detail">
          {video.intro && <p className="intro">{video.intro}</p>}
          {video.videos.map((item, index) => (
            <div className="video-block" key={`${item.url}-${index}`}>
              {item.heading && <h2>{item.heading}</h2>}
              {item.url && <ExternalVideo url={item.url} title={item.heading || video.title} />}
              {item.caption && <p className="muted video-caption">{item.caption}</p>}
            </div>
          ))}
          <div className="video-back"><Link className="text-link" href="/video">← Back to Video</Link></div>
        </div>
      </section>
    </div>
  )
}
