import React from 'react'
import styled from 'styled-components'
import { Button, H1 } from '../components/elements'
import Seo from '../components/seo'

export default function NotFound() {
  return (
    <>
      <Seo title="The official site of Matthias Oberholzer" />
      <PageWrapper>
        <H1>404</H1>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </PageWrapper>
    </>
  )
}

const PageWrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  min-height: calc(100vh - 388px);

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-direction: column;

  h1 {
    font-size: 6rem;
  }

  @media (min-width: 768px) {
    min-height: calc(100vh - 468px);
    gap: 2rem;
    h1 {
      font-size: 8rem;
    }
  }
`
