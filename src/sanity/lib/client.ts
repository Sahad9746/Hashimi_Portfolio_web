import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-05-02', // Use current date
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
