import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@/types'

export function RichText({value}: {value?: PortableTextBlock[]}) {
  if (!value?.length) return null
  return <PortableText value={value} components={{
    block: {
      h2: ({children}) => <h2>{children}</h2>,
      h3: ({children}) => <h3>{children}</h3>,
      blockquote: ({children}) => <blockquote className="quote">{children}</blockquote>
    },
    marks: {link: ({children, value}) => <a href={value?.href} target={value?.blank ? '_blank' : undefined} rel={value?.blank ? 'noreferrer' : undefined}>{children}</a>}
  }} />
}
