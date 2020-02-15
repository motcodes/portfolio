import React from 'react'
import styled from 'styled-components'
import { Paragraph } from './Paragraphs'
import { Logo } from '../image'

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6rem;
  margin-bottom: 3rem;
`

const FooterParagraph = styled(Paragraph)`
  padding-top: 1rem;
`

export const Footer = () => {
  return (
    <FooterWrapper>
      <Logo />
      <FooterParagraph>© 2020 Matthias Oberholzer</FooterParagraph>
    </FooterWrapper>
  )
}
