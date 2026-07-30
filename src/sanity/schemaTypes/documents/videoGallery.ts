import {defineField, defineType} from 'sanity'

export const videoGallery = defineType({
  name: 'videoGallery',
  title: 'Video',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title', maxLength: 96}, validation: (rule) => rule.required()}),
    defineField({name: 'category', title: 'Label', type: 'string', description: 'Small label shown under the title in the gallery (e.g. “Cosmetic Media Group”, “Live Broadcast”).'}),
    defineField({name: 'poster', title: 'Poster image (gallery thumbnail)', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string'}]}),
    defineField({name: 'intro', title: 'Intro (optional)', type: 'text', rows: 2}),
    defineField({
      name: 'videos',
      title: 'Videos',
      description: 'Add one or more videos. Each is shown with its heading and an embedded player.',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'heading', title: 'Heading', type: 'string'},
          {name: 'url', title: 'Video URL (YouTube / Vimeo / Mux)', type: 'url', description: 'Paste the share link. Do not upload large video files to the website.'},
          {name: 'caption', title: 'Caption (optional)', type: 'string'}
        ],
        preview: {select: {title: 'heading', subtitle: 'url'}}
      }]
    }),
    defineField({name: 'order', title: 'Order', type: 'number', description: 'Lower numbers appear first in the gallery.'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'})
  ],
  orderings: [{title: 'Gallery order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}, {field: 'title', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'category', media: 'poster'}}
})
