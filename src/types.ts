export type ImageValue =
  | string
  | {
      asset?: {_ref?: string; _id?: string; url?: string}
      alt?: string
      hotspot?: unknown
      crop?: unknown
    }

export type CTA = {
  label: string
  href: string
  style?: 'dark' | 'pink' | 'light' | 'white' | 'media'
}

export type Stat = {
  value: string
  numericValue?: number
  suffix?: string
  label: string
  note?: string
}

export type Service = {
  _id?: string
  title: string
  slug: string
  eyebrow: string
  intro: string
  body: string
  image: ImageValue
  deliverables: string[]
  outcomes: string[]
  seo?: SEO
}

export type Article = {
  _id?: string
  title: string
  slug: string
  excerpt: string
  category: string
  format?: 'article' | 'interview' | 'video' | 'podcast' | 'news' | 'opinion' | 'report'
  publishedAt: string
  readingTime?: string
  image: ImageValue
  author?: Author
  body?: PortableTextBlock[]
  externalVideoUrl?: string
  featured?: boolean
  tags?: string[]
  relatedService?: {title: string; slug: string}
  seo?: SEO
}

export type Author = {
  name: string
  slug?: string
  role?: string
  bio?: string
  image?: ImageValue
}

export type Brand = {
  title: string
  slug: string
  type: string
  description: string
  image: ImageValue
  href?: string
  external?: boolean
}

export type Toolkit = {
  title: string
  slug: string
  type: string
  description: string
  access: 'free' | 'members' | 'paid' | 'comingSoon'
  coverStyle?: 'cream' | 'pink' | 'dark'
  fileUrl?: string
}

export type SEO = {
  metaTitle?: string
  metaDescription?: string
  ogImage?: ImageValue
  noIndex?: boolean
}

export type PortableTextBlock = {
  _key: string
  _type: 'block'
  style?: string
  children: Array<{_key: string; _type: 'span'; marks: string[]; text: string}>
  markDefs: unknown[]
}

export type SiteSettings = {
  title: string
  tagline: string
  description: string
  logo?: ImageValue
  email: string
  phone: string
  locations: string
  socialLinks?: Array<{platform: string; url: string}>
  legalLinks?: Array<{label: string; url: string}>
}

export type Principle = {title: string; description: string}

export type AboutPage = {
  heroTitle?: string
  heroAccent?: string
  intro?: string
  stats?: Stat[]
  evolutionEyebrow?: string
  evolutionHeading?: string
  evolutionBody?: PortableTextBlock[]
  quote?: string
  image?: ImageValue
  principlesEyebrow?: string
  principlesHeading?: string
  principlesIntro?: string
  principles?: Principle[]
  seo?: SEO
}

export type MembershipPage = {
  comingSoonLabel?: string
  heroTitle?: string
  heroAccent?: string
  intro?: string
  benefitsEyebrow?: string
  benefitsHeading?: string
  benefitsIntro?: string
  benefits?: Principle[]
  seo?: SEO
}

export type HomeSectionType =
  | 'story'
  | 'credibility'
  | 'founderTeaser'
  | 'trustedBrands'
  | 'services'
  | 'mediaHub'
  | 'mediaDesk'
  | 'awardsSpotlight'
  | 'brands'
  | 'resourcesMembership'
  | 'newsletter'
  | 'contact'

export type Founder = {
  name?: string
  headline?: string
  intro?: string
  image?: ImageValue
  body?: PortableTextBlock[]
  belief?: string
  stats?: Stat[]
  statsNote?: string
  publications?: string[]
  roles?: Array<{title: string; description: string}>
  seo?: SEO
}

export type MediaDeskItem = {title: string; description: string}

export type MediaDesk = {
  headline?: string
  intro?: string
  requestTypes?: MediaDeskItem[]
  futureResources?: MediaDeskItem[]
  seo?: SEO
}

export type SponsorshipPackage = {tier?: string; name: string; description?: string; features?: string[]}

export type DiamondAwards = {
  eventName?: string
  date?: string
  venue?: string
  location?: string
  heroImage?: ImageValue
  missionPoints?: string[]
  audience?: string[]
  eventExperience?: string[]
  sponsorBenefits?: string[]
  sponsorshipPackages?: SponsorshipPackage[]
  contactEmail?: string
  contactPhoneUae?: string
  contactPhoneUk?: string
  seo?: SEO
}

export type Homepage = {
  hero: {
    eyebrowLeft: string
    eyebrowRight: string
    titleBefore: string
    titleAccent: string
    identity: string
    summary: string
    image: ImageValue
    imageCaption: string
    imageMeta: string
    primaryCta: CTA
    secondaryCta: CTA
  }
  sectionOrder: HomeSectionType[]
  story?: {heading?: string; opening?: string; body?: PortableTextBlock[]}
  stats: Stat[]
  credibilityFacts?: Array<{label: string; title: string}>
  publications: string[]
  clientLogos: Array<{name: string; image?: ImageValue}>
  featuredArticles?: Article[]
  featuredServices?: Service[]
  featuredBrands?: Brand[]
  featuredToolkits?: Toolkit[]
  seo?: SEO
}
