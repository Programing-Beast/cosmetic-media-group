import Image from 'next/image'
import Link from 'next/link'
import {ManagedForm} from '@/components/Form'
import {RichText} from '@/components/RichText'
import {getCosmeticPr} from '@/lib/content'
import {createMetadata} from '@/lib/metadata'
import {imageAlt, imageUrl} from '@/sanity/lib/image'

const FALLBACK_IDENTITY = [
  {label: 'Position', value: 'Flagship agency within CMG'},
  {label: 'Established', value: '12+ years of brand recognition'},
  {label: 'Markets', value: 'UK · Dubai · Global'},
  {label: 'Focus', value: 'Trust · media · reputation'}
]

const FALLBACK_STORY = [
  'Cosmetic PR is a boutique, full-service public relations agency specialising in medical aesthetics, beauty and wellness. Its sector knowledge supports campaigns that do more than generate coverage — helping clients strengthen credibility, visibility and commercial positioning.',
  'Long-standing relationships with consumer, trade, beauty and business media enable the agency to connect the right experts and stories with the publications and platforms that matter. That heritage now sits within the wider Cosmetic Media Group ecosystem, giving clients access to a broader mix of editorial, personal branding, content, education, podcasts, events and industry platforms.'
]

const FALLBACK_CAPABILITIES = [
  {title: 'PR & Communications', description: 'Media relations, expert positioning, editorial opportunities, press launches, awards and long-term reputation strategy.'},
  {title: 'Digital Marketing', description: 'Audience communications, email marketing and digital activity designed to keep clients informed and engaged.'},
  {title: 'Content Creation', description: 'Written and creative content, newsletters, brand materials and campaign assets aligned to wider communications objectives.'},
  {title: 'Brand Development', description: 'Strategic support for businesses and products developing their identity, positioning and route to market.'},
  {title: 'Events', description: 'Launches, press events and industry experiences managed from concept and guest strategy through to activation.'},
  {title: 'Social Media', description: 'Social strategy, consultancy, management and content designed to build a connected public profile.'}
]

const FALLBACK_CASES = [
  {label: 'Dr Nina Bal / expert positioning', title: 'From national coverage to a 10-minute ITV This Morning appearance.', description: "Cosmetic PR built Dr Nina's media credibility through quality national coverage before securing the television opportunity that had been a central campaign objective.", tags: 'Television / national press / expert authority'},
  {label: 'Dr Tatiana / long-term profile', title: 'Top-tier press and broadcast visibility.', description: 'Long-term PR and social support secured coverage across leading fashion, beauty, newspaper and lifestyle titles alongside Channel 5 and MTV exposure.', tags: 'Press / broadcast / brand growth'},
  {label: 'InMode / brand awareness', title: '140+ pieces of published press coverage.', description: 'National and trade press, award wins, influencer partnerships, events and wider marketing support helped raise awareness of InMode and its treatment technologies.', tags: 'PR / awards / influencers / events'}
]

const FALLBACK_TESTIMONIALS = [
  {name: 'Dr Nina Bal', quote: "Highlights professionalism, kindness and the team's ability to deliver meaningful press and television opportunities."},
  {name: 'Dr Usman Qureshi', quote: "Credits the team's specialist cosmetic-industry understanding, media connections and consistent delivery against profile-building goals."},
  {name: 'InMode UK', quote: 'Describes Cosmetic PR as proactive, creative and willing to go beyond the expected to make a measurable difference to the business.'}
]

const FALLBACK_PUBLICATIONS = ['VOGUE', "Harper's Bazaar", 'GRAZIA', 'Tatler', 'Marie Claire', 'Cosmopolitan', 'The Telegraph', 'Daily Mail', 'HELLO!', 'Channel 5', 'MTV', 'This Morning']

const FALLBACK_SUMMARY = [
  'This page is intentionally a concise editorial summary of the previous Cosmetic PR website, bringing its strongest proof points into the new Cosmetic Media Group design system without recreating the older site page-for-page.',
  'It captures the essentials of the original platform: sector specialism, service breadth, award and event support, content creation, social and digital communications, proven media relationships, long-term client trust and selected campaign outcomes.',
  'For the final live build, the developer can further expand this page with additional approved case studies, publication logos, testimonials, before-and-after campaign outcomes or archived press examples if the client wants a deeper legacy showcase.'
]

const FALLBACK_SUMMARY_POINTS = [
  {label: 'Included here', text: 'Agency positioning, services, case studies and testimonials'},
  {label: 'Can be added later', text: 'More case studies, press logos, screenshots, awards and archived campaign highlights'},
  {label: 'Role in the new site', text: 'The flagship agency page within the wider Cosmetic Media Group ecosystem'}
]

export async function generateMetadata() {
  const page = await getCosmeticPr()
  return createMetadata('Cosmetic PR', page?.heroIntro || 'The established specialist PR agency behind more than a decade of recognised work across medical aesthetics, beauty and wellness.', page?.seo, '/cosmetic-pr')
}

export default async function CosmeticPrPage() {
  const page = await getCosmeticPr()
  const identity = page?.identityStrip?.length ? page.identityStrip : FALLBACK_IDENTITY
  const capabilities = page?.capabilities?.length ? page.capabilities : FALLBACK_CAPABILITIES
  const cases = page?.cases?.length ? page.cases : FALLBACK_CASES
  const testimonials = page?.testimonials?.length ? page.testimonials : FALLBACK_TESTIMONIALS
  const publications = page?.publications?.length ? page.publications : FALLBACK_PUBLICATIONS
  const summaryPoints = page?.summaryPoints?.length ? page.summaryPoints : FALLBACK_SUMMARY_POINTS
  const heroImage = page?.heroImage || '/images/editorial.jpg'

  return <div className="page-enter cosmetic-pr-page">
    <section className="cpr-page-hero">
      <div className="shell">
        <div className="crumbs"><Link href="/">Home</Link><span>/</span><span>Cosmetic PR</span></div>
        <div className="cpr-hero-grid">
          <div className="cpr-hero-copy">
            <div className="eyebrow">{page?.heroEyebrow || 'Flagship PR agency / Cosmetic Media Group'}</div>
            <h1>{page?.heroTitle || 'COSMETIC'} <em>{page?.heroAccent || 'PR.'}</em></h1>
            <p className="cpr-intro">{page?.heroIntro || 'The established specialist PR agency behind more than a decade of recognised work across medical aesthetics, beauty and wellness.'}</p>
            <p>{page?.heroBody || 'Cosmetic Media Group is the umbrella brand. Cosmetic PR remains its flagship communications agency — combining deep sector knowledge, long-standing media relationships and bespoke strategy to build trusted reputations.'}</p>
            <div className="hero-actions">
              <Link className="btn btn-dark" href="/contact">Discuss a PR brief ↗</Link>
              <Link className="text-link" href="/about/founder">Meet Lucy Hilson ↗</Link>
            </div>
          </div>
          <div className="cpr-hero-image">
            <Image src={imageUrl(heroImage, 1100, 1300)} alt={imageAlt(heroImage, 'Cosmetic PR editorial and media work')} width={1100} height={1300} priority sizes="(max-width: 800px) 100vw, 48vw" />
            <div className="cpr-hero-caption">
              <b>{page?.heroCaption || 'Specialist PR. Lasting authority.'}</b>
              <span>{page?.heroCaptionMeta || 'Medical aesthetics / beauty / wellness'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="shell cpr-identity-strip">
      {identity.map((item) => <div key={item.label}><small>{item.label}</small><b>{item.value}</b></div>)}
    </div>

    <section className="cpr-story">
      <div className="shell cpr-story-grid">
        <aside className="cpr-story-side">
          <div className="cmg-section-no">{page?.storyEyebrow || '01 — The agency'}</div>
          <h3>{page?.storySideHeading || 'Built inside the aesthetics industry.'}</h3>
          <p className="muted">{page?.storySideText || 'A specialist agency with a long history of representing clinicians, clinics, devices, products and recognised industry names.'}</p>
        </aside>
        <div className="cpr-story-main">
          <h2>{page?.storyHeading || 'PR that builds'} <em>{page?.storyAccent || 'recognition with substance.'}</em></h2>
          {page?.storyBody ? <RichText value={page.storyBody} /> : FALLBACK_STORY.map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}
          <Link className="btn btn-dark" href="/contact" style={{marginTop: 25}}>Start a PR conversation ↗</Link>
        </div>
      </div>
    </section>

    <section className="cpr-services">
      <div className="shell">
        <div className="cpr-services-head">
          <div>
            <div className="cmg-section-no">{page?.capabilitiesEyebrow || '02 — Specialist capability'}</div>
            <p className="muted">{page?.capabilitiesNote || 'A concise summary of the current Cosmetic PR website. Final live service list should be approved by the client before migration.'}</p>
          </div>
          <h2>{page?.capabilitiesHeading || 'WHAT COSMETIC PR BRINGS TO THE TABLE'}</h2>
        </div>
        <div className="cpr-service-index">
          {capabilities.map((item, index) => <div className="cpr-service-line" key={item.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>)}
        </div>
      </div>
    </section>

    <section className="cpr-cases">
      <div className="shell">
        <div className="cpr-cases-head">
          <div>
            <div className="cmg-section-no">{page?.casesEyebrow || '03 — Selected impact'}</div>
            <h2>{page?.casesHeading || 'Proof built through real campaigns.'}</h2>
          </div>
          <Link className="text-link" href="/contact">Discuss your goals ↗</Link>
        </div>
        <div className="cpr-case-grid">
          {cases.map((item) => <article className="cpr-case" key={item.title}>
            <div>
              <small>{item.label}</small>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <b>{item.tags}</b>
          </article>)}
        </div>
      </div>
    </section>

    <section className="cpr-client-voice">
      <div className="shell cpr-client-grid">
        <div>
          <div className="cmg-section-no">{page?.testimonialsEyebrow || '04 — Client perspective'}</div>
          <h2>{page?.testimonialsHeading || 'Trusted because the work delivers.'}</h2>
        </div>
        <div className="cpr-client-list">
          {testimonials.map((item) => <div className="cpr-client-row" key={item.name}>
            <span>{item.name}</span>
            <p>{item.quote}</p>
          </div>)}
        </div>
      </div>
    </section>

    <section className="cpr-publications">
      <div className="shell">
        <div className="cpr-publications-head">
          <div>
            <div className="cmg-section-no">{page?.publicationsEyebrow || '05 — Media relationships'}</div>
            <h2>{page?.publicationsHeading || 'Stories placed where credibility grows.'}</h2>
          </div>
          <p>{page?.publicationsIntro || 'Cosmetic PR connects expert stories with the consumer, beauty, trade, lifestyle and broadcast platforms that shape visibility and trust.'}</p>
        </div>
        <div className="cpr-publication-rail">
          {publications.map((name) => <span key={name}>{name}</span>)}
        </div>
      </div>
    </section>

    <section className="cpr-summary">
      <div className="shell cpr-summary-grid">
        <div className="cpr-summary-copy">
          <div className="cmg-section-no">{page?.summaryEyebrow || '06 — What the legacy site proves'}</div>
          <h2>{page?.summaryHeading || 'A full-site summary, refined into one editorial page.'}</h2>
          {page?.summaryBody ? <RichText value={page.summaryBody} /> : FALLBACK_SUMMARY.map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}
        </div>
        <div className="cpr-summary-points">
          {summaryPoints.map((item) => <div key={item.label}><small>{item.label}</small><b>{item.text}</b></div>)}
        </div>
      </div>
    </section>

    <section className="cmg-home-newsletter">
      <div className="shell cmg-home-newsletter-grid">
        <div>
          <div className="cmg-section-no" style={{color: 'var(--ink)'}}>{page?.newsletterEyebrow || 'Stay connected'}</div>
          <h2>{page?.newsletterHeading || 'PR insight from inside the industry.'}</h2>
        </div>
        <div>
          <p>{page?.newsletterText || 'Follow the latest campaigns, media opportunities, expert perspectives and wider Cosmetic Media Group updates.'}</p>
          <ManagedForm type="newsletter" successMessage="Thank you. You are subscribed.">
            <input type="email" name="email" required placeholder="Your email address" />
            <button type="submit">Subscribe ↗</button>
          </ManagedForm>
        </div>
      </div>
    </section>
  </div>
}
