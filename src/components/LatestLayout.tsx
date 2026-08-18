'use client'

import {useEffect, useRef} from 'react'

// Latest from CMG (docx §5 / CHANGES 01–03): the left feature must end exactly level
// with the bottom of the second 16:9 card on the right. The right column sizes itself
// from its 16:9 cards; the feature height is measured from the rendered right stack.
// Measurement runs on mount, media load and real resizes only — never continuously.
export function LatestLayout({children}: {children: React.ReactNode}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const feature = root.querySelector<HTMLElement>('.cmg-feature-story')
    const side = root.querySelector<HTMLElement>('.cmg-side-stories')
    if (!feature || !side) return

    const sync = () => {
      // Below the desktop breakpoint the layout stacks naturally.
      if (window.innerWidth <= 1100) {
        feature.style.height = ''
        return
      }
      feature.style.height = ''
      const cards = Array.from(side.querySelectorAll<HTMLElement>('.cmg-side-story'))
      if (cards.length < 2) return
      const styles = getComputedStyle(side)
      const gap = parseFloat(styles.rowGap || styles.gap || '0') || 0
      const target = Math.round(cards.reduce((sum, card) => sum + card.getBoundingClientRect().height, 0) + gap * (cards.length - 1))
      if (target > 0) feature.style.height = `${target}px`
    }

    sync()
    const observer = new ResizeObserver(sync)
    observer.observe(side)
    root.querySelectorAll('img').forEach((img) => {
      if (!img.complete) img.addEventListener('load', sync, {once: true})
    })
    window.addEventListener('resize', sync)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', sync)
    }
  }, [])

  return <div className="cmg-media-layout" ref={ref}>{children}</div>
}
