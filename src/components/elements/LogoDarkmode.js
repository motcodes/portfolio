import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image";

export const LogoDarkmode = () => {
  const data = useStaticQuery(graphql`{
  logoDarkmode: file(relativePath: {eq: "LogoDarkmode.png"}) {
    childImageSharp {
      gatsbyImageData(width: 112, height: 112, layout: CONSTRAINED)
    }
  }
}
`)

  return (
    <GatsbyImage
      image={data.logoDarkmode.childImageSharp.gatsbyImageData}
      alt="Logo of Matthias Oberholzer in Darkmode" />
  );
}
