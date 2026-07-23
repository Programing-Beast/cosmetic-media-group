import {defineField, defineType} from 'sanity'

export const mediaDesk = defineType({
  name: 'mediaDesk',
  title: 'Media Desk page',
  type: 'document',
  fields: [
    defineField({name: 'headline', title: 'Headline', type: 'string'}),
    defineField({name: 'intro', title: 'Introduction', type: 'text', rows: 4}),
    defineField({name: 'requestTypes', title: 'Request types', type: 'array', of: [{type: 'object', fields: [{name: 'title', type: 'string'}, {name: 'description', type: 'string'}]}]}),
    defineField({name: 'futureResources', title: 'Future resources', type: 'array', of: [{type: 'object', fields: [{name: 'title', type: 'string'}, {name: 'description', type: 'text'}]}]}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'})
  ],
  preview: {prepare: () => ({title: 'Media Desk page'})}
})
