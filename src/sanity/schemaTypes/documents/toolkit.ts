import {defineField, defineType} from 'sanity'

export const toolkit = defineType({
  name: 'toolkit',
  title: 'Toolkit / Report',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}}),
    defineField({name: 'type', title: 'Resource type', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 4}),
    defineField({name: 'access', title: 'Access', type: 'string', options: {list: ['free', 'members', 'paid', 'comingSoon']}, initialValue: 'free'}),
    defineField({name: 'coverStyle', title: 'Cover style', type: 'string', options: {list: ['cream', 'pink', 'dark']}, initialValue: 'cream'}),
    defineField({name: 'coverImage', title: 'Optional cover image', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string'}]}),
    defineField({name: 'downloadFile', title: 'Download file', type: 'file'}),
    defineField({name: 'externalUrl', title: 'External URL', type: 'url'}),
    defineField({name: 'order', title: 'Order', type: 'number'})
  ],
  preview: {select: {title: 'title', subtitle: 'type', media: 'coverImage'}}
})
