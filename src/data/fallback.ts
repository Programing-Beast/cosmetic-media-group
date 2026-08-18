import type {Article, Brand, Homepage, Navigation, Service, SiteSettings, Toolkit, VideoGallery} from '@/types'

export const navigation: Navigation = {
  about: {
    eyebrow: 'Our story and authority',
    heading: 'The people and purpose behind the platform.',
    text: 'Discover Cosmetic Media Group, meet founder Lucy Hilson and access the dedicated Media Desk for journalists.',
    ctaLabel: 'Explore About',
    ctaHref: '/about',
    links: [
      {label: 'About Cosmetic Media Group', href: '/about'},
      {label: 'Meet the Founder', href: '/about/founder'},
      {label: 'Media Desk for Journalists', href: '/media-desk'},
      {label: 'Contact the Team', href: '/contact'}
    ]
  },
  services: {
    eyebrow: 'Integrated communications',
    heading: 'Build visibility, trust and influence.',
    text: 'A connected offer spanning reputation, profile, content, training, podcasts and experiences.',
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
    eyebrow: 'Strategic communications',
    intro: 'Strategic communications through the established Cosmetic PR agency, built around trust, credibility and industry relevance.',
    body:
      'Our PR work combines clear positioning, media relationships, expert profiling, strategic storytelling and reputation management. The objective is not simply coverage. It is recognition that builds trust, relevance and long-term commercial value.',
    image: '/images/editorial.jpg',
    deliverables: [
      'Strategic PR planning and positioning',
      'Media relations and press office support',
      'Expert commentary and thought leadership',
      'Launches, announcements and campaigns',
      'Reputation and issues guidance',
      'Coverage reporting and amplification'
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
    eyebrow: 'Recognised authority',
    intro: 'Distinctive positioning for founders, clinicians and experts ready to lead the conversation.',
    body:
      'We build personal brands around expertise, credibility and a clear point of view. This includes positioning, narrative, media presence, content planning, speaking opportunities and a platform that makes the individual easier to discover, trust and remember.',
    image: '/images/speaker.jpg',
    deliverables: [
      'Personal positioning and message development',
      'Expert biography and profile architecture',
      'Thought-leadership content direction',
      'Media and speaking opportunity planning',
      'Social and editorial presence guidance',
      'Long-term authority-building roadmap'
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
    eyebrow: 'Editorial production',
    intro: 'Film, photography and editorial storytelling created with strategic purpose.',
    body:
      'The Content Studio creates premium visual and editorial assets that communicate expertise clearly. Every piece is planned around an audience, a message and a commercial or reputational objective rather than content for content’s sake.',
    image: '/images/studio.jpg',
    deliverables: [
      'Editorial photography and creative direction',
      'Brand films and social-first video',
      'Interview and expert-led content',
      'Campaign concepts and production planning',
      'Multi-format content packages',
      'External video-platform delivery and embeds'
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
    eyebrow: 'Confident communication',
    intro: 'Practical preparation for interviews, panels, podcasts, video and high-pressure media moments.',
    body:
      'Media training helps experts communicate complex subjects with clarity, confidence and credibility. Sessions are tailored to real opportunities and include message development, interview technique, difficult questions and practical rehearsal.',
    image: '/images/team.jpg',
    deliverables: [
      'Core-message and soundbite development',
      'Interview and broadcast preparation',
      'Difficult-question handling',
      'Panel, podcast and speaking preparation',
      'Practical recorded rehearsal',
      'Individual feedback and improvement plan'
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
    eyebrow: 'Owned media',
    intro: 'End-to-end audio formats for brands and experts ready to own an industry conversation.',
    body:
      'We develop podcast concepts that support a clear strategic position, then manage the format, guests, production and content amplification. Audio and video are hosted externally and embedded into the website to protect performance.',
    image: '/images/podcast.jpg',
    deliverables: [
      'Podcast concept, name and format',
      'Editorial calendar and guest strategy',
      'Recording and production management',
      'Editing, sound design and show notes',
      'External hosting and distribution setup',
      'Short-form content and campaign amplification'
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
    eyebrow: 'Experiences with impact',
    intro: 'Launches, press experiences and gatherings designed to create value beyond the room.',
    body:
      'Events are planned as media, content and relationship opportunities. We connect the physical experience to a wider communications strategy so attention is created before, during and after the event.',
    image: '/images/event.jpg',
    deliverables: [
      'Event concept and communications strategy',
      'Media and influencer invitation planning',
      'Press materials and speaker messaging',
      'Content capture and amplification',
      'Partnership and sponsor communications',
      'Post-event editorial and media follow-up'
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
    title: 'Video Testing',
    slug: 'video-testing',
    excerpt: 'A short test of the external video embed in the Media Hub.',
    category: 'Video',
    format: 'video',
    publishedAt: '2026-07-28T14:28:29.034Z',
    externalVideoUrl: 'https://www.youtube.com/watch?v=jQrVaPozhnQ'
  }
]

export const brands: Brand[] = [
  {
    title: 'Cosmetic PR',
    slug: 'cosmetic-pr',
    type: 'Communications',
    description: 'The established flagship PR agency within Cosmetic Media Group.',
    image: '/images/editorial.jpg',
    href: '/cosmetic-pr'
  },
  {
    title: 'The Aesthetics Edit',
    slug: 'the-aesthetics-edit',
    type: 'Independent editorial platform',
    description: 'Editorial coverage, expert commentary and intelligent consumer-facing content.',
    image: '/images/magazine.jpg'
  },
  {
    title: 'Diamond Awards',
    slug: 'diamond-awards',
    type: 'Industry recognition',
    description: 'A credible platform celebrating the people, practices and innovations raising standards.',
    image: '/images/awards.jpg',
    href: '/diamond-awards'
  },
  {
    title: 'Content Studio',
    slug: 'content-studio',
    type: 'Creative production',
    description: 'Premium photography, film, editorial production and brand storytelling.',
    image: '/images/studio.jpg',
    href: '/services/content-studio'
  }
]

export const toolkits: Toolkit[] = [
  {title: 'The Aesthetics Trends Guide 2027', slug: 'trends-guide-2027', type: 'Annual report', description: 'A forward-looking editorial guide to the themes shaping aesthetics.', access: 'free', coverStyle: 'pink'},
  {title: 'Building an Expert Personal Brand', slug: 'expert-personal-brand', type: 'Practical guide', description: 'A framework for positioning and communicating professional authority.', access: 'free', coverStyle: 'dark'},
  {title: 'Media Interview Preparation Workbook', slug: 'media-interview-workbook', type: 'Template', description: 'A practical preparation workbook for media opportunities.', access: 'free', coverStyle: 'cream'},
  {title: 'A Clinic’s Guide to Reputation Strategy', slug: 'clinic-reputation-strategy', type: 'Strategic guide', description: 'How to build trust before a reputational issue arises.', access: 'members', coverStyle: 'dark'},
  {title: 'The Annual State of Aesthetics Report', slug: 'state-of-aesthetics', type: 'Research report', description: 'Data, perspectives and emerging market themes.', access: 'members', coverStyle: 'pink'},
  {title: 'Launch Campaign Planning Toolkit', slug: 'launch-campaign-toolkit', type: 'Planning template', description: 'A structured communications plan for launches and announcements.', access: 'members', coverStyle: 'cream'}
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
