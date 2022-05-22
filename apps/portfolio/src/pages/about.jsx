export default function AboutPage() {
  return <h1>About</h1>
}

export const AboutQuery = `
  {
    about: sanityAbout {
      description
      id
      image {
        asset {
          gatsbyImageData(
            formats: AUTO
            width: 512
            placeholder: BLURRED
            layout: CONSTRAINED
          )
        }
        alt
      }
    }
  }
`
