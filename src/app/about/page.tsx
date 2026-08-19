import Image from 'next/image'
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
  {title: 'Industry depth', description: 'We understand aesthetics from the inside — its experts, audiences, opportunities and responsibilities.'},
  {title: 'Editorial intelligence', description: 'We look beyond promotion to uncover the ideas, evidence and voices that deserve attention.'},
  {title: 'Long-term authority', description: 'We build platforms, profiles and reputations that become more valuable and trusted over time.'}
]

export async function generateMetadata() {
  const about = await getAboutPage()
  return createMetadata('About', 'More than PR. A platform for influence.', about?.seo, '/about')
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
        intro={about?.intro || 'Cosmetic Media Group is the umbrella media and communications platform built on the established foundation of Cosmetic PR. Together, the group helps the aesthetics industry be seen, trusted and remembered through media visibility, content, education, podcasts, events, personal branding, awards and practical resources.'}
        crumbs={[{label: 'Home', href: '/'}, {label: 'About'}]}
      />
      <div className="shell stats">
        {stats.map((stat, index) => (
          <div className="stat" key={`${stat.label}-${index}`}><strong>{stat.value}</strong><span>{stat.label}</span></div>
        ))}
      </div>
      <section>
        <div className="shell two-col">
          <div className="portrait"><Image src={imageUrl(image, 900, 1100)} alt={imageAlt(image, 'Cosmetic Media Group editorial platform')} width={900} height={1100} sizes="(max-width: 980px) 100vw, 40vw" /></div>
          <div className="editorial-copy">
            <div className="eyebrow">{about?.evolutionEyebrow || 'Our evolution'}</div>
            <h2>{about?.evolutionHeading || 'From specialist PR to a connected media company.'}</h2>
            {about?.evolutionBody ? (
              <RichText value={about.evolutionBody} />
            ) : (
              <>
                <p>For more than 20 years, the business has helped aesthetic professionals earn recognition through strategic communications and media visibility. Cosmetic Media Group takes that experience further by bringing together PR, editorial content, education, podcasts, events, personal branding, awards and practical industry resources.</p>
                <p>The result is one connected destination where experts and brands can raise their profile, share their knowledge, build credibility and grow their influence.</p>
                <p>Cosmetic PR remains the flagship specialist PR agency within the group, while Cosmetic Media Group provides the wider platform for editorial, content, education, events, awards and future membership.</p>
              </>
            )}
            <p><Link className="text-link" href="/cosmetic-pr">Explore Cosmetic PR ↗</Link></p>
            <blockquote className="quote">{about?.quote || 'The future of aesthetics will not be led by the loudest voices. It will be led by the most trusted ones.'}</blockquote>
            <p>{about?.closingNote || 'Cosmetic Media Group exists to help the right people and ideas become seen, trusted and remembered — while creating useful platforms that move the wider industry forward.'}</p>
            <div className="hero-actions">
              <Link className="btn btn-dark" href="/about/founder">Meet founder Lucy Hilson ↗</Link>
            </div>
          </div>
        </div>
      </section>
      <section style={{background: '#fff'}}>
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">{about?.principlesEyebrow || 'Our point of view'}</div>
              <h2>{about?.principlesHeading || 'Credibility before noise.'}</h2>
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
