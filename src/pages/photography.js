import React from 'react'

import Photos from '../components/photos'
import SEO from '../components/seo'
import Header from '../components/header'

const PhotographyPage = () => {
  return (
    <>
      <SEO title="Photos taken by Matthias Oberholzer" />
      <Header />
      <div
        style={{
          margin: `0 auto`,
          textAlign: `center`,
          display: `flex`,
          justifyContent: `center`,
          background: `#1f2022`,
        }}
      >
        <div
          style={{
            marginTop: `12rem`,
            maxWidth: 1320,
            margin: `12rem 2rem 6rem`,
          }}
        >
          <h1>Photography</h1>
          <p style={{ maxWidth: 960, textAlign: `left`, margin: `0 auto` }}>
            I started taking pictures in 2018. Two months before I came to New
            York for the second time. Basically, I study photography in one of
            the most beautiful places in the world. But also to one of the
            swiftest and most scary places in the world, which can face a person
            from a simple village.
          </p>
          <Photos />
        </div>
      </div>
    </>
  )
}

export default PhotographyPage
