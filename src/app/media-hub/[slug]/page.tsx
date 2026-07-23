import {notFound} from 'next/navigation'
import Link from 'next/link'
import {ExternalVideo} from '@/components/ExternalVideo'
import {RichText} from '@/components/RichText'
import {ShareLinks} from '@/components/ShareLinks'
import {getArticle, getArticles} from '@/lib/content'
import {createMetadata} from '@/lib/metadata'
import {imageAlt, imageUrl} from '@/sanity/lib/image'

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map((article) => ({slug: article.slug}))
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const article = await getArticle(slug)
  if (!article) return {}
  return createMetadata(article.title, article.excerpt, article.seo)
}

export default async function ArticlePage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const article = await getArticle(slug)
  if (!article) notFound()
  const tags = article.tags?.length ? article.tags : [article.category, article.format].filter((tag): tag is string => Boolean(tag))
  return (
    <div className="page-enter">
      <div className="page-hero">
        <div className="shell">
          <div className="crumbs"><Link href="/">Home</Link><span>/</span><Link href="/media-hub">Media Hub</Link><span>/</span><span>{article.category}</span></div>
          <div className="eyebrow" style={{marginTop: 45}}>{article.category} / {article.format}</div>
          <h1>{article.title}</h1>
          <p className="intro">{article.excerpt}</p>
        </div>
      </div>
      <div className="shell article-hero-image"><img src={imageUrl(article.image, 1600, 900)} alt={imageAlt(article.image, article.title)} /></div>
      <section>
        <div className="shell article-layout">
          <article>
            {article.externalVideoUrl && <ExternalVideo url={article.externalVideoUrl} title={article.title} />}
            <RichText value={article.body} />
          </article>
          <aside className="article-aside">
            <div className="aside-box"><b>Published</b><br />{new Date(article.publishedAt).toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric'})}</div>
            {article.readingTime && <div className="aside-box"><b>Reading time</b><br />{article.readingTime}</div>}
            {article.author && <div className="aside-box"><b>Author</b><br />{article.author.name}<br />{article.author.role}</div>}
            {tags.length > 0 && (
              <div className="aside-box">
                <div className="eyebrow">Filed under</div>
                <p>{tags.map((tag, index) => <span key={tag}>{index > 0 && <br />}{tag}</span>)}</p>
              </div>
            )}
            <ShareLinks title={article.title} />
            <div className="aside-box">
              <div className="eyebrow">Related service</div>
              <p>
                {article.relatedService ? (
                  <Link href={`/services/${article.relatedService.slug}`}><b>{article.relatedService.title} ↗</b></Link>
                ) : (
                  <Link href="/services"><b>Explore our services ↗</b></Link>
                )}
              </p>
            </div>
            <div className="aside-box"><Link className="text-link" href="/media-hub">Back to Media Hub ↗</Link></div>
          </aside>
        </div>
      </section>
    </div>
  )
}
