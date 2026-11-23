// picosanity over @sanity/client: _app getInitialProps also runs in the browser, and the full client added ~38 kB to every page
import { createClient } from 'picosanity'
import { sanityConfig } from './config'

export const sanityClient = createClient({
  ...sanityConfig,
  token: process.env.SANITY_API_TOKEN,
})
