'use client'

import {useMemo, useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'

export type VideoCard = {
  slug: string
  title: string
  category?: string
  img: string
  alt: string
}

export function VideoGallery({cards}: {cards: VideoCard[]}) {
  const categories = useMemo(() => {
    const seen: string[] = []
    for (const card of cards) {
      if (card.category && !seen.includes(card.category)) seen.push(card.category)
    }
    return seen
  }, [cards])

  const [active, setActive] = useState('all')
  const visible = useMemo(
    () => (active === 'all' ? cards : cards.filter((card) => card.category === active)),
    [active, cards]
  )

  return (
    <div>
      {categories.length > 1 && (
        <div className="filter-bar">
          <button type="button" className={`filter-chip ${active === 'all' ? 'active' : ''}`} onClick={() => setActive('all')}>All</button>
          {categories.map((category) => (
            <button key={category} type="button" className={`filter-chip ${active === category ? 'active' : ''}`} onClick={() => setActive(category)}>{category}</button>
          ))}
        </div>
      )}
      <div className="video-gallery-grid" style={{marginTop: categories.length > 1 ? 28 : 8}}>
        {visible.map((card) => (
          <Link className="video-card" href={`/video/${card.slug}`} key={card.slug}>
            <div className="story-image">
              <Image src={card.img} alt={card.alt} width={760} height={480} sizes="(max-width: 760px) 100vw, 33vw" />
            </div>
            <h3>{card.title}</h3>
            {card.category && <div className="story-meta">{card.category}</div>}
          </Link>
        ))}
        {visible.length === 0 && <p className="muted">No videos in this category yet.</p>}
      </div>
    </div>
  )
}
