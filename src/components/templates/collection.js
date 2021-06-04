import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { Helmet } from 'react-helmet-async'
import { CollectionHeader } from '../elements'
import PortableText from '../helpers/portableText'
import { above } from '../utilities'
import Seo from '../seo'

export default function Collection({ data }) {
  const {
    title,
    publishedAt,
    mainImage,
    seoImage,
    slug,
    _rawBody,
  } = data.collection
  return (
    <>
      <Seo
        title={`${title} - a Collection by Matthias Oberholzer`}
        img={seoImage.url}
        date={publishedAt}
      />
      <Helmet>
        {publishedAt ? (
          <meta
            property="article:published_time"
            content={new Date(publishedAt).toISOString()}
          />
        ) : null}
      </Helmet>
      <CollectionHeader
        image={mainImage.asset.gatsbyImageData}
        title={title}
        slug={slug.current}
      />
      <Text>
        <PortableText blocks={_rawBody} />
      </Text>
    </>
  )
}

const Text = styled.article`
  margin-top: 2rem;
  padding: 0 1rem;

  ${above.med`
    padding: 0 2rem;
  `}

  div {
    margin: 0 auto;
    max-width: 1024px;
    & > :not(figure) {
      margin-left: auto;
      margin-right: auto;
      max-width: 675px;
    }
  }

  p {
    text-align: left;
    margin-bottom: 2rem;
    line-height: 1.6;
    max-width: 992px;
  }
  figure {
    max-width: none;
    margin-bottom: 1rem;
    ${above.med`
      margin-bottom: 2rem;
    `}
    img {
      max-width: 100%;
    }
  }

  blockquote {
    color: ${({ theme }) => theme.colors.grey};
    font-style: italic;
  }
  a {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: border 0.3s ease;

    &:hover {
      border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
    }
    &:visited {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`

export const collectionQuery = graphql`
  query CollectionTemplateQuery($id: String!) {
    collection: sanityCollection(id: { eq: $id }) {
      title
      publishedAt
      slug {
        current
      }
      mainImage {
        asset {
          gatsbyImageData(
            width: 1440
            placeholder: BLURRED
            layout: CONSTRAINED
            formats: AUTO
            height: 512
          )
        }
      }
      seoImage: mainImage {
        asset {
          url
        }
      }
      _rawBody
    }
  }
`
