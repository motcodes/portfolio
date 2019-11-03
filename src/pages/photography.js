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
        // id="wrapper"
        style={{
          margin: `0 auto`,
          paddingTop: 0,
          textAlign: `center`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          background: `black`,
        }}
      >
        <div
          style={{
            marginTop: `15%`,
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
            flexDirection: `column`,
          }}
        >
          <h1>Photography</h1>
          <p style={{ maxWidth: 960, textAlign: `left` }}>
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
