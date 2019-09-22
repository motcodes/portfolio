import React from 'react'
import { Mail, Twitter, Camera, Instagram, GitHub } from 'react-feather'

import Layout from '../components/layout'
// import Image from "../components/image"
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1 style={{ fontSize: `4rem`, userSelect: `none` }}>
      Matthias Oberholzer
    </h1>
    <p style={{ fontSize: `1.1rem`, userSelect: `none` }}>
      a coffee addicted 19 year old Nerd and occasionally a Front End WebDev who
      currently lives in Salzburg
    </p>
    <div>
      <a
        href="mailto:matthias.m.oberholzer@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{ padding: `0 0.5rem` }}
      >
        <Mail size={32} />
      </a>
      <a
        href="https://instagram.com/matthias.oberholzer"
        target="_blank"
        rel="noopener noreferrer"
        style={{ padding: `0 0.5rem` }}
      >
        <Instagram size={32} />
      </a>
      <a
        href="https://github.com/codingMot/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ padding: `0 0.5rem` }}
      >
        <GitHub size={32} />
      </a>
      <a
        href="https://twitter.com/CodingMot"
        target="_blank"
        rel="noopener noreferrer"
        style={{ padding: `0 0.5rem` }}
      >
        <Twitter size={32} />
      </a>
      <a
        href="https://unsplash.com/@matthiasoberholzer"
        target="_blank"
        rel="noopener noreferrer"
        style={{ padding: `0 0.5rem` }}
      >
        <Camera size={32} />
      </a>
    </div>
  </Layout>
)

export default IndexPage
