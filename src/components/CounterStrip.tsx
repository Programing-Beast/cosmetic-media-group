'use client'

import {useEffect, useRef, useState} from 'react'
import type {Stat} from '@/types'

// Docx §4: the final figure must exist in the rendered HTML — JavaScript only
// provides the visual count-up. The server (and no-JS clients) render the real
// value; the animation runs once on scroll-into-view unless motion is reduced.
export function CounterStrip({stats}: {stats: Stat[]}) {
  const ref = useRef<HTMLDivElement>(null)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(([entry]) => {if (entry.isIntersecting) {setAnimating(true); observer.disconnect()}}, {threshold: 0.35})
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className="cmg-stat-rail">{stats.map((stat) => <Counter key={stat.label} stat={stat} animating={animating} />)}</div>
}

function Counter({stat, animating}: {stat: Stat; animating: boolean}) {
  const [value, setValue] = useState<number | null>(null)
  useEffect(() => {
    if (!animating || stat.numericValue === undefined) return
    const duration = 1450
    const start = performance.now()
    let raf = 0
    const frame = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(progress < 1 ? Math.round((stat.numericValue || 0) * eased) : null)
      if (progress < 1) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [animating, stat.numericValue])

  // value === null → the real figure (server-rendered and after the animation);
  // during the count-up the suffix is withheld until the final frame, as in V19.
  const display = stat.numericValue === undefined || value === null ? stat.value : value.toLocaleString('en-GB')
  return <div className="cmg-stat-item"><strong className="cmg-stat-value">{display}</strong><span>{stat.label}</span>{stat.note && <small>{stat.note}</small>}</div>
}
