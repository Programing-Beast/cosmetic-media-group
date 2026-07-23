import type {QueryParams} from 'next-sanity'
import {client} from './client'
import {isSanityConfigured} from '../env'

export async function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T | null> {
  if (!isSanityConfigured) return null
  try {
    return await client.fetch<T>(query, params, {next: {revalidate: 60}})
  } catch (error) {
    console.error('Sanity fetch failed:', error)
    return null
  }
}
