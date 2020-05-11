import React, { useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Header, Footer } from '../elements'
import GlobalStyle from '../Global'
import { DarkTheme, LightTheme } from '../utilities'
import { useDarkmode } from '../helpers'
import SEO from '../seo'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.bg};
  transition: background-color 0.5s ease;
`

export default function Layout({ children, location }) {
  const [isDarkmode, toggleDarkmode] = useDarkmode()
  const [height, setHeight] = useState(0)

  useEffect(() => {
    setHeight(window.innerHeight)
    document.documentElement.style.setProperty(
      '--vh',
      `${window.innerHeight * 0.01}px`
    )
  }, [])

  return (
    <ThemeProvider theme={isDarkmode ? DarkTheme : LightTheme}>
      <Container>
        <SEO title="Portfolio of Matthias Oberholzer" />
        <GlobalStyle />
        <Header isDarkmode={isDarkmode} toggleDarkmode={toggleDarkmode} />
        <main>{children}</main>
        <Footer isDarkmode={isDarkmode} toggleDarkmode={toggleDarkmode} />
      </Container>
    </ThemeProvider>
  )
}
