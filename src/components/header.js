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
    },
    {
      id: 2,
      name: 'Instagram',
      url: 'https://instagram.com/matthias.oberholzer',
    },
    {
      id: 3,
      name: 'Github',
      url: 'https://github.com/codingMot/',
    },
    {
      id: 4,
      name: 'Twitter',
      url: 'https://twitter.com/CodingMot/',
    },
    {
      id: 5,
      name: 'Unsplash',
      url: 'https://unsplash.com/@matthiasoberholzer/',
    },
  ]

  return (
    <header id="nav">
      <BarChart2 id="navIcon" onClick={() => setVisible(!visible)} />
      <ul
        id="navList"
        style={{
          opacity: visible ? `1` : `0`,
          transform: visible ? `translateX(0)` : `translateX(-30px)`,
          transition: `opacity 0.3s, transform 0.5s`,
        }}
      >
        {links.map(link => (
          <li className="navListItem" key={link.id}>
            <a
              className="navLink"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.name}
            </a>
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
