module.exports = {
  siteMetadata: {
    title: `Portfolio of Matthias Oberholzer`,
    description: `This is the official Portfolio of Matthias Oberholzer, a coffee addicted 19 year old Nerd and occasionally a Frontend Webdeveloper who currently lives in Salzburg`,
    name: `Matthias Oberholzer`,
    author: `@codingMot`,
    siteUrl: `https://www.matthiasoberholzer.com`,
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
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Portfolio of Matthias Oberholzer`,
        short_name: `Matthias Oberholzer`,
        description: `This is the official Portfolio of Matthias Oberholzer, a coffee addicted 19 year old Nerd and occasionally a Frontend Webdeveloper who currently lives in Salzburg`,
        lang: `en`,
        start_url: `/`,
        background_color: `#0051EF`,
        theme_color: `#0051EF`,
        display: `standalone`,
        icon: `src/images/Logo.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sitemap`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
