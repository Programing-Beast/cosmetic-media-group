import {VideoCard, type VideoCardData} from './VideoCard'

export type {VideoCardData}

export function VideoGallery({cards}: {cards: VideoCardData[]}) {
  if (!cards.length) return <p className="muted">No videos yet.</p>
  return (
    <div className="work-grid">
      {cards.map((card) => (
        <VideoCard key={card.slug} {...card} />
      ))}
    </div>
  )
}
