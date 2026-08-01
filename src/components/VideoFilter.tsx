'use client'

import {useMemo, useState} from 'react'
import {VideoCard, type VideoCardData} from './VideoCard'

const CHIPS: Array<{label: string; value: string}> = [
  {label: 'All', value: 'all'},
  {label: 'Interviews', value: 'interview'},
  {label: 'Awards', value: 'award'}
]

export function VideoFilter({cards}: {cards: VideoCardData[]}) {
  const [active, setActive] = useState('all')
  const visible = useMemo(
    () => (active === 'all' ? cards : cards.filter((c) => (c.category || '').toLowerCase().includes(active))),
    [active, cards]
  )

  return (
    <>
      <div className="work-filter">
        {CHIPS.map((chip) => (
          <button
            key={chip.value}
            type="button"
            className={`filter-chip ${active === chip.value ? 'active' : ''}`}
            onClick={() => setActive(chip.value)}
          >
            {chip.label}
          </button>
        ))}
      </div>
      {visible.length ? (
        <div className="work-grid">
          {visible.map((card) => (
            <VideoCard key={card.slug} {...card} />
          ))}
        </div>
      ) : (
        <p className="muted">No videos in this category yet.</p>
      )}
    </>
  )
}
