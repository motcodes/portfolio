import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Twitter, Instagram, GitHub, Mail, Facebook } from 'react-feather'
import SEO from '../components/seo'
import { useScrollInView } from '../components/helpers'
import { above } from '../components/utilities'
import { H1, H2, Paragraph, Overlay, Card } from '../components/elements'

const xMotion = {
  rest: {
    scale: 0.6,
    opacity: 0,
    rotate: 0,
  },
  scroll: {
    scale: 1,
    opacity: 1,
    rotate: 720,
    transition: {
      delay: 0.5,
      duration: 1.5,
    },
  },
}

const lineMotion = {
  rest: {
    y: -128,
    opacity: 0,
  },
  scroll: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      default: { duration: 1 },
      opacity: { duration: 0.4 },
    },
  },
}

const h2Motion = {
  rest: {
    y: 32,
    opacity: 0,
    visibility: `hidden`,
  },
  scroll: {
    y: 0,
    opacity: 1,
    visibility: `visible`,
    transition: {
      duration: 0.5,
      delay: 0.75,
    },
  },
}

const IndexPage = ({ data }) => {
  const { homepage } = data
  const [linePosition, setLinePosition] = useState(0)
  const { ref, controls } = useScrollInView()

  useEffect(() => {
    const pageHeight = window.innerHeight
    const intro = document.getElementById('intro').offsetHeight
    const header = document.getElementsByTagName('header')[0].clientHeight
    setLinePosition(pageHeight - (intro + header) + 96)
  }, [])

  return (
    <>
      <SEO title="The offical site of Matthias Oberholzer" />
      <Overlay title="homepage" />
      <Indruduction id="intro" linePosition={linePosition}>
        <Heading1>
          Hello There! <span>I’m Matt.</span>
        </Heading1>
        <Description>{homepage.description}</Description>
        <SocialMediaContainer>
          <motion.a
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.9 }}
            href="https://twitter.com/codingMot"
            target="_blank"
            rel="noopener"
          >
            <Twitter title="Twitter Link to Matthias Oberholzer" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.9 }}
            href="https://instagram.com/matthias.oberholzer"
            target="_blank"
            rel="noopener"
          >
            <Instagram title="Instagram Link to Matthias Oberholzer" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.9 }}
            href="https://github.com/codingMot"
            target="_blank"
            rel="noopener"
          >
            <GitHub title="Github Link to Matthias Oberholzer" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.9 }}
            href="mailto:matthias.m.oberholzer@gmail.com"
            target="_blank"
            rel="noopener"
          >
            <Mail title="Email from Matthias Oberholzer" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.9 }}
            href="https://facebook.com/mat.oberholzer"
            target="_blank"
            rel="noopener"
          >
            <Facebook title="Facebook Link to Matthias Oberholzer" />
          </motion.a>
        </SocialMediaContainer>
        <Image
          fluid={homepage.image.asset.fluid}
          alt={homepage.image.alt}
          imgBackground={homepage.image.asset.fluid.src}
        />
      </Indruduction>
      <LineWrapper>
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          ref={ref}
          initial="rest"
          animate={controls}
          variants={xMotion}
        >
          <Path d="M20 4L4 20M4 4L20 20" />
        </motion.svg>
        <motion.svg
          width="16"
          height="192"
          viewBox="0 0 16 192"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          ref={ref}
          initial="rest"
          animate={controls}
          variants={lineMotion}
          style={{ marginTop: `24px` }}
        >
          <Path d="M8 8V190" />
        </motion.svg>
      </LineWrapper>
      <Projects as="section">
        <Heading2
          ref={ref}
          initial="rest"
          animate={controls}
          variants={h2Motion}
        >
          expierence &amp; projects
        </Heading2>
        {homepage.projects.map(project => (
          <ProjectCard
            key={project.id}
            title={project.title}
            subtitle={project.subtitle}
            timeperiod={project.timeperiod}
            description={project.projectDescription}
            link={project.projectLink}
          />
        ))}
      </Projects>
    </>
  )
}

const Indruduction = styled.div`
  display: grid;
  justify-content: center;
  grid-template-rows: 1fr auto;
  grid-template-columns: 1fr;
  grid-column-gap: 1rem;
  margin-top: ${({ linePosition }) => linePosition / 8 + 'px'};
  margin-bottom: ${({ linePosition }) => linePosition / 1.5 + 'px'};
  ${above.med`
    grid-template-rows: 1fr auto 1fr;
    grid-template-columns: 6fr 4fr;
    max-width: 960px;
    margin-top: ${({ linePosition }) => linePosition / 4 + 'px'};
    margin-left: auto;
    margin-right: auto;
  `};
`

const Heading1 = styled(H1)`
  grid-column: 1;
  align-self: end;
  line-height: 1.25;
  ${above.med`
    line-height: 1.5;
  `}

  span {
    background-image: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    ${above.xl`
      display: initial;
    `}
  }
`

const Description = styled(Paragraph)`
  grid-column: 1;
  align-self: start;
`

const SocialMediaContainer = styled.div`
  grid-column: 1;
  align-self: start;
  padding: 1rem 0 0.5rem;
  a {
    display: inline-flex;
    margin-right: 1rem;
    color: ${({ theme }) => theme.colors.text};

    &:visited {
      color: ${({ theme }) => theme.colors.text};
    }
    svg {
      width: 100%;
      height: 100%;
    }
  }
  ${above.med`
    padding: 1rem 0;
    &:first-child {
      margin-left: 1rem;
    }
  `}
`
const Image = styled(Img)`
  grid-column: 1;
  grid-row: 1 / 2;
  height: 50vh;
  width: 100%;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  object-fit: cover;
  picture img {
    object-position: 0 15% !important;
  }

  ${above.med`
    grid-row: 1 / 4;
    grid-column: 2;
    height: initial;
    max-height: 512px;
    box-shadow: 0px 1.02343px 1.4595px rgba(0, 0, 0, 0.0731357),
    0px 2.28078px 3.59124px rgba(0, 0, 0, 0.102215),
    0px 3.93246px 6.84841px rgba(0, 0, 0, 0.122983),
    0px 6.31183px 12.2194px rgba(0, 0, 0, 0.142328),
    0px 10.2324px 22.4911px rgba(0, 0, 0, 0.165942),
    0px 18px 51px rgba(0, 0, 0, 0.21);
  `}
`

const LineWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem auto;
  text-align: center;
  svg {
    stroke: ${({ theme }) => theme.colors.text};
  }
  ${above.med`
    margin: 0 auto 6rem;
  `}
`
const Path = styled.path`
  stroke: ${({ theme }) => theme.colors.text};
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
`

const Projects = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr;
  grid-row-gap: 1rem;
  ${above.med`
    grid-template-columns: 1fr 8fr 1fr;
    max-width: 960px;
    margin: 0 auto;
    grid-row-gap: 2rem;
  `}
`

const Heading2 = styled(motion.custom(H2))`
  grid-column: 1;
  color: ${({ theme }) => theme.colors.primary};
  ${above.med`
    grid-column: 2;
  `}
`

const ProjectCard = styled(Card)`
  grid-column: 1;
  ${above.med`
    grid-column: 2;
  `}
`

export const IndexQuery = graphql`
  query HomepageQuery {
    homepage: sanityHomepage {
      description
      image {
        alt
        asset {
          fluid(maxWidth: 700) {
            ...GatsbySanityImageFluid
            src
          }
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
    }
  }
`

export default IndexPage
