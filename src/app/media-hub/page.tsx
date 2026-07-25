import Link from 'next/link'
import {PageHero} from '@/components/CommonSections'
import {MediaFilter, type MediaCard} from '@/components/MediaFilter'
import {getArticles} from '@/lib/content'
import {createMetadata} from '@/lib/metadata'
import {imageAlt, imageUrl} from '@/sanity/lib/image'

export const metadata = createMetadata('Media Hub', 'Articles, interviews, videos, podcasts, news, trends, opinion and expert content.', undefined, '/media-hub')

export default async function MediaHubPage() {
  const articles = await getArticles()
  const [featured, ...rest] = articles
  const cards: MediaCard[] = rest.map((article) => ({
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    format: article.format,
    img: imageUrl(article.image, 760, 570),
    alt: imageAlt(article.image, article.title)
  }))
  return (
    <div className="page-enter">
      <PageHero
        title="The industry’s next"
        accent="conversation."
        intro="Editorial coverage, expert interviews, industry news, trends, opinion, podcasts, video and practical intelligence from across aesthetics."
        crumbs={[{label: 'Home', href: '/'}, {label: 'Media Hub'}]}
      />
      <section>
        <div className="shell">
          {featured && (
            <Link className="story-card featured" href={`/media-hub/${featured.slug}`}>
              <div className="story-image"><img src={imageUrl(featured.image, 1000, 750)} alt={imageAlt(featured.image, featured.title)} /></div>
              <div className="story-body">
                <div className="story-meta">Featured / {featured.category}</div>
                <h3>{featured.title}</h3>
                <p>{featured.excerpt}</p>
                <b className="text-link">Read the feature ↗</b>
              </div>
            </Link>
          )}
          <div style={{marginTop: featured ? 42 : 0}}>
            <MediaFilter cards={cards} />
          </div>
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
