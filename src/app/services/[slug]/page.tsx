import {notFound} from 'next/navigation'
import Link from 'next/link'
import {NewsletterBand, PageHero} from '@/components/CommonSections'
import {getService, getServices} from '@/lib/content'
import {createMetadata} from '@/lib/metadata'
import {imageAlt, imageUrl} from '@/sanity/lib/image'

export async function generateStaticParams() {
  const services = await getServices()
  return services.map((service) => ({slug: service.slug}))
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const service = await getService(slug)
  if (!service) return {}
  return createMetadata(service.title, service.intro, service.seo, `/services/${slug}`)
}

export default async function ServicePage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const [service, services] = await Promise.all([getService(slug), getServices()])
  if (!service) notFound()
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3)
  return <div className="page-enter"><div className="page-hero"><div className="shell page-hero split"><div><div className="crumbs"><Link href="/">Home</Link><span>/</span><Link href="/services">SERVICES</Link><span>/</span><span>{service.title}</span></div><div className="eyebrow" style={{marginTop: 52}}>{service.eyebrow}</div><h1>{service.title}</h1><p className="intro">{service.intro}</p><Link className="btn btn-dark" href="/contact" style={{marginTop: 28}}>Discuss {service.title} ↗</Link></div><div className="page-hero-photo"><img src={imageUrl(service.image, 1000, 850)} alt={imageAlt(service.image, service.title)} /></div></div></div><section><div className="shell service-detail"><div><h2>Strategic thinking, tailored to your ambition.</h2><p>{service.body}</p><div className="service-outcomes"><h3>The outcomes we work towards.</h3><div className="service-outcome-grid">{service.outcomes.map((outcome, index) => <div className="service-outcome-card" key={outcome}><small>Outcome {String(index + 1).padStart(2, '0')}</small><b>{outcome}</b></div>)}</div></div><div className="deliverables" style={{marginTop: 45}}>{service.deliverables.map((deliverable, index) => <div className="deliverable" key={deliverable}><span>{String(index + 1).padStart(2, '0')}</span><div>{deliverable}</div></div>)}</div></div><aside className="side-card"><div className="eyebrow">Start a conversation</div><h3>Ready to shape how the industry sees you?</h3><p>Tell us where you are now, where you want to go and the outcome that matters most.</p><Link className="btn btn-pink" href="/contact">Discuss your brief ↗</Link></aside></div></section><section style={{background: '#fff'}}><div className="shell"><div className="section-head"><div><div className="eyebrow">Connected expertise</div><h2>Explore another service.</h2></div></div><div className="service-overview-grid">{related.map((item) => <Link className="service-tile" href={`/services/${item.slug}`} key={item.slug}><div><div className="service-tags">{item.eyebrow}</div><h3>{item.title}</h3><p>{item.intro}</p></div><b>Discover more ↗</b></Link>)}</div></div></section><NewsletterBand /></div>
}
