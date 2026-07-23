import Link from 'next/link'
import type {SiteSettings} from '@/types'

export function SiteFooter({settings}: {settings: SiteSettings}) {
  return (
    <footer>
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-wordmark">COSMETIC<br /><span>MEDIA GROUP</span></div>
            <h2>{settings.tagline}</h2>
            <p>{settings.description}</p>
          </div>
          <div className="footer-col"><h4>Company</h4><Link href="/about">About</Link><Link href="/about/founder">Meet the Founder</Link><Link href="/media-hub">Media Hub</Link><Link href="/diamond-awards">Diamond Awards</Link><Link href="/our-brands">Our Brands</Link><Link href="/membership">Membership</Link></div>
          <div className="footer-col"><h4>Services</h4><Link href="/services/pr">PR</Link><Link href="/services/personal-branding">Personal Branding</Link><Link href="/services/content-studio">Content Studio</Link><Link href="/services/media-training">Media Training</Link><Link href="/services/podcast-production">Podcast Production</Link><Link href="/services/events">Events</Link></div>
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
