import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './src/sanity/schemaTypes'

// Using environment variables. We provide fallbacks so it doesn't crash during build if not set yet.
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'missing-project-id'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  basePath: '/studio',
  name: 'Hashimi_Portfolio',
  title: 'Hashimi Portfolio CMS',

  projectId,
  dataset,

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
})
