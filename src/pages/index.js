import React from "react"
import { Link } from "gatsby"
import { Reddit, Instagram, GitHub } from "react-feather"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Matthias Oberholzer</h1>
    <div>
      <a
        href="https://github.com/codingMot/"
        target="_blank"
        style={{ padding: `0 0.5rem` }}
      >
        <GitHub size={32} />
      </a>
      <a
        href="https://instagram.com/matthias.oberholzer"
        target="_blank"
        style={{ padding: `0 0.5rem` }}
      >
        <Instagram size={32} />
      </a>
    </div>
  </Layout>
)

export default IndexPage
