import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

export const Logo = () => {
  const data = useStaticQuery(graphql`
    query Logo {
      logo: file(relativePath: { eq: "Logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 112, maxHeight: 112) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)
  return (
    <Img
      fluid={data.logo.childImageSharp.fluid}
      alt="Logo of Matthias Oberholzer"
    />
  )
}
