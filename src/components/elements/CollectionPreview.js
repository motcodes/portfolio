import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { H2 } from './Headings'
import { above } from '../utilities'

export function CollectionPreview({ title, image, slug }) {
  return (
    <Container whileTap={{ scale: 0.99 }}>
      <Img image={image} alt={title} />
      <TitleWrapper to={`/collections/${slug}`}>
        <Title>{title}</Title>
      </TitleWrapper>
    </Container>
  )
}

const Container = styled(motion.div)`
  display: block;
  position: relative;
  max-width: 1440px;
  max-height: 512px;
  margin: 0.5rem 0;
  border-radius: 1rem;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.07),
    0px 20px 30px rgba(0, 0, 0, 0.14);
  ${above.med`
    margin: 1rem 0;
  `}
`

const Img = styled(motion(GatsbyImage))`
  border-radius: 16px;
  width: 100%;
  height: 100%;
  max-width: 1440px;
  max-height: 512px;
  object-fit: cover;
  z-index: 2;
`

const TitleWrapper = styled(Link)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  width: 100%;
  height: 99.99%;
  padding: 1rem;
  text-align: center;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  z-index: 2;

  @media (hover: hover) {
    border-radius: 1rem;
    z-index: 2;

    background-color: rgba(0, 0, 0, 0.3);
    transition: all 0.75s ease;
    &:hover {
      background-color: rgba(0, 0, 0, 0);
    }
  }
`

const Title = styled(H2)`
  color: #fff;
  text-decoration: none;
`
