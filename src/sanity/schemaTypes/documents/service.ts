import {defineField, defineType} from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (rule) => rule.required()}),
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'intro', title: 'Introduction', type: 'text', rows: 3}),
    defineField({name: 'body', title: 'Main copy', type: 'text', rows: 8}),
    defineField({name: 'image', title: 'Feature image', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', title: 'Alternative text', type: 'string'}]}),
    defineField({name: 'outcomes', title: 'Client outcomes', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'deliverables', title: 'Deliverables', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'order', title: 'Navigation order', type: 'number'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'})
  ],
  orderings: [{title: 'Navigation order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'eyebrow', media: 'image'}}
})
