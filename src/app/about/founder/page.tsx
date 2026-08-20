import Image from 'next/image'
import Link from 'next/link'
import {NewsletterBand, PageHero} from '@/components/CommonSections'
import {getFounder} from '@/lib/content'
import {createMetadata} from '@/lib/metadata'
import {imageAlt, imageUrl} from '@/sanity/lib/image'
import {RichText} from '@/components/RichText'

const FALLBACK_STATS = [
  {value: '20+', label: 'Years in aesthetics PR'},
  {value: '100,000+*', label: 'Media features secured'},
  {value: 'Hundreds', label: 'Of experts represented'},
  {value: 'Global', label: 'Speaker at international industry events'},
  {value: 'Founder', label: 'Cosmetic Media Group & Diamond Awards Dubai'},
  {value: 'Co-founder', label: 'The Aesthetics Edit — Dubai’s first dedicated aesthetics guide'},
  {value: 'Host', label: 'Industry interviews and podcasts'},
  {value: 'Commentator', label: 'Trusted voice across aesthetics media'}
]

const FALLBACK_PUBLICATIONS = ['Vogue', 'Grazia', "Harper's Bazaar", 'HELLO!', 'Cosmopolitan', 'Marie Claire', 'Daily Mail', 'The Times']

const FALLBACK_ROLES = [
  {title: 'Speaker', description: 'International events, panels and industry conversations focused on reputation, visibility and higher standards.'},
  {title: 'Interviewer', description: 'Thoughtful conversations with clinicians, founders, innovators and the people shaping modern aesthetics.'},
  {title: 'Commentator', description: 'Expert perspective on communications, trust, media influence and the evolution of the aesthetics industry.'}
]

const FALLBACK_NOTE = '* Media coverage figure is shown as supplied in the client feedback and should be verified before the final website goes live.'

// The seeded headline already contains the full phrase, so the italic accent is
// carved out of it rather than appended — the phrase renders exactly once
// whatever the Sanity value is.
function FounderHeadline({headline}: {headline?: string}) {
  const text = headline?.trim() || 'Experience with a point of view.'
  const match = text.match(/^(.*?)\s*(point of view\.?)$/i)
  if (!match) return <>{text}</>
  return <>{match[1]} <em>{match[2]}</em></>
}

export async function generateMetadata() {
  const founder = await getFounder()
  return createMetadata('Meet Lucy Hilson', 'Founder, PR specialist, speaker, interviewer and industry commentator.', founder?.seo, '/about/founder')
}

export default async function FounderPage() {
  const founder = await getFounder()
  const image = founder?.image || '/images/founder.jpg'
  const stats = founder?.stats?.length ? founder.stats : FALLBACK_STATS
  const publications = founder?.publications?.length ? founder.publications : FALLBACK_PUBLICATIONS
  const roles = founder?.roles?.length ? founder.roles : FALLBACK_ROLES
  const statsNote = founder?.statsNote || FALLBACK_NOTE
  return (
    <div className="page-enter founder-page">
      <PageHero
        title="Meet Lucy"
        accent="Hilson."
        intro={founder?.intro || 'Founder, PR specialist, speaker, interviewer and industry commentator with more than 20 years of experience building trusted reputations across aesthetics.'}
        crumbs={[{label: 'Home', href: '/'}, {label: 'About', href: '/about'}, {label: 'Founder'}]}
      />
      <section className="cmg-founder cmg-founder-page-content">
        <div className="shell cmg-founder-grid">
          <div className="cmg-founder-visual">
            <div className="cmg-founder-image">
              <Image src={imageUrl(image, 900, 1200)} alt={imageAlt(image, 'Lucy Hilson, founder of Cosmetic Media Group')} width={900} height={1200} priority sizes="(max-width: 980px) 100vw, 40vw" />
              <div className="cmg-founder-caption">
                <b>{founder?.name || 'Lucy Hilson'}</b>
                <span>Founder / speaker / interviewer / industry commentator</span>
              </div>
            </div>
          </div>
          <div className="cmg-founder-copy">
            <div className="cmg-section-no">01 — Founder profile</div>
            <h2><FounderHeadline headline={founder?.headline} /></h2>
            <p className="founder-intro">Lucy Hilson is the founder of Cosmetic Media Group and one of the UK and Middle East&apos;s most established PR specialists in aesthetics.</p>
            {founder?.body ? (
              <RichText value={founder.body} />
            ) : (
              <>
                <p>For more than 20 years, Lucy has helped doctors, clinics, brands and industry leaders build trusted reputations through strategic public relations and media exposure. Her work has secured coverage in leading consumer, beauty and business publications, positioned experts as trusted media commentators and supported some of the industry&apos;s most recognised names.</p>
                <p>As the industry has evolved, so has her vision. Cosmetic Media Group was created to go beyond traditional PR, bringing together media, education, content, podcasts, events and personal branding into one platform designed to help aesthetic professionals build authority, influence and lasting credibility.</p>
                <p>Alongside leading Cosmetic Media Group, Lucy is a regular speaker, interviewer and industry commentator, known for championing higher standards in aesthetics and helping experts communicate with confidence. She is also the founder of the Diamond Awards Dubai and co-founder of The Aesthetics Edit.</p>
              </>
            )}
            <p className="cmg-founder-belief">“{founder?.belief || 'The most successful businesses are not always the most talented. They are the ones people know, trust and remember.'}”</p>
            <div className="cmg-founder-stats">
              {stats.map((stat, index) => (
                <div className="cmg-founder-stat" key={`${stat.label}-${index}`}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
            {statsNote && <p className="cmg-founder-note">{statsNote}</p>}
            <div className="cmg-featured-media">
              <small>As featured in — final publication list to be approved</small>
              <div className="cmg-featured-publications">
                {publications.map((name) => <span key={name}>{name}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="founder-roles">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Beyond the boardroom</div>
              <h2>A visible voice within the industry.</h2>
            </div>
            <p>Lucy&apos;s personal profile is connected directly to the work and purpose of Cosmetic Media Group.</p>
          </div>
          <div className="values">
            {roles.map((role, index) => (
              <div className="value" key={role.title}>
                <strong>{String(index + 1).padStart(2, '0')}</strong>
                <h3>{role.title}</h3>
                <p>{role.description}</p>
              </div>
            ))}
          </div>
          <div className="founder-page-cta">
            <Link className="btn btn-dark" href="/contact">Invite Lucy to speak or collaborate ↗</Link>
            <Link className="text-link" href="/media-desk">Media and journalist enquiries ↗</Link>
          </div>
        </div>
      </section>
      <NewsletterBand />
    </div>
  )
}
