import type {Metadata} from 'next'
import './globals.css'
import {SiteChrome} from '@/components/SiteChrome'
import {getNavigation, getServices, getSiteSettings} from '@/lib/content'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {default: 'Cosmetic Media Group', template: '%s — Cosmetic Media Group'},
  description: 'Where aesthetics meets influence.'
}

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  const [settings, services, navigation] = await Promise.all([getSiteSettings(), getServices(), getNavigation()])
  const footerServices = services.map((service) => ({slug: service.slug, title: service.title}))
  // `data-scroll-behavior` opts into Next's smooth-scroll suppression: without it the router's
  // scroll-to-top on navigation inherits `html{scroll-behavior:smooth}` from globals.css and
  // visibly animates the page upward during every route change.
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <SiteChrome settings={settings} services={footerServices} navigation={navigation}>{children}</SiteChrome>
      </body>
    </html>
  )
}
