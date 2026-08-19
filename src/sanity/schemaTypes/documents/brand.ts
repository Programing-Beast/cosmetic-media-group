import {defineField, defineType} from 'sanity'

export const brand = defineType({
  name: 'brand',
  title: 'Brand',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Name', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}}),
    defineField({name: 'type', title: 'Platform type', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 4}),
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string'}]}),
    defineField({name: 'href', title: 'Internal path or external URL', type: 'string'}),
    defineField({name: 'ctaLabel', title: 'Card CTA label', description: 'e.g. “Visit the standalone brand ↗”', type: 'string'}),
    defineField({name: 'external', title: 'External website', type: 'boolean', initialValue: false}),
    defineField({name: 'order', title: 'Order', type: 'number'})
  ],
  preview: {select: {title: 'title', subtitle: 'type', media: 'image'}}
})
