const path = require('path')

exports.createPages = ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const collectionTemplate = path.resolve(
    './src/components/templates/collection.js'
  )
  return graphql(`
    {
      collections: allSanityCollection {
        nodes {
          title
          publishedAt
          id
          description
          categories {
            title
          }
          slug {
            current
          }
          mainImage {
            asset {
              gatsbyImageData(
                width: 1440
                placeholder: BLURRED
                layout: CONSTRAINED
                formats: AUTO
                height: 512
              )
            }
          }
          _rawBody
        }
      }
    }
  `).then(({ data, errors }) => {
    if (errors) throw errors
    const collectionNodes = data.collections.nodes
    // console.log('collectionNodes :', collectionNodes[0])
    collectionNodes.forEach(node => {
      // const { id, slug } = node.node
      reporter.info(`Creating photo collection page: ${node.slug.current}`)

      createPage({
        path: `/collections/${node.slug.current}/`,
        component: collectionTemplate,
        context: {
          ...node,
        },
      })
    })
  })
}
