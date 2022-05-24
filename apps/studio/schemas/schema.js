// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import blockContent from './objects/blockContent'
import category from './documents/category'
import collection from './documents/collection'
import homepage from './documents/homepage'
import about from './documents/about'
import caseStudy from './documents/caseStudy'
import smallProject from './documents/smallProject'
import role from './documents/role'

import seo from './objects/seo'
import image from './objects/image'
import fullsizeImage from './objects/fullsizeImage'
import experience from './documents/experience'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    homepage,
    caseStudy,
    smallProject,
    about,
    experience,
    collection,
    category,
    role,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
    image,
    fullsizeImage,
    seo,
  ]),
})
