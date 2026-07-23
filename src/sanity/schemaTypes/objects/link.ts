import {defineField, defineType} from 'sanity'

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'href', title: 'URL or path', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'external', title: 'Open in a new tab', type: 'boolean', initialValue: false}),
    defineField({name: 'style', title: 'Style', type: 'string', options: {list: ['dark', 'pink', 'light', 'white', 'media']}, initialValue: 'dark'})
  ]
})
