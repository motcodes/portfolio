import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import { PrimaryGrid, above } from '../components/utilities'
import { H1, H2, Paragraph, Overlay } from '../components/elements'
import { Twitter, Instagram, GitHub, Facebook, Mail } from 'react-feather'

export default function About({ data }) {
  const { aboutPicture } = data
  return (
    <>
      <SEO title="About this dude" />
      <Overlay title="about" />
      <AboutContainer>
        <H1>Here is some stuff about me.</H1>
        <Paragraph>
          My name is Matthias M. Oberholzer. I currently live in Schleedorf, a
          small village in Austria{' '}
          <span role="img" aria-label="Austria Flag">
            🇦🇹
          </span>
          , not to be confused with Australia.
          <br /> I visited the department of electronics and technical
          informatics at the higher technical education institute of Salzburg,
          where I graduated in 2019.
          <br /> Midway thru my third school year I started to develop a passion
          for drawing &amp; designing things. Later on for photography{' '}
          <span role="img" aria-label="Camera">
            📸
          </span>{' '}
          too. This all happend while I tought myself how to program in
          javascript. And of course all the other import stuff of web
          development. Some of my project are already listed on the homepage.
          <br /> Also I’m a huge fan of rock music{' '}
          <span role="img" aria-label="Guitar">
            🎸
          </span>{' '}
          like The Beatles, Pink Floyd, Led Zepplin &amp; many more.
          <br /> This is kinda cliche for a programmer but I love coffee. In
          every variation. Although, you know a coffee is really good if you
          like to drink it black.
        </Paragraph>
        <AboutImage fluid={aboutPicture.childImageSharp.fluid} />
        <H2>Find me there</H2>
        <AboutLinks>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="https://twitter.com/codingMot"
            target="_blank"
          >
            <Twitter />
            <span>Twitter</span>
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="https://instagram.com/matthias.oberholzer"
            target="_blank"
          >
            <Instagram />
            <span>Instagram</span>
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="https://github.com/codingMot"
            target="_blank"
          >
            <GitHub />
            <span>GitHub</span>
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="https://facebook.com/mat.oberholzer"
            target="_blank"
          >
            <Facebook />
            <span>Facebook</span>
          </motion.a>
        </AboutLinks>
        <H2>Wanna meet up for a coffee?</H2>
        <AboutLinks>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            href="mailto:matthias.m.oberholzer@gmail.com"
            target="_blank"
          >
            <Mail />
            <span>matthias.m.oberholzer@gmail.com</span>
          </motion.a>
        </AboutLinks>
      </AboutContainer>
    </>
  )
}

const AboutContainer = styled(PrimaryGrid)`
  margin-top: 1rem;
  row-gap: 1rem;
  ${above.med`
    margin-top: 4rem;
  `}
  h1 {
    grid-column: 1 / 5;
    background-image: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    z-index: 1;

    ${above.med`
      grid-column: 1 / 10;
    `}
  }
  h2 {
    margin-top: 1rem;
    grid-column: 1 / 5;
    color: ${({ theme }) => theme.colors.primary};
    z-index: 1;

    ${above.med`
      grid-column: 1 / 6;
    `}
  }

  p {
    grid-column: 1 / 5;
    ${above.med`
      grid-column: 1 / 6;
      z-index: 1;
    `}
  }
`

const AboutImage = styled(Img)`
  grid-column: 1 / 5;
  grid-row: 1 / 2;
  width: 100%;
  height: 100%;
  max-height: 320px;
  border-radius: 4px;
  transform: scaleX(-1);
  ${above.med`
      position: absolute !important;
      grid-column: unset;
      grid-row: unset;
      top: 10rem;
      right: 2rem;
      max-height: 768px;
      max-width: 432px;
      z-index: 0;
  `};
  ${above.large`
      position: unset !important;
      margin-top: 3rem;
      grid-row: 2 / span 6;
      grid-column: 6 / 10;
  `}
`

const AboutLinks = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 1 / 5;
  z-index: 1;
  a {
    margin: 0.5rem;
    display: inline-flex;
    color: ${({ theme }) => theme.colors.text};
    width: fit-content;
    text-decoration: none;
    padding: 4px 0;

    ${above.med`
      margin: 0.5rem 0;
    `}
    span {
      &:hover {
        border-bottom: 2px solid ${({ theme }) => theme.colors.text};
      }
    }
    &:visited {
      color: ${({ theme }) => theme.colors.text};
    }
    svg {
      margin-right: 0.5rem;
    }
  }
`

export const AboutQuery = graphql`
  query AboutPageQuery {
    aboutPicture: file(relativePath: { eq: "AboutPicture.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1024, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
  }
`
