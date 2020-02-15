import React from 'react'
import styled from 'styled-components'
import { Logo } from '../image'
import { Paragraph } from './Paragraphs'
import { DarkGrey } from '../utilities'
import { Moon } from 'react-feather'

const HeaderWrapper = styled.header`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding-top: 2rem;
  width: 100%;
  max-width: 960px;

  nav {
    display: flex;
    flex-direction: row;
    align-items: center;

    * {
      margin: 0 1rem;
      color: ${DarkGrey};
      cursor: pointer;
    }
  }
`
const HeaderLink = styled(Paragraph)`
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: border 0.3s ease;
  &:hover {
    border-bottom: 2px solid ${DarkGrey};
  }
`

export const Header = () => {
  return (
    <HeaderWrapper>
      <Logo />
      <nav>
        <Moon color={DarkGrey} />
        <HeaderLink as="a" href="/about/">
          About
        </HeaderLink>
        <HeaderLink as="a" href="/photography/">
          Photogaphy
        </HeaderLink>
      </nav>
    </HeaderWrapper>
  )
}
