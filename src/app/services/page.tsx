import Image from 'next/image'
import Link from 'next/link'
import {NewsletterBand} from '@/components/CommonSections'
import {getServices} from '@/lib/content'
import {serviceHref} from '@/lib/links'
import {createMetadata} from '@/lib/metadata'
import {imageAlt, imageUrl} from '@/sanity/lib/image'

export const metadata = createMetadata('Services', 'Connected communications, positioning, production and experiences for ambitious brands and leaders across the global aesthetics industry.', undefined, '/services')

export default async function ServicesPage() {
  const services = await getServices()
  return (
    <div className="page-enter services-editorial-page">
      <section className="services-editorial-hero">
        <div className="shell">
          <div className="crumbs"><Link href="/">Home</Link><span>/</span><span>SERVICES</span></div>
          <div className="services-editorial-title">
            <p>Connected communications, positioning, production and experiences for ambitious brands and leaders across the global aesthetics industry.</p>
            <h1>SERVICES</h1>
          </div>
          <div className="services-editorial-intro">
            <blockquote>Not a collection of isolated deliverables. One editorially minded system for building relevance, reputation and long-term authority.</blockquote>
          </div>
        </div>
      </section>
      <section className="services-editorial-list">
        <div className="shell">
          {services.map((service, index) => (
            <Link className="service-feature" href={serviceHref(service.slug)} key={service.slug}>
              <span className="service-feature-no">{String(index + 1).padStart(2, '0')}</span>
              <h2>{service.title}</h2>
              <div className="service-feature-copy">
                <p>{service.listDescription || service.intro}</p>
                <span className="text-link">{service.listCta || (service.slug === 'pr' ? 'Explore Cosmetic PR ↗' : `Explore ${service.title.toLowerCase()} ↗`)}</span>
              </div>
              <div className="service-feature-image"><Image src={imageUrl(service.image, 700, 500)} alt={imageAlt(service.image, service.title)} width={700} height={500} sizes="(max-width: 980px) 100vw, 33vw" /></div>
            </Link>
          ))}
        </div>
      </section>
      <section className="services-editorial-closing">
        <div className="shell">
          <h2>One idea. Every relevant channel.</h2>
          <div>
            <p>The strongest work rarely sits inside a single service. We connect communications, editorial thinking, production, events and expert positioning around one clear commercial and reputational objective.</p>
            <Link className="btn btn-white" href="/contact">Discuss your brief ↗</Link>
          </div>
        </div>
      </section>
      <NewsletterBand />
    </div>
  )
}
