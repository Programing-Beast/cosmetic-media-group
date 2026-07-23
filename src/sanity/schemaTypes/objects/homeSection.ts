import {defineField, defineType} from 'sanity'

const sectionOptions = [
  ['story', 'Story and vision'],
  ['credibility', 'By the numbers and featured publications'],
  ['founderTeaser', 'Founder teaser'],
  ['trustedBrands', 'Trusted brands'],
  ['services', 'Services'],
  ['mediaHub', 'Media Hub'],
  ['mediaDesk', 'Journalist Media Desk'],
  ['awardsSpotlight', 'Diamond Awards spotlight'],
  ['brands', 'Our brands'],
  ['resourcesMembership', 'Toolkits and membership'],
  ['newsletter', 'Newsletter'],
  ['contact', 'Contact call to action']
].map(([value, title]) => ({value, title}))

export const homeSection = defineType({
  name: 'homeSection',
  title: 'Homepage section',
  type: 'object',
  fields: [
    defineField({name: 'sectionType', title: 'Section', type: 'string', options: {list: sectionOptions}, validation: (rule) => rule.required()}),
    defineField({name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true}),
    defineField({name: 'internalNote', title: 'Internal note', type: 'string'})
  ],
  preview: {select: {title: 'sectionType', enabled: 'enabled'}, prepare: ({title, enabled}) => ({title: sectionOptions.find((item) => item.value === title)?.title || title, subtitle: enabled === false ? 'Hidden' : 'Visible'})}
})
