import { groq } from 'next-sanity'

export const getHeroQuery = groq`*[_type == "hero"][0]`
export const getServicesQuery = groq`*[_type == "service"] | order(order asc)`
export const getProjectsQuery = groq`*[_type == "project" && isActive == true] | order(_createdAt desc) {
  _id,
  title,
  category,
  "videoFileUrl": videoFile.asset->url,
  videoUrl,
  thumbnail,
  orientation,
  isActive
}`
export const getTestimonialsQuery = groq`*[_type == "testimonial"] | order(order asc) {
  ...,
  "avatarUrl": avatar.asset->url
}`
export const getGlobalConfigQuery = groq`*[_type == "globalConfig"][0]`
