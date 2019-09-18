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
      <Link to="https://github.com/codingMot/">
        <GitHub size={32} />
      </Link>
      <Link to="https://instagram.com/matthias.oberholzer">
        <Instagram size={32} />
      </Link>
    </div>
  </Layout>
)

export default IndexPage
