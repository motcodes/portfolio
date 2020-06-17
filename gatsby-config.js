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
    `gatsby-plugin-react-helmet`,
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
        projectId: `qhdnmhc0`,
        dataset: `production`,
        graphqlTag: 'default',
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-149456197-1',
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sitemap`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
}
