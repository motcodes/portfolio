// documents
import category from './documents/category'
import collection from './documents/collection'
import homepage from './documents/homepage'
import imprint from './documents/imprint'
import caseStudy from './documents/caseStudy'
import smallProject from './documents/smallProject'
import role from './documents/role'
import experience from './documents/experience'
import projects from './documents/projects'

// objects
import blockContent from './objects/blockContent'
import seo from './objects/seo'
import image from './objects/image'

// Then we give our schema to the builder and provide the result to Sanity
export default [
  // documents
  homepage,
  caseStudy,
  smallProject,
  imprint,
  projects,
  experience,
  collection,
  category,
  role,
  // objects
  blockContent,
  image,
  seo,
]
