import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import {
  H1,
  Paragraph,
  H2,
  CollectionPreview,
  Overlay,
} from '../components/elements'
import SEO from '../components/seo'
import { above } from '../components/utilities'
import { SharedAnimationLayout } from '../components/layouts/SharedAnimationLayout'

export default function Photography({ data }) {
  const collections = data.collections.edges.map(edge => edge.node)
  const description = `I started taking pictures in 2018. Two months before I visited New York for the second time. Basically, I study photography in one of the most beautiful places in the world. But also to one of the swiftest and most scary places in the world, which can face a person from a simple village.`
  return (
    <>
      <SEO
        title="Photography Collections by Matthias Oberholzer"
        description={description}
      />
      {/* <Overlay title="photography" /> */}
      <DescriptionContainer>
        <Heading1>Some collections of my photos.</Heading1>
        <Description>{description}</Description>
      </DescriptionContainer>

      <CollectionContainer>
        <CollectionHeading>collections</CollectionHeading>
        <CollectionList>
          {collections.map(node => (
            <CollectionPreview
              imgSrc={node.mainImage}
              title={node.title}
              key={node.id}
              slug={node.slug}
            />
          ))}
        </CollectionList>
      </CollectionContainer>
    </>
  )
}

const DescriptionContainer = styled.div`
  max-width: 992px;
  margin: 4rem auto 2rem;
  ${above.med`
    margin: 4rem auto;
  `}
`

const Heading1 = styled(H1)`
  background-image: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.25;
  ${above.med`
    line-height: 1.5;
  `};
`

const Description = styled(Paragraph)`
  margin: 1rem 0;
`

const CollectionContainer = styled.div`
  border: 0.5px solid transparent;
`

const CollectionHeading = styled(H2)`
  max-width: 992px;
  margin: 4rem auto 0;
  color: ${({ theme }) => theme.colors.primary};
`

const CollectionList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const query = graphql`
  fragment SanityImage on SanityImage {
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
    }
  }
  query CollectionQuery {
    collections: allSanityCollection {
      edges {
        node {
          id
          title
          description
          slug {
            current
          }
          mainImage {
            ...SanityImage
          }
        }
      }
    }
  }
`
