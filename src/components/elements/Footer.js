import React from 'react'
import styled from 'styled-components'
import { Paragraph } from './Paragraphs'
import { Logo } from './Logo'

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8rem;
  margin-bottom: 3rem;
`
const LogoWrapper = styled.div`
  height: 6rem;
  width: 6rem;
`
const FooterParagraph = styled(Paragraph)`
  padding-top: 1rem;
`

export const Footer = () => {
  return (
    <FooterWrapper>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <FooterParagraph>
        © {new Date().getFullYear()} Matthias Oberholzer
      </FooterParagraph>
    </FooterWrapper>
  )
}
