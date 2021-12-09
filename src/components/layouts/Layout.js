import React, { useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { motion } from 'framer-motion'
import { Header, Footer } from '../elements'
import Seo from '../seo'
import GlobalStyle from '../Global'
import { DarkTheme, LightTheme } from '../utilities'
import { useDarkmode } from '../helpers'
import { SharedAnimationLayout } from './SharedAnimationLayout'

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.bg};
  transition: background-color 0.5s ease;
`

export default function Layout({
  children,
  location,
  BackgroundLightmode,
  BackgroundDarkmode,
}) {
  const { isDarkmode, toggle } = useDarkmode()
  console.log('isDarkmode :', isDarkmode)

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--vh',
      `${window.innerHeight * 0.01}px`
    )
  }, [])

  return (
    <ThemeProvider theme={isDarkmode ? DarkTheme : LightTheme}>
      <Seo title="Matthias Oberholzer" />
      <GlobalStyle />
      <SharedAnimationLayout>
        <Container
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.666 }}
          style={{
            paddingLeft: location.pathname.includes('collections')
              ? `0`
              : `1rem`,
            paddingRight: location.pathname.includes('collections')
              ? `0`
              : `1rem`,
            backgroundColor: isDarkmode
              ? BackgroundDarkmode
              : BackgroundLightmode,
          }}
        >
          <Header isDarkmode={isDarkmode} toggleDarkmode={toggle} />
          <main>{children}</main>
          <Footer isDarkmode={isDarkmode} toggleDarkmode={toggle} />
        </Container>
      </SharedAnimationLayout>
    </ThemeProvider>
  )
}
