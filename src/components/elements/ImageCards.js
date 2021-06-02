import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { H3 } from './Headings'
import { PageLink } from './Links'
import { imageUrlFor, buildImageObj } from '../helpers'

export function ImageCard({ collection, className }) {
  const { title, slug, mainImage, description } = collection
  const croppedImg = imageUrlFor(buildImageObj(mainImage))
    .width(360)
    .height(Math.floor(360 / 2))
    .fit('clip')
    .auto('format')
    .url()

  return (
    <Container to={`/collections/${slug.current}`} className={className}>
      <Image src={croppedImg} alt={description} />
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

const Image = styled.img`
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
  color: ${({ theme }) => theme.colors.grey};
`
