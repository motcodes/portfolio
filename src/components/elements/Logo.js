import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

export const Logo = ({ isDarkmode }) => {
  const data = useStaticQuery(graphql`
    {
      lightLogo: file(relativePath: { eq: "Logo.png" }) {
        childImageSharp {
          gatsbyImageData(
            tracedSVGOptions: { blackOnWhite: true }
            layout: CONSTRAINED
            formats: AUTO
            placeholder: TRACED_SVG
            aspectRatio: 1
            height: 128
            width: 128
          )
        }
      }
      darkLogo: file(relativePath: { eq: "Logo-DarkMode.png" }) {
        childImageSharp {
          gatsbyImageData(
            tracedSVGOptions: { blackOnWhite: true }
            layout: CONSTRAINED
            formats: AUTO
            placeholder: TRACED_SVG
            aspectRatio: 1
            height: 128
            width: 128
          )
        }
      }
    }
  `)

  const lightLogo = data.lightLogo.childImageSharp.gatsbyImageData
  const darkLogo = data.darkLogo.childImageSharp.gatsbyImageData
  return (
    <GatsbyImage
      image={isDarkmode ? darkLogo : lightLogo}
      alt="Logo of Matthias Oberholzer"
    />
  )
}
