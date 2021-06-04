import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'
import { useStaticQuery, graphql } from 'gatsby'

const Seo = ({ description, lang, meta, title, img }) => {
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
          content: description || site.siteMetadata.description,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          name: `image`,
          content: img === undefined ? site.siteMetadata.bannerImg : img,
        },
        {
          property: `og:site_name`,
          content: site.siteMetadata.title,
        },
        {
          property: `og:description`,
          content: description || site.siteMetadata.description,
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
          content: img === undefined ? site.siteMetadata.bannerImg : img,
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
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description || site.siteMetadata.description,
        },
        {
          property: `twitter:image`,
          content: img === undefined ? site.siteMetadata.bannerImg : img,
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

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default Seo
