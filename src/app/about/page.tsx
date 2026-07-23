import Link from 'next/link'
import {NewsletterBand, PageHero} from '@/components/CommonSections'
import {RichText} from '@/components/RichText'
import {getAboutPage} from '@/lib/content'
import {createMetadata} from '@/lib/metadata'
import {imageAlt, imageUrl} from '@/sanity/lib/image'

const FALLBACK_STATS = [
  {value: '20+', label: 'Years in aesthetics communications'},
  {value: 'Global', label: 'UK, Middle East and international reach'},
  {value: 'Multiple', label: 'Connected media and industry platforms'},
  {value: '1', label: 'Trusted ecosystem'}
]

const FALLBACK_PRINCIPLES = [
  {title: 'Industry depth', description: 'We understand aesthetics from the inside: its experts, audiences, opportunities and responsibilities.'},
  {title: 'Editorial intelligence', description: 'We look beyond promotion to uncover the ideas, evidence and voices that deserve attention.'},
  {title: 'Long-term authority', description: 'We build platforms, profiles and reputations that become more valuable and trusted over time.'}
]

export async function generateMetadata() {
  const about = await getAboutPage()
  return createMetadata('About', 'More than PR. A platform for influence.', about?.seo)
}

export default async function AboutPage() {
  const about = await getAboutPage()
  const image = about?.image || '/images/magazine.jpg'
  const stats = about?.stats?.length ? about.stats : FALLBACK_STATS
  const principles = about?.principles?.length ? about.principles : FALLBACK_PRINCIPLES
  return (
    <div className="page-enter">
      <PageHero
        title={about?.heroTitle || 'More than PR.'}
        accent={about?.heroAccent || 'A platform for influence.'}
        intro={about?.intro || 'Cosmetic Media Group helps the aesthetics industry be seen, trusted and remembered through media visibility, content, education, podcasts, events, personal branding, awards and practical resources.'}
        crumbs={[{label: 'Home', href: '/'}, {label: 'About'}]}
      />
      <div className="shell stats">
        {stats.map((stat, index) => (
          <div className="stat" key={`${stat.label}-${index}`}><strong>{stat.value}</strong><span>{stat.label}</span></div>
        ))}
      </div>
      <section>
        <div className="shell two-col">
          <div className="editorial-copy">
            <div className="eyebrow">{about?.evolutionEyebrow || 'Our evolution'}</div>
            <h2>{about?.evolutionHeading || 'A media company, not simply an agency.'}</h2>
            {about?.evolutionBody ? (
              <RichText value={about.evolutionBody} />
            ) : (
              <>
                <p>Cosmetic Media Group is a modern media and communications company for the global aesthetics industry. We do not just help brands gain publicity. We create the conversations that shape the industry, connecting professionals, clinics, brands and consumers in one trusted ecosystem.</p>
                <p>The group brings together strategic PR, personal branding, content production, editorial publishing, education, podcasts, events, research and recognition. Each platform has its own purpose, but they are connected by one ambition: to help credible experts and organisations build authority that lasts.</p>
              </>
            )}
            <blockquote className="quote">{about?.quote || 'We elevate the people, brands and ideas shaping the future of aesthetics.'}</blockquote>
            <div className="hero-actions">
              <Link className="btn btn-dark" href="/about/founder">Meet the Founder ↗</Link>
              <Link className="btn btn-media" href="/media-desk">Media enquiries ↗</Link>
            </div>
          </div>
          <div className="portrait"><img src={imageUrl(image, 900, 1100)} alt={imageAlt(image, 'The Cosmetic Media Group editorial ecosystem')} /></div>
        </div>
      </section>
      <section style={{background: '#fff'}}>
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">{about?.principlesEyebrow || 'Our principles'}</div>
              <h2>{about?.principlesHeading || 'Recognition with substance.'}</h2>
            </div>
            <p>{about?.principlesIntro || 'Every part of the platform is designed to create recognition with substance, authority with relevance and influence that lasts.'}</p>
          </div>
          <div className="values">
            {principles.map((principle, index) => (
              <div className="value" key={principle.title}>
                <strong>{String(index + 1).padStart(2, '0')}</strong>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <NewsletterBand />
    </div>
  )
}
