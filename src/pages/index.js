import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Logo from '../components/logo'

const IndexPage = () => (
  <Layout>
    <SEO title="About Me" />
    <Logo size={256} className="logo" ariaLabel="Logo" />
    <h1 className="title">Mark 2 is coming soon ...</h1>
  </Layout>
)

export default IndexPage
