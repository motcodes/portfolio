import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { GatsbyImage } from "gatsby-plugin-image";
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import { PrimaryGrid, above } from '../components/utilities'
import { H1, H2, Paragraph, Overlay } from '../components/elements'
import { Twitter, Instagram, GitHub, Facebook, Mail } from 'react-feather'

export default function About({ data }) {
  const { about } = data
  const description = `My name is Matthias Oberholzer. I live in Schleedorf, Austria. My passions are designing things, taking photos and coding coole websites.`
  return (
    <>
      <SEO
        title="Some infos about this dude | Matthias Oberholzer"
        description={description}
      />
      <Overlay title="about" />
      <AboutContainer>
        <H1>Here is some stuff about me.</H1>
        <Paragraph>{about.description}</Paragraph>
        <AboutImage fluid={about.image.asset.fluid} alt={about.image.alt} />

        <H2>Find me there</H2>
        <AboutLinks>
          <motion.a
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.9 }}
            href="https://twitter.com/codingMot"
            target="_blank"
            rel="noopener"
          >
            <Twitter title="Twitter Link to Matthias Oberholzer" />
            <span>Twitter</span>
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.9 }}
            href="https://instagram.com/matthias.oberholzer"
            target="_blank"
            rel="noopener"
          >
            <Instagram title="Instagram Link to Matthias Oberholzer" />
            <span>Instagram</span>
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.9 }}
            href="https://github.com/codingMot"
            target="_blank"
            rel="noopener"
          >
            <GitHub title="Github Link to Matthias Oberholzer" />
            <span>GitHub</span>
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.9 }}
            href="https://facebook.com/mat.oberholzer"
            target="_blank"
            rel="noopener"
          >
            <Facebook title="Facebook Link to Matthias Oberholzer" />
            <span>Facebook</span>
          </motion.a>
        </AboutLinks>
        <H2>Wanna meet up for a coffee?</H2>
        <AboutLinks>
          <motion.a
            whileHover={{ scale: 1.124 }}
            whileTap={{ scale: 0.9 }}
            href="mailto:matthias.m.oberholzer@gmail.com"
            target="_blank"
            rel="noopener"
          >
            <Mail title="Email from Matthias Oberholzer" />
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

const AboutImage = styled(GatsbyImage)`
  grid-column: 1 / 5;
  grid-row: 1 / 2;
  width: 100%;
  height: 100%;
  max-height: 320px;
  border-radius: 8px;
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
      box-shadow: 0px 1.02343px 1.4595px rgba(0, 0, 0, 0.0731357),
        0px 2.28078px 3.59124px rgba(0, 0, 0, 0.102215),
        0px 3.93246px 6.84841px rgba(0, 0, 0, 0.122983),
        0px 6.31183px 12.2194px rgba(0, 0, 0, 0.142328),
        0px 10.2324px 22.4911px rgba(0, 0, 0, 0.165942),
        0px 18px 51px rgba(0, 0, 0, 0.21);
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
    about: sanityAbout {
      description
      image {
        alt
        asset {
          fluid(maxWidth: 1024) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`
