'use client'

import {useEffect, useRef, useState} from 'react'
import type {Stat} from '@/types'

export function CounterStrip({stats}: {stats: Stat[]}) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const raf = requestAnimationFrame(() => setActive(true))
      return () => cancelAnimationFrame(raf)
    }
    const observer = new IntersectionObserver(([entry]) => {if (entry.isIntersecting) {setActive(true); observer.disconnect()}}, {threshold: 0.35})
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className="cmg-stat-rail">{stats.map((stat) => <Counter key={stat.label} stat={stat} active={active} />)}</div>
}

function Counter({stat, active}: {stat: Stat; active: boolean}) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active || stat.numericValue === undefined) return
    const duration = 1450
    const start = performance.now()
    let raf = 0
    const frame = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round((stat.numericValue || 0) * eased))
      if (progress < 1) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [active, stat.numericValue])

  const display = stat.numericValue === undefined ? stat.value : `${value.toLocaleString('en-GB')}${active ? stat.suffix || '' : ''}`
  return <div className="cmg-stat-item"><strong className="cmg-stat-value">{display}</strong><span>{stat.label}</span>{stat.note && <small>{stat.note}</small>}</div>
}
