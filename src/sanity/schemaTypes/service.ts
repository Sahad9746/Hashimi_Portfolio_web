import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service (What I Do)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The name of the service (e.g. CINEMATOGRAPHY)',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'The short description shown on the right side',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
})
