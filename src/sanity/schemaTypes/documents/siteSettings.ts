import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Site title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'tagline', title: 'Tagline', type: 'string'}),
    defineField({name: 'description', title: 'Site description', type: 'text', rows: 3}),
    defineField({name: 'logo', title: 'Logo', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string', title: 'Alternative text'}]}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'phone', title: 'Telephone', type: 'string'}),
    defineField({name: 'locations', title: 'Locations', type: 'string'}),
    defineField({name: 'socialLinks', title: 'Social links', type: 'array', of: [{type: 'object', fields: [{name: 'platform', type: 'string'}, {name: 'url', type: 'url'}]}]}),
    defineField({name: 'legalLinks', title: 'Footer legal links', type: 'array', of: [{type: 'object', fields: [{name: 'label', title: 'Label', type: 'string'}, {name: 'url', title: 'URL', type: 'string'}]}]}),
    defineField({name: 'seo', title: 'Default SEO', type: 'seo'})
  ],
  preview: {prepare: () => ({title: 'Site settings'})}
})
