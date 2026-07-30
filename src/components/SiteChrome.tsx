'use client'

import {usePathname} from 'next/navigation'
import {SiteHeader} from './SiteHeader'
import {SiteFooter} from './SiteFooter'
import {CookieConsent} from './CookieConsent'
import {Analytics} from './Analytics'
import type {FooterNavItem, Navigation, SiteSettings} from '@/types'

export function SiteChrome({children, settings, services, navigation}: {children: React.ReactNode; settings: SiteSettings; services: FooterNavItem[]; navigation: Navigation}) {
  const pathname = usePathname()
  if (pathname.startsWith('/studio')) return <>{children}</>
  return (
    <>
      <SiteHeader navigation={navigation} services={services} />
      <main>{children}</main>
      <SiteFooter settings={settings} services={services} />
      <CookieConsent />
      <Analytics />
    </>
  )
}
