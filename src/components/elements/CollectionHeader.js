import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { H2 } from './Headings'
import { imageUrlFor, buildImageObj } from '../helpers'

export function CollectionHeader({ title, imgSrc }) {
  const [imgHeight, setImgHeight] = useState(0)
  useEffect(() => {
    const pageHeight = window.innerHeight
    const header = document.getElementsByTagName('header')[0].clientHeight
    setImgHeight(pageHeight - header)
  }, [])

  return (
    <Container>
      <Img
        src={imageUrlFor(buildImageObj(imgSrc)).url()}
        alt="header image"
        imgHeight={imgHeight}
      />
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
  max-height: ${({ imgHeight }) => `${imgHeight}px`};
`
const Img = styled(motion.img)`
  width: 100%;
  max-height: ${({ imgHeight }) => `${imgHeight}px`};
  object-fit: cover;
  position: relative;
`

const TitleWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  width: 100%;
  max-height: ${({ imgHeight }) => `${imgHeight}px`};
  justify-content: center;
  align-items: center;
  text-decoration: none;
`

const Title = styled(H2)`
  color: #fff;
  text-decoration: none;
`
