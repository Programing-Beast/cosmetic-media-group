import {defineField, defineType} from 'sanity'

const megaMenuFields = [
  {name: 'eyebrow', title: 'Panel eyebrow', type: 'string'},
  {name: 'heading', title: 'Panel heading', type: 'string'},
  {name: 'text', title: 'Panel text', type: 'text', rows: 2},
  {name: 'ctaLabel', title: 'Button label', type: 'string'},
  {name: 'ctaHref', title: 'Button link', type: 'string'}
]

const menuLink = {
  type: 'object' as const,
  name: 'menuLink',
  fields: [
    {name: 'label', title: 'Label', type: 'string'},
    {name: 'href', title: 'Link (e.g. /about or /media-desk)', type: 'string'}
  ],
  preview: {select: {title: 'label', subtitle: 'href'}}
}

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'about',
      title: 'About menu',
      type: 'object',
      description: 'The About dropdown in the header.',
      fields: [
        ...megaMenuFields,
        {name: 'links', title: 'Dropdown links', type: 'array', of: [menuLink]}
      ]
    }),
    defineField({
      name: 'services',
      title: 'Services menu',
      type: 'object',
      description: 'The Services dropdown links are generated automatically from your Service documents (by order). These fields control the intro panel only.',
      fields: megaMenuFields
    })
  ],
  preview: {prepare: () => ({title: 'Navigation'})}
})
