'use client'

import {usePathname} from 'next/navigation'
import {SiteHeader} from './SiteHeader'
import {SiteFooter} from './SiteFooter'
import type {SiteSettings} from '@/types'

export function SiteChrome({children, settings}: {children: React.ReactNode; settings: SiteSettings}) {
  const pathname = usePathname()
  if (pathname.startsWith('/studio')) return <>{children}</>
  return <><SiteHeader /><main>{children}</main><SiteFooter settings={settings} /></>
}
