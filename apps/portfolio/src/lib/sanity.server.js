import PicoSanity from 'picosanity'
import { sanityConfig } from './config'

export const sanityClient = PicoSanity({
  ...sanityConfig,
  token: process.env.SANITY_API_TOKEN,
})
