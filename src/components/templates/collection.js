import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { CollectionHeader, Overlay } from '../elements'
import styled from 'styled-components'
import PortableText from '../helpers/portableText'
import { above } from '../utilities'

export default function Collection({ data }) {
  console.log(data)
  const { title, mainImage, slug, _rawBody } = data.collection

  return (
    <>
      <Overlay title="collection" />
      <CollectionHeader imgSrc={mainImage} title={title} slug={slug} />
      <Text>
        <PortableText blocks={_rawBody} />
      </Text>
    </>
  )
}

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin-top: 1rem; */
`

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
      slug {
        current
      }
      mainImage {
        ...SanityImage
      }
      _rawBody
    }
  }
`
