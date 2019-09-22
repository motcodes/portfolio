import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { BarChart2 } from 'react-feather'

import './header.css'

const Header = ({ siteTitle }) => {
  const [visible, setVisible] = useState(false)

  const links = [
    {
      id: 1,
      name: 'Email',
      url: 'mailto:matthias.m.oberholzer@gmail.com',
      delay: 0.1,
    },
    {
      id: 2,
      name: 'Instagram',
      url: 'https://instagram.com/matthias.oberholzer',
      delay: 0.2,
    },
    {
      id: 3,
      name: 'Github',
      url: 'https://github.com/codingMot/',
      delay: 0.3,
    },
    {
      id: 4,
      name: 'Twitter',
      url: 'https://twitter.com/CodingMot/',
      delay: 0.4,
    },
    {
      id: 5,
      name: 'Unsplash',
      url: 'https://unsplash.com/@matthiasoberholzer/',
      delay: 0.5,
    },
  ]

  return (
    <header
      style={{
        position: `absolute`,
        left: `4rem`,
        top: `4rem`,
        display: `flex`,
      }}
    >
      <BarChart2
        size={32}
        style={{
          transform: `rotate(90deg)`,
          cursor: `pointer`,
        }}
        onClick={() => setVisible(!visible)}
      />
      <ul
        style={
          {
            // opacity: visible ? `1` : `0`,
            // transform: visible ? `translateX(0)` : `translateX(-30px)`,
            // transition: `all 0.3s linear`,
          }
        }
      >
        {links.map(link => (
          <li
            key={link.id}
            style={{
              opacity: visible ? `1` : `0`,
              transform: visible ? `translateX(0)` : `translateX(-30px)`,
              transition: `opacity 0.3s, transform 0.5s`,
            }}
          >
            <a href={link.url}>{link.name}</a>
          </li>
        ))}
      </ul>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
