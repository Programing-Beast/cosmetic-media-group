import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({name: 'metaTitle', title: 'Meta title', type: 'string', validation: (rule) => rule.max(60)}),
    defineField({name: 'metaDescription', title: 'Meta description', type: 'text', rows: 3, validation: (rule) => rule.max(160)}),
    defineField({name: 'ogImage', title: 'Social sharing image', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string', title: 'Alternative text'}]}),
    defineField({name: 'noIndex', title: 'Hide from search engines', type: 'boolean', initialValue: false})
  ]
})
