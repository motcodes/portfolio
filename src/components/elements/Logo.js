import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

export const Logo = () => {
  const data = useStaticQuery(graphql`
    query Logo {
      logo: file(relativePath: { eq: "Logo.png" }) {
        childImageSharp {
          fluid(maxHeight: 256) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
    }
  `)
  return <Img fluid={data.logo.childImageSharp.fluid} />
}
