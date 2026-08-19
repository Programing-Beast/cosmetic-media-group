'use client'

import Image from 'next/image'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useRef, useState} from 'react'
import type {FooterNavItem, MegaMenuContent, MenuLink, Navigation} from '@/types'

type MenuName = 'about' | 'services' | null

export function SiteHeader({navigation, services}: {navigation: Navigation; services: FooterNavItem[]}) {
  const [open, setOpen] = useState<MenuName>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()

  const aboutLinks = navigation.about.links
  // Use the hand-picked Services list if the editor set one; otherwise list all Service documents.
  // The PR entry routes to the dedicated Cosmetic PR page rather than a competing PR service page (V19 §6).
  const serviceLinks: MenuLink[] = navigation.services.links.length
    ? navigation.services.links
    : services.map((service) => (service.slug === 'pr' ? {label: 'PR / Cosmetic PR', href: '/cosmetic-pr'} : {label: service.title, href: `/services/${service.slug}`}))

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
            <Link href="/cosmetic-pr">Cosmetic PR</Link>
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
        <MegaMenu name="about" open={open === 'about'} content={navigation.about} links={aboutLinks} onEnter={() => enter('about')} onLeave={leave} />
        <MegaMenu name="services" open={open === 'services'} content={navigation.services} links={serviceLinks} onEnter={() => enter('services')} onLeave={leave} />
      </header>
      <div className={`mobile-overlay ${mobileOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Mobile navigation">
        <div className="mobile-top">
          <Image className="mobile-logo" src="/images/logo.png" alt="Cosmetic Media Group" width={180} height={80} />
          <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">×</button>
        </div>
        <div className="mobile-links">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <div className="mobile-sub">{aboutLinks.filter((link) => link.href !== '/about').map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</div>
          <Link href="/cosmetic-pr">Cosmetic PR</Link>
          <Link href="/services">Services</Link>
          <div className="mobile-sub">{serviceLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</div>
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

function MegaMenu({name, open, content, links, onEnter, onLeave}: {name: 'about' | 'services'; open: boolean; content: MegaMenuContent; links: MenuLink[]; onEnter: () => void; onLeave: () => void}) {
  return (
    <div id={`${name}Mega`} className={`mega ${open ? 'open' : ''}`} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <div className="mega-grid">
        <div className="mega-intro">
          {content.eyebrow && <div className="eyebrow">{content.eyebrow}</div>}
          {content.heading && <h3>{content.heading}</h3>}
          {content.text && <p>{content.text}</p>}
          {content.ctaLabel && content.ctaHref && <Link className="btn btn-white" href={content.ctaHref}>{content.ctaLabel} ↗</Link>}
        </div>
        <div className="mega-links">
          {links.map((link) => <Link className="mega-link" key={link.href} href={link.href}><span>{link.label}</span><span>↗</span></Link>)}
        </div>
      </div>
    </div>
  )
}
