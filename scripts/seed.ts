import {createClient} from '@sanity/client'
import {createReadStream, existsSync} from 'node:fs'
import {join} from 'node:path'
import {articles, brands, homepage, navigation, services, siteSettings, toolkits, videoGalleries} from '../src/data/fallback'

try { process.loadEnvFile('.env.local') } catch {}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-07-01'

if (!projectId || !token) {
  console.error('Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local before running the seed script.')
  process.exit(1)
}

const client = createClient({projectId, dataset, apiVersion, token, useCdn: false})
const imageCache = new Map<string, string>()

async function uploadImage(publicPath: string) {
  if (imageCache.has(publicPath)) return imageCache.get(publicPath)!
  const absolute = join(process.cwd(), 'public', publicPath.replace(/^\//, ''))
  if (!existsSync(absolute)) throw new Error(`Missing seed image: ${absolute}`)
  const asset = await client.assets.upload('image', createReadStream(absolute), {filename: absolute.split('/').pop()})
  imageCache.set(publicPath, asset._id)
  return asset._id
}

async function sanityImage(value: unknown, alt: string) {
  if (typeof value !== 'string' || !value.startsWith('/')) return undefined
  const assetId = await uploadImage(value)
  return {_type: 'image', asset: {_type: 'reference', _ref: assetId}, alt}
}

function block(text: string, key: string) {
  return {_type: 'block', _key: key, style: 'normal', markDefs: [], children: [{_type: 'span', _key: `${key}-span`, marks: [], text}]}
}

async function main() {
  console.log(`Seeding Sanity project ${projectId}, dataset ${dataset}...`)

  const logo = await sanityImage('/images/logo.png', 'Cosmetic Media Group')
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    ...siteSettings,
    logo,
    socialLinks: (siteSettings.socialLinks || []).map((item, index) => ({_key: `social-${index}`, ...item})),
    legalLinks: [
      {_key: 'privacy', label: 'Privacy', url: '#'},
      {_key: 'terms', label: 'Terms', url: '#'},
      {_key: 'accessibility', label: 'Accessibility', url: '#'}
    ]
  })

  const serviceRefs: Array<{_type: 'reference'; _ref: string; _key: string}> = []
  for (const [index, service] of services.entries()) {
    const id = `service-${service.slug}`
    serviceRefs.push({_type: 'reference', _ref: id, _key: id})
    await client.createOrReplace({
      _id: id,
      _type: 'service',
      title: service.title,
      slug: {_type: 'slug', current: service.slug},
      eyebrow: service.eyebrow,
      intro: service.intro,
      body: service.body,
      image: await sanityImage(service.image, service.title),
      outcomes: service.outcomes,
      deliverables: service.deliverables,
      order: index + 1
    })
  }

  await client.createOrReplace({
    _id: 'author-editorial',
    _type: 'author',
    name: 'Cosmetic Media Group Editorial',
    slug: {_type: 'slug', current: 'cosmetic-media-group-editorial'},
    role: 'Editorial Team',
    bio: 'The Cosmetic Media Group editorial team covers the people, ideas and intelligence shaping modern aesthetics.'
  })
  await client.createOrReplace({
    _id: 'author-lucy-hilson',
    _type: 'author',
    name: 'Lucy Hilson',
    slug: {_type: 'slug', current: 'lucy-hilson'},
    role: 'Founder',
    image: await sanityImage('/images/founder.jpg', 'Lucy Hilson'),
    bio: 'Founder, PR specialist, speaker, interviewer and industry commentator.'
  })

  const articleRefs: Array<{_type: 'reference'; _ref: string; _key: string}> = []
  for (const article of articles) {
    const id = `article-${article.slug}`
    articleRefs.push({_type: 'reference', _ref: id, _key: id})
    await client.createOrReplace({
      _id: id,
      _type: 'article',
      title: article.title,
      slug: {_type: 'slug', current: article.slug},
      excerpt: article.excerpt,
      category: article.category,
      format: article.format,
      publishedAt: article.publishedAt,
      readingTime: article.readingTime,
      image: await sanityImage(article.image, article.title),
      body: article.body || [block(article.excerpt, 'intro')],
      externalVideoUrl: article.externalVideoUrl,
      featured: article.featured || false,
      tags: article.tags?.length ? article.tags : [article.category, 'Aesthetics', 'Industry leadership'].filter(Boolean),
      relatedService: {_type: 'reference', _ref: 'service-pr'},
      author: {_type: 'reference', _ref: article.author?.name === 'Lucy Hilson' ? 'author-lucy-hilson' : 'author-editorial'}
    })
  }

  const brandRefs: Array<{_type: 'reference'; _ref: string; _key: string}> = []
  for (const [index, brand] of brands.entries()) {
    const id = `brand-${brand.slug}`
    brandRefs.push({_type: 'reference', _ref: id, _key: id})
    await client.createOrReplace({
      _id: id,
      _type: 'brand',
      title: brand.title,
      slug: {_type: 'slug', current: brand.slug},
      type: brand.type,
      description: brand.description,
      image: await sanityImage(brand.image, brand.title),
      href: brand.href,
      external: brand.external || false,
      order: index + 1
    })
  }

  const toolkitRefs: Array<{_type: 'reference'; _ref: string; _key: string}> = []
  for (const [index, toolkit] of toolkits.entries()) {
    const id = `toolkit-${toolkit.slug}`
    toolkitRefs.push({_type: 'reference', _ref: id, _key: id})
    await client.createOrReplace({
      _id: id,
      _type: 'toolkit',
      title: toolkit.title,
      slug: {_type: 'slug', current: toolkit.slug},
      type: toolkit.type,
      description: toolkit.description,
      access: toolkit.access,
      coverStyle: toolkit.coverStyle,
      order: index + 1
    })
  }

  await client.createOrReplace({
    _id: 'homepage',
    _type: 'homepage',
    heroEyebrowLeft: homepage.hero.eyebrowLeft,
    heroEyebrowRight: homepage.hero.eyebrowRight,
    heroTitleBefore: homepage.hero.titleBefore,
    heroTitleAccent: homepage.hero.titleAccent,
    heroIdentity: homepage.hero.identity,
    heroSummary: homepage.hero.summary,
    heroImage: await sanityImage(homepage.hero.image, 'Aesthetics editorial portrait'),
    heroImageCaption: homepage.hero.imageCaption,
    heroImageMeta: homepage.hero.imageMeta,
    storyHeading: 'More than PR.',
    storyOpening: 'Cosmetic Media Group is one destination for the experts, brands and ideas shaping the future of aesthetics.',
    storyBody: [
      block('For more than 20 years, we have helped aesthetic professionals earn the recognition they deserve through strategic PR. Today, we are taking that one step further.', 'story-1'),
      block('Cosmetic Media Group brings media visibility, content, education, podcasts, events, personal branding and industry resources into one platform.', 'story-2'),
      block('The future of aesthetics will not be led by the loudest voices. It will be led by the most trusted ones.', 'story-3')
    ],
    stats: homepage.stats.map((stat, index) => ({_type: 'stat', _key: `stat-${index}`, ...stat})),
    credibilityFacts: [
      {_key: 'leadership', label: '01 / Leadership', title: 'Founder of Cosmetic Media Group'},
      {_key: 'recognition', label: '02 / Recognition', title: 'Founder of the Diamond Awards Dubai'},
      {_key: 'editorial', label: '03 / Editorial', title: 'Co-founder of The Aesthetics Edit'},
      {_key: 'voice', label: '04 / Voice', title: 'Host of industry interviews and podcasts'}
    ],
    publications: homepage.publications,
    clientLogos: homepage.clientLogos.map((item, index) => ({_key: `client-${index}`, name: item.name})),
    sections: homepage.sectionOrder.map((sectionType, index) => ({_type: 'homeSection', _key: `${index}-${sectionType}`, sectionType, enabled: true})),
    featuredArticles: articleRefs.slice(0, 3),
    featuredServices: serviceRefs,
    featuredBrands: brandRefs,
    featuredToolkits: toolkitRefs.slice(0, 3)
  })

  await client.createOrReplace({
    _id: 'founder',
    _type: 'founder',
    name: 'Lucy Hilson',
    headline: 'Experience with a point of view.',
    intro: 'Founder, PR specialist, speaker, interviewer and industry commentator with more than 20 years of experience building trusted reputations across aesthetics.',
    image: await sanityImage('/images/founder.jpg', 'Lucy Hilson'),
    body: [
      block('For more than 20 years, Lucy has helped doctors, clinics, brands and industry leaders build trusted reputations through strategic public relations and media exposure.', 'founder-1'),
      block('Cosmetic Media Group was created to go beyond traditional PR, bringing together media, education, content, podcasts, events and personal branding.', 'founder-2'),
      block('Lucy is a regular speaker, interviewer and industry commentator, and the founder of the Diamond Awards Dubai.', 'founder-3')
    ],
    belief: 'The most successful businesses are not always the most talented. They are the ones people know, trust and remember.',
    stats: [
      {value: '20+', label: 'Years in aesthetics PR'},
      {value: '100,000+*', label: 'Media features secured'},
      {value: 'Hundreds', label: 'Of experts represented'},
      {value: 'Global', label: 'Speaker at international industry events'},
      {value: 'Founder', label: 'Cosmetic Media Group & Diamond Awards Dubai'},
      {value: 'Co-founder', label: 'The Aesthetics Edit — Dubai’s first dedicated aesthetics guide'},
      {value: 'Host', label: 'Industry interviews and podcasts'},
      {value: 'Commentator', label: 'Trusted voice across aesthetics media'}
    ].map((stat, index) => ({_type: 'stat', _key: `founder-stat-${index}`, ...stat})),
    statsNote: '* Media coverage figure is shown as supplied in the client feedback and should be verified before the final website goes live.',
    publications: homepage.publications,
    roles: [
      {_key: 'speaker', title: 'Speaker', description: 'International events, panels and industry conversations focused on reputation, visibility and higher standards.'},
      {_key: 'interviewer', title: 'Interviewer', description: 'Thoughtful conversations with clinicians, founders, innovators and the people shaping modern aesthetics.'},
      {_key: 'commentator', title: 'Commentator', description: 'Expert perspective on communications, trust, media influence and the evolution of the aesthetics industry.'}
    ]
  })

  await client.createOrReplace({
    _id: 'aboutPage',
    _type: 'aboutPage',
    heroTitle: 'More than PR.',
    heroAccent: 'A platform for influence.',
    intro: 'Cosmetic Media Group helps the aesthetics industry be seen, trusted and remembered through media visibility, content, education, podcasts, events, personal branding, awards and practical resources.',
    stats: [
      {value: '20+', label: 'Years in aesthetics communications'},
      {value: 'Global', label: 'UK, Middle East and international reach'},
      {value: 'Multiple', label: 'Connected media and industry platforms'},
      {value: '1', label: 'Trusted ecosystem'}
    ].map((stat, index) => ({_type: 'stat', _key: `about-stat-${index}`, ...stat})),
    evolutionEyebrow: 'Our evolution',
    evolutionHeading: 'A media company, not simply an agency.',
    evolutionBody: [
      block('Cosmetic Media Group is a modern media and communications company for the global aesthetics industry. We do not just help brands gain publicity. We create the conversations that shape the industry, connecting professionals, clinics, brands and consumers in one trusted ecosystem.', 'about-1'),
      block('The group brings together strategic PR, personal branding, content production, editorial publishing, education, podcasts, events, research and recognition. Each platform has its own purpose, but they are connected by one ambition: to help credible experts and organisations build authority that lasts.', 'about-2')
    ],
    quote: 'We elevate the people, brands and ideas shaping the future of aesthetics.',
    image: await sanityImage('/images/magazine.jpg', 'The Cosmetic Media Group editorial ecosystem'),
    principlesEyebrow: 'Our principles',
    principlesHeading: 'Recognition with substance.',
    principlesIntro: 'Every part of the platform is designed to create recognition with substance, authority with relevance and influence that lasts.',
    principles: [
      {_key: 'depth', title: 'Industry depth', description: 'We understand aesthetics from the inside: its experts, audiences, opportunities and responsibilities.'},
      {_key: 'editorial', title: 'Editorial intelligence', description: 'We look beyond promotion to uncover the ideas, evidence and voices that deserve attention.'},
      {_key: 'authority', title: 'Long-term authority', description: 'We build platforms, profiles and reputations that become more valuable and trusted over time.'}
    ]
  })

  await client.createOrReplace({
    _id: 'membershipPage',
    _type: 'membershipPage',
    comingSoonLabel: 'Coming soon',
    heroTitle: 'Closer to the',
    heroAccent: 'conversation.',
    intro: 'Future membership will provide access to exclusive reports, toolkits, editorial content, events, education and opportunities designed for industry leaders.',
    benefitsEyebrow: 'Planned member benefits',
    benefitsHeading: 'A platform designed to grow with the industry.',
    benefitsIntro: 'The features below are prepared for future phases and will be scoped separately when the membership is ready to launch.',
    benefits: [
      {_key: 'intelligence', title: 'Exclusive intelligence', description: 'Reports, research, trend analysis and editorial content reserved for members.'},
      {_key: 'resources', title: 'Practical resources', description: 'Templates, guides, courses and tools designed for aesthetics professionals and businesses.'},
      {_key: 'access', title: 'Industry access', description: 'Events, interviews, expert content and opportunities to join important industry conversations.'}
    ]
  })

  await client.createOrReplace({
    _id: 'mediaDesk',
    _type: 'mediaDesk',
    headline: 'Expert access for journalists.',
    intro: 'Request expert comments, interviews, case studies or background information from trusted professionals across the aesthetics industry.',
    requestTypes: [
      {_key: 'comments', title: 'Expert comments', description: 'Matched to your subject and deadline'},
      {_key: 'interviews', title: 'Interviews', description: 'Clinicians, founders, brands and industry leaders'},
      {_key: 'case-studies', title: 'Case studies', description: 'Relevant businesses, treatments and industry perspectives'},
      {_key: 'resources', title: 'Media resources', description: 'Press information, approved imagery and supporting assets'}
    ],
    futureResources: [
      {_key: 'directory', title: 'Expert directory', description: 'Searchable profiles organised by specialty, subject and market.'},
      {_key: 'press', title: 'Press resources', description: 'Approved biographies, imagery, company information and background documents.'},
      {_key: 'topics', title: 'Current topics', description: 'Timely expert perspectives linked to industry news and editorial deadlines.'}
    ]
  })

  await client.createOrReplace({
    _id: 'diamondAwards',
    _type: 'diamondAwards',
    eventName: 'The Diamond Awards Dubai',
    date: '2027-04-10',
    venue: 'Atlantis The Royal',
    location: 'Palm Jumeirah',
    heroImage: await sanityImage('/images/diamond1.jpeg', 'The Diamond Awards Dubai 2027'),
    historyImage: await sanityImage('/images/diamond2.jpg', 'A legacy of excellence'),
    missionImage: await sanityImage('/images/diamond3.jpg', 'The Diamond Awards mission'),
    whyDubaiImage: await sanityImage('/images/diamond4.jpg', 'Dubai aesthetic innovation'),
    sponsorImage: await sanityImage('/images/diamond6.jpg', 'Diamond Awards sponsorship opportunity'),
    experienceImage: await sanityImage('/images/diamond8.jpg', 'Atlantis The Royal Diamond Awards event experience'),
    contactImage: await sanityImage('/images/diamond10.jpg', 'Be part of the first ever Dubai edition'),
    missionPoints: [
      'Recognise the highest standards of clinical safety, professionalism and patient care.',
      'Highlight innovators in technology, devices, products and treatment protocols.',
      'Elevate the region’s reputation as a leader in aesthetics excellence.',
      'Bring the global industry together through a prestigious annual event in Dubai.'
    ],
    audience: ['Leading dermatologists and plastic surgeons', 'Aesthetic physicians and practitioners', 'Clinic owners, directors and practice managers', 'Device manufacturers and technology innovators', 'Skincare brands and product formulators', 'Industry educators and regulatory voices', 'VIP guests, press and media'],
    eventExperience: ['Luxury gala dinner', 'Live entertainment', 'Awards presentations', 'Red carpet arrivals', 'Press interviews and media coverage', 'Premium brand activations', 'Networking with regional and global leaders'],
    sponsorBenefits: ['Brand positioning alongside global excellence', 'Exposure across GCC press, media and key industry channels', 'Access to clinic owners, dermatologists, surgeons and aesthetic leaders', 'On-stage and in-room visibility', 'Inclusion in marketing, digital and PR campaigns', 'Opportunity to present awards or host dedicated activations', 'Exclusive partnership rights within your category'],
    sponsorshipPackages: [
      {_key: 'diamond', tier: 'Premier partnership', name: 'Diamond', description: 'Maximum prominence across the complete awards platform and event experience.', features: ['Headline and category opportunities', 'High-profile stage and room visibility', 'Integrated media, content and PR exposure', 'Exclusive activation possibilities']},
      {_key: 'gold', tier: 'High-impact partnership', name: 'Gold', description: 'Strong brand presence with meaningful access to attendees and industry channels.', features: ['Category and activation options', 'Digital and campaign inclusion', 'VIP attendance and networking', 'Brand alignment with excellence']},
      {_key: 'silver', tier: 'Focused partnership', name: 'Silver', description: 'Targeted visibility through selected event, media or gifting opportunities.', features: ['Table, talent or media partnerships', 'Gift bag and technology options', 'Selected campaign inclusion', 'Flexible category alignment']}
    ],
    contactEmail: 'lucy@cosmeticpr.com',
    contactPhoneUae: '+971 58 582 7507',
    contactPhoneUk: '+44 7958 429 130'
  })

  await client.createOrReplace({
    _id: 'navigation',
    _type: 'navigation',
    about: {
      eyebrow: navigation.about.eyebrow,
      heading: navigation.about.heading,
      text: navigation.about.text,
      ctaLabel: navigation.about.ctaLabel,
      ctaHref: navigation.about.ctaHref,
      links: navigation.about.links.map((link, index) => ({_key: `about-${index}`, label: link.label, page: link.href}))
    },
    services: {
      eyebrow: navigation.services.eyebrow,
      heading: navigation.services.heading,
      text: navigation.services.text,
      ctaLabel: navigation.services.ctaLabel,
      ctaHref: navigation.services.ctaHref,
      links: services.map((service, index) => ({_key: `service-${index}`, service: {_type: 'reference', _ref: `service-${service.slug}`}}))
    }
  })

  // Video galleries are fully seed-managed; clear any previous docs so renamed/removed entries don't linger.
  await client.delete({query: '*[_type == "videoGallery"]'})
  for (const [index, gallery] of videoGalleries.entries()) {
    await client.createOrReplace({
      _id: `video-${gallery.slug}`,
      _type: 'videoGallery',
      title: gallery.title,
      slug: {_type: 'slug', current: gallery.slug},
      category: gallery.category,
      intro: gallery.intro,
      order: gallery.order ?? index + 1,
      poster: await sanityImage(typeof gallery.poster === 'string' ? gallery.poster : undefined, gallery.title),
      videos: gallery.videos.map((item, itemIndex) => ({_key: `video-${itemIndex}`, heading: item.heading, url: item.url, caption: item.caption}))
    })
  }

  console.log('Seed complete. Open /studio and review the content before launch.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
