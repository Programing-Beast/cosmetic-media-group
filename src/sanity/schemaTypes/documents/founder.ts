import {defineField, defineType} from 'sanity'

export const founder = defineType({
  name: 'founder',
  title: 'Founder page',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({name: 'headline', title: 'Headline', type: 'string'}),
    defineField({name: 'intro', title: 'Introduction', type: 'text', rows: 4}),
    defineField({name: 'body', title: 'Biography', type: 'portableText'}),
    defineField({name: 'belief', title: 'Founder quote', type: 'text', rows: 3}),
    defineField({name: 'image', title: 'Founder image', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string'}]}),
    defineField({name: 'stats', title: 'Founder statistics', type: 'array', of: [{type: 'stat'}]}),
    defineField({name: 'statsNote', title: 'Statistics disclaimer note', type: 'text', rows: 2, description: 'Optional note shown under the statistics (e.g. explaining an asterisked figure).'}),
    defineField({name: 'publications', title: 'As featured in', type: 'array', of: [{type: 'string'}]}),
    defineField({
      name: 'roles',
      title: 'Roles (Beyond the boardroom)',
      type: 'array',
      of: [{type: 'object', fields: [{name: 'title', title: 'Title', type: 'string'}, {name: 'description', title: 'Description', type: 'text', rows: 2}]}]
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo'})
  ],
  preview: {prepare: () => ({title: 'Founder page'})}
})
