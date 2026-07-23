import {defineField, defineType} from 'sanity'

export const author = defineType({
  name: 'author',
  title: 'Author / Contributor',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'name'}}),
    defineField({name: 'role', title: 'Role', type: 'string'}),
    defineField({name: 'bio', title: 'Biography', type: 'text', rows: 6}),
    defineField({name: 'image', title: 'Portrait', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', title: 'Alternative text', type: 'string'}]}),
    defineField({name: 'socialLinks', title: 'Links', type: 'array', of: [{type: 'link'}]})
  ],
  preview: {select: {title: 'name', subtitle: 'role', media: 'image'}}
})
