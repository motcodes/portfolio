import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'
import { motion } from 'framer-motion'
import { Moon, Sun } from 'react-feather'
import { useLocation } from '@reach/router'
import { DarkGrey, LightGrey, above } from '../utilities'
import { Logo } from './Logo'
import { PageLink } from './Links'
import { LogoDarkmode } from './LogoDarkmode'

const HeaderWrapper = styled.header`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 100%;
  max-width: 960px;
  z-index: 1;

  ${above.med`
    padding-top: 2rem;
    padding-bottom: 2rem;
  `}

  nav {
    display: flex;
    flex-direction: row;
    align-items: center;

    * {
      margin: 0 0.5rem;
      cursor: pointer;

      ${above.med`
        margin: 0 1rem;
      `}
    }
  }
  ${({ collection }) => {
    if (collection) {
      return css`
        padding-left: 1rem;
        padding-right: 1rem;
        ${above.med`
          padding-left: 2rem;
          padding-right: 2rem;
        `}
      `
    }
  }}
`

const LogoWrapper = styled(Link)`
  height: 3rem;
  width: 3rem;
  display: inline-block;

  ${above.med`
    height: 5rem;
    width: 5rem;
  `};
  ${above.med`
    height: 6rem;
    width: 6rem;
  `};
`

const DarkmodeButton = styled(motion.button)`
  background: none;
  border: none;
  outline: none;
  margin: 0;
  padding: 0;
  &:hover {
    * {
      stroke: #f2c94c;
    }
  }
`

export const Header = ({ isDarkmode, toggleDarkmode }) => {
  const { pathname } = useLocation()
  return (
    <HeaderWrapper
      style={{
        paddingLeft: pathname.includes('collections') ? `1rem` : `0`,
        paddingRight: pathname.includes('collections') ? `1rem` : `0`,
      }}
    >
      <LogoWrapper to="/">
        {!isDarkmode ? <Logo /> : <LogoDarkmode />}
      </LogoWrapper>
      <nav>
        <DarkmodeButton
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleDarkmode}
          ariaLabel="Toggle Darkmode"
        >
          {!isDarkmode ? (
            <Moon color={DarkGrey} style={{ margin: 0 }} />
          ) : (
            <Sun color={LightGrey} style={{ margin: 0 }} />
          )}
        </DarkmodeButton>
        <PageLink to="/about/" activeClassName="active">
          About
        </PageLink>
        <PageLink to="/photography/" activeClassName="active">
          Photography
        </PageLink>
        {/* <PageLink to="/photography/">
          Blog
        </PageLink> */}
      </nav>
    </HeaderWrapper>
  )
}
