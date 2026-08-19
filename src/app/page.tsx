import Image from 'next/image'
import Link from 'next/link'
import {HomeSections} from '@/components/HomeSections'
import {getArticles, getBrands, getHomepage, getServices, getToolkits} from '@/lib/content'
import {createMetadata} from '@/lib/metadata'
import {imageAlt, imageUrl} from '@/sanity/lib/image'

export async function generateMetadata() {
  const homepage = await getHomepage()
  return createMetadata('Home', 'A media and communications platform built to help the aesthetics industry be seen, trusted and remembered.', homepage.seo, '/')
}

export default async function HomePage() {
  const [homepage, services, articles, brands, toolkits] = await Promise.all([getHomepage(), getServices(), getArticles(), getBrands(), getToolkits()])
  const hero = homepage.hero
  return <div className="page-enter editorial-home-v2"><section className="cmg-cover"><div className="shell"><div className="cmg-cover-grid"><div className="cmg-cover-copy"><div><div className="cmg-issue-line"><span>{hero.eyebrowLeft}</span><span>{hero.eyebrowRight}</span></div><h1>{hero.titleBefore} <em>{hero.titleAccent}</em></h1></div><div className="cmg-cover-deck"><div><p className="cmg-identity-line">{hero.identity}</p><p className="cmg-cover-summary">{hero.summary}</p></div><div className="cmg-cover-actions"><Link className="btn btn-dark" href={hero.primaryCta.href}>{hero.primaryCta.label}</Link><Link className="text-link" href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link></div></div></div><Link className={`cmg-cover-image ${hero.videoUrl || hero.film?.length ? 'cmg-cover-film' : ''}`} href="/media-hub" aria-label="Editorial film concept">{hero.videoUrl ? (
      <video className="cmg-hero-video" src={hero.videoUrl} poster={imageUrl(hero.image, 1040, 1300)} muted autoPlay loop playsInline preload="metadata" />
    ) : hero.film?.length ? (
      <div className="cmg-film-frames">{[hero.image, ...hero.film].map((frame, index) => <Image className="film-frame" key={index} src={imageUrl(frame, 1040, 1300)} alt={index === 0 ? imageAlt(hero.image, 'Aesthetics editorial portrait') : ''} width={1040} height={1300} priority={index === 0} sizes="(max-width: 900px) 100vw, 520px" />)}</div>
    ) : (
      <Image src={imageUrl(hero.image, 1040, 1300)} alt={imageAlt(hero.image, 'Aesthetics editorial portrait')} width={1040} height={1300} priority sizes="(max-width: 900px) 100vw, 520px" />
    )}{hero.filmBadge && <div className="cmg-film-badge">{hero.filmBadge}</div>}<div className="cmg-cover-caption"><b>{hero.imageCaption}</b><span>{hero.imageMeta}</span></div></Link></div><div className="cmg-cover-index"><Link className="cmg-index-item" href="/cosmetic-pr"><small>01 — Visibility</small><h3>Cosmetic PR</h3><p>The established flagship agency for reputation, media visibility and strategic communications.</p></Link><Link className="cmg-index-item" href="/media-hub"><small>02 — Editorial</small><h3>Media Hub</h3><p>Articles, interviews, videos, podcasts and expert perspectives from across aesthetics.</p></Link><Link className="cmg-index-item" href="/diamond-awards"><small>03 — Recognition</small><h3>Diamond Awards</h3><p>Celebrating excellence while elevating safety, ethics and professional standards.</p></Link><Link className="cmg-index-item" href="/toolkits"><small>04 — Intelligence</small><h3>Education & Insights</h3><p>Research, training, reports and practical resources for industry leaders.</p></Link></div></div></section><HomeSections homepage={homepage} services={homepage.featuredServices?.length ? homepage.featuredServices : services} articles={homepage.featuredArticles?.length ? homepage.featuredArticles : articles} brands={homepage.featuredBrands?.length ? homepage.featuredBrands : brands} toolkits={homepage.featuredToolkits?.length ? homepage.featuredToolkits : toolkits} /></div>
}
