import {articles as fallbackArticles, brands as fallbackBrands, homepage as fallbackHomepage, services as fallbackServices, siteSettings as fallbackSettings, toolkits as fallbackToolkits} from '@/data/fallback'
import type {AboutPage, Article, Brand, DiamondAwards, Founder, Homepage, HomeSectionType, ImageValue, MediaDesk, MembershipPage, PortableTextBlock, SEO, Service, SiteSettings, Stat, Toolkit} from '@/types'
import {sanityFetch} from '@/sanity/lib/fetch'
import {ABOUT_PAGE_QUERY, ARTICLE_QUERY, ARTICLES_QUERY, BRANDS_QUERY, FOUNDER_QUERY, HOMEPAGE_QUERY, MEDIA_DESK_QUERY, MEMBERSHIP_PAGE_QUERY, SERVICE_QUERY, SERVICES_QUERY, SITE_SETTINGS_QUERY, TOOLKITS_QUERY, DIAMOND_AWARDS_QUERY} from '@/sanity/lib/queries'

type RawHomepage = {
  heroEyebrowLeft?: string
  heroEyebrowRight?: string
  heroTitleBefore?: string
  heroTitleAccent?: string
  heroIdentity?: string
  heroSummary?: string
  heroImage?: ImageValue
  heroImageCaption?: string
  heroImageMeta?: string
  sections?: Array<{sectionType: HomeSectionType; enabled?: boolean}>
  storyHeading?: string
  storyOpening?: string
  storyBody?: PortableTextBlock[]
  stats?: Stat[]
  credibilityFacts?: Array<{label: string; title: string}>
  publications?: string[]
  clientLogos?: Array<{name: string; image?: ImageValue}>
  featuredArticles?: Article[]
  featuredServices?: Service[]
  featuredBrands?: Brand[]
  featuredToolkits?: Toolkit[]
  seo?: SEO
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return (await sanityFetch<SiteSettings>(SITE_SETTINGS_QUERY)) || fallbackSettings
}

export async function getHomepage(): Promise<Homepage> {
  const data = await sanityFetch<RawHomepage>(HOMEPAGE_QUERY)
  if (!data) return fallbackHomepage
  const sectionOrder = (data.sections || []).filter((x) => x.enabled !== false).map((x) => x.sectionType) as HomeSectionType[]
  return {
    hero: {
      eyebrowLeft: data.heroEyebrowLeft || fallbackHomepage.hero.eyebrowLeft,
      eyebrowRight: data.heroEyebrowRight || fallbackHomepage.hero.eyebrowRight,
      titleBefore: data.heroTitleBefore || fallbackHomepage.hero.titleBefore,
      titleAccent: data.heroTitleAccent || fallbackHomepage.hero.titleAccent,
      identity: data.heroIdentity || fallbackHomepage.hero.identity,
      summary: data.heroSummary || fallbackHomepage.hero.summary,
      image: data.heroImage || fallbackHomepage.hero.image,
      imageCaption: data.heroImageCaption || fallbackHomepage.hero.imageCaption,
      imageMeta: data.heroImageMeta || fallbackHomepage.hero.imageMeta,
      primaryCta: fallbackHomepage.hero.primaryCta,
      secondaryCta: fallbackHomepage.hero.secondaryCta
    },
    sectionOrder: sectionOrder.length ? sectionOrder : fallbackHomepage.sectionOrder,
    story: {
      heading: data.storyHeading || fallbackHomepage.story?.heading,
      opening: data.storyOpening || fallbackHomepage.story?.opening,
      body: data.storyBody?.length ? data.storyBody : fallbackHomepage.story?.body
    },
    stats: data.stats?.length ? data.stats : fallbackHomepage.stats,
    credibilityFacts: data.credibilityFacts?.length ? data.credibilityFacts : fallbackHomepage.credibilityFacts,
    publications: data.publications?.length ? data.publications : fallbackHomepage.publications,
    clientLogos: data.clientLogos?.length ? data.clientLogos : fallbackHomepage.clientLogos,
    featuredArticles: data.featuredArticles || [],
    featuredServices: data.featuredServices || [],
    featuredBrands: data.featuredBrands || [],
    featuredToolkits: data.featuredToolkits || [],
    seo: data.seo
  }
}

export async function getServices(): Promise<Service[]> {
  const data = await sanityFetch<Service[]>(SERVICES_QUERY)
  return data?.length ? data : fallbackServices
}

export async function getService(slug: string): Promise<Service | null> {
  const data = await sanityFetch<Service>(SERVICE_QUERY, {slug})
  return data || fallbackServices.find((service) => service.slug === slug) || null
}

export async function getArticles(): Promise<Article[]> {
  const data = await sanityFetch<Article[]>(ARTICLES_QUERY)
  return data?.length ? data : fallbackArticles
}

export async function getArticle(slug: string): Promise<Article | null> {
  const data = await sanityFetch<Article>(ARTICLE_QUERY, {slug})
  return data || fallbackArticles.find((article) => article.slug === slug) || null
}

export async function getBrands(): Promise<Brand[]> {
  const data = await sanityFetch<Brand[]>(BRANDS_QUERY)
  return data?.length ? data : fallbackBrands
}

export async function getToolkits(): Promise<Toolkit[]> {
  const data = await sanityFetch<Toolkit[]>(TOOLKITS_QUERY)
  return data?.length ? data : fallbackToolkits
}

export async function getAboutPage(): Promise<AboutPage | null> {
  return await sanityFetch<AboutPage>(ABOUT_PAGE_QUERY)
}

export async function getMembership(): Promise<MembershipPage | null> {
  return await sanityFetch<MembershipPage>(MEMBERSHIP_PAGE_QUERY)
}

export async function getFounder(): Promise<Founder | null> {
  return await sanityFetch<Founder>(FOUNDER_QUERY)
}

export async function getMediaDesk(): Promise<MediaDesk | null> {
  return await sanityFetch<MediaDesk>(MEDIA_DESK_QUERY)
}

export async function getDiamondAwards(): Promise<DiamondAwards | null> {
  return await sanityFetch<DiamondAwards>(DIAMOND_AWARDS_QUERY)
}
