import React from 'react'
import styled from 'styled-components'
import { Paragraph } from './Paragraphs'
import { Logo } from './Logo'
import { LogoDarkmode } from './LogoDarkmode'

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6rem;
  margin-bottom: 3rem;
`
const LogoWrapper = styled.div`
  height: 6rem;
  width: 6rem;
`
const FooterParagraph = styled(Paragraph)`
  padding-top: 1rem;
`

export const Footer = ({ isDarkmode }) => {
  return (
    <FooterWrapper>
      <LogoWrapper>{!isDarkmode ? <Logo /> : <LogoDarkmode />}</LogoWrapper>
      <FooterParagraph>
        © {new Date().getFullYear()} Matthias Oberholzer
      </FooterParagraph>
    </FooterWrapper>
  )
}
