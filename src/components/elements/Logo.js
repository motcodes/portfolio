import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

export const Logo = () => {
  return (
    <GatsbyImage
      image={logo.childImageSharp.gatsbyImageData}
      alt="Logo of Matthias Oberholzer"
    />
  )
}

export const query = graphql`
  query Logo {
    file(relativePath: { eq: "images/Logo.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FIXED)
      }
    }
  }
`
