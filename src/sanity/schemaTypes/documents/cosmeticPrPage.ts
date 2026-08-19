import {defineField, defineType} from 'sanity'

const titledItem = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [{type: 'object', fields: [{name: 'title', title: 'Title', type: 'string'}, {name: 'description', title: 'Description', type: 'text', rows: 3}]}]
  })

export const cosmeticPrPage = defineType({
  name: 'cosmeticPrPage',
  title: 'Cosmetic PR page',
  type: 'document',
  fields: [
    defineField({name: 'heroEyebrow', title: 'Hero — eyebrow', type: 'string', description: 'e.g. "Flagship PR agency / Cosmetic Media Group".'}),
    defineField({name: 'heroTitle', title: 'Hero — title', type: 'string', description: 'First part of the heading, e.g. "COSMETIC".'}),
    defineField({name: 'heroAccent', title: 'Hero — accent (pink)', type: 'string', description: 'Highlighted end of the heading, e.g. "PR.".'}),
    defineField({name: 'heroIntro', title: 'Hero — lede', type: 'text', rows: 3, description: 'The large serif introduction line.'}),
    defineField({name: 'heroBody', title: 'Hero — supporting paragraph', type: 'text', rows: 3}),
    defineField({name: 'heroImage', title: 'Hero — image', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string'}]}),
    defineField({name: 'heroCaption', title: 'Hero — image caption', type: 'string', description: 'e.g. "Specialist PR. Lasting authority."'}),
    defineField({name: 'heroCaptionMeta', title: 'Hero — image caption meta', type: 'string', description: 'e.g. "Medical aesthetics / beauty / wellness".'}),
    defineField({
      name: 'identityStrip',
      title: 'Identity strip (4 facts)',
      type: 'array',
      of: [{type: 'object', fields: [{name: 'label', title: 'Label', type: 'string'}, {name: 'value', title: 'Value', type: 'string'}]}]
    }),
    defineField({name: 'storyEyebrow', title: 'Story — eyebrow', type: 'string'}),
    defineField({name: 'storySideHeading', title: 'Story — side heading', type: 'string'}),
    defineField({name: 'storySideText', title: 'Story — side text', type: 'text', rows: 3}),
    defineField({name: 'storyHeading', title: 'Story — heading (before accent)', type: 'string', description: 'e.g. "PR that builds".'}),
    defineField({name: 'storyAccent', title: 'Story — heading accent (pink)', type: 'string', description: 'e.g. "recognition with substance.".'}),
    defineField({name: 'storyBody', title: 'Story — body', type: 'portableText'}),
    defineField({name: 'capabilitiesEyebrow', title: 'Capabilities — eyebrow', type: 'string'}),
    defineField({name: 'capabilitiesNote', title: 'Capabilities — note', type: 'text', rows: 2}),
    defineField({name: 'capabilitiesHeading', title: 'Capabilities — heading', type: 'string'}),
    titledItem('capabilities', 'Capabilities (services list)'),
    defineField({name: 'casesEyebrow', title: 'Case studies — eyebrow', type: 'string'}),
    defineField({name: 'casesHeading', title: 'Case studies — heading', type: 'string'}),
    defineField({
      name: 'cases',
      title: 'Case studies',
      type: 'array',
      of: [{type: 'object', fields: [
        {name: 'label', title: 'Label', type: 'string', description: 'e.g. "Dr Nina Bal / expert positioning".'},
        {name: 'title', title: 'Headline', type: 'string'},
        {name: 'description', title: 'Description', type: 'text', rows: 3},
        {name: 'tags', title: 'Tag line', type: 'string', description: 'e.g. "Television / national press / expert authority".'}
      ]}]
    }),
    defineField({name: 'testimonialsEyebrow', title: 'Testimonials — eyebrow', type: 'string'}),
    defineField({name: 'testimonialsHeading', title: 'Testimonials — heading', type: 'string'}),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{type: 'object', fields: [{name: 'name', title: 'Name', type: 'string'}, {name: 'quote', title: 'Summary', type: 'text', rows: 3}]}]
    }),
    defineField({name: 'publicationsEyebrow', title: 'Publications — eyebrow', type: 'string'}),
    defineField({name: 'publicationsHeading', title: 'Publications — heading', type: 'string'}),
    defineField({name: 'publicationsIntro', title: 'Publications — intro', type: 'text', rows: 2}),
    defineField({name: 'publications', title: 'Publications / platforms', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'summaryEyebrow', title: 'Summary — eyebrow', type: 'string'}),
    defineField({name: 'summaryHeading', title: 'Summary — heading', type: 'string'}),
    defineField({name: 'summaryBody', title: 'Summary — body', type: 'portableText'}),
    defineField({
      name: 'summaryPoints',
      title: 'Summary points',
      type: 'array',
      of: [{type: 'object', fields: [{name: 'label', title: 'Label', type: 'string'}, {name: 'text', title: 'Text', type: 'text', rows: 2}]}]
    }),
    defineField({name: 'newsletterEyebrow', title: 'Newsletter — eyebrow', type: 'string'}),
    defineField({name: 'newsletterHeading', title: 'Newsletter — heading', type: 'string'}),
    defineField({name: 'newsletterText', title: 'Newsletter — text', type: 'text', rows: 2}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'})
  ],
  preview: {prepare: () => ({title: 'Cosmetic PR page'})}
})
