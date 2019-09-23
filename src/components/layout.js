/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
// import { useStaticQuery, graphql } from "gatsby"
import { BarChart2 } from 'react-feather'

import Header from './header'
import './layout.css'

const Layout = ({ children }) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)

  return (
    <>
      <Header />
      <div
        style={{
          margin: `0 auto`,
          height: `100%`,
          paddingTop: 0,
          textAlign: `center`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          background: `#0051EF`,
          overflowY: `hidden`,
        }}
      >
        <main
          style={{
            display: `flex`,
            justifyContent: `center`,
            flexDirection: `column`,
          }}
        >
          {children}
        </main>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
