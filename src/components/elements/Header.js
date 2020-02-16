import React from 'react'
import styled from 'styled-components'
import { Logo } from '../image'
import { Paragraph } from './Paragraphs'
import { DarkGrey, LightGrey } from '../utilities'
import { Moon, Sun } from 'react-feather'

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
      cursor: pointer;
    }
  }
`
const HeaderLink = styled(Paragraph)`
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: border 0.3s ease;
  color: ${({ theme }) => theme.colors.navText};
  &:hover {
    border-bottom: 2px solid ${({ theme }) => theme.colors.navText};
  }
`

const DarkmodeButton = styled.button`
  background: none;
  border: none;
  outline: none;
  margin: 0;
  padding: 0;
`

export const Header = ({ isDarkmode, toggleDarkmode }) => {
  return (
    <HeaderWrapper>
      <Logo />
      <nav>
        <DarkmodeButton onClick={toggleDarkmode}>
          {!isDarkmode ? <Moon color={DarkGrey} /> : <Sun color={LightGrey} />}
        </DarkmodeButton>
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
