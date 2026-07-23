import {NextRequest, NextResponse} from 'next/server'
import {z} from 'zod'

const base = z.object({type: z.enum(['contact', 'newsletter', 'membership', 'mediaRequest'])}).passthrough()

const schemas = {
  contact: base.extend({type: z.literal('contact'), firstName: z.string().min(1), lastName: z.string().min(1), email: z.string().email(), message: z.string().min(10)}),
  newsletter: base.extend({type: z.literal('newsletter'), email: z.string().email()}),
  membership: base.extend({type: z.literal('membership'), email: z.string().email()}),
  mediaRequest: base.extend({type: z.literal('mediaRequest'), name: z.string().min(1), email: z.string().email(), deadline: z.string().min(1), message: z.string().min(10)})
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    const type = payload?.type as keyof typeof schemas
    if (!schemas[type]) return NextResponse.json({error: 'Unsupported form type.'}, {status: 400})
    const parsed = schemas[type].safeParse(payload)
    if (!parsed.success) return NextResponse.json({error: 'Please check the required form fields.', details: parsed.error.flatten()}, {status: 400})

    const endpoint = endpointFor(type)
    if (!endpoint) {
      if (process.env.NODE_ENV === 'development') {
        console.info(`[form:${type}]`, parsed.data)
        return NextResponse.json({ok: true, developmentMode: true})
      }
      return NextResponse.json({error: 'Form delivery has not been configured.'}, {status: 503})
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.FORMS_WEBHOOK_SECRET ? {'Authorization': `Bearer ${process.env.FORMS_WEBHOOK_SECRET}`} : {})
      },
      body: JSON.stringify({...parsed.data, submittedAt: new Date().toISOString(), source: request.headers.get('referer') || 'website'}),
      cache: 'no-store'
    })
    if (!response.ok) throw new Error(`Webhook returned ${response.status}`)
    return NextResponse.json({ok: true})
  } catch (error) {
    console.error('Form submission failed:', error)
    return NextResponse.json({error: 'The form could not be submitted. Please try again.'}, {status: 500})
  }
}

function endpointFor(type: keyof typeof schemas) {
  const specific = {
    contact: process.env.CONTACT_WEBHOOK_URL,
    newsletter: process.env.NEWSLETTER_WEBHOOK_URL,
    membership: process.env.MEMBERSHIP_WEBHOOK_URL,
    mediaRequest: process.env.MEDIA_REQUEST_WEBHOOK_URL
  }[type]
  return specific || process.env.FORMS_WEBHOOK_URL
}
