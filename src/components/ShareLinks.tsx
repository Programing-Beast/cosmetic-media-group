'use client'

import {useState} from 'react'

export function ShareLinks({title}: {title: string}) {
  const [copied, setCopied] = useState(false)

  function currentUrl() {
    return typeof window === 'undefined' ? '' : window.location.href
  }

  function shareLinkedIn() {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl())}`, '_blank', 'noopener,noreferrer')
  }

  function shareEmail() {
    window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(currentUrl())}`
  }

  async function copyLink() {
    try {
      await navigator.clipboard?.writeText(currentUrl())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="aside-box">
      <div className="eyebrow">Share</div>
      <p>
        <button type="button" className="text-link share-link" onClick={shareLinkedIn}>LinkedIn ↗</button><br />
        <button type="button" className="text-link share-link" onClick={shareEmail}>Email ↗</button><br />
        <button type="button" className="text-link share-link" onClick={copyLink}>{copied ? 'Link copied ✓' : 'Copy link ↗'}</button>
      </p>
    </div>
  )
}
