export function ExternalVideo({url, title}: {url: string; title: string}) {
  const embed = toEmbedUrl(url)
  if (!embed) return <p className="muted">A supported external video URL has not been configured.</p>
  return <div className="external-video"><iframe src={embed} title={title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>
}

function toEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url)
    if (parsed.hostname.includes('youtube.com')) {
      const id = parsed.searchParams.get('v')
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : url
    }
    if (parsed.hostname === 'youtu.be') return `https://www.youtube-nocookie.com/embed/${parsed.pathname.slice(1)}`
    if (parsed.hostname.includes('vimeo.com')) return `https://player.vimeo.com/video/${parsed.pathname.split('/').filter(Boolean).pop()}`
    if (parsed.hostname.includes('mux.com') || parsed.hostname.includes('stream.mux.com')) return url
    return url
  } catch {return null}
}
