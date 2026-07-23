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
    defineField({name: 'sections', title: 'Homepage section order', description: 'Drag sections to reorder them. Disable a section without deleting its content.', type: 'array', of: [defineArrayMember({type: 'homeSection'})], group: 'layout'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo'})
  ],
  preview: {prepare: () => ({title: 'Homepage'})}
})
