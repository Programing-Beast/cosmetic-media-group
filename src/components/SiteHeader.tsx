'use client'

import Image from 'next/image'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useRef, useState} from 'react'

const services = [
  ['PR', '/services/pr'],
  ['Personal Branding', '/services/personal-branding'],
  ['Content Studio', '/services/content-studio'],
  ['Media Training', '/services/media-training'],
  ['Podcast Production', '/services/podcast-production'],
  ['Events', '/services/events']
]

const about = [
  ['About Cosmetic Media Group', '/about'],
  ['Meet the Founder', '/about/founder'],
  ['Media Desk for Journalists', '/media-desk'],
  ['Contact the Team', '/contact']
]

type MenuName = 'about' | 'services' | null

export function SiteHeader() {
  const [open, setOpen] = useState<MenuName>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()

  // Close any open menus when the route changes. React's supported pattern for
  // adjusting state in response to a prop/value change is a guarded update
  // during render, which avoids the extra effect-driven render pass.
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(null)
    setMobileOpen(false)
  }

  function enter(menu: Exclude<MenuName, null>) {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(menu)
  }

  function leave() {
    closeTimer.current = setTimeout(() => setOpen(null), 130)
  }

  return (
    <>
      <header>
        <div className="shell header-inner">
          <Link className="logo logo-image" href="/" aria-label="Cosmetic Media Group home">
            <Image src="/images/logo.png" alt="Cosmetic Media Group" width={263} height={117} priority />
          </Link>
          <nav aria-label="Primary navigation">
            <div className="nav-group" onMouseEnter={() => enter('about')} onMouseLeave={leave}>
              <button className="nav-trigger" type="button" aria-expanded={open === 'about'} onClick={() => setOpen(open === 'about' ? null : 'about')}>About</button>
            </div>
            <div className="nav-group" onMouseEnter={() => enter('services')} onMouseLeave={leave}>
              <button className="nav-trigger" type="button" aria-expanded={open === 'services'} onClick={() => setOpen(open === 'services' ? null : 'services')}>Services</button>
            </div>
            <Link href="/media-hub">Media Hub</Link>
            <Link href="/diamond-awards">Diamond Awards</Link>
            <Link href="/our-brands">Our Brands</Link>
            <Link href="/toolkits">Toolkits</Link>
            <Link href="/membership">Membership</Link>
          </nav>
          <div className="header-actions">
            <Link className="search-btn" href="/media-hub" aria-label="Search Media Hub">⌕</Link>
            <Link className="btn btn-dark header-conversation" href="/contact">Start a conversation <span>↗</span></Link>
            <button className="menu-btn" type="button" onClick={() => setMobileOpen(true)} aria-label="Open menu">☰</button>
          </div>
        </div>
        <MegaMenu name="about" open={open === 'about'} links={about} onEnter={() => enter('about')} onLeave={leave} />
        <MegaMenu name="services" open={open === 'services'} links={services} onEnter={() => enter('services')} onLeave={leave} />
      </header>
      <div className={`mobile-overlay ${mobileOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Mobile navigation">
        <div className="mobile-top">
          <Image className="mobile-logo" src="/images/logo.png" alt="Cosmetic Media Group" width={180} height={80} />
          <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">×</button>
        </div>
        <div className="mobile-links">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <div className="mobile-sub">
            <Link href="/about/founder">Meet the Founder</Link>
            <Link href="/media-desk">Media Desk for Journalists</Link>
          </div>
          <Link href="/services">Services</Link>
          <div className="mobile-sub">{services.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>
          <Link href="/media-hub">Media Hub</Link>
          <Link href="/diamond-awards">Diamond Awards</Link>
          <Link href="/our-brands">Our Brands</Link>
          <Link href="/toolkits">Toolkits</Link>
          <Link href="/membership">Membership</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </>
  )
}

function MegaMenu({name, open, links, onEnter, onLeave}: {name: 'about' | 'services'; open: boolean; links: string[][]; onEnter: () => void; onLeave: () => void}) {
  const isAbout = name === 'about'
  return (
    <div id={`${name}Mega`} className={`mega ${open ? 'open' : ''}`} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <div className="mega-grid">
        <div className="mega-intro">
          <div className="eyebrow">{isAbout ? 'Our story and authority' : 'Integrated communications'}</div>
          <h3>{isAbout ? 'The people and purpose behind the platform.' : 'Build visibility, trust and influence.'}</h3>
          <p>{isAbout ? 'Discover Cosmetic Media Group, meet founder Lucy Hilson and access the dedicated Media Desk for journalists.' : 'A connected offer spanning reputation, profile, content, training, podcasts and experiences.'}</p>
          <Link className="btn btn-white" href={isAbout ? '/about' : '/services'}>{isAbout ? 'Explore About' : 'View all services'} ↗</Link>
        </div>
        <div className="mega-links">
          {links.map(([label, href]) => <Link className="mega-link" key={href} href={href}><span>{label}</span><span>↗</span></Link>)}
        </div>
      </div>
    </div>
  )
}
