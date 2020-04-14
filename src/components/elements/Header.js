import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { motion } from 'framer-motion'
import { Moon, Sun } from 'react-feather'
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
  width: 100%;
  max-width: 960px;
  z-index: 1;

  ${above.med`
    padding-top: 2rem;
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
  return (
    <HeaderWrapper>
      <LogoWrapper to="/">
        {!isDarkmode ? <Logo /> : <LogoDarkmode />}
      </LogoWrapper>
      <nav>
        <DarkmodeButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleDarkmode}
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
