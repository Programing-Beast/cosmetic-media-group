import {defineField, defineType} from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  fields: [
    defineField({name: 'heroTitle', title: 'Hero title', type: 'string'}),
    defineField({name: 'heroAccent', title: 'Hero accent', type: 'string'}),
    defineField({name: 'intro', title: 'Introduction', type: 'text', rows: 3}),
    defineField({name: 'stats', title: 'Statistics', type: 'array', of: [{type: 'stat'}]}),
    defineField({name: 'evolutionEyebrow', title: 'Evolution — eyebrow', type: 'string'}),
    defineField({name: 'evolutionHeading', title: 'Evolution — heading', type: 'string'}),
    defineField({name: 'evolutionBody', title: 'Evolution — body', type: 'portableText'}),
    defineField({name: 'quote', title: 'Pull quote', type: 'text', rows: 2}),
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string'}]}),
    defineField({name: 'principlesEyebrow', title: 'Principles — eyebrow', type: 'string'}),
    defineField({name: 'principlesHeading', title: 'Principles — heading', type: 'string'}),
    defineField({name: 'principlesIntro', title: 'Principles — intro', type: 'text', rows: 2}),
    defineField({name: 'principles', title: 'Principles', type: 'array', of: [{type: 'object', fields: [{name: 'title', title: 'Title', type: 'string'}, {name: 'description', title: 'Description', type: 'text', rows: 2}]}]}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'})
  ],
  preview: {prepare: () => ({title: 'About page'})}
})
