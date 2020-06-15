import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const SEO = ({ description, lang, meta, title, img, data }) => {
  const { site } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
          bannerImg
        }
      }
    }
  `)

  const metaDescription = description || site.siteMetadata.description
  const metaTitle = `${title}`
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
          content: img || site.siteMetadata.bannerImg,
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
          content: img || site.siteMetadata.bannerImg,
        },
        {
          property: `og:image:alt`,
          content:
            img === undefined
              ? title
              : `A picture of Matthias Oberholzer in May 2020`,
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
          content: img || site.siteMetadata.bannerImg,
        },
        {
          property: `twitter:image:alt`,
          content:
            img === undefined
              ? title
              : `A picture of Matthias Oberholzer in May 2020`,
        },
        {
          name: `apple-mobile-wep-app-title`,
          content: `Matthias Oberholzer`,
        },
      ].concat(meta)}
    >
      <link rel="stylesheet" href="https://use.typekit.net/vux8nyf.css" />
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
