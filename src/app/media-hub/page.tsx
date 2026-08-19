import Image from 'next/image'
import Link from 'next/link'
import {PageHero} from '@/components/CommonSections'
import {MediaFilter, type MediaCard} from '@/components/MediaFilter'
import {getArticles, getMediaHubPage} from '@/lib/content'
import {createMetadata} from '@/lib/metadata'
import {imageAlt, imageUrl} from '@/sanity/lib/image'

const DEFAULT_INTRO = 'Articles, interviews, videos, podcasts, industry news, trends, opinion and expert content for the people shaping modern aesthetics.'

export async function generateMetadata() {
  const page = await getMediaHubPage()
  return createMetadata('Media Hub', page?.intro || DEFAULT_INTRO, page?.seo, '/media-hub')
}

export default async function MediaHubPage() {
  const [articles, page] = await Promise.all([getArticles(), getMediaHubPage()])
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
        title={page?.heroTitle || 'The industry,'}
        accent={page?.heroAccent || 'edited.'}
        intro={page?.intro || DEFAULT_INTRO}
        crumbs={[{label: 'Home', href: '/'}, {label: 'Media Hub'}]}
      />
      <section>
        <div className="shell">
          {featured && (
            <Link className="story-card featured" href={`/media-hub/${featured.slug}`}>
              <div className="story-image"><Image src={imageUrl(featured.image, 1000, 750)} alt={imageAlt(featured.image, featured.title)} width={1000} height={750} sizes="(max-width: 980px) 100vw, 66vw" /></div>
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
