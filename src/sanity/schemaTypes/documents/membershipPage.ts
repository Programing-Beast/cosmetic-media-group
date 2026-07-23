import {defineField, defineType} from 'sanity'

export const membershipPage = defineType({
  name: 'membershipPage',
  title: 'Membership page',
  type: 'document',
  fields: [
    defineField({name: 'comingSoonLabel', title: 'Badge label', type: 'string'}),
    defineField({name: 'heroTitle', title: 'Hero title', type: 'string'}),
    defineField({name: 'heroAccent', title: 'Hero accent', type: 'string'}),
    defineField({name: 'intro', title: 'Introduction', type: 'text', rows: 3}),
    defineField({name: 'benefitsEyebrow', title: 'Benefits — eyebrow', type: 'string'}),
    defineField({name: 'benefitsHeading', title: 'Benefits — heading', type: 'string'}),
    defineField({name: 'benefitsIntro', title: 'Benefits — intro', type: 'text', rows: 2}),
    defineField({name: 'benefits', title: 'Member benefits', type: 'array', of: [{type: 'object', fields: [{name: 'title', title: 'Title', type: 'string'}, {name: 'description', title: 'Description', type: 'text', rows: 2}]}]}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'})
  ],
  preview: {prepare: () => ({title: 'Membership page'})}
})
