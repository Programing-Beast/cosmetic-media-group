import {defineField, defineType} from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Media Hub content',
  type: 'document',
  groups: [{name: 'content', title: 'Content'}, {name: 'media', title: 'Media'}, {name: 'seo', title: 'SEO'}],
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required(), group: 'content'}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (rule) => rule.required(), group: 'content'}),
    defineField({name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3, group: 'content'}),
    defineField({name: 'category', title: 'Category', type: 'string', group: 'content'}),
    defineField({name: 'format', title: 'Format', type: 'string', options: {list: ['article', 'interview', 'video', 'podcast', 'news', 'opinion', 'report']}, initialValue: 'article', group: 'content'}),
    defineField({name: 'publishedAt', title: 'Publication date', type: 'datetime', initialValue: () => new Date().toISOString(), group: 'content'}),
    defineField({name: 'readingTime', title: 'Reading time', type: 'string', group: 'content'}),
    defineField({name: 'author', title: 'Author', type: 'reference', to: [{type: 'author'}], group: 'content'}),
    defineField({name: 'body', title: 'Article body', type: 'portableText', group: 'content'}),
    defineField({name: 'image', title: 'Feature image', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string', title: 'Alternative text'}], group: 'media'}),
    defineField({name: 'externalVideoUrl', title: 'External video or podcast URL', type: 'url', description: 'Use YouTube, Vimeo, Mux or the chosen external media platform. Do not upload large videos directly to the website.', group: 'media'}),
    defineField({name: 'featured', title: 'Featured', type: 'boolean', initialValue: false, group: 'content'}),
    defineField({name: 'tags', title: 'Filed under (tags)', type: 'array', of: [{type: 'string'}], options: {layout: 'tags'}, group: 'content'}),
    defineField({name: 'relatedService', title: 'Related service', type: 'reference', to: [{type: 'service'}], group: 'content'}),
    defineField({name: 'relatedArticles', title: 'Related content', type: 'array', of: [{type: 'reference', to: [{type: 'article'}]}], group: 'content'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo'})
  ],
  orderings: [{title: 'Newest first', name: 'publishedAtDesc', by: [{field: 'publishedAt', direction: 'desc'}]}],
  preview: {select: {title: 'title', subtitle: 'category', media: 'image'}}
})
