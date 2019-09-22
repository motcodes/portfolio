/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
// import { useStaticQuery, graphql } from "gatsby"
import { BarChart2 } from "react-feather"

import Header from "./header"
import "./layout.css"

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
      {/* <BarChart2
        size={32}
        style={{
          position: `absolute`,
          transform: `rotate(90deg)`,
          top: `4rem`,
          left: `4rem`,
        }}
      /> */}
      <div
        style={{
          margin: `0 auto`,
          height: `100vh`,
          // maxWidth: 960,
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
            height: `calc(100vh - 4rem)`,
            width: `calc(100vw - 4rem)`,
            background: `white`,
            borderRadius: 5,
          }}
        >
          {children}
        </main>
        {/* <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer> */}
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
