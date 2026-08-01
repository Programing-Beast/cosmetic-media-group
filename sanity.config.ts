'use client'

import {defineConfig} from 'sanity'
import {structureTool, type StructureResolver} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/sanity/schemaTypes'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'demo1234'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

const singletonTypes = new Set(['siteSettings', 'navigation', 'homepage', 'aboutPage', 'founder', 'mediaHubPage', 'mediaDesk', 'diamondAwards', 'membershipPage'])
const singletonItems = [
  ['siteSettings', 'Site settings'],
  ['navigation', 'Navigation'],
  ['homepage', 'Homepage'],
  ['aboutPage', 'About page'],
  ['founder', 'Founder page'],
  ['mediaHubPage', 'Media Hub page'],
  ['mediaDesk', 'Media Desk page'],
  ['diamondAwards', 'Diamond Awards page'],
  ['membershipPage', 'Membership page']
] as const

const structure: StructureResolver = (S) =>
  S.list()
    .title('Cosmetic Media Group')
    .items([
      ...singletonItems.map(([schemaType, title]) =>
        S.listItem()
          .title(title)
          .id(schemaType)
          .child(S.document().schemaType(schemaType).documentId(schemaType))
      ),
      S.divider(),
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('article').title('Media Hub'),
      S.documentTypeListItem('videoGallery').title('Video (hidden)'),
      S.documentTypeListItem('author').title('Authors and contributors'),
      S.documentTypeListItem('brand').title('Brands'),
      S.documentTypeListItem('toolkit').title('Toolkits and reports')
    ])

export default defineConfig({
  name: 'default',
  title: 'Cosmetic Media Group',
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [structureTool({structure}), visionTool()],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType))
  },
  document: {
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type === 'global') return prev.filter((item) => !singletonTypes.has(item.templateId))
      return prev
    },
    actions: (prev, {schemaType}) => (singletonTypes.has(schemaType) ? prev.filter(({action}) => action !== 'duplicate' && action !== 'delete') : prev)
  }
})
