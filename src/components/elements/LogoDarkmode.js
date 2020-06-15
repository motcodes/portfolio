import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

export const LogoDarkmode = () => {
  const data = useStaticQuery(graphql`
    {
      logoDarkmode: file(relativePath: { eq: "LogoDarkmode.png" }) {
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
      fluid={data.logoDarkmode.childImageSharp.fluid}
      alt="Logo of Matthias Oberholzer in Darkmode"
    />
  )
}
