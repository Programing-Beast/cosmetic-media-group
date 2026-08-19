import {createClient} from '@sanity/client'
import {createReadStream, existsSync} from 'node:fs'
import {join} from 'node:path'
import {articles, brands, homepage, navigation, services, siteSettings, toolkits, videoGalleries} from '../src/data/fallback'

// Defaults to .env.local; set SEED_ENV_FILE to target another dataset,
// e.g. SEED_ENV_FILE=.env.handover.local npm run seed
try { process.loadEnvFile(process.env.SEED_ENV_FILE || '.env.local') } catch {}

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
      listDescription: service.listDescription,
      listCta: service.listCta,
      detailIntro: service.detailIntro,
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

  // V19 cleanup (client-approved): the Media Hub test documents must not exist in any dataset.
  await client.delete({query: '*[_type == "article" && slug.current in ["video-testing", "video-list"]]'})

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
      ctaLabel: brand.ctaLabel,
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
    heroFilm: [
      {...(await sanityImage('/images/podcast.jpg', 'Podcast and interview content')), _key: 'film-podcast'},
      {...(await sanityImage('/images/event.jpg', 'Industry event and behind-the-scenes content')), _key: 'film-event'}
    ],
    heroFilmBadge: 'Looping editorial film / client footage',
    founderFilm: [
      {...(await sanityImage('/images/founder.jpg', 'Lucy Hilson, founder of Cosmetic Media Group')), _key: 'founder-film-1'},
      {...(await sanityImage('/images/speaker.jpg', 'Lucy Hilson speaking and representing the industry')), _key: 'founder-film-2'},
      {...(await sanityImage('/images/podcast.jpg', 'Industry interviews and podcast content')), _key: 'founder-film-3'}
    ],
    storyHeading: 'More than PR.',
    storyOpening: 'Cosmetic Media Group is the umbrella platform connecting the experts, brands and ideas shaping the future of aesthetics.',
    storyBody: [
      block('For more than 20 years, we have helped aesthetic professionals earn the recognition they deserve through strategic PR. Cosmetic PR remains the flagship specialist agency at the heart of that heritage.', 'story-1'),
      block('Today, Cosmetic Media Group takes that experience further. Through media visibility, content, education, podcasts, events, personal branding, awards and industry resources, we are creating one destination where experts can raise their profile, share their knowledge, build credibility and grow their influence.', 'story-2'),
      block('Because the future of aesthetics will not be led by the loudest voices. It will be led by the most trusted ones.', 'story-3')
    ],
    stats: homepage.stats.map((stat, index) => ({_type: 'stat', _key: `stat-${index}`, ...stat})),
    credibilityFacts: [
      {_key: 'leadership', label: '01 / Leadership', title: 'Founder of Cosmetic Media Group'},
      {_key: 'recognition', label: '02 / Recognition', title: 'Founder of the Diamond Awards Dubai'},
      {_key: 'editorial', label: '03 / Editorial', title: 'Co-founder of The Aesthetics Edit — Dubai’s first and only aesthetics guide'},
      {_key: 'voice', label: '04 / Voice', title: 'Host of industry interviews and podcasts'}
    ],
    publications: homepage.publications,
    clientLogos: homepage.clientLogos.map((item, index) => ({_key: `client-${index}`, name: item.name})),
    latestRail: (homepage.latestRail || []).map((item, index) => ({_key: `rail-${index}`, ...item})),
    brandRail: (homepage.brandRail || []).map((item, index) => ({_key: `brand-rail-${index}`, ...item})),
    resourceTiles: (homepage.resourceTiles || []).map((item, index) => ({_key: `resource-${index}`, ...item})),
    cprEyebrow: homepage.cprSpotlight?.eyebrow,
    cprHeading: homepage.cprSpotlight?.heading,
    cprAccent: homepage.cprSpotlight?.accent,
    cprIntro: homepage.cprSpotlight?.intro,
    cprStatusChips: homepage.cprSpotlight?.statusChips,
    cprCards: await Promise.all((homepage.cprSpotlight?.cards || []).map(async (card, index) => ({
      _key: `cpr-card-${index}`,
      label: card.label,
      title: card.title,
      text: card.text,
      ctaLabel: card.ctaLabel,
      ...(typeof card.image === 'string' ? {image: await sanityImage(card.image, card.title)} : {})
    }))),
    sections: homepage.sectionOrder.map((sectionType, index) => ({_type: 'homeSection', _key: `${index}-${sectionType}`, sectionType, enabled: true})),
    featuredArticles: ['future-of-aesthetic-medicine', 'in-conversation-building-authority', 'people-raising-standards']
      .map((slug) => articleRefs.find((ref) => ref._ref === `article-${slug}`))
      .filter((ref): ref is NonNullable<typeof ref> => Boolean(ref)),
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
      block("For more than 20 years, Lucy has helped doctors, clinics, brands and industry leaders build trusted reputations through strategic public relations and media exposure. Her work has secured coverage in leading consumer, beauty and business publications, positioned experts as trusted media commentators and supported some of the industry's most recognised names.", 'founder-1'),
      block('As the industry has evolved, so has her vision. Cosmetic Media Group was created to go beyond traditional PR, bringing together media, education, content, podcasts, events and personal branding into one platform designed to help aesthetic professionals build authority, influence and lasting credibility.', 'founder-2'),
      block('Alongside leading Cosmetic Media Group, Lucy is a regular speaker, interviewer and industry commentator, known for championing higher standards in aesthetics and helping experts communicate with confidence. She is also the founder of the Diamond Awards Dubai and co-founder of The Aesthetics Edit.', 'founder-3')
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
    intro: 'Cosmetic Media Group is the umbrella media and communications platform built on the established foundation of Cosmetic PR. Together, the group helps the aesthetics industry be seen, trusted and remembered through media visibility, content, education, podcasts, events, personal branding, awards and practical resources.',
    stats: [
      {value: '20+', label: 'Years in aesthetics communications'},
      {value: 'Global', label: 'UK, Middle East and international reach'},
      {value: 'Multiple', label: 'Connected media and industry platforms'},
      {value: '1', label: 'Trusted ecosystem'}
    ].map((stat, index) => ({_type: 'stat', _key: `about-stat-${index}`, ...stat})),
    evolutionEyebrow: 'Our evolution',
    evolutionHeading: 'From specialist PR to a connected media company.',
    evolutionBody: [
      block('For more than 20 years, the business has helped aesthetic professionals earn recognition through strategic communications and media visibility. Cosmetic Media Group takes that experience further by bringing together PR, editorial content, education, podcasts, events, personal branding, awards and practical industry resources.', 'about-1'),
      block('The result is one connected destination where experts and brands can raise their profile, share their knowledge, build credibility and grow their influence.', 'about-2'),
      block('Cosmetic PR remains the flagship specialist PR agency within the group, while Cosmetic Media Group provides the wider platform for editorial, content, education, events, awards and future membership.', 'about-3')
    ],
    quote: 'The future of aesthetics will not be led by the loudest voices. It will be led by the most trusted ones.',
    closingNote: 'Cosmetic Media Group exists to help the right people and ideas become seen, trusted and remembered — while creating useful platforms that move the wider industry forward.',
    image: await sanityImage('/images/magazine.jpg', 'Cosmetic Media Group editorial platform'),
    principlesEyebrow: 'Our point of view',
    principlesHeading: 'Credibility before noise.',
    principlesIntro: 'Every part of the platform is designed to create recognition with substance, authority with relevance and influence that lasts.',
    principles: [
      {_key: 'depth', title: 'Industry depth', description: 'We understand aesthetics from the inside — its experts, audiences, opportunities and responsibilities.'},
      {_key: 'editorial', title: 'Editorial intelligence', description: 'We look beyond promotion to uncover the ideas, evidence and voices that deserve attention.'},
      {_key: 'authority', title: 'Long-term authority', description: 'We build platforms, profiles and reputations that become more valuable and trusted over time.'}
    ]
  })

  await client.createOrReplace({
    _id: 'cosmeticPrPage',
    _type: 'cosmeticPrPage',
    heroEyebrow: 'Flagship PR agency / Cosmetic Media Group',
    heroTitle: 'COSMETIC',
    heroAccent: 'PR.',
    heroIntro: 'The established specialist PR agency behind more than a decade of recognised work across medical aesthetics, beauty and wellness.',
    heroBody: 'Cosmetic Media Group is the umbrella brand. Cosmetic PR remains its flagship communications agency — combining deep sector knowledge, long-standing media relationships and bespoke strategy to build trusted reputations.',
    heroImage: await sanityImage('/images/editorial.jpg', 'Cosmetic PR editorial and media work'),
    heroCaption: 'Specialist PR. Lasting authority.',
    heroCaptionMeta: 'Medical aesthetics / beauty / wellness',
    identityStrip: [
      {_key: 'position', label: 'Position', value: 'Flagship agency within CMG'},
      {_key: 'established', label: 'Established', value: '12+ years of brand recognition'},
      {_key: 'markets', label: 'Markets', value: 'UK · Dubai · Global'},
      {_key: 'focus', label: 'Focus', value: 'Trust · media · reputation'}
    ],
    storyEyebrow: '01 — The agency',
    storySideHeading: 'Built inside the aesthetics industry.',
    storySideText: 'A specialist agency with a long history of representing clinicians, clinics, devices, products and recognised industry names.',
    storyHeading: 'PR that builds',
    storyAccent: 'recognition with substance.',
    storyBody: [
      block('Cosmetic PR is a boutique, full-service public relations agency specialising in medical aesthetics, beauty and wellness. Its sector knowledge supports campaigns that do more than generate coverage — helping clients strengthen credibility, visibility and commercial positioning.', 'cpr-story-1'),
      block('Long-standing relationships with consumer, trade, beauty and business media enable the agency to connect the right experts and stories with the publications and platforms that matter. That heritage now sits within the wider Cosmetic Media Group ecosystem, giving clients access to a broader mix of editorial, personal branding, content, education, podcasts, events and industry platforms.', 'cpr-story-2')
    ],
    capabilitiesEyebrow: '02 — Specialist capability',
    capabilitiesNote: 'A concise summary of the current Cosmetic PR website. Final live service list should be approved by the client before migration.',
    capabilitiesHeading: 'WHAT COSMETIC PR BRINGS TO THE TABLE',
    capabilities: [
      {_key: 'pr', title: 'PR & Communications', description: 'Media relations, expert positioning, editorial opportunities, press launches, awards and long-term reputation strategy.'},
      {_key: 'digital', title: 'Digital Marketing', description: 'Audience communications, email marketing and digital activity designed to keep clients informed and engaged.'},
      {_key: 'content', title: 'Content Creation', description: 'Written and creative content, newsletters, brand materials and campaign assets aligned to wider communications objectives.'},
      {_key: 'brand', title: 'Brand Development', description: 'Strategic support for businesses and products developing their identity, positioning and route to market.'},
      {_key: 'events', title: 'Events', description: 'Launches, press events and industry experiences managed from concept and guest strategy through to activation.'},
      {_key: 'social', title: 'Social Media', description: 'Social strategy, consultancy, management and content designed to build a connected public profile.'}
    ],
    casesEyebrow: '03 — Selected impact',
    casesHeading: 'Proof built through real campaigns.',
    cases: [
      {_key: 'nina', label: 'Dr Nina Bal / expert positioning', title: 'From national coverage to a 10-minute ITV This Morning appearance.', description: "Cosmetic PR built Dr Nina's media credibility through quality national coverage before securing the television opportunity that had been a central campaign objective.", tags: 'Television / national press / expert authority'},
      {_key: 'tatiana', label: 'Dr Tatiana / long-term profile', title: 'Top-tier press and broadcast visibility.', description: 'Long-term PR and social support secured coverage across leading fashion, beauty, newspaper and lifestyle titles alongside Channel 5 and MTV exposure.', tags: 'Press / broadcast / brand growth'},
      {_key: 'inmode', label: 'InMode / brand awareness', title: '140+ pieces of published press coverage.', description: 'National and trade press, award wins, influencer partnerships, events and wider marketing support helped raise awareness of InMode and its treatment technologies.', tags: 'PR / awards / influencers / events'}
    ],
    testimonialsEyebrow: '04 — Client perspective',
    testimonialsHeading: 'Trusted because the work delivers.',
    testimonials: [
      {_key: 'nina', name: 'Dr Nina Bal', quote: "Highlights professionalism, kindness and the team's ability to deliver meaningful press and television opportunities."},
      {_key: 'usman', name: 'Dr Usman Qureshi', quote: "Credits the team's specialist cosmetic-industry understanding, media connections and consistent delivery against profile-building goals."},
      {_key: 'inmode', name: 'InMode UK', quote: 'Describes Cosmetic PR as proactive, creative and willing to go beyond the expected to make a measurable difference to the business.'}
    ],
    publicationsEyebrow: '05 — Media relationships',
    publicationsHeading: 'Stories placed where credibility grows.',
    publicationsIntro: 'Cosmetic PR connects expert stories with the consumer, beauty, trade, lifestyle and broadcast platforms that shape visibility and trust.',
    publications: ['VOGUE', "Harper's Bazaar", 'GRAZIA', 'Tatler', 'Marie Claire', 'Cosmopolitan', 'The Telegraph', 'Daily Mail', 'HELLO!', 'Channel 5', 'MTV', 'This Morning'],
    summaryEyebrow: '06 — What the legacy site proves',
    summaryHeading: 'A full-site summary, refined into one editorial page.',
    summaryBody: [
      block('This page is intentionally a concise editorial summary of the previous Cosmetic PR website, bringing its strongest proof points into the new Cosmetic Media Group design system without recreating the older site page-for-page.', 'cpr-summary-1'),
      block('It captures the essentials of the original platform: sector specialism, service breadth, award and event support, content creation, social and digital communications, proven media relationships, long-term client trust and selected campaign outcomes.', 'cpr-summary-2'),
      block('For the final live build, the developer can further expand this page with additional approved case studies, publication logos, testimonials, before-and-after campaign outcomes or archived press examples if the client wants a deeper legacy showcase.', 'cpr-summary-3')
    ],
    summaryPoints: [
      {_key: 'included', label: 'Included here', text: 'Agency positioning, services, case studies and testimonials'},
      {_key: 'later', label: 'Can be added later', text: 'More case studies, press logos, screenshots, awards and archived campaign highlights'},
      {_key: 'role', label: 'Role in the new site', text: 'The flagship agency page within the wider Cosmetic Media Group ecosystem'}
    ],
    newsletterEyebrow: 'Stay connected',
    newsletterHeading: 'PR insight from inside the industry.',
    newsletterText: 'Follow the latest campaigns, media opportunities, expert perspectives and wider Cosmetic Media Group updates.'
  })

  await client.createOrReplace({
    _id: 'membershipPage',
    _type: 'membershipPage',
    comingSoonLabel: 'Coming soon',
    heroTitle: 'Closer to the',
    heroAccent: 'industry.',
    intro: 'A future membership for professionals and brands who want deeper insight, better resources and meaningful access to the conversations shaping aesthetics.',
    benefitsEyebrow: 'The future member experience',
    benefitsHeading: 'Useful access. Not more noise.',
    benefitsIntro: 'The membership is planned around practical value, credible intelligence and the ability to participate more closely in the Cosmetic Media Group ecosystem.',
    benefits: [
      {_key: 'intelligence', title: 'Member intelligence', description: 'Premium reports, deeper trend analysis and early access to annual guides.'},
      {_key: 'resources', title: 'Practical resources', description: 'Downloadable templates, training sessions, courses and implementation toolkits.'},
      {_key: 'access', title: 'Industry access', description: 'Selected events, conversations, opportunities and member-only content.'}
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
    _id: 'mediaHubPage',
    _type: 'mediaHubPage',
    heroTitle: 'The industry,',
    heroAccent: 'edited.',
    intro: 'Articles, interviews, videos, podcasts, industry news, trends, opinion and expert content for the people shaping modern aesthetics.',
    ctaEyebrow: 'For journalists',
    ctaHeading: 'Need an expert comment or interview?',
    ctaText: 'Use the dedicated media desk to submit your subject, deadline and required expertise.',
    ctaButtonLabel: 'Open the media desk',
    ctaButtonHref: '/media-desk'
  })

  await client.createOrReplace({
    _id: 'videoPage',
    _type: 'videoPage',
    heroTitle: 'Video',
    heroAccent: 'Gallery.',
    intro: 'Live broadcast, streaming, content and video production — a selection of work from across the aesthetics industry.',
    ctaEyebrow: 'For journalists',
    ctaHeading: 'Need an expert comment or interview?',
    ctaText: 'Use the dedicated media desk to submit your subject, deadline and required expertise.',
    ctaButtonLabel: 'Open the media desk',
    ctaButtonHref: '/media-desk'
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
    audience: ['Leading dermatologists and plastic surgeons', 'Aesthetic physicians and practitioners', 'Clinic owners, directors and practice managers', 'Device manufacturers and technology innovators', 'Skincare brands and product formulators', 'Industry educators, regulatory voices, press and VIP guests'],
    eventExperience: ['Luxury gala dinner', 'Live entertainment', 'Awards presentations', 'Red carpet arrivals', 'Press interviews and media coverage', 'Premium brand activations', 'Regional and global networking', 'World-class hospitality'],
    sponsorBenefits: ['Brand positioning alongside global excellence', 'Exposure across GCC press, media and industry channels', 'Access to clinic owners, dermatologists, surgeons and leaders', 'On-stage and in-room visibility at a high-profile gala', 'Inclusion in marketing, digital and PR campaigns', 'Exclusive partnership rights within your category'],
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
      // Left empty on purpose: an empty Services list makes the header auto-list every
      // Service document (ordered by each service's `order` field), so new services appear
      // automatically. Editors can hand-pick/reorder by adding links in the Navigation doc.
      links: []
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
