import Image from 'next/image'
import Link from 'next/link'

export type VideoCardData = {
  slug: string
  title: string
  category?: string
  img: string
  alt: string
}

export function VideoCard({slug, title, category, img, alt}: VideoCardData) {
  return (
    <Link className="work-card" href={`/video/${slug}`}>
      {/* aspect-ratio box reserves height before load -> no layout shift */}
      <div className="work-card-media">
        <Image src={img} alt={alt} width={768} height={432} sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw" />
      </div>
      <h3 className="work-card-title">{title}</h3>
      {category && <div className="work-card-cat">{category}</div>}
    </Link>
  )
}
