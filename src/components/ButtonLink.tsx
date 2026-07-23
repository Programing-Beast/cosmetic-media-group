import Link from 'next/link'
import type {CTA} from '@/types'

export function ButtonLink({label, href, style = 'dark'}: CTA) {
  const className = style === 'media' ? 'btn btn-media' : `btn btn-${style}`
  const external = /^https?:\/\//.test(href)
  if (external) {
    return <a className={className} href={href} target="_blank" rel="noreferrer">{label}</a>
  }
  return <Link className={className} href={href}>{label}</Link>
}
