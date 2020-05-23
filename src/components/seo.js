import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const SEO = ({ description, lang, meta, title, data }) => {
  const { site } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
        }
      }
    }
  `)

  const metaDescription = description || site.siteMetadata.description
  // const titleTemplateEnding =
  //   `${titleTemplate}` || `| ${site.siteMetadata.title}`
  const metaTitle = `${title}`
  // const metaTitle = `${title} ${titleTemplateEnding}`.trim()
  const siteUrl =
    typeof window !== `undefined`
      ? window.location.href
      : site.siteMetadata.siteUrl

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      // titleTemplate={`%s ${titleTemplateEnding}`.trim()}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: metaTitle,
        },
        {
          name: `image`,
          content: `https://matthiasoberholzer.com/matthiasOberholzer.jpg`,
        },
        {
          property: `og:site_name`,
          content: site.siteMetadata.title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:url`,
          content: siteUrl,
        },
        {
          property: `og:image`,
          content: `https://matthiasoberholzer.com/matthiasOberholzer.jpg`,
        },
        {
          property: `og:image:alt`,
          content: `A picture of Matthias Oberholzer in September 2019`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: metaTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          property: `twitter:image`,
          content: `https://matthiasoberholzer.com/matthiasOberholzer.jpg`,
        },
        {
          property: `twitter:image:alt`,
          content: `A picture of Matthias Oberholzer in September 2019`,
        },
        {
          name: `apple-mobile-wep-app-title`,
          content: `Matthias Oberholzer`,
        },
        {
          name: `robots`,
          content: `index,follow`,
        },
        {
          name: `googlebot`,
          content: `index,follow`,
        },
      ].concat(meta)}
    >
      {/* <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500');
        @import url("https://use.typekit.net/vux8nyf.css");
      </style> */}
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
