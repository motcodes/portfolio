import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { H1, Paragraph, H2, CollectionPreview } from '../components/elements'
import Seo from '../components/seo'
import { above } from '../components/utilities'

export default function Photography({ data }) {
  const collections = data.allCollections.nodes
    .slice()
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

  const description = `I started taking pictures in 2018. Two months before I visited New York for the second time. Basically, I study photography in one of the most beautiful places in the world. But also to one of the swiftest and most scary places in the world, which can face a person from a simple village.`
  return (
    <>
      <Seo
        title="Photography Collections by Matthias Oberholzer"
        description={description}
      />
      <DescriptionContainer>
        <Heading1>Some collections of my photos.</Heading1>
        <Description>{description}</Description>
      </DescriptionContainer>

      <CollectionContainer>
        <CollectionHeading>collections</CollectionHeading>
        <CollectionList>
          {collections.map((node) => (
            <CollectionPreview
              key={node.id}
              image={node.mainImage.asset.gatsbyImageData}
              title={node.title}
              slug={node.slug.current}
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
  {
    allCollections: allSanityCollection {
      nodes {
        id
        title
        description
        slug {
          current
        }
        publishedAt
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
      }
    }
  }
`
