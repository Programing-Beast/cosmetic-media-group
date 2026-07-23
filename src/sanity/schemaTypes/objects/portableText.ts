import {defineArrayMember, defineType} from 'sanity'

export const portableText = defineType({
  name: 'portableText',
  title: 'Rich text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Heading 2', value: 'h2'},
        {title: 'Heading 3', value: 'h3'},
        {title: 'Quote', value: 'blockquote'}
      ],
      marks: {
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {name: 'href', type: 'url', title: 'URL'},
              {name: 'blank', type: 'boolean', title: 'Open in new tab', initialValue: true}
            ]
          }
        ]
      }
    }),
    defineArrayMember({type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string', title: 'Alternative text'}]})
  ]
})
