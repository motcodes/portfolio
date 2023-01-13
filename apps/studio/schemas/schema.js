// documents
import homepage from './documents/homepage'
import imprint from './documents/imprint'
import projects from './documents/projects'
import footer from './documents/footer'

// objects
import blockContent from './objects/blockContent'
import seo from './objects/seo'
import image from './objects/image'
import link from './objects/link'

// Then we give our schema to the builder and provide the result to Sanity
export default [
  // documents
  homepage,
  imprint,
  projects,
  footer,

  // objects
  blockContent,
  image,
  seo,
  ...link,
]
