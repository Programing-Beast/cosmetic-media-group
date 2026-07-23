export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-07-01'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'demo1234'
export const readToken = process.env.SANITY_API_READ_TOKEN
export const isSanityConfigured = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
