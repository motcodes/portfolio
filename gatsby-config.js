module.exports = {
  siteMetadata: {
    title: `Portfolio of Matthias Oberholzer`,
    description: `This is the official Portfolio of Matthias Oberholzer, a coffee addicted 19 year old Nerd and occasionally a Frontend Webdeveloper who currently lives in Salzburg`,
    name: `Matthias Oberholzer`,
    author: `@codingMot`,
    siteUrl: `https://matthiasoberholzer.com`,
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
        description: `This is the official Website of Matthias Oberholzer`,
        lang: `en`,
        start_url: `/`,
        background_color: `#0051ef`,
        theme_color: `#0051ef`,
        display: `standalone`,
        icon: `src/images/Logo.png`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-149456197-1',
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
  ],
}
