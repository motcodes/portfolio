const path = require('path')

exports.createPages = ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const collectionTemplate = path.resolve(
    './src/components/templates/collection.js'
  )
  return graphql(`
    {
      collections: allSanityCollection {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) throw result.errors

    const collectionEdges = result.data.collections.edges

    collectionEdges.forEach(edge => {
      const { id, slug } = edge.node
      reporter.info(`Creating blog post page: ${slug.current}`)

      createPage({
        path: `/${slug.current}/`,
        component: collectionTemplate,
        context: {
          id,
        },
      })
    })
  })
}
