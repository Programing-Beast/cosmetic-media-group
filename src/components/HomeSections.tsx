import Image from 'next/image'
import Link from 'next/link'
import {CounterStrip} from './CounterStrip'
import {ManagedForm} from './Form'
import type {Article, Brand, HomeSectionType, Homepage, Service, Toolkit} from '@/types'
import {imageAlt, imageUrl} from '@/sanity/lib/image'
import {RichText} from './RichText'

export function HomeSections({homepage, services, articles, brands, toolkits}: {homepage: Homepage; services: Service[]; articles: Article[]; brands: Brand[]; toolkits: Toolkit[]}) {
  const renderers: Record<HomeSectionType, React.ReactNode> = {
    story: <Story key="story" homepage={homepage} />,
    credibility: <Credibility key="credibility" homepage={homepage} />,
    founderTeaser: <FounderTeaser key="founderTeaser" />,
    trustedBrands: <TrustedBrands key="trustedBrands" logos={homepage.clientLogos} />,
    services: <ServicesSection key="services" services={services} />,
    mediaHub: <MediaHubSection key="mediaHub" articles={articles} />,
    mediaDesk: <MediaDeskTeaser key="mediaDesk" />,
    awardsSpotlight: <AwardsSpotlight key="awardsSpotlight" />,
    brands: <BrandsSection key="brands" brands={brands} />,
    resourcesMembership: <ResourcesMembership key="resourcesMembership" toolkits={toolkits} />,
    newsletter: <Newsletter key="newsletter" />,
    contact: <ContactSpread key="contact" />
  }
  return <>{homepage.sectionOrder.map((section) => renderers[section])}</>
}

function Story({homepage}: {homepage: Homepage}) {
  const heading = homepage.story?.heading || 'More than PR.'
  const [before, accent] = heading.includes('PR') ? ['More than ', 'PR.'] : [heading, '']
  return <section className="cmg-story-vision"><div className="shell cmg-story-grid"><aside className="cmg-story-side"><span>01 — The evolution</span><h3>From specialist PR to an industry platform.</h3><p>Built on more than 20 years of communications experience and designed for the way modern authority is created.</p><Link className="text-link" href="/about">Read our full story ↗</Link></aside><div className="cmg-story-copy"><h2>{before}{accent && <em>{accent}</em>}</h2><p className="opening">{homepage.story?.opening}</p><div className="story-columns"><RichText value={homepage.story?.body} /></div><div className="cmg-trust-line"><b>Seen. Trusted. Remembered.</b><span>Our measure of meaningful influence</span></div></div></div></section>
}

function Credibility({homepage}: {homepage: Homepage}) {
  const facts = homepage.credibilityFacts || []
  return <section className="cmg-credibility" id="credibility"><div className="shell"><div className="cmg-credibility-head"><div><div className="cmg-section-no">By the numbers</div><h2>Authority built over two decades.</h2></div><p className="cmg-credibility-note">Selected figures and publication names must be confirmed before launch.</p></div><CounterStrip stats={homepage.stats} /><div className="cmg-credibility-facts">{facts.map(({label, title}) => <div className="cmg-credibility-fact" key={`${label}-${title}`}><small>{label}</small><b>{title}</b></div>)}</div></div><div className="cmg-featured-marquee"><div className="shell cmg-marquee-label"><span>As featured in</span><small>Publication list to be confirmed</small></div><div className="cmg-logo-marquee" aria-label="Selected media publications"><div className="cmg-logo-track"><PublicationSet publications={homepage.publications} /><PublicationSet publications={homepage.publications} hidden /></div></div></div></section>
}

function PublicationSet({publications, hidden}: {publications: string[]; hidden?: boolean}) {
  return <div className="cmg-logo-set" aria-hidden={hidden}>{publications.map((publication, index) => <span key={`${publication}-${index}`} className={publicationClass(publication)}>{publication}</span>)}</div>
}

function publicationClass(name: string) {
  const lower = name.toLowerCase()
  if (lower.includes('vogue')) return 'cmg-logo-vogue'
  if (lower.includes('grazia')) return 'cmg-logo-grazia'
  if (lower.includes('bazaar')) return 'cmg-logo-bazaar'
  if (lower.includes('hello')) return 'cmg-logo-hello'
  if (lower.includes('cosmo')) return 'cmg-logo-cosmo'
  if (lower.includes('marie')) return 'cmg-logo-marie'
  if (lower.includes('mail')) return 'cmg-logo-mail'
  return 'cmg-logo-times'
}

function FounderTeaser() {
  return <section className="cmg-founder-teaser"><div className="shell cmg-founder-teaser-grid"><Link className="cmg-founder-teaser-image" href="/about/founder"><Image src="/images/founder.jpg" alt="Lucy Hilson, founder of Cosmetic Media Group" width={900} height={1100} sizes="(max-width: 980px) 100vw, 40vw" /><span>Founder / speaker / commentator</span></Link><div className="cmg-founder-teaser-copy"><div className="cmg-section-no">02 — Founder perspective</div><h2>Built from experience. <em>Expanded through vision.</em></h2><p>Lucy Hilson has spent more than 20 years helping aesthetic professionals build trusted reputations. Her personal experience, media insight and industry point of view sit at the heart of Cosmetic Media Group.</p><div className="cmg-founder-teaser-actions"><Link className="btn btn-dark" href="/about/founder">Meet Lucy Hilson ↗</Link><Link className="btn btn-media" href="/media-desk">Media enquiries ↗</Link></div></div></div></section>
}

function TrustedBrands({logos}: {logos: Homepage['clientLogos']}) {
  return <section className="cmg-trusted"><div className="shell"><div className="cmg-trusted-head"><h2>Trusted by the industry&apos;s leading brands.</h2><p>Approved client and partner logos can be uploaded and reordered in Sanity before launch.</p></div><div className="cmg-logo-placeholder-grid">{logos.map((logo) => <div className="cmg-logo-placeholder" key={logo.name}>{logo.image ? <Image src={imageUrl(logo.image, 320)} alt={imageAlt(logo.image, logo.name)} width={160} height={60} sizes="150px" /> : <b>{logo.name}</b>}</div>)}</div></div></section>
}

function ServicesSection({services}: {services: Service[]}) {
  return <section className="cmg-services"><div className="shell"><div className="cmg-services-head"><div className="cmg-services-kicker">03 — Integrated communications</div><h2>SERVICES</h2></div><div className="cmg-services-intro"><p>One connected team spanning reputation, profile, production, training, audio and experiences — built around a single strategic objective.</p></div><div className="cmg-service-list">{services.map((service, index) => <Link className="cmg-service-row" href={`/services/${service.slug}`} key={service.slug}><span className="no">{String(index + 1).padStart(2, '0')}</span><h3>{service.title}</h3><p>{service.intro}</p><span className="go">↗</span></Link>)}</div><div className="cmg-services-foot"><small>Strategy / narrative / production / amplification</small><Link className="btn btn-white" href="/services">Explore all services ↗</Link></div></div></section>
}

function MediaHubSection({articles}: {articles: Article[]}) {
  const [featured, ...rest] = articles
  const side = rest.slice(0, 2)
  if (!featured) return null
  return <section className="cmg-media"><div className="shell"><div className="cmg-media-title"><div><div className="cmg-section-no">04 — Latest from the Media Hub</div><p>Articles, interviews, videos, podcasts, news, trends, opinions and expert intelligence.</p></div><h2>Discover the people and ideas moving aesthetics forward.</h2></div><div className="cmg-media-layout"><Link className="cmg-feature-story" href={`/media-hub/${featured.slug}`}><Image src={imageUrl(featured.image, 900, 700)} alt={imageAlt(featured.image, featured.title)} width={900} height={700} sizes="(max-width: 980px) 100vw, 55vw" /><div className="cmg-feature-copy"><div><small>Latest {featured.format || 'article'} / {featured.category}</small><h3>{featured.title}.</h3><p>{featured.excerpt}</p></div><b>Read the feature ↗</b></div></Link><div className="cmg-side-stories">{side.map((article) => <Link className="cmg-side-story" href={`/media-hub/${article.slug}`} key={article.slug}><Image src={imageUrl(article.image, 700, 420)} alt={imageAlt(article.image, article.title)} width={700} height={420} sizes="(max-width: 980px) 100vw, 45vw" /><div><small>{article.format || article.category}</small><h4>{article.title}</h4></div></Link>)}</div></div><div className="cmg-media-categories">{['All stories', 'Articles', 'Interviews', 'Videos', 'Podcasts', 'Industry news', 'Opinion', 'Expert content'].map((item) => <Link href="/media-hub" key={item}>{item}</Link>)}</div></div></section>
}

function MediaDeskTeaser() {
  return <section className="cmg-media-desk-teaser"><div className="shell cmg-media-desk-teaser-grid"><div><div className="cmg-section-no">05 — Media desk</div><h2>On deadline? Find the right expert faster.</h2></div><div><p>Journalists can request expert comments, interviews, case studies and background information from trusted voices across the aesthetics industry.</p><Link className="btn btn-dark" href="/media-desk">Visit the media desk ↗</Link></div></div></section>
}

function AwardsSpotlight() {
  return <section className="cmg-awards-spotlight"><div className="shell cmg-awards-grid"><div className="cmg-awards-copy"><div className="cmg-section-no" style={{color: '#e8d6b4'}}>06 — Diamond Awards spotlight</div><h2>A legacy of excellence. <em>A new chapter in Dubai.</em></h2><p>Established in the UK in 2013, The Diamond Awards were created to champion safety, ethics and excellence. In 2027, the internationally recognised platform arrives in Dubai.</p><div className="cmg-awards-meta"><span>Atlantis The Royal</span><span>Palm Jumeirah</span><span>Saturday 10 April 2027</span></div><Link className="btn btn-white" href="/diamond-awards" style={{marginTop: 30}}>Discover the Dubai edition ↗</Link></div><Link className="cmg-awards-art" href="/diamond-awards" aria-label="Explore The Diamond Awards Dubai" /></div></section>
}

function BrandsSection({brands}: {brands: Brand[]}) {
  return <section className="cmg-brands"><div className="shell"><div className="cmg-brands-head"><div><div className="cmg-section-no">07 — Our brands</div><h2>Distinct platforms. One clear industry purpose.</h2></div><Link className="text-link" href="/our-brands">Explore the ecosystem ↗</Link></div><div className="cmg-brand-list">{brands.slice(0, 4).map((brand, index) => <Link className="cmg-brand-line" href={brand.href || '/our-brands'} key={brand.slug}><span>{String(index + 1).padStart(2, '0')} / {brand.type}</span><h3>{brand.title}</h3><p>{brand.description}</p><b>↗</b></Link>)}</div></div></section>
}

function ResourcesMembership({toolkits}: {toolkits: Toolkit[]}) {
  return <section className="cmg-resources"><div className="shell cmg-resources-grid"><div className="cmg-resource-feature"><div className="cmg-resource-intro"><div className="cmg-section-no cmg-section-no-stacked"><span>Toolkits & research</span><b>08</b></div><div className="cmg-resource-copy-row"><div><h2>Knowledge designed to be used.</h2><p>Downloadable guides, planning tools, research reports and annual editorial publications — with free and future member-only access.</p></div><Link className="text-link" href="/toolkits">Browse the library ↗</Link></div></div><div className="cmg-resource-covers">{toolkits.slice(0, 3).map((toolkit) => <Link className="cmg-resource-cover" href="/toolkits" key={toolkit.slug}><small>{toolkit.type} / {toolkit.access}</small><b>{toolkit.title}</b><span>Explore ↗</span></Link>)}</div></div><div className="cmg-membership-feature"><div><div className="cmg-section-no" style={{color: '#fff'}}>09 — Membership / Coming soon</div><h2>Closer to the conversation.</h2><p>Register your interest for future access to exclusive reports, toolkits, events, courses and editorial content.</p><ManagedForm type="membership" className="homepage-waitlist" successMessage="Thank you. You have joined the membership waiting list."><input type="email" name="email" required placeholder="Your email address" /><button type="submit">Join waiting list ↗</button></ManagedForm></div><Link className="text-link" style={{color: '#fff'}} href="/membership">Explore future membership ↗</Link></div></div></section>
}

function Newsletter() {
  return <section className="cmg-home-newsletter"><div className="shell cmg-home-newsletter-grid"><div><div className="cmg-section-no" style={{color: 'var(--ink)'}}>10 — Industry updates</div><h2>Stay close to what matters.</h2></div><div><p>Receive selected articles, interviews, industry intelligence, event news and new resources from Cosmetic Media Group.</p><ManagedForm type="newsletter" successMessage="Thank you. You are subscribed to industry updates."><input type="email" name="email" required placeholder="Your email address" /><button type="submit">Subscribe ↗</button></ManagedForm></div></div></section>
}

function ContactSpread() {
  return <section className="cmg-contact"><div className="shell"><div className="cmg-contact-spread"><div className="cmg-contact-copy"><div><div className="cmg-section-no">11 — Start a conversation</div><h2>Shape what the industry talks about next.</h2><p>Whether you are building a brand, a profile, an audience or a platform, Cosmetic Media Group brings strategy, content and influence together.</p></div><Link className="btn btn-white" href="/contact">Contact the team ↗</Link></div><div className="cmg-contact-image"><Image src="/images/event.jpg" alt="Cosmetic Media Group editorial studio" width={1200} height={800} sizes="(max-width: 980px) 100vw, 45vw" /></div></div></div></section>
}
