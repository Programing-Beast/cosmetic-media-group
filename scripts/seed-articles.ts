import {createClient} from '@sanity/client'
import {createReadStream, existsSync, readFileSync} from 'node:fs'
import {join} from 'node:path'

// Additive script: creates/updates ONLY the client-supplied blog articles
// (requirements 10-09-2026). It never touches other documents, so it is safe
// to run against production even after editors start using the Studio.
// Defaults to .env.local; set SEED_ENV_FILE to target another dataset,
// e.g. SEED_ENV_FILE=.env.dev npx tsx scripts/seed-articles.ts
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
const imageCache = new Map<string, string>()

type SeedArticle = {
  title: string
  slug: string
  category: string
  image: string
  publishedAt: string
  readingTime: string
  excerpt: string
  body: unknown[]
}

async function uploadImage(publicPath: string) {
  if (imageCache.has(publicPath)) return imageCache.get(publicPath)!
  const absolute = join(process.cwd(), 'public', publicPath.replace(/^\//, ''))
  if (!existsSync(absolute)) throw new Error(`Missing seed image: ${absolute}`)
  const asset = await client.assets.upload('image', createReadStream(absolute), {filename: absolute.split('/').pop()})
  imageCache.set(publicPath, asset._id)
  return asset._id
}

async function main() {
  const articles: SeedArticle[] = JSON.parse(readFileSync(join(__dirname, 'data', 'blog-articles-2026-09.json'), 'utf8'))
  console.log(`Adding ${articles.length} articles to project ${projectId}, dataset ${dataset}...`)
  for (const article of articles) {
    const assetId = await uploadImage(article.image)
    await client.createOrReplace({
      _id: `article-${article.slug}`,
      _type: 'article',
      title: article.title,
      slug: {_type: 'slug', current: article.slug},
      excerpt: article.excerpt,
      category: article.category,
      format: 'article',
      publishedAt: article.publishedAt,
      readingTime: article.readingTime,
      image: {_type: 'image', asset: {_type: 'reference', _ref: assetId}, alt: article.title},
      body: article.body,
      featured: false,
      tags: [article.category, 'Aesthetics', 'PR'],
      relatedService: {_type: 'reference', _ref: 'service-pr'},
      author: {_type: 'reference', _ref: 'author-lucy-hilson'}
    })
    console.log(`  ✓ ${article.slug}`)
  }
  console.log('Done.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
