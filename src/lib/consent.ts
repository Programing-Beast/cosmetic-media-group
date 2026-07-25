export type Consent = 'accepted' | 'rejected'

const STORAGE_KEY = 'cmg-consent'
const CHANGE_EVENT = 'cmg-consent-change'

export function getConsent(): Consent | null {
  if (typeof window === 'undefined') return null
  const value = window.localStorage.getItem(STORAGE_KEY)
  return value === 'accepted' || value === 'rejected' ? value : null
}

export function setConsent(value: Consent): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, value)
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT))
}

/**
 * Subscribe to consent changes — shaped for `useSyncExternalStore`.
 * Fires for same-tab updates (CustomEvent) and cross-tab updates (storage event).
 */
export function subscribe(onChange: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener(CHANGE_EVENT, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange)
    window.removeEventListener('storage', onChange)
  }
}
