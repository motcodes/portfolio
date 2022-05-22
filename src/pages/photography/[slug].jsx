export default function PhotograhpyCollectionPage() {
  return <h1>CollectionPage</h1>
}

export async function getStaticProps() {}
export async function getStaticPaths() {}

export const PhotogrpahyCollectionQuery = `
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
`
