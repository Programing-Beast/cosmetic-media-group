'use client'

import {useEffect, useRef, useState} from 'react'
import {usePathname} from 'next/navigation'

// Thin YouTube/GitHub-style loading bar shown across the very top of the
// viewport while navigating between pages. App Router has no route-change
// start event, so we start the bar when an internal link is clicked and
// complete it when the pathname actually changes.
export function TopProgressBar() {
  // Keep the bar on screen long enough to be clearly seen, even when the next
  // page loads almost instantly (static/cached routes).
  const MIN_VISIBLE = 1000

  const pathname = usePathname()
  const [progress, setProgress] = useState(0) // 0–100
  const [active, setActive] = useState(false)
  const navigating = useRef(false)
  const startedAt = useRef(0)
  const trickle = useRef<ReturnType<typeof setInterval> | null>(null)
  const hide = useRef<ReturnType<typeof setTimeout> | null>(null)

  function clearTimers() {
    if (trickle.current) {
      clearInterval(trickle.current)
      trickle.current = null
    }
    if (hide.current) {
      clearTimeout(hide.current)
      hide.current = null
    }
  }

  function start() {
    if (navigating.current) return
    navigating.current = true
    startedAt.current = Date.now()
    clearTimers()
    setActive(true)
    setProgress(18)
    // Ease toward 90% while the next page loads.
    trickle.current = setInterval(() => {
      setProgress((p) => (p < 90 ? p + (90 - p) * 0.18 : p))
    }, 150)
  }

  function finish() {
    clearTimers()
    setProgress(100)
    hide.current = setTimeout(() => {
      setActive(false)
      setProgress(0)
    }, 320)
  }

  function done() {
    if (!navigating.current) return
    navigating.current = false
    // Guarantee a minimum on-screen time so the bar is actually perceptible.
    const remaining = Math.max(0, MIN_VISIBLE - (Date.now() - startedAt.current))
    if (remaining === 0) {
      finish()
    } else {
      hide.current = setTimeout(finish, remaining)
    }
  }

  // Start the bar on same-origin link clicks that lead to a different page.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      // Runs on the capture phase (below), i.e. before Next's <Link> calls
      // preventDefault() for its client-side navigation — so we must NOT bail
      // on e.defaultPrevented here.
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const anchor = (e.target as HTMLElement | null)?.closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      const target = anchor.getAttribute('target')
      if (!href || (target && target !== '_self')) return
      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return
      let url: URL
      try {
        url = new URL(href, window.location.href)
      } catch {
        return
      }
      if (url.origin !== window.location.origin) return
      if (url.pathname === window.location.pathname && url.search === window.location.search) return
      start()
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  // Complete once the route has changed (no-op on initial mount).
  useEffect(() => {
    done()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => () => clearTimers(), [])

  if (!active && progress === 0) return null

  return (
    <div className="top-progress" aria-hidden="true">
      <div
        className="top-progress-bar"
        style={{
          width: `${progress}%`,
          opacity: progress >= 100 ? 0 : 1,
          transition: progress >= 100 ? 'width .1s ease, opacity .28s ease' : 'width .2s ease'
        }}
      />
    </div>
  )
}
