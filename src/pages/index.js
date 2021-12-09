import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Twitter, Instagram, GitHub, Mail, Link } from 'react-feather'
import Seo from '../components/seo'
import { useAnimationOnMount, useScrollInView } from '../components/helpers'
import { above } from '../components/utilities'
import { H1, H2, Paragraph, Card, PageLink } from '../components/elements'
import { ImageCard } from '../components/elements/ImageCards'

const introMotion = {
  rest: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.33,
      ease: [0.22, 0.38, 0.545, 0.995],
    },
  },
}
const LinksMotion = {
  rest: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.15,
      ease: [0.22, 0.38, 0.545, 0.995],
    },
  },
}
const introItemMotion = {
  rest: {
    opacity: 0,
    y: 16,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 0.38, 0.545, 0.995],
    },
  },
}

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
      delay: 0.2,
      default: { duration: 1.5 },
      opacity: { duration: 0.3 },
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
      delay: 0.3,
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
      duration: 0.33,
      ease: [0.22, 0.38, 0.545, 0.995],
    },
  },
}

const IndexPage = ({ data }) => {
  const { homepage } = data
  const [linePosition, setLinePosition] = useState(0)
  const [lineRef, lineControls] = useScrollInView({
    threshold: 1,
    triggerOnce: true,
  })
  const [projectRef, projectControls] = useScrollInView()
  const [collectionsRef, collectionsControls] = useScrollInView()

  const indruductionControls = useAnimationOnMount()

  useEffect(() => {
    const pageHeight = window.innerHeight
    const intro = document.getElementById('intro').offsetHeight
    const header = document.getElementsByTagName('header')[0].clientHeight
    setLinePosition(pageHeight - (intro + header))
  }, [])

  return (
    <>
      <Seo title="The official site of Matthias Oberholzer" />
      <Indruduction
        id="intro"
        linePosition={linePosition}
        initial="rest"
        animate={indruductionControls}
        variants={introMotion}
      >
        <ImageContainer variants={introItemMotion}>
          <Image
            image={homepage.image.asset.gatsbyImageData}
            alt={homepage.image.alt}
          />
        </ImageContainer>
        <Heading1 variants={introItemMotion}>
          Hello There! <span>I’m Matt.</span>
        </Heading1>
        <Description variants={introItemMotion}>
          {homepage.description}
        </Description>
        <SocialMediaContainer
          initial="rest"
          animate={indruductionControls}
          variants={LinksMotion}
        >
          <motion.a
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.9 }}
            href="https://twitter.com/motcodes"
            target="_blank"
            rel="noopener"
            variants={introItemMotion}
          >
            <Twitter title="Twitter Link to Matthias Oberholzer" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.9 }}
            href="https://instagram.com/matthias.oberholzer"
            target="_blank"
            rel="noopener"
            variants={introItemMotion}
          >
            <Instagram title="Instagram Link to Matthias Oberholzer" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.9 }}
            href="https://github.com/motcodes"
            target="_blank"
            rel="noopener"
            variants={introItemMotion}
          >
            <GitHub title="Github Link to Matthias Oberholzer" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.9 }}
            href="mailto:hello@mot.codes"
            target="_blank"
            rel="noopener"
            variants={introItemMotion}
          >
            <Mail title="Email from Matthias Oberholzer" />
          </motion.a>
        </SocialMediaContainer>
      </Indruduction>
      <LineWrapper>
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          ref={lineRef}
          initial="rest"
          animate={lineControls}
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
          ref={lineRef}
          initial="rest"
          animate={lineControls}
          variants={lineMotion}
          style={{ marginTop: `24px` }}
        >
          <Path d="M8 8V190" />
        </motion.svg>
      </LineWrapper>
      <Projects as="section">
        <Heading2
          ref={projectRef}
          initial="rest"
          animate={projectControls}
          variants={h2Motion}
        >
          expierence &amp; projects
        </Heading2>
        {homepage.projects.map((project) => (
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
      <Collections as="section">
        <Heading2
          ref={collectionsRef}
          initial="rest"
          animate={collectionsControls}
          variants={h2Motion}
        >
          featured collections
        </Heading2>
        {homepage.collections.map((collection, index) => (
          <CollectionCard
            collection={collection}
            key={collection.slug.current}
            delay={index}
          />
        ))}
        <PageLink
          to="photography"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            width: 'max-content',
          }}
        >
          more collections
          <Link size="16" style={{ marginLeft: 8 }} />
        </PageLink>
      </Collections>
    </>
  )
}

const Indruduction = styled(motion.section)`
  display: grid;
  justify-content: center;
  grid-template-rows: 1fr auto;
  grid-template-columns: 1fr;
  grid-column-gap: 1rem;
  margin-top: 24px;
  margin-bottom: ${({ linePosition }) =>
    linePosition > 0 ? linePosition / 1.5 + 'px' : '10rem'};
  ${above.med`
    grid-template-rows: 1fr auto 1fr;
    grid-template-columns: 6fr 4fr;
    max-width: 960px;
    margin-top: 10vh;
    margin-left: auto;
    margin-right: auto;
  `};
`

const Heading1 = styled(motion(H1))`
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

const Description = styled(motion(Paragraph))`
  grid-column: 1;
  align-self: start;
`

const SocialMediaContainer = styled(motion.div)`
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
      max-width: 24px;
      max-height: 24px;
    }
  }
  ${above.med`
    padding: 1rem 0;
    &:first-child {
      margin-left: 1rem;
    }
  `}
`
const ImageContainer = styled(motion.div)`
  grid-column: 1;
  grid-row: 1 / 2;
  border-radius: 0.5rem;
  ${above.med`
    grid-row: 1 / 4;
    grid-column: 2;`}
`
const Image = styled(GatsbyImage)`
  height: 50vh;
  width: 100%;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  object-fit: cover;
  img {
    border-radius: 0.5rem;
    /* object-position: 0 15% !important; */
  }

  ${above.med`
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
  margin: 6rem auto 8rem;
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
  grid-row-gap: 2rem;
  ${above.med`
    // grid-template-columns: 1fr 8fr 1fr;
    grid-template-columns: 1fr 1fr;
    max-width: 720px;
    margin: 0 auto 2rem;
    grid-row-gap: 4rem;
  `}
`
const Collections = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 3rem;
  ${above.med`
    grid-template-columns: 1fr 1fr;
    max-width: 720px;
    margin: 6rem auto 2rem;
    gap: 2rem;
  `}
  h2 {
    grid-column: span 2;
  }
`

const Heading2 = styled(motion(H2))`
  grid-column: 1;
  color: ${({ theme }) => theme.colors.primary};
  ${above.med`
    grid-column: span 2;
  `}
`

const ProjectCard = styled(motion(Card))`
  grid-column: 1;
  ${above.med`
    grid-column: span 2;
  `}
`
const CollectionCard = styled(motion(ImageCard))``

export const IndexQuery = graphql`
  {
    homepage: sanityHomepage {
      description
      image {
        alt
        asset {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: BLURRED
            formats: AUTO
          )
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
      collections {
        title
        slug {
          current
        }
        mainImage {
          asset {
            gatsbyImageData(
              placeholder: BLURRED
              layout: CONSTRAINED
              formats: AUTO
              height: 304
              width: 512
            )
          }
        }
        description
      }
    }
  }
`

export default IndexPage
