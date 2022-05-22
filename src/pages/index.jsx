export default function Homepage() {
  return <h1>Matthias</h1>
}

export const IndexQuery = `
  {
    homepage: sanityHomepage {
      description
      image {
        alt
        asset {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: BLURRED
            formats: AUTO
          )
        }
      }
      projects {
        id
        projectDescription
        projectLink
        subtitle
        timeperiod
        title
      }
      collections {
        title
        slug {
          current
        }
        mainImage {
          asset {
            gatsbyImageData(
              placeholder: BLURRED
              layout: CONSTRAINED
              formats: AUTO
              height: 304
              width: 512
            )
          }
        }
        description
      }
    }
  }
`
