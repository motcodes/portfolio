import React from 'react'
import { Mail, Twitter, Camera, Instagram, GitHub } from 'react-feather'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Logo from '../components/logo'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Logo size={256} className="logo" />
    <h1 className="title">Matthias Oberholzer</h1>
    <p className="lead">
      a coffee addicted 19 year old Nerd and occasionally a Front End WebDev who
      currently lives in Salzburg
    </p>
    <div>
      {links.map(link => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ padding: `0 0.5rem` }}
        >
          {link.icon}
        </a>
      ))}
    </div>
  </Layout>
)

const links = [
  {
    id: 1,
    name: 'Email',
    url: 'mailto:matthias.m.oberholzer@gmail.com',
    icon: <Mail className="icon" />,
  },
  {
    id: 2,
    name: 'Instagram',
    url: 'https://instagram.com/matthias.oberholzer',
    icon: <Instagram className="icon" />,
  },
  {
    id: 3,
    name: 'Github',
    url: 'https://github.com/codingMot/',
    icon: <GitHub className="icon" />,
  },
  {
    id: 4,
    name: 'Twitter',
    url: 'https://twitter.com/CodingMot/',
    icon: <Twitter className="icon" />,
  },
  {
    id: 5,
    name: 'Unsplash',
    url: 'https://unsplash.com/@matthiasoberholzer/',
    icon: <Camera className="icon" />,
  },
]

export default IndexPage
