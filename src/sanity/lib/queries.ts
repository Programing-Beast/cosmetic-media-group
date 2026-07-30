import {defineQuery} from 'next-sanity'

export const SITE_SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings"][0]{
  title, tagline, description, email, phone, locations, socialLinks, legalLinks,
  "logo": logo{..., "asset": asset->{_id,_ref,url}}, seo
}`)

export const ABOUT_PAGE_QUERY = defineQuery(`*[_type == "aboutPage"][0]{
  heroTitle, heroAccent, intro, stats,
  evolutionEyebrow, evolutionHeading, evolutionBody, quote,
  principlesEyebrow, principlesHeading, principlesIntro, principles, seo,
  "image": image{..., "asset": asset->{_id,_ref,url}}
}`)

export const MEMBERSHIP_PAGE_QUERY = defineQuery(`*[_type == "membershipPage"][0]{
  comingSoonLabel, heroTitle, heroAccent, intro,
  benefitsEyebrow, benefitsHeading, benefitsIntro, benefits, seo
}`)

export const HOMEPAGE_QUERY = defineQuery(`*[_type == "homepage"][0]{
  heroEyebrowLeft, heroEyebrowRight, heroTitleBefore, heroTitleAccent,
  heroIdentity, heroSummary, "heroImage": heroImage{..., "asset": asset->{_id,_ref,url}},
  heroImageCaption, heroImageMeta, storyHeading, storyOpening, storyBody,
  stats, credibilityFacts, publications,
  clientLogos[]{name, "image": logo{..., "asset": asset->{_id,_ref,url}}},
  sections[]{sectionType,enabled}, seo,
  featuredArticles[]->{_id,title,"slug":slug.current,excerpt,category,format,publishedAt,readingTime,featured,
    "image": image{..., "asset": asset->{_id,_ref,url}}, externalVideoUrl,
    author->{name,"slug":slug.current,role,bio,"image":image{...,"asset":asset->{_id,_ref,url}}}
  },
  featuredServices[]->{_id,title,"slug":slug.current,eyebrow,intro,body,outcomes,deliverables,order,
    "image":image{...,"asset":asset->{_id,_ref,url}}},
  featuredBrands[]->{title,"slug":slug.current,type,description,href,external,order,
    "image":image{...,"asset":asset->{_id,_ref,url}}},
  featuredToolkits[]->{title,"slug":slug.current,type,description,access,coverStyle,externalUrl,
    "fileUrl":downloadFile.asset->url}
}`)

export const SERVICES_QUERY = defineQuery(`*[_type == "service"] | order(order asc, title asc){
  _id,title,"slug":slug.current,eyebrow,intro,body,outcomes,deliverables,order,seo,
  "image":image{...,"asset":asset->{_id,_ref,url}}
}`)

export const SERVICE_QUERY = defineQuery(`*[_type == "service" && slug.current == $slug][0]{
  _id,title,"slug":slug.current,eyebrow,intro,body,outcomes,deliverables,order,seo,
  "image":image{...,"asset":asset->{_id,_ref,url}}
}`)

export const ARTICLES_QUERY = defineQuery(`*[_type == "article" && defined(slug.current)] | order(publishedAt desc){
  _id,title,"slug":slug.current,excerpt,category,format,publishedAt,readingTime,featured,externalVideoUrl,seo,
  "image":image{...,"asset":asset->{_id,_ref,url}},
  author->{name,"slug":slug.current,role,bio,"image":image{...,"asset":asset->{_id,_ref,url}}}
}`)

export const ARTICLE_QUERY = defineQuery(`*[_type == "article" && slug.current == $slug][0]{
  _id,title,"slug":slug.current,excerpt,category,format,publishedAt,readingTime,featured,externalVideoUrl,body,tags,seo,
  "image":image{...,"asset":asset->{_id,_ref,url}},
  author->{name,"slug":slug.current,role,bio,"image":image{...,"asset":asset->{_id,_ref,url}}},
  relatedService->{title,"slug":slug.current},
  relatedArticles[]->{_id,title,"slug":slug.current,excerpt,category,format,publishedAt,
    "image":image{...,"asset":asset->{_id,_ref,url}}}
}`)

export const BRANDS_QUERY = defineQuery(`*[_type == "brand"] | order(order asc, title asc){
  title,"slug":slug.current,type,description,href,external,order,
  "image":image{...,"asset":asset->{_id,_ref,url}}
}`)

export const TOOLKITS_QUERY = defineQuery(`*[_type == "toolkit"] | order(order asc, title asc){
  title,"slug":slug.current,type,description,access,coverStyle,externalUrl,
  "fileUrl":downloadFile.asset->url,
  "coverImage":coverImage{...,"asset":asset->{_id,_ref,url}}
}`)

export const FOUNDER_QUERY = defineQuery(`*[_type == "founder"][0]{
  name,headline,intro,body,belief,stats,statsNote,publications,roles,seo,
  "image":image{...,"asset":asset->{_id,_ref,url}}
}`)

export const MEDIA_DESK_QUERY = defineQuery(`*[_type == "mediaDesk"][0]{headline,intro,requestTypes,futureResources,seo}`)

export const DIAMOND_AWARDS_QUERY = defineQuery(`*[_type == "diamondAwards"][0]{
  eventName,date,venue,location,history,mission,missionPoints,audience,eventExperience,sponsorBenefits,
  sponsorshipPackages,contactEmail,contactPhoneUae,contactPhoneUk,seo,
  "heroImage":heroImage{...,"asset":asset->{_id,_ref,url}},
  "historyImage":historyImage{...,"asset":asset->{_id,_ref,url}},
  "missionImage":missionImage{...,"asset":asset->{_id,_ref,url}},
  "whyDubaiImage":whyDubaiImage{...,"asset":asset->{_id,_ref,url}},
  "sponsorImage":sponsorImage{...,"asset":asset->{_id,_ref,url}},
  "experienceImage":experienceImage{...,"asset":asset->{_id,_ref,url}},
  "contactImage":contactImage{...,"asset":asset->{_id,_ref,url}}
}`)
