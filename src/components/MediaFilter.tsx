'use client'

import Image from 'next/image'
import Link from 'next/link'
import {useMemo, useState} from 'react'

export type MediaCard = {
  slug: string
  title: string
  excerpt: string
  category: string
  format?: string
  img: string
  alt: string
}

const CHIPS: Array<{label: string; value: string}> = [
  {label: 'All', value: 'all'},
  {label: 'Articles', value: 'article'},
  {label: 'Interviews', value: 'interview'},
  {label: 'Videos', value: 'video'},
  {label: 'Podcasts', value: 'podcast'},
  {label: 'Industry News', value: 'news'},
  {label: 'Trends', value: 'report'},
  {label: 'Opinion', value: 'opinion'}
]

// Card eyebrow: show "FORMAT / CATEGORY", but collapse to a single label when
// they are the same word (avoids "INTERVIEW / INTERVIEW").
function metaLabel(card: MediaCard): string {
  const left = (card.format || card.category || '').trim()
  const right = (card.category || '').trim()
  if (!right) return left
  return left.toLowerCase() === right.toLowerCase() ? right : `${left} / ${right}`
}

export function MediaFilter({cards}: {cards: MediaCard[]}) {
  const [active, setActive] = useState('all')
  const visible = useMemo(() => (active === 'all' ? cards : cards.filter((c) => c.format === active)), [active, cards])

  return (
    <>
      <div className="filter-bar">
        {CHIPS.map((chip) =>
          // "Videos" isn't an in-place filter — it opens the dedicated video gallery.
          chip.value === 'video' ? (
            <Link key={chip.value} href="/video" className="filter-chip">
              {chip.label}
            </Link>
          ) : (
            <button
              key={chip.value}
              type="button"
              className={`filter-chip ${active === chip.value ? 'active' : ''}`}
              onClick={() => setActive(chip.value)}
            >
              {chip.label}
            </button>
          )
        )}
      </div>
      <div className="media-grid">
        {visible.length ? (
          visible.map((card) => (
            <Link className="media-card" href={`/media-hub/${card.slug}`} key={card.slug}>
              <div className="story-image"><Image src={card.img} alt={card.alt} width={700} height={440} sizes="(max-width: 760px) 100vw, 33vw" /></div>
              <div className="story-meta" style={{marginTop: 17}}>{metaLabel(card)}</div>
              <h3>{card.title}</h3>
              <p>{card.excerpt}</p>
            </Link>
          ))
        ) : (
          <p className="muted">No stories in this category yet.</p>
        )}
      </div>
    </>
  )
}
