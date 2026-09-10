// The ↗ glyph (U+2197) is emoji-capable, so iOS Safari renders it with the
// Apple emoji font (blue square arrow). An inline SVG renders identically on
// every platform, so every arrow on the site goes through these components.
export function Arrow() {
  return (
    <svg className="arrow-icon" width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Renders an editor-provided label. If the text ends with "↗" (editors are
// encouraged to type it in Studio), the character is swapped for the SVG so
// the emoji substitution can never come back through CMS content.
export function ArrowLabel({text}: {text?: string}) {
  if (!text) return null
  const stripped = text.replace(/\s*↗\s*$/u, '')
  if (stripped === text) return <>{text}</>
  return <>{stripped} <Arrow /></>
}
