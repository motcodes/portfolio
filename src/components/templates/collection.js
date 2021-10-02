import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet-async'
import { ChevronUp } from 'react-feather'
import { Button, CollectionHeader } from '../elements'
import PortableText from '../helpers/portableText'
import { above } from '../utilities'
import Seo from '../seo'

export default function Collection({ pageContext }) {
  const { description, title, publishedAt, mainImage, categories, _rawBody } =
    pageContext

  function scrollToTop() {
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  return (
    <>
      <Seo
        title={`${title} - a Collection by Matthias Oberholzer`}
        description={description}
        img={mainImage.asset.gatsbyImageData.images.fallback.src}
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
        alt={description}
        title={title}
      />
      <Text>
        <PortableText blocks={_rawBody} />
      </Text>
      {categories.length > 0 && (
        <CenterContainer>
          {categories.map(({ title }) => (
            <Tag key={title}>{title}</Tag>
          ))}
        </CenterContainer>
      )}
      <CenterContainer>
        <Button onClick={scrollToTop}>
          To Top
          <ChevronUp style={{ marginLeft: 8 }} />
        </Button>
      </CenterContainer>
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
const CenterContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  max-width: 675px;
  margin: 0 auto;
  padding: 1rem;
  gap: 1rem;
`

const Tag = styled.span`
  padding: 0.5rem;
  border-radius: 6px;
  background-color: hsl(220deg 100% 90%);
  color: hsl(220deg 100% 37%);
  background-color: rgba(0, 129, 239, 0.2);

  color: ${({ theme }) => theme.colors.primary};
`
