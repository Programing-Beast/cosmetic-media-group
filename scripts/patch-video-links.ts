import {createClient} from '@sanity/client'
import {videoGalleries} from '../src/data/fallback'

// Patches ONLY the `videos` array on existing videoGallery docs, so we can
// verify YouTube + Vimeo playback without a full re-seed.
// Usage: SEED_ENV_FILE=.env.handover.local npx tsx scripts/patch-video-links.ts
try { process.loadEnvFile(process.env.SEED_ENV_FILE || '.env.local') } catch {}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-07-01'

if (!projectId || !token) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN')
  process.exit(1)
}

const client = createClient({projectId, dataset, apiVersion, token, useCdn: false})

async function run() {
  console.log(`Patching video links on project ${projectId}/${dataset}`)
  for (const gallery of videoGalleries) {
    const videos = gallery.videos.map((item, i) => ({
      _key: `video-${i}`,
      heading: item.heading,
      url: item.url,
      caption: item.caption
    }))
    await client.patch(`video-${gallery.slug}`).set({videos}).commit()
    console.log(`  ✓ ${gallery.slug} — ${videos.length} clip(s)`)
  }
  console.log('Done.')
}

run().catch((err) => { console.error(err); process.exit(1) })
