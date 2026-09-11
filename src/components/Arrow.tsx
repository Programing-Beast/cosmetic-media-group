// The ↗ glyph (U+2197) is emoji-capable, so iOS Safari renders it with the
// Apple emoji font (blue square arrow). This SVG replaces it site-wide. The
// geometry was matched pixel-for-pixel against the arrow in the approved V23
// mockup (long thin 45° shaft, small bracket head, hairline weight): at 13px
// text the shaft is exactly 1px. Em sizing keeps it scaling with font-size.
export function Arrow() {
  return (
    <svg className="arrow-icon" width="1em" height="1em" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M2 24L23 3M15.2 3H23V10.8" stroke="currentColor" strokeWidth="0.9" strokeLinecap="butt" strokeLinejoin="miter" />
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
