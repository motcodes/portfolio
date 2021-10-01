require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const clientConfig = require('./client-config')

module.exports = {
  siteMetadata: {
    title: `Portfolio of Matthias Oberholzer`,
    description: `I am a young web developer with a passion for designing cool new stuff, coding something exciting, taking photos of everything and enjoying some good rock music.`,
    name: `Matthias Oberholzer`,
    author: `@codingMot`,
    siteUrl: `https://matthiasoberholzer.com`,
    bannerImg: 'https://matthiasoberholzer.com/banner.jpg',
  },
  plugins: [
    `gatsby-plugin-react-helmet-async`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Portfolio of Matthias Oberholzer`,
        short_name: `Matthias Oberholzer`,
        description: `I am a young web developer with a passion for designing cool new stuff, coding something exciting, taking photos of everything and enjoying some good rock music.`,
        lang: `en`,
        start_url: `/`,
        background_color: `#0051ef`,
        theme_color: `#0051ef`,
        display: `standalone`,
        icon: `src/images/Logo.png`,
      },
    },
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_PROJECT_DATASET,
        graphqlTag: 'default',
      },
    },
    {
      resolve: `gatsby-plugin-portal`,
      options: {
        key: 'portal',
        id: 'portal',
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-image`,
    {
      resolve: 'gatsby-plugin-sharp',
      options: { failOnError: false },
    },
    `gatsby-transformer-sharp`,
  ],
}
