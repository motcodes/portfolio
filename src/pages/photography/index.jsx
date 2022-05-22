export default function PhotographyPage() {
  return <h1>Photography</h1>
}

export const query = `
  {
    allCollections: allSanityCollection {
      nodes {
        id
        title
        description
        slug {
          current
        }
        publishedAt
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
      }
    }
  }
`
