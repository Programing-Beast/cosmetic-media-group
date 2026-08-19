import type {Article, Brand, Homepage, Navigation, Service, SiteSettings, Toolkit, VideoGallery} from '@/types'

export const navigation: Navigation = {
  about: {
    eyebrow: 'Inside Cosmetic Media Group',
    heading: 'The people, purpose and perspective behind the platform.',
    text: 'Discover the story of Cosmetic Media Group, meet founder Lucy Hilson and access the dedicated media desk for journalists.',
    ctaLabel: 'Explore our story',
    ctaHref: '/about',
    links: [
      {label: 'About Cosmetic Media Group', href: '/about'},
      {label: 'Meet the Founder', href: '/about/founder'},
      {label: 'Media Desk for Journalists', href: '/media-desk'},
      {label: 'Contact the Team', href: '/contact'}
    ]
  },
  services: {
    eyebrow: 'Strategic services',
    heading: 'Influence built with intention.',
    text: 'Integrated communications, positioning and content for the people and brands shaping modern aesthetics.',
    ctaLabel: 'View all services',
    ctaHref: '/services',
    links: []
  }
}

export const siteSettings: SiteSettings = {
  title: 'Cosmetic Media Group',
  tagline: 'Where aesthetics meets influence.',
  description:
    'A modern media and communications company connecting the people, brands and ideas shaping the global aesthetics industry.',
  logo: '/images/logo.png',
  email: 'hello@cosmeticmediagroup.com',
  phone: '+44 (0) 7958 429 130',
  locations: 'London · Dubai · Global',
  socialLinks: [
    {platform: 'Instagram', url: '#'},
    {platform: 'LinkedIn', url: '#'}
  ],
  legalLinks: [
    {label: 'Privacy', url: '#'},
    {label: 'Terms', url: '#'},
    {label: 'Accessibility', url: '#'}
  ]
}

export const services: Service[] = [
  {
    title: 'PR',
    slug: 'pr',
    eyebrow: 'Public relations & strategic communications',
    intro: 'Strategic communications through the established Cosmetic PR agency, built around trust, credibility and industry relevance.',
    listDescription: 'Reputation, credibility and media relevance built through intelligent, bespoke campaigns.',
    listCta: 'Explore Cosmetic PR ↗',
    detailIntro: 'Specialist PR that builds trust, creates relevance and positions experts and brands at the centre of the aesthetics conversation.',
    body:
      'Drawing on deep industry knowledge and long-standing media relationships, Cosmetic Media Group develops bespoke campaigns that move beyond short-term exposure. Every strategy is designed to build authority, support commercial growth and create a meaningful public profile.',
    image: '/images/editorial.jpg',
    deliverables: [
      'Bespoke PR strategy and campaign planning',
      'Press releases, features and media alerts',
      'Consumer and trade media relations',
      'Expert positioning and commentary opportunities',
      'Influencer partnerships and collaborations',
      'Awards strategy, entries and launch support',
      'Ongoing business and brand counsel'
    ],
    outcomes: [
      'A more trusted public reputation',
      'Stronger media visibility and relevance',
      'Clearer authority within your category'
    ]
  },
  {
    title: 'Personal Branding',
    slug: 'personal-branding',
    eyebrow: 'Build the name behind the expertise',
    intro: 'Distinctive positioning for founders, clinicians and experts ready to lead the conversation.',
    listDescription: 'A clear point of view and visible platform for founders, clinicians and recognised experts.',
    listCta: 'Explore personal branding ↗',
    detailIntro: 'Distinctive personal brands for founders, clinicians, experts and industry leaders ready to become recognised voices.',
    body:
      'We clarify what makes you relevant, shape your point of view and create a visible platform around your expertise. From thought leadership and media opportunities to keynote positioning and content direction, the goal is a credible personal brand with lasting influence.',
    image: '/images/speaker.jpg',
    deliverables: [
      'Personal positioning and narrative development',
      'Thought leadership strategy',
      'Founder and expert media profiles',
      'LinkedIn and social content direction',
      'Speaking and panel opportunities',
      'Signature topics and editorial pillars',
      'Reputation and visibility roadmap'
    ],
    outcomes: [
      'A distinctive professional position',
      'Greater recognition as an expert voice',
      'More valuable media and speaking opportunities'
    ]
  },
  {
    title: 'Content Studio',
    slug: 'content-studio',
    eyebrow: 'Premium content and brand storytelling',
    intro: 'Editorial, film, photography and social storytelling created with strategic purpose.',
    listDescription: 'Premium editorial, film, photography and social content created with strategic purpose.',
    listCta: 'Explore the studio ↗',
    detailIntro: 'Editorial, social, video and campaign content created for the way audiences discover and experience brands today.',
    body:
      'The Content Studio brings strategic thinking and premium production together. We create connected content systems rather than isolated assets, ensuring every film, photograph, article and campaign feels unmistakably on-brand.',
    image: '/images/studio.jpg',
    deliverables: [
      'Creative direction and campaign concepts',
      'Editorial photography and video production',
      'Social-first content and short-form video',
      'Website, brochure and campaign copywriting',
      'Expert interviews and branded storytelling',
      'Before-and-after content direction',
      'Content calendars and launch assets'
    ],
    outcomes: [
      'A premium and consistent visual presence',
      'Content that communicates expertise clearly',
      'Reusable assets across campaigns and channels'
    ]
  },
  {
    title: 'Media Training',
    slug: 'media-training',
    eyebrow: 'Communicate with clarity and confidence',
    intro: 'Clear, confident communication for interviews, panels, podcasts and high-pressure moments.',
    listDescription: 'Confident, clear communication for interviews, panels, podcasts, video and keynotes.',
    listCta: 'Explore media training ↗',
    detailIntro: 'Practical preparation for interviews, panels, keynote appearances, video content and high-pressure media moments.',
    body:
      'Our media training helps spokespeople communicate complex topics clearly while staying authoritative, human and on message. Sessions can be tailored to an individual, leadership team or wider organisation.',
    image: '/images/team.jpg',
    deliverables: [
      'Core message and narrative development',
      'Interview technique and response structure',
      'Camera and broadcast confidence',
      'Handling difficult or sensitive questions',
      'Panel, keynote and podcast preparation',
      'Mock interviews and constructive feedback',
      'Crisis communications preparation'
    ],
    outcomes: [
      'More confident interviews and appearances',
      'Clearer answers under pressure',
      'Reduced reputational risk'
    ]
  },
  {
    title: 'Podcast Production',
    slug: 'podcast-production',
    eyebrow: 'Ideas worth hearing',
    intro: 'End-to-end audio formats for brands and experts ready to own an industry conversation.',
    listDescription: 'End-to-end podcast creation for brands ready to own a meaningful industry conversation.',
    listCta: 'Explore podcast production ↗',
    detailIntro: 'End-to-end podcast development for brands and experts who want to own a meaningful industry conversation.',
    body:
      'From concept and format to recording, editing and launch, we create polished podcast series with a clear editorial purpose. Each programme is designed to build authority, generate reusable content and deepen audience connection.',
    image: '/images/podcast.jpg',
    deliverables: [
      'Concept, title and format development',
      'Guest strategy and episode planning',
      'Studio recording and remote production',
      'Editing, sound design and mastering',
      'Show notes, trailers and social clips',
      'Distribution and platform set-up',
      'Ongoing series production and reporting'
    ],
    outcomes: [
      'An owned platform for your ideas',
      'Deeper audience trust and engagement',
      'A repeatable source of multi-channel content'
    ]
  },
  {
    title: 'Events',
    slug: 'events',
    eyebrow: 'Experiences that become conversations',
    intro: 'Launches, press experiences and gatherings designed to create impact beyond the room.',
    listDescription: 'Launches, press experiences and gatherings designed to generate lasting attention and value.',
    listCta: 'Explore events ↗',
    detailIntro: 'Strategic events, launches and industry gatherings designed to create attention before, during and after the room fills.',
    body:
      'From intimate press dinners to major brand launches and industry events, we shape the concept, guest experience, media story and content opportunity. The result is an event that delivers far beyond the day itself.',
    image: '/images/event.jpg',
    deliverables: [
      'Creative event concept and positioning',
      'Venue, supplier and production coordination',
      'Guest list, media and influencer outreach',
      'Launch events and press experiences',
      'Panel sessions and thought-leadership programmes',
      'Event content and social coverage',
      'Post-event media and content strategy'
    ],
    outcomes: [
      'Attention before, during and after the event',
      'Stronger media and industry relationships',
      'Reusable content and ongoing visibility'
    ]
  }
]

export const articles: Article[] = [
  {
    title: 'The future of aesthetic medicine',
    slug: 'future-of-aesthetic-medicine',
    excerpt:
      'From regenerative treatments to changing consumer expectations, we examine the ideas redefining modern aesthetics.',
    category: 'Perspective',
    format: 'article',
    publishedAt: '2026-07-01T09:00:00.000Z',
    readingTime: '6 min read',
    image: '/images/beauty.jpg',
    featured: true,
    author: {name: 'Cosmetic Media Group Editorial', role: 'Editorial Team'},
    body: [
      {
        _key: 'intro',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'intro-span',
            _type: 'span',
            marks: [],
            text: 'The aesthetics industry is entering a period in which reputation, evidence, patient expectations and responsible communication are becoming as important as technical innovation.'
          }
        ]
      },
      {
        _key: 'body',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'body-span',
            _type: 'span',
            marks: [],
            text: 'This feature explores the themes that will shape the next phase of the market and the opportunities for the experts and brands prepared to lead with authority.'
          }
        ]
      }
    ]
  },
  {
    title: 'Building trust in aesthetics: an expert conversation',
    slug: 'building-trust-in-aesthetics',
    excerpt: 'A conversation about credibility, communication and the changing expectations of modern patients.',
    category: 'Interview',
    format: 'interview',
    publishedAt: '2026-06-21T09:00:00.000Z',
    image: '/images/editorial.jpg',
    author: {name: 'Lucy Hilson', role: 'Founder'}
  },
  {
    title: 'Why reputation is becoming aesthetics’ most valuable asset',
    slug: 'reputation-most-valuable-asset',
    excerpt: 'The commercial and cultural case for investing in trust before attention.',
    category: 'Media',
    format: 'podcast',
    publishedAt: '2026-06-10T09:00:00.000Z',
    image: '/images/podcast.jpg',
    externalVideoUrl: 'https://www.youtube.com/'
  },
  {
    title: 'What patients and consumers really want now',
    slug: 'what-patients-want-now',
    excerpt: 'A trend report on confidence, evidence, experience and transparency.',
    category: 'Trend report',
    format: 'report',
    publishedAt: '2026-05-27T09:00:00.000Z',
    image: '/images/product.jpg'
  },
  {
    title: 'The rise of evidence-led aesthetics',
    slug: 'rise-of-evidence-led-aesthetics',
    excerpt: 'Why credible data and transparent outcomes are becoming the new currency of trust in modern aesthetics.',
    category: 'Feature',
    format: 'article',
    publishedAt: '2026-05-20T09:00:00.000Z',
    readingTime: '5 min read',
    image: '/images/editorial.jpg',
    author: {name: 'Cosmetic Media Group Editorial', role: 'Editorial Team'}
  },
  {
    title: 'Rethinking beauty standards in a global market',
    slug: 'rethinking-beauty-standards',
    excerpt: 'A perspective on identity, influence and responsibility as aesthetics moves into the mainstream.',
    category: 'Opinion',
    format: 'opinion',
    publishedAt: '2026-05-15T09:00:00.000Z',
    readingTime: '5 min read',
    image: '/images/beauty.jpg',
    author: {name: 'Cosmetic Media Group Editorial', role: 'Editorial Team'}
  },
  {
    title: 'From publicity to platform: the future of influence in aesthetics',
    slug: 'from-publicity-to-platform',
    excerpt: 'The companies shaping the next era will not simply promote themselves. They will build trust, create ideas and contribute meaningfully to the industry around them.',
    category: 'Industry perspective',
    format: 'article',
    publishedAt: '2026-07-17T09:00:00.000Z',
    readingTime: '8 minute read',
    image: '/images/magazine.jpg',
    author: {name: 'Cosmetic Media Group Editorial', role: 'Editorial Team'},
    tags: ['Influence', 'Media strategy', 'Industry leadership'],
    body: [
      {_key: 'pp-1', _type: 'block', style: 'normal', markDefs: [], children: [{_key: 'pp-1-s', _type: 'span', marks: [], text: 'For years, visibility was often treated as the final objective. Secure coverage, generate attention, stay present. But in a crowded, fast-moving category, attention without meaning has a short lifespan.'}]},
      {_key: 'pp-2', _type: 'block', style: 'normal', markDefs: [], children: [{_key: 'pp-2-s', _type: 'span', marks: [], text: 'The next generation of influential aesthetics brands will think differently. They will not see communications as a promotional function operating around the edges of the business. They will use it to define a category, establish a point of view and create genuine value for the audiences they want to reach.'}]},
      {_key: 'pp-h1', _type: 'block', style: 'h2', markDefs: [], children: [{_key: 'pp-h1-s', _type: 'span', marks: [], text: 'Authority is built through contribution'}]},
      {_key: 'pp-3', _type: 'block', style: 'normal', markDefs: [], children: [{_key: 'pp-3-s', _type: 'span', marks: [], text: 'Modern influence is increasingly earned through what a business contributes to the conversation. That could be original research, a strong expert perspective, better patient education, an industry event, a useful guide or an editorial platform that gives important voices somewhere to be heard.'}]},
      {_key: 'pp-4', _type: 'block', style: 'normal', markDefs: [], children: [{_key: 'pp-4-s', _type: 'span', marks: [], text: 'This is the distinction between receiving attention and becoming a source of attention. One is campaign-led. The other becomes an asset.'}]},
      {_key: 'pp-h2', _type: 'block', style: 'h2', markDefs: [], children: [{_key: 'pp-h2-s', _type: 'span', marks: [], text: 'From isolated channels to connected ecosystems'}]},
      {_key: 'pp-5', _type: 'block', style: 'normal', markDefs: [], children: [{_key: 'pp-5-s', _type: 'span', marks: [], text: 'PR, content, podcasts, events, awards, reports and membership products are often developed separately. The stronger opportunity is to connect them around a coherent purpose. A research report can become a media story, an event theme, a podcast discussion, a toolkit and a year-long source of expert content.'}]},
      {_key: 'pp-6', _type: 'block', style: 'normal', markDefs: [], children: [{_key: 'pp-6-s', _type: 'span', marks: [], text: 'When ideas move intelligently across formats, every channel becomes more valuable. Audiences encounter the same authority in different ways, while the organisation builds a growing library of intellectual and editorial assets.'}]},
      {_key: 'pp-q', _type: 'block', style: 'blockquote', markDefs: [], children: [{_key: 'pp-q-s', _type: 'span', marks: [], text: 'The goal is no longer to appear in the conversation. It is to help shape what the conversation becomes.'}]},
      {_key: 'pp-h3', _type: 'block', style: 'h2', markDefs: [], children: [{_key: 'pp-h3-s', _type: 'span', marks: [], text: 'A more meaningful model of influence'}]},
      {_key: 'pp-7', _type: 'block', style: 'normal', markDefs: [], children: [{_key: 'pp-7-s', _type: 'span', marks: [], text: 'For aesthetics businesses, credibility matters. The industry is highly visible, deeply personal and continually evolving. The organisations that lead it will balance commercial ambition with clear standards, informed communication and a willingness to add substance.'}]},
      {_key: 'pp-8', _type: 'block', style: 'normal', markDefs: [], children: [{_key: 'pp-8-s', _type: 'span', marks: [], text: 'That is the opportunity behind Cosmetic Media Group: not simply to promote the industry, but to help it think, communicate and evolve more intelligently.'}]}
    ]
  },
  {
    title: 'In conversation: building authority in a changing aesthetics market',
    slug: 'in-conversation-building-authority',
    excerpt: 'Original insight, thoughtful context and expert perspectives from across the global aesthetics industry.',
    category: 'Interview',
    format: 'video',
    publishedAt: '2026-07-25T09:00:00.000Z',
    image: '/images/event.jpg',
    externalVideoUrl: 'https://www.youtube.com/watch?v=jQrVaPozhnQ'
  },
  {
    title: 'The people raising standards across modern aesthetics',
    slug: 'people-raising-standards',
    excerpt: 'Original insight, thoughtful context and expert perspectives from across the global aesthetics industry.',
    category: 'Interview',
    format: 'interview',
    publishedAt: '2026-07-24T09:00:00.000Z',
    image: '/images/team.jpg',
    author: {name: 'Cosmetic Media Group Editorial', role: 'Editorial Team'}
  }
]

export const brands: Brand[] = [
  {
    title: 'Cosmetic PR',
    slug: 'cosmetic-pr',
    type: 'Strategic communications',
    description: 'Specialist PR and communications for the leading experts, clinics and brands shaping aesthetics, beauty and wellness.',
    image: '/images/editorial.jpg',
    href: '/cosmetic-pr',
    ctaLabel: 'Explore Cosmetic PR ↗'
  },
  {
    title: 'The Aesthetics Edit',
    slug: 'the-aesthetics-edit',
    type: 'Independent editorial platform',
    description: 'Editorial coverage, expert commentary and intelligent consumer-facing content from across the aesthetics landscape.',
    image: '/images/magazine.jpg',
    ctaLabel: 'Visit the standalone brand ↗'
  },
  {
    title: 'Diamond Awards',
    slug: 'diamond-awards',
    type: 'Industry recognition',
    description: 'A credible platform celebrating the people, practices and innovations raising standards across aesthetics.',
    image: '/images/awards.jpg',
    href: '/diamond-awards',
    ctaLabel: 'Explore the awards ↗'
  },
  {
    title: 'Content Studio',
    slug: 'content-studio',
    type: 'Creative production',
    description: 'Premium photography, film, editorial production and brand storytelling built for modern channels.',
    image: '/images/studio.jpg',
    href: '/services/content-studio',
    ctaLabel: 'Enter the studio ↗'
  }
]

export const toolkits: Toolkit[] = [
  {title: 'The Aesthetics Trends Guide 2027', slug: 'trends-guide-2027', type: 'Annual Report', description: 'Clear, practical insight designed specifically for the aesthetics industry.', access: 'free', coverStyle: 'pink'},
  {title: 'Building an Expert Personal Brand', slug: 'expert-personal-brand', type: 'Practical Guide', description: 'Clear, practical insight designed specifically for the aesthetics industry.', access: 'free', coverStyle: 'dark'},
  {title: 'Media Interview Preparation Workbook', slug: 'media-interview-workbook', type: 'Template', description: 'Clear, practical insight designed specifically for the aesthetics industry.', access: 'free', coverStyle: 'cream'},
  {title: 'A Clinic’s Guide to Reputation Strategy', slug: 'clinic-reputation-strategy', type: 'Strategic Guide', description: 'Clear, practical insight designed specifically for the aesthetics industry.', access: 'members', coverStyle: 'dark'},
  {title: 'The Annual State of Aesthetics Report', slug: 'state-of-aesthetics', type: 'Research Report', description: 'Clear, practical insight designed specifically for the aesthetics industry.', access: 'members', coverStyle: 'pink'},
  {title: 'Launch Campaign Planning Toolkit', slug: 'launch-campaign-toolkit', type: 'Planning Template', description: 'Clear, practical insight designed specifically for the aesthetics industry.', access: 'members', coverStyle: 'cream'}
]

export const videoGalleries: VideoGallery[] = [
  {
    title: 'Dubai NYE 2025',
    slug: 'dubai-nye-2025',
    category: 'Live Broadcast',
    poster: '/images/hero.jpg',
    intro: 'Multi-camera live production and broadcast direction from the control room.',
    order: 1,
    videos: [
      {heading: 'Live Broadcast (PCR)', url: 'https://www.youtube.com/watch?v=jQrVaPozhnQ', caption: 'Main programme feed from the production control room.'},
      {heading: 'Countdown Show', url: 'https://vimeo.com/76979871', caption: 'Vimeo — headline countdown segment.'},
      {heading: 'Split-Screen Coverage', url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ', caption: 'Multi-feed split-screen coverage.'}
    ]
  },
  {
    title: 'Awards Show',
    slug: 'awards-show',
    category: 'Awards',
    poster: '/images/awards.jpg',
    order: 2,
    videos: [
      {heading: 'Awards Show Broadcast', url: 'https://www.youtube.com/watch?v=jQrVaPozhnQ'},
      {heading: 'Red Carpet Stream', url: 'https://vimeo.com/148751763', caption: 'Vimeo — pre-show red carpet.'},
      {heading: 'Highlights Reel', url: 'https://vimeo.com/22439234', caption: 'Vimeo — post-event highlights.'}
    ]
  },
  {
    title: 'Product Launch',
    slug: 'product-launch',
    category: 'Streaming',
    poster: '/images/product.jpg',
    intro: 'Polished live and on-demand streams for aesthetic brand launches.',
    order: 3,
    videos: [
      {heading: 'Product Launch Stream', url: 'https://vimeo.com/76979871', caption: 'Vimeo — live launch stream.'},
      {heading: 'Behind the Scenes', url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ'}
    ]
  },
  {
    title: 'Clinic Webinar',
    slug: 'clinic-webinar',
    category: 'Streaming',
    poster: '/images/studio.jpg',
    order: 4,
    videos: [
      {heading: 'Clinic Webinar', url: 'https://vimeo.com/148751763', caption: 'Vimeo — full webinar recording.'}
    ]
  },
  {
    title: 'Brand Film',
    slug: 'brand-film',
    category: 'Content',
    poster: '/images/editorial.jpg',
    intro: 'Original content and brand films produced end to end.',
    order: 5,
    videos: [
      {heading: 'Brand Film', url: 'https://vimeo.com/22439234', caption: 'Vimeo — hero brand film.'},
      {heading: 'Teaser Cut', url: 'https://www.youtube.com/watch?v=jQrVaPozhnQ'}
    ]
  },
  {
    title: 'Founder Interview',
    slug: 'founder-interview',
    category: 'Interviews',
    poster: '/images/founder.jpg',
    order: 6,
    videos: [
      {heading: 'Founder Interview', url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ', caption: 'YouTube — long-form founder conversation.'}
    ]
  }
]

export const homepage: Homepage = {
  hero: {
    eyebrowLeft: 'Media / communications / influence',
    eyebrowRight: 'Cosmetic Media Group / 2027',
    titleBefore: 'Where aesthetics meets',
    titleAccent: 'influence.',
    identity: 'A media and communications platform built to help the aesthetics industry be seen, trusted and remembered.',
    summary:
      'Cosmetic PR, editorial content, education, podcasts, events, personal branding, awards and practical industry intelligence — connected within one trusted destination.',
    image: '/images/hero.jpg',
    imageCaption: 'The industry, in motion.',
    imageMeta: 'Interviews / podcasts / events / behind the scenes',
    film: ['/images/podcast.jpg', '/images/event.jpg'],
    filmBadge: 'Looping editorial film / client footage',
    primaryCta: {label: 'Discover the story ↗', href: '/about', style: 'dark'},
    secondaryCta: {label: 'Enter the Media Hub ↗', href: '/media-hub', style: 'light'}
  },
  story: {
    heading: 'More than PR.',
    opening: 'Cosmetic Media Group is the umbrella platform connecting the experts, brands and ideas shaping the future of aesthetics.',
    body: [
      {_key:'story-a',_type:'block',style:'normal',markDefs:[],children:[{_key:'story-a-span',_type:'span',marks:[],text:'For more than 20 years, we have helped aesthetic professionals earn the recognition they deserve through strategic PR. Cosmetic PR remains the flagship specialist agency at the heart of that heritage.'}]},
      {_key:'story-b',_type:'block',style:'normal',markDefs:[],children:[{_key:'story-b-span',_type:'span',marks:[],text:'Today, Cosmetic Media Group takes that experience further. Through media visibility, content, education, podcasts, events, personal branding, awards and industry resources, we are creating one destination where experts can raise their profile, share their knowledge, build credibility and grow their influence.'}]},
      {_key:'story-c',_type:'block',style:'normal',markDefs:[],children:[{_key:'story-c-span',_type:'span',marks:[],text:'Because the future of aesthetics will not be led by the loudest voices. It will be led by the most trusted ones.'}]}
    ]
  },
  sectionOrder: [
    'trustedBrands',
    'story',
    'credibility',
    'founderTeaser',
    'services',
    'mediaHub',
    'cprSpotlight',
    'mediaDesk',
    'awardsSpotlight',
    'brands',
    'resourcesMembership',
    'newsletter',
    'contact'
  ],
  stats: [
    {value: '20+', numericValue: 20, suffix: '+', label: 'Years in aesthetics PR'},
    {value: '100,000+', numericValue: 100000, suffix: '+', label: 'Media features secured', note: 'Figure to be verified before launch'},
    {value: '100s', numericValue: 100, suffix: 's', label: 'Experts represented'},
    {value: 'Global', label: 'Speaker at international industry events'}
  ],
  credibilityFacts: [
    {label: '01 / Leadership', title: 'Founder of Cosmetic Media Group'},
    {label: '02 / Recognition', title: 'Founder of the Diamond Awards Dubai'},
    {label: '03 / Editorial', title: 'Co-founder of The Aesthetics Edit — Dubai’s first and only aesthetics guide'},
    {label: '04 / Voice', title: 'Host of industry interviews and podcasts'}
  ],
  publications: ['VOGUE', 'GRAZIA', 'Harper’s BAZAAR', 'HELLO!', 'COSMOPOLITAN', 'Marie Claire', 'Daily Mail', 'The Times'],
  clientLogos: [
    {name: 'Leading Clinic'},
    {name: 'Doctor / Expert'},
    {name: 'Device Brand'},
    {name: 'Skincare Brand'},
    {name: 'Industry Partner'},
    {name: 'Media Partner'}
  ],
  latestRail: [
    {label: 'PR insight', title: 'Why expert positioning matters more than visibility alone.', actionLabel: 'Read insight ↗', href: '/media-hub'},
    {label: 'Behind the scenes', title: 'Inside the conversations, shoots and events shaping CMG.', actionLabel: 'Follow the story ↗', href: '/about/founder'},
    {label: 'Podcast', title: 'Trust, influence and the next chapter for aesthetics media.', actionLabel: 'Listen / watch ↗', href: '/media-hub'}
  ],
  founderFilm: ['/images/founder.jpg', '/images/speaker.jpg', '/images/podcast.jpg'],
  brandRail: [
    {label: 'Communications', title: 'Cosmetic PR', description: 'The established flagship PR agency within Cosmetic Media Group.', href: '/cosmetic-pr'},
    {label: 'Editorial', title: 'The Aesthetics Edit', description: 'An independent standalone editorial platform and influential industry voice.', href: '/our-brands'},
    {label: 'Recognition', title: 'Diamond Awards', description: 'A trusted platform championing safety, ethics, innovation and excellence.', href: '/diamond-awards'},
    {label: 'Intelligence', title: 'Education & Insights', description: 'Research, annual guides, reports, training and practical resources.', href: '/toolkits'}
  ],
  resourceTiles: [
    {tag: 'Guide / Free', title: 'Media Interview Preparation Kit', actionLabel: 'Download ↗', href: '/toolkits'},
    {tag: 'Annual report', title: 'Aesthetics Industry Outlook', actionLabel: 'Explore ↗', href: '/toolkits'},
    {tag: 'Template / Free', title: 'PR Campaign Planning Toolkit', actionLabel: 'Download ↗', href: '/toolkits'}
  ],
  cprSpotlight: {
    eyebrow: '05 — Cosmetic PR',
    heading: 'The flagship agency.',
    accent: 'The foundation.',
    intro: 'Cosmetic Media Group is the umbrella brand. Cosmetic PR remains its established specialist PR agency — recognised for deep aesthetics expertise, long-standing media relationships and campaigns designed to build trusted reputations.',
    statusChips: ['12+ years of brand recognition', 'Medical aesthetics / beauty / wellness', 'UK / Dubai / global'],
    cards: [
      {label: 'Flagship agency / media authority', title: 'PR built around credibility, not noise.', text: 'Specialist knowledge, editorial judgement and media relationships that position doctors, clinics and brands as recognised industry voices.', ctaLabel: 'Discover the agency ↗', image: '/images/editorial.jpg'},
      {label: 'Selected impact / Dr Nina Bal', title: "From expert positioning to ITV's This Morning.", text: 'A focused national PR strategy built credibility before securing a major live television opportunity.', ctaLabel: 'View selected work ↗'},
      {label: 'Selected impact / InMode', title: '140+ pieces of published coverage.', text: 'Press, awards, influencer partnerships and event support helped increase awareness of the InMode brand and technologies.', ctaLabel: 'View selected work ↗'}
    ]
  }
}
