import { createClient } from 'next-sanity'
import { sanityConfig } from './config'

export const sanityClient = createClient({
  ...sanityConfig,
  token: process.env.SANITY_API_TOKEN,
})
