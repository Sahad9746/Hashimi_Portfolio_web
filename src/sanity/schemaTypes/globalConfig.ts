import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'globalConfig',
  title: 'Global Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
    }),
    defineField({
      name: 'aboutText',
      title: 'About Text',
      type: 'text',
      description: 'Use an asterisk (*) around words to make them red.',
    }),
    defineField({
      name: 'experienceText',
      title: 'Experience Text',
      type: 'text',
      description: 'Use an asterisk (*) around words to make them red.',
    }),
    defineField({
      name: 'mottoLines',
      title: 'Motto Lines',
      type: 'array',
      of: [{type: 'string'}],
      description: 'The lines for the "FILM IS A BATTLEGROUND" section.',
    }),
    defineField({
      name: 'mottoAuthor',
      title: 'Motto Author',
      type: 'string',
      description: 'e.g. SAM FULLER',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'platform', title: 'Platform Name', type: 'string'},
            {name: 'url', title: 'URL', type: 'url'},
          ]
        }
      ],
    }),
  ],
})
