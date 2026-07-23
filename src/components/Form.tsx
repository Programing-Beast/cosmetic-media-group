'use client'

import {FormEvent, useState} from 'react'

type FormType = 'contact' | 'newsletter' | 'membership' | 'mediaRequest'

export function ManagedForm({type, className = '', children, successMessage}: {type: FormType; className?: string; children: React.ReactNode; successMessage: string}) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setMessage('')
    const form = event.currentTarget
    const payload = Object.fromEntries(new FormData(form).entries())
    try {
      const response = await fetch('/api/forms', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({type, ...payload})})
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Unable to submit the form.')
      form.reset()
      setStatus('success')
      setMessage(successMessage)
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Unable to submit the form.')
    }
  }

  return <form className={className} onSubmit={submit}>{children}<div className={`form-status ${status}`} aria-live="polite">{status === 'submitting' ? 'Sending…' : message}</div></form>
}
