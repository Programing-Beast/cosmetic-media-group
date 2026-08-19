import {defineArrayMember, defineField, defineType} from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'story', title: 'Story'},
    {name: 'credibility', title: 'Credibility'},
    {name: 'content', title: 'Featured content'},
    {name: 'cpr', title: 'Cosmetic PR spotlight'},
    {name: 'layout', title: 'Section order'},
    {name: 'seo', title: 'SEO'}
  ],
  fields: [
    defineField({name: 'heroEyebrowLeft', title: 'Hero eyebrow, left', type: 'string', group: 'hero'}),
    defineField({name: 'heroEyebrowRight', title: 'Hero eyebrow, right', type: 'string', group: 'hero'}),
    defineField({name: 'heroTitleBefore', title: 'Hero title', type: 'string', group: 'hero'}),
    defineField({name: 'heroTitleAccent', title: 'Hero highlighted word/line', type: 'string', group: 'hero'}),
    defineField({name: 'heroIdentity', title: 'Hero identity statement', type: 'text', rows: 3, group: 'hero'}),
    defineField({name: 'heroSummary', title: 'Hero summary', type: 'text', rows: 4, group: 'hero'}),
    defineField({name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}, group: 'hero', fields: [{name: 'alt', type: 'string', title: 'Alternative text'}]}),
    defineField({name: 'heroImageCaption', title: 'Image caption', type: 'string', group: 'hero'}),
    defineField({name: 'heroImageMeta', title: 'Image metadata line', type: 'string', group: 'hero'}),
    defineField({
      name: 'heroFilm',
      title: 'Hero film frames',
      description: 'Optional extra frames for the looping editorial crossfade (shown after the hero image). Leave empty for a static hero.',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string', title: 'Alternative text'}]}],
      validation: (rule) => rule.max(2),
      group: 'hero'
    }),
    defineField({name: 'heroVideoUrl', title: 'Hero looping video URL', description: 'When set, replaces the crossfade with a muted 4:5 looping video (external hosting, e.g. Mux/Vimeo file URL). The hero image is used as the poster.', type: 'url', group: 'hero'}),
    defineField({name: 'heroFilmBadge', title: 'Hero film badge', description: 'Small label over the hero media, e.g. "Looping editorial film / client footage".', type: 'string', group: 'hero'}),
    defineField({name: 'storyHeading', title: 'Story heading', type: 'string', group: 'story'}),
    defineField({name: 'storyOpening', title: 'Story opening', type: 'text', rows: 3, group: 'story'}),
    defineField({name: 'storyBody', title: 'Story body', type: 'portableText', group: 'story'}),
    defineField({name: 'stats', title: 'By the numbers', type: 'array', of: [defineArrayMember({type: 'stat'})], group: 'credibility'}),
    defineField({name: 'credibilityFacts', title: 'Credibility facts', type: 'array', of: [{type: 'object', fields: [{name: 'label', type: 'string'}, {name: 'title', type: 'string'}], preview: {select: {title: 'title', subtitle: 'label'}}}], group: 'credibility'}),
    defineField({name: 'publications', title: 'As featured in', type: 'array', of: [{type: 'string'}], group: 'credibility'}),
    defineField({name: 'clientLogos', title: 'Client and partner logos', type: 'array', of: [{type: 'object', fields: [{name: 'name', type: 'string'}, {name: 'logo', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string'}]}], preview: {select: {title: 'name', media: 'logo'}}}], group: 'credibility'}),
    defineField({name: 'featuredArticles', title: 'Featured Media Hub content', type: 'array', of: [{type: 'reference', to: [{type: 'article'}]}], validation: (rule) => rule.max(3), group: 'content'}),
    defineField({name: 'featuredServices', title: 'Featured services', type: 'array', of: [{type: 'reference', to: [{type: 'service'}]}], group: 'content'}),
    defineField({name: 'featuredBrands', title: 'Featured brands', type: 'array', of: [{type: 'reference', to: [{type: 'brand'}]}], group: 'content'}),
    defineField({name: 'featuredToolkits', title: 'Featured toolkits', type: 'array', of: [{type: 'reference', to: [{type: 'toolkit'}]}], validation: (rule) => rule.max(3), group: 'content'}),
    defineField({
      name: 'latestRail',
      title: 'Latest section — content tiles',
      description: 'The three small tiles under the featured stories (PR insight / Behind the scenes / Podcast).',
      type: 'array',
      of: [{type: 'object', fields: [
        {name: 'label', title: 'Label', type: 'string'},
        {name: 'title', title: 'Heading', type: 'string'},
        {name: 'actionLabel', title: 'Action label', type: 'string', description: 'e.g. "Read insight ↗".'},
        {name: 'href', title: 'Link', type: 'string', description: 'Internal path, e.g. /media-hub.'}
      ], preview: {select: {title: 'title', subtitle: 'label'}}}],
      validation: (rule) => rule.max(3),
      group: 'content'
    }),
    defineField({
      name: 'brandRail',
      title: 'Our brands strip — rows',
      description: 'The four rows in the "Distinct platforms" section (08). Row 04 is Education & Insights in V19.',
      type: 'array',
      of: [{type: 'object', fields: [
        {name: 'label', title: 'Label', type: 'string', description: 'e.g. "Communications" — rendered as "01 / Communications".'},
        {name: 'title', title: 'Name', type: 'string'},
        {name: 'description', title: 'Description', type: 'text', rows: 2},
        {name: 'href', title: 'Link', type: 'string', description: 'Internal path, e.g. /cosmetic-pr.'}
      ], preview: {select: {title: 'title', subtitle: 'label'}}}],
      validation: (rule) => rule.max(4),
      group: 'content'
    }),
    defineField({
      name: 'resourceTiles',
      title: 'Toolkits section — tiles',
      description: 'The three resource covers in the "Knowledge designed to be used" section (09).',
      type: 'array',
      of: [{type: 'object', fields: [
        {name: 'tag', title: 'Tag', type: 'string', description: 'e.g. "Guide / Free".'},
        {name: 'title', title: 'Title', type: 'string'},
        {name: 'actionLabel', title: 'Action label', type: 'string', description: 'e.g. "Download ↗".'},
        {name: 'href', title: 'Link', type: 'string', description: 'Internal path, defaults to /toolkits.'}
      ], preview: {select: {title: 'title', subtitle: 'tag'}}}],
      validation: (rule) => rule.max(3),
      group: 'content'
    }),
    defineField({name: 'cprEyebrow', title: 'Eyebrow', type: 'string', description: 'e.g. "05 — Cosmetic PR".', group: 'cpr'}),
    defineField({name: 'cprHeading', title: 'Heading (first line)', type: 'string', description: 'e.g. "The flagship agency.".', group: 'cpr'}),
    defineField({name: 'cprAccent', title: 'Heading accent (pink, own line)', type: 'string', description: 'e.g. "The foundation.".', group: 'cpr'}),
    defineField({name: 'cprIntro', title: 'Introduction', type: 'text', rows: 4, group: 'cpr'}),
    defineField({name: 'cprStatusChips', title: 'Status chips', type: 'array', of: [{type: 'string'}], group: 'cpr'}),
    defineField({
      name: 'cprCards',
      title: 'Proof cards',
      description: 'The first card also shows the image.',
      type: 'array',
      of: [{type: 'object', fields: [
        {name: 'label', title: 'Label', type: 'string'},
        {name: 'title', title: 'Heading', type: 'string'},
        {name: 'text', title: 'Text', type: 'text', rows: 3},
        {name: 'ctaLabel', title: 'Action label', type: 'string', description: 'e.g. "Discover the agency ↗".'},
        {name: 'image', title: 'Image (first card only)', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string'}]}
      ], preview: {select: {title: 'title', subtitle: 'label'}}}],
      validation: (rule) => rule.max(3),
      group: 'cpr'
    }),
    defineField({name: 'sections', title: 'Homepage section order', description: 'Drag sections to reorder them. Disable a section without deleting its content.', type: 'array', of: [defineArrayMember({type: 'homeSection'})], group: 'layout'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo'})
  ],
  preview: {prepare: () => ({title: 'Homepage'})}
})
