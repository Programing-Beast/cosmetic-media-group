import {defineField, defineType} from 'sanity'

export const mediaHubPage = defineType({
  name: 'mediaHubPage',
  title: 'Media Hub page',
  type: 'document',
  fields: [
    defineField({name: 'heroTitle', title: 'Hero title', type: 'string', description: 'First part of the heading, e.g. “The industry’s next”.'}),
    defineField({name: 'heroAccent', title: 'Hero accent (pink)', type: 'string', description: 'Highlighted end of the heading, e.g. “conversation.”.'}),
    defineField({name: 'intro', title: 'Introduction', type: 'text', rows: 3}),
    defineField({name: 'ctaEyebrow', title: 'Journalist CTA — eyebrow', type: 'string'}),
    defineField({name: 'ctaHeading', title: 'Journalist CTA — heading', type: 'string'}),
    defineField({name: 'ctaText', title: 'Journalist CTA — text', type: 'text', rows: 2}),
    defineField({name: 'ctaButtonLabel', title: 'Journalist CTA — button label', type: 'string'}),
    defineField({name: 'ctaButtonHref', title: 'Journalist CTA — button link', type: 'string'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'})
  ],
  preview: {prepare: () => ({title: 'Media Hub page'})}
})
