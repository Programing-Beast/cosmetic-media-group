import {defineField, defineType} from 'sanity'

const megaMenuFields = [
  {name: 'eyebrow', title: 'Panel eyebrow', type: 'string'},
  {name: 'heading', title: 'Panel heading', type: 'string'},
  {name: 'text', title: 'Panel text', type: 'text', rows: 2},
  {name: 'ctaLabel', title: 'Button label', type: 'string'},
  {name: 'ctaHref', title: 'Button link', type: 'string'}
]

const PAGE_OPTIONS = [
  {title: 'Home', value: '/'},
  {title: 'About', value: '/about'},
  {title: 'Cosmetic PR', value: '/cosmetic-pr'},
  {title: 'Meet the Founder', value: '/about/founder'},
  {title: 'Services', value: '/services'},
  {title: 'Media Hub', value: '/media-hub'},
  {title: 'Diamond Awards', value: '/diamond-awards'},
  {title: 'Our Brands', value: '/our-brands'},
  {title: 'Toolkits', value: '/toolkits'},
  {title: 'Membership', value: '/membership'},
  {title: 'Media Desk (for journalists)', value: '/media-desk'},
  {title: 'Contact', value: '/contact'}
]

const menuLink = {
  type: 'object' as const,
  name: 'menuLink',
  fields: [
    {name: 'label', title: 'Label', type: 'string', description: 'Leave blank to use the selected service’s name.'},
    {name: 'page', title: 'Page', type: 'string', options: {list: PAGE_OPTIONS}, description: 'Choose a page on the site.'},
    {name: 'service', title: 'Service', type: 'reference', to: [{type: 'service'}], description: 'Or link to a specific service page.'},
    {name: 'externalUrl', title: 'External / custom URL', type: 'url', description: 'Optional — for links outside the site. Overrides Page and Service.'}
  ],
  preview: {select: {title: 'label', subtitle: 'page'}}
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
      description: 'Leave “Dropdown links” empty to list all Service documents automatically (by order). Add links to hand-pick and order the dropdown instead.',
      fields: [
        ...megaMenuFields,
        {name: 'links', title: 'Dropdown links', type: 'array', of: [menuLink]}
      ]
    })
  ],
  preview: {prepare: () => ({title: 'Navigation'})}
})
