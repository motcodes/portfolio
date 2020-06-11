import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { graphql } from 'gatsby'
import {
  useScrollInView,
  imageUrlFor,
  buildImageObj,
} from '../components/helpers'
import SEO from '../components/seo'
import { PrimaryGrid, breakpoints, above } from '../components/utilities'
import {
  H1,
  H2,
  Paragraph,
  Overlay,
  Card,
  SocialContainer,
} from '../components/elements'

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
        <SocialMediaLinks />
        <Image
          src={imageUrlFor(buildImageObj(homepage.image))}
          alt={homepage.image.alt}
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
          height="144"
          viewBox="0 0 16 144"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          ref={ref}
          initial="rest"
          animate={controls}
          style={{ marginTop: `24px` }}
          variants={lineMotion}
        >
          <Path d="M8 8V136" />
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

const Indruduction = styled(PrimaryGrid)`
  grid-template-rows: 1fr auto;
  margin-top: ${({ linePosition }) => linePosition / 4 + 'px'};
  margin-bottom: ${({ linePosition }) => linePosition / 1.5 + 'px'};
  ${above.med`
    grid-template-rows: 1fr auto 1fr;
  `};
`

const Heading1 = styled(H1)`
  grid-column: 1 / 5;
  align-self: end;
  line-height: 1.25;
  ${above.med`
    grid-column: 1 / 6;
    line-height: 1.5;
  `}
  span {
    background-image: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: table;
    color: ${({ theme }) => theme.colors.primary};

    @media (min-width: ${breakpoints.xl}px) {
      display: initial;
    }
  }
`

const Description = styled(Paragraph)`
  grid-column: 1 / 5;
  align-self: start;
  ${above.med`
    grid-column: 1 / 6;
  `}
`

const SocialMediaLinks = styled(SocialContainer)`
  grid-column: 1 / 5;
  align-self: start;
  ${above.med`
    grid-column: 1 / 6;
  `}
`
const Image = styled.img`
  grid-column: 1 / 5;
  grid-row: 1 / 2;
  height: 20rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  picture img {
    object-position: 0 30% !important;
  }

  ${above.med`
    grid-row: 1 / 4;
    grid-column: 6 / 9;
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

const Projects = styled(PrimaryGrid)`
  grid-row-gap: 1rem;
  @media (min-width: ${breakpoints.med}px) {
    grid-row-gap: 2rem;
  }
`

const Heading2 = styled(motion.custom(H2))`
  grid-column: 1 / 5;
  color: ${({ theme }) => theme.colors.primary};

  ${above.med`
    grid-column: 2 / 9;
  `}
`

const ProjectCard = styled(Card)`
  grid-column: 1 / 5;
  ${above.med`
    grid-column: 2 / 9;
  `}
`

const Path = styled.path`
  stroke: ${({ theme }) => theme.colors.text};
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
`

export const IndexQuery = graphql`
  query HomepageQuery {
    homepage: sanityHomepage {
      description
      image {
        alt
        ...SanityHomepageImage
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
  fragment SanityHomepageImage on SanityHomepageImage {
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
    }
  }
`

export default IndexPage
