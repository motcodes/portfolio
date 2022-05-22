const DOM = () => {
  return <h1>Matthias</h1>
}

const R3F = () => {
  return <></>
}

const Page = () => {
  return (
    <>
      <DOM />
      <R3F r3f />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Index',
    },
  }
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
