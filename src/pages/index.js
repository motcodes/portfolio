import React from 'react'
import { Mail, Twitter, Camera, Instagram, GitHub } from 'react-feather'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Logo from '../components/logo'

const IndexPage = () => (
  <Layout itemScope itemType="http://schema.org/Person">
    <SEO title="About Me" />
    <Logo size={256} className="logo" ariaLabel="Logo" />
    <h1 className="title" itemProp="name" ariaLabel="Name">
      <span itemProp="givenName">Matthias</span>{' '}
      <span itemProp="familyName">Oberholzer</span>
    </h1>
    <p className="lead" ariaLabel="About">
      a coffee addicted 19 year old Nerd and occasionally a
      <span itemProp="jobTitle" style={{ fontStyle: `italic` }}>
        {' '}
        Frontend Webdeveloper
      </span>{' '}
      who currently lives in <span itemProp="homeLocation">Salzburg</span>
    </p>
    <div className="link-wrapper">
      {links.map(link => (
        <a
          key={link.id}
          href={link.url}
          ariaLabel={link.name}
          target="_blank"
          rel="noopener noreferrer"
          className="icon-container"
          itemProp="url"
        >
          <div className="link-container">
            {link.icon}
            <p className="link-title">{link.title}</p>
          </div>
        </a>
      ))}
    </div>
  </Layout>
)

const links = [
  {
    id: 1,
    title: 'Email',
    url: 'mailto:matthias.m.oberholzer@gmail.com',
    icon: <Mail className="icon" />,
  },
  {
    id: 2,
    title: 'Instagram',
    url: 'https://instagram.com/matthias.oberholzer',
    icon: <Instagram className="icon" />,
  },
  {
    id: 3,
    title: 'Github',
    url: 'https://github.com/codingMot/',
    icon: <GitHub className="icon" />,
  },
  {
    id: 4,
    title: 'Twitter',
    url: 'https://twitter.com/CodingMot/',
    icon: <Twitter className="icon" />,
  },
  {
    id: 5,
    title: 'Unsplash',
    url: 'https://unsplash.com/@matthiasoberholzer/',
    icon: <Camera className="icon" />,
  },
]

export default IndexPage
