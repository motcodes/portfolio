import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { H3 } from './Headings'
import { PageLink } from './Links'
import { useScrollInView } from '../helpers'

export function ImageCard({ collection, className, delay }) {
  const { title, slug, mainImage, description } = collection

  const [cardRef, cardControls] = useScrollInView({
    threshold: 0.45,
    triggerOnce: true,
  })

  const motionContainer = {
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
        duration: 0.6,
        delay: 0.2 + 0.1 * delay,
        ease: [0.22, 0.38, 0.545, 0.995],
      },
    },
  }

  return (
    <Container
      ref={cardRef}
      initial="rest"
      animate={cardControls}
      variants={motionContainer}
      to={`/collections/${slug.current}`}
      className={className}
    >
      <Image image={mainImage.asset.gatsbyImageData} alt={description} />
      <Title>{title}</Title>
    </Container>
  )
}

const Container = styled(motion(PageLink))`
  text-decoration: none;
  border: none;
  &:hover {
    border: none;
  }
`

const Image = styled(GatsbyImage)`
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
  transition: all 0.3s ease-out;
  &:hover {
    box-shadow: 0px 1.02343px 1.4595px rgba(0, 0, 0, 0.0731357),
      0px 2.28078px 3.59124px rgba(0, 0, 0, 0.102215),
      0px 3.93246px 6.84841px rgba(0, 0, 0, 0.122983),
      0px 6.31183px 12.2194px rgba(0, 0, 0, 0.142328),
      0px 10.2324px 22.4911px rgba(0, 0, 0, 0.165942),
      0px 18px 51px rgba(0, 0, 0, 0.2);
  }
`
const Title = styled(motion(H3))`
  color: ${({ theme }) => theme.colors.black};
`
