'use client'

import {setConsent} from '@/lib/consent'
import {useConsent} from '@/lib/useConsent'

export function CookieConsent() {
  const choice = useConsent()

  // Once a choice is stored, the banner never shows again (until site data is cleared).
  if (choice !== null) return null

  return (
    <div className="cookie-consent" role="dialog" aria-live="polite" aria-label="Cookie consent">
      <div className="cookie-consent-inner">
        <p>
          We use cookies to understand how visitors use our site. Analytics cookies only load if you
          accept. You can change your mind any time by clearing your browser data.
        </p>
        <div className="cookie-consent-actions">
          <button type="button" className="btn btn-white" onClick={() => setConsent('rejected')}>
            Reject
          </button>
          <button type="button" className="btn btn-pink" onClick={() => setConsent('accepted')}>
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
