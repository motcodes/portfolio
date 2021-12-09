import React from 'react'
import styled from 'styled-components'
import { GatsbyImage } from 'gatsby-plugin-image'
import { motion } from 'framer-motion'
import { H1 } from './Headings'

export function CollectionHeader({ title, image }) {
  return (
    <Container>
      <Img image={image} alt={title} />
      <TitleWrapper>
        <Title>{title}</Title>
      </TitleWrapper>
    </Container>
  )
}

const Container = styled(motion.div)`
  display: block;
  position: relative;
  margin: 0 0 1rem;
  max-width: 100vw;
  max-height: calc(100vh - 128px);
`

const Img = styled(motion(GatsbyImage))`
  width: 100%;
  max-height: calc(100vh - 128px);
  object-fit: cover;
  position: relative;
`

const TitleWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 1rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`

const Title = styled(H1)`
  color: #fff;
  text-decoration: none;
`
