import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'topLabel',
      title: 'Top Label',
      type: 'string',
      description: 'The small text above the main heading (e.g. HASHMI)',
    }),
    defineField({
      name: 'headingLines',
      title: 'Heading Lines',
      type: 'array',
      of: [{type: 'string'}],
      description: 'The main big text. Each item in the array is a line. Use an asterisk (*) around a word to make it red.',
    }),
    defineField({
      name: 'bottomLabel',
      title: 'Bottom Label',
      type: 'string',
      description: 'The text below the main heading (e.g. CINEMATOGRAPHER | EDITOR)',
    }),
    defineField({
      name: 'hoverHeadingLines',
      title: 'Hover Heading Lines',
      type: 'array',
      of: [{type: 'string'}],
      description: 'The text revealed when hovering (the "hidden" layer). Each item is a line. Use an asterisk (*) around a word to make it black.',
    }),
  ],
})
