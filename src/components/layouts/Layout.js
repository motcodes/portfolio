import React from 'react'
import styled from 'styled-components'
import { Header } from '../elements'
import { Footer } from '../elements/Footer'
import GlobalStyle from '../Global'

const Container = styled.div`
  padding: 0 1rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

export const Layout = ({ children }) => {
  return (
    <Container>
      <GlobalStyle />
      <Header />
      <main>{children}</main>
      <Footer />
    </Container>
  )
}
