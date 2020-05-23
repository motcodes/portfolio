import React, { useState, useEffect } from 'react'
import { Twitter, Instagram, GitHub, Mail, Facebook } from 'react-feather'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { useScrollInView } from '../components/helpers'
import SEO from '../components/seo'
import { PrimaryGrid, breakpoints, above } from '../components/utilities'
import { H1, H2, Paragraph, Overlay } from '../components/elements'
import Cards from '../components/elements/Cards'

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
  const { homepagePicture, site } = data
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
      <SEO title="Portfolio of Matthias Oberholzer" />
      <Overlay title="homepage" />
      <Indruduction id="intro" linePosition={linePosition}>
        <Heading1>
          Hello There! <span>I’m Matt.</span>
        </Heading1>
        <Description>{site.siteMetadata.description}</Description>
        <SocialContainer>
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
            <GitHub />
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
        </SocialContainer>
        <Image fluid={homepagePicture.childImageSharp.fluid} />
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
        {projectData.map(project => (
          <ProjectCard
            key={project.title}
            title={project.title}
            subtitle={project.subtitle}
            timeperiod={project.timeperiod}
            description={project.description}
            link={project.link}
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

const SocialContainer = styled(motion.div)`
  grid-column: 1 / 5;
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
    grid-column: 1 / 6;
    &:first-child{
      margin-left: 1rem;
    }
  `}
`
const Image = styled(Img)`
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
    grid-column: 6 / end;
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

const ProjectCard = styled(Cards)`
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

const projectData = [
  {
    title: `Ghostbuilder.io`,
    subtitle: `Web App Development`,
    timeperiod: `september 2019 - present`,
    link: `https://ghostbuilder.io`,
    description: `My diploma thesis in cooperation with the company PC Builders Club. My Part was to prototyp, design & develop the whole webapp from scratch. My prototyping tool of choice was XD. The UI is coded with the ReactJs Framework. Later in the Project I also migrated the site to Gatsby for a faster expierence & added the CMS Sanity.io for handling the meta data and blog.`,
  },
  {
    title: 'Land schafft Leben',
    subtitle: `Product template for education`,
    timeperiod: `march 2020 - may 2020`,
    link: `https://landschafftleben.at`,
    description:
      '"Land schafft Leben" wrote to me whether I could create a template for the various food data for them. With the help of this data, teachers should have an easier time getting picture and video material, as well as infographics and worksheets for the students. Since the hosting server can only process simple scripts, I decided to use good old vanilla Javascript. In order to get more out of the video player, I also used the "plyr" library and integrated it via a cdn. The prototype of the design was created by Land schafft Lebens\'s own graphic department and translated into a responsive layout by me, so that it works well in every format.',
  },
  {
    title: `NCM`,
    subtitle: `Content Managment`,
    timeperiod: `6 weeks, summer 2016`,
    link: `https://www.ncm.at/`,
    description: `My first intern in a Web Agency. I helped out adding & editing articles, images and components into the  Contao CMS System. I also detected & fixed frontend  bugs in HTML and CSS/LESS.`,
  },
  {
    title: `Siemens`,
    subtitle: `Java Developer`,
    timeperiod: `4 weeks, summer 2018`,
    link: `https://new.siemens.com/at/de/unternehmen/ueber-uns/standorte/standort-salzburg.html`,
    description: `I designed & developed a new version of Siemens ssh-tool for connecting to other networks & computer. For the UI I chose to work with Java Window Builder.`,
  },
]

export const IndexQuery = graphql`
  query HomepageQuery {
    homepagePicture: file(relativePath: { eq: "HomepagePicture.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    site {
      siteMetadata {
        description
      }
    }
  }
`

export default IndexPage
