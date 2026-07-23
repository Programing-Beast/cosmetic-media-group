import {defineField, defineType} from 'sanity'

export const stat = defineType({
  name: 'stat',
  title: 'Statistic',
  type: 'object',
  fields: [
    defineField({name: 'value', title: 'Display value', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'numericValue', title: 'Animated numeric value', type: 'number', description: 'Optional. Used for count-up animation.'}),
    defineField({name: 'suffix', title: 'Animated suffix', type: 'string'}),
    defineField({name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'note', title: 'Internal/public note', type: 'string'})
  ],
  preview: {select: {title: 'value', subtitle: 'label'}}
})
