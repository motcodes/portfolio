import React from 'react'
import PropTypes from 'prop-types'

import Header from './header'
import './layout.scss'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div
        id="wrapper"
        style={{
          margin: `0 auto`,
          height: `100%`,
          paddingTop: 0,
          textAlign: `center`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          overflowY: `hidden`,
        }}
      >
        <main
          style={{
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
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
