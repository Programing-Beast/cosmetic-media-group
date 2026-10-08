import {createClient} from '@sanity/client'
import {createReadStream, existsSync} from 'node:fs'
import {join} from 'node:path'

// Targeted image swap (client requirements 8-10): uploads the final client
// photography and patches ONLY the image field on each named document —
// nothing else on the documents is touched, so it is safe on production.
// Defaults to .env.local; e.g. SEED_ENV_FILE=.env.dev npx tsx scripts/update-images-2026-10.ts
try { process.loadEnvFile(process.env.SEED_ENV_FILE || '.env.local') } catch {}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-07-01'

if (!projectId || !token) {
  console.error('Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in the env file before running.')
  process.exit(1)
}

const client = createClient({projectId, dataset, apiVersion, token, useCdn: false})

async function upload(publicPath: string) {
  const absolute = join(process.cwd(), 'public', publicPath.replace(/^\//, ''))
  if (!existsSync(absolute)) throw new Error(`Missing image: ${absolute}`)
  const asset = await client.assets.upload('image', createReadStream(absolute), {filename: absolute.split('/').pop()})
  return asset._id
}

function img(assetId: string, alt: string) {
  return {_type: 'image', asset: {_type: 'reference', _ref: assetId}, alt}
}

// [document id, field path, image file, alt text]
const updates: Array<[string, string, string, string]> = [
  ['homepage', 'heroImage', '/images/2026-10/hero-where-aesthetics.jpg', 'Where aesthetics meets influence — editorial portrait'],
  ['aboutPage', 'image', '/images/2026-10/about-cmg.jpg', 'About Cosmetic Media Group'],
  ['founder', 'image', '/images/2026-10/lucy-founder-1.jpg', 'Lucy Hilson, founder of Cosmetic Media Group'],
  ['cosmeticPrPage', 'heroImage', '/images/2026-10/cosmetic-pr-portrait.jpg', 'Cosmetic PR'],
  ['service-pr', 'image', '/images/2026-10/cosmetic-pr-square.jpg', 'Cosmetic PR'],
  ['service-content-studio', 'image', '/images/2026-10/content-studio-square.jpg', 'Content Studio'],
  ['service-media-training', 'image', '/images/2026-10/media-training-square.jpg', 'Media Training'],
  ['service-personal-branding', 'image', '/images/2026-10/personal-branding-square.jpg', 'Personal Branding'],
  ['service-events', 'image', '/images/2026-10/events-square.jpg', 'Events'],
  ['service-podcast-production', 'image', '/images/2026-10/podcast-square.jpg', 'Podcast Production']
]

async function main() {
  console.log(`Updating images on project ${projectId}, dataset ${dataset}...`)
  for (const [id, field, file, alt] of updates) {
    const assetId = await upload(file)
    await client.patch(id).set({[field]: img(assetId, alt)}).commit()
    console.log(`  ✓ ${id}.${field}`)
  }
  // Second founder photo replaces the first frame of the homepage founder film strip.
  const lucy2 = await upload('/images/2026-10/lucy-founder-2.jpg')
  await client.patch('homepage').set({'founderFilm[0]': {...img(lucy2, 'Lucy Hilson, founder of Cosmetic Media Group'), _key: 'founder-film-1'}}).commit()
  console.log('  ✓ homepage.founderFilm[0]')
  console.log('Done.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
