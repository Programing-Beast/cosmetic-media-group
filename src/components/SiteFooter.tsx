import Link from 'next/link'
import type {FooterNavItem, SiteSettings} from '@/types'

export function SiteFooter({settings, services}: {settings: SiteSettings; services: FooterNavItem[]}) {
  return (
    <footer>
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-wordmark">COSMETIC<br /><span>MEDIA GROUP</span></div>
            <h2>{settings.tagline}</h2>
            <p>{settings.description}</p>
            {(settings.email || settings.phone || settings.locations) && (
              <div className="footer-contact">
                {settings.email && <a href={`mailto:${settings.email}`}>{settings.email}</a>}
                {settings.phone && <a href={`tel:${settings.phone.replace(/[^+\d]/g, '')}`}>{settings.phone}</a>}
                {settings.locations && <span>{settings.locations}</span>}
              </div>
            )}
          </div>
          <div className="footer-col"><h4>Company</h4><Link href="/about">About</Link><Link href="/about/founder">Meet the Founder</Link><Link href="/media-hub">Media Hub</Link><Link href="/diamond-awards">Diamond Awards</Link><Link href="/our-brands">Our Brands</Link><Link href="/membership">Membership</Link></div>
          <div className="footer-col"><h4>Services</h4>{services.length ? services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`}>{service.title}</Link>) : <Link href="/services">All services</Link>}</div>
          <div className="footer-col"><h4>Resources</h4><Link href="/media-desk">Media Desk for Journalists</Link><Link href="/toolkits">Toolkits</Link><Link href="/media-hub">Articles & interviews</Link><Link href="/toolkits">Research & reports</Link><Link href="/contact">Contact</Link>{settings.socialLinks?.map((link) => <a key={link.platform} href={link.url}>{link.platform}</a>)}</div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Cosmetic Media Group.</span>
          {settings.legalLinks?.length ? (
            <span className="footer-legal">
              {settings.legalLinks.map((link, index) => (
                <span key={link.label}>{index > 0 && ' · '}<a href={link.url}>{link.label}</a></span>
              ))}
            </span>
          ) : (
            <span>Privacy · Terms · Accessibility</span>
          )}
        </div>
      </div>
    </footer>
  )
}
