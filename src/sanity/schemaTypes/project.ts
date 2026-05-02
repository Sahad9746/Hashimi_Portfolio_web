import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project Video',
  type: 'document',
  fields: [
    defineField({
      name: 'videoFile',
      title: 'Upload Raw Video File',
      type: 'file',
      options: {
        accept: 'video/*'
      },
      description: 'Upload your MP4 video file directly here.',
    }),
    defineField({
      name: 'videoUrl',
      title: 'OR External Video URL',
      type: 'url',
      description: 'If your video is too large, host it on Cloudinary/Vimeo and paste the direct .mp4 link here instead.',
    }),
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active Feature?',
      type: 'boolean',
      description: 'Set to true to feature this project on the homepage',
      initialValue: true,
    }),
  ],
})
