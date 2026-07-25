'use client'

import {useSyncExternalStore} from 'react'
import {getConsent, subscribe, type Consent} from './consent'

/**
 * Read the visitor's cookie-consent choice reactively.
 * Returns null until a choice is stored. Server + hydration snapshot is always null,
 * so the banner renders on first paint and hides once localStorage is read client-side.
 */
export function useConsent(): Consent | null {
  return useSyncExternalStore(subscribe, getConsent, () => null)
}
