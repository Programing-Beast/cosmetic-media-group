import Link from 'next/link'
import {NewsletterBand, PageHero} from '@/components/CommonSections'
import {getServices} from '@/lib/content'
import {createMetadata} from '@/lib/metadata'
import {imageAlt, imageUrl} from '@/sanity/lib/image'

export const metadata = createMetadata('Services', 'Integrated communications spanning PR, personal branding, content, media training, podcasts and events.', undefined, '/services')

export default async function ServicesPage() {
  const services = await getServices()
  return <div className="page-enter"><PageHero title="Integrated expertise." accent="One clear objective." intro="Reputation, profile, production, training, audio and experiences brought together around the outcome that matters most." crumbs={[{label: 'Home', href: '/'}, {label: 'Services'}]} /><section><div className="shell"><div className="service-overview-grid">{services.map((service, index) => <Link className="service-tile" href={`/services/${service.slug}`} key={service.slug}><div><div className="service-tags">{String(index + 1).padStart(2, '0')} / {service.eyebrow}</div><h3>{service.title}</h3><p>{service.intro}</p></div><div className="story-image" style={{height: 150}}><img src={imageUrl(service.image, 700, 360)} alt={imageAlt(service.image, service.title)} /></div><b>Explore the service ↗</b></Link>)}</div></div></section><section className="services-editorial-closing"><div className="shell"><h2>One idea. Every relevant channel.</h2><div><p>The strongest work rarely sits inside a single service. We connect communications, editorial thinking, production, events and expert positioning around one clear commercial and reputational objective.</p><Link className="btn btn-white" href="/contact">Discuss your brief ↗</Link></div></div></section><NewsletterBand /></div>
}
