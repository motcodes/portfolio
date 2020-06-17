import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { H2 } from './Headings'
import { imageUrlFor, buildImageObj } from '../helpers'
import { above } from '../utilities'

export function CollectionPreview({ title, imgSrc, slug }) {
  return (
    <Container whileTap={{ scale: 0.99 }}>
      <Img src={imageUrlFor(buildImageObj(imgSrc)).url()} alt="header image" />
      <TitleWrapper to={`/collections/${slug.current}`}>
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

  ${above.med`
    margin: 1rem 0;
  `}
`
const Img = styled(motion.img)`
  border-radius: 4px;
  width: 100%;
  height: 100%;
  max-width: 1440px;
  max-height: 512px;
  object-fit: cover;
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

  @media (hover: hover) {
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
