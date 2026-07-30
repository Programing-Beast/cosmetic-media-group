import {defineField, defineType} from 'sanity'

export const diamondAwards = defineType({
  name: 'diamondAwards',
  title: 'Diamond Awards page',
  type: 'document',
  fields: [
    defineField({name: 'eventName', title: 'Event name', type: 'string'}),
    defineField({name: 'date', title: 'Event date', type: 'date'}),
    defineField({name: 'venue', title: 'Venue', type: 'string'}),
    defineField({name: 'location', title: 'Location', type: 'string'}),
    defineField({name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string'}]}),
    defineField({name: 'historyImage', title: 'History image (section 01)', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string'}]}),
    defineField({name: 'missionImage', title: 'Mission image (section 02)', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string'}]}),
    defineField({name: 'whyDubaiImage', title: 'Why Dubai image (section 03)', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string'}]}),
    defineField({name: 'sponsorImage', title: 'Sponsor image (section 05)', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string'}]}),
    defineField({name: 'experienceImage', title: 'Event experience image (section 07)', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string'}]}),
    defineField({name: 'contactImage', title: 'Partner/contact image (section 08)', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string'}]}),
    defineField({name: 'history', title: 'History', type: 'portableText'}),
    defineField({name: 'mission', title: 'Mission', type: 'portableText'}),
    defineField({name: 'missionPoints', title: 'Mission points', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'audience', title: 'Who attends', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'eventExperience', title: 'Event experience', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'sponsorBenefits', title: 'Sponsor benefits', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'sponsorshipPackages', title: 'Sponsorship packages', type: 'array', of: [{type: 'object', fields: [
      {name: 'tier', title: 'Tier label', type: 'string'},
      {name: 'name', title: 'Name', type: 'string'},
      {name: 'description', title: 'Description', type: 'text', rows: 2},
      {name: 'features', title: 'Features', type: 'array', of: [{type: 'string'}]}
    ]}]}),
    defineField({name: 'contactEmail', title: 'Contact email', type: 'string'}),
    defineField({name: 'contactPhoneUae', title: 'UAE contact', type: 'string'}),
    defineField({name: 'contactPhoneUk', title: 'UK contact', type: 'string'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'})
  ],
  preview: {prepare: () => ({title: 'Diamond Awards Dubai'})}
})
