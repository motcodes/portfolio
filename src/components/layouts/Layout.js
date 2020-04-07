import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Header } from '../elements'
import { Footer } from '../elements/Footer'
import GlobalStyle from '../Global'
import { DarkTheme, LightTheme, above } from '../utilities'
import { useDarkmode } from '../helpers'

const Container = styled.div`
  padding: 0 1rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.bg};
  transition: background-color 0.5s ease;

  ${above.med`
    padding: 0 2rem;
  `}
`

export const Layout = ({ children }) => {
  const [isDarkmode, toggleDarkmode] = useDarkmode()

  return (
    <ThemeProvider theme={isDarkmode ? DarkTheme : LightTheme}>
      <Container>
        <GlobalStyle />
        <Header isDarkmode={isDarkmode} toggleDarkmode={toggleDarkmode} />
        <main>{children}</main>
        <Footer isDarkmode={isDarkmode} toggleDarkmode={toggleDarkmode} />
      </Container>
    </ThemeProvider>
  )
}
