import React, { useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { motion } from 'framer-motion'
import { Header, Footer } from '../elements'
import Seo from '../seo'
import GlobalStyle from '../Global'
import { DarkTheme, LightTheme } from '../utilities'
import { useDarkmode } from '../helpers'
import { useLocalStorage } from '../helpers/useLocalStorage'
import { SharedAnimationLayout } from './SharedAnimationLayout'
import useDarkMode from 'use-dark-mode'

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
  // const { isDarkmode, toggle } = useDarkmode()
  // const {
  //   value: isDarkmode,
  //   toggle,
  //   enable,
  // } = useDarkMode(false, {
  //   storageKey: 'darkMode',
  // })
  // const [theme, setTheme] = useState(LightTheme)
  // const [bg, setBg] = useState(BackgroundLightmode)
  // const [darkMode, setDarkMode] = useLocalStorage('darkMode')

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--vh',
      `${window.innerHeight * 0.01}px`
    )
  }, [])

  // useEffect(() => {
  //   if (isDarkmode) {
  //     setTheme(DarkTheme)
  //     setBg(BackgroundDarkmode)
  //   }
  // }, [isDarkmode])
  // console.log(isDarkmode)
  return (
    <ThemeProvider theme={LightTheme}>
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
            backgroundColor: BackgroundLightmode,
          }}
        >
          <Header />
          <main>{children}</main>
          <Footer />
        </Container>
      </SharedAnimationLayout>
    </ThemeProvider>
  )
}
