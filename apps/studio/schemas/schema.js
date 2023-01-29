// documents
import homepage from './documents/homepage'
import imprint from './documents/imprint'
import projects from './documents/projects'
import footer from './documents/footer'
import collection from './documents/collection'

// objects
import blockContent from './objects/blockContent'
import seo from './objects/seo'
import image from './objects/image'
import link from './objects/link'
import gallery from './documents/gallery'

// Then we give our schema to the builder and provide the result to Sanity
export default [
  // documents
  homepage,
  imprint,
  projects,
  gallery,
  footer,
  collection,

  // objects
  blockContent,
  image,
  seo,
  ...link,
]
