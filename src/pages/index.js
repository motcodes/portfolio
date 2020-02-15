import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Twitter, Instagram, GitHub, Mail, Facebook, Grid } from 'react-feather'

import { Layout } from '../components/layouts/Layout'
import {
  LightTheme,
  DarkTheme,
  PrimaryGrid,
  Black,
} from '../components/utilities'
import { H1, H2, Paragraph, Card } from '../components/elements'

const Indruduction = styled(PrimaryGrid)`
  margin-top: 4rem;
`

const Heading1 = styled(H1)`
  grid-column: 1 / 6;
  align-self: end;
`

const Description = styled(Paragraph)`
  grid-column: 1 / 6;
  align-self: start;
`

const SocialContainer = styled.div`
  grid-column: 1 / 6;
  align-self: start;
  padding: 1rem 0;

  &:last-child {
    margin-right: 1rem;
  }
  * {
    margin-left: 1rem;
  }
`
const Image = styled(Img)`
  max-height: 512px;
  grid-column: 6 / end;
  grid-row: 1 / 3;
  border-radius: 6px;
`

const Line = styled.div`
  margin: 14rem auto 4rem;
  width: 4px;
  height: 8rem;
  border-radius: 2px;
  background-color: ${Black};
`

const Projects = styled(PrimaryGrid)`
  grid-row-gap: 2rem;
`

const Heading2 = styled(H2)`
  grid-column: 2 / 9;
  color: ${LightTheme.colors.primary};
`

const ProjectCard = styled(Card)`
  grid-column: 2 / 9;
`

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "HomepagePicture.jpg" }) {
        childImageSharp {
          fluid(maxHeight: 512) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  `)

  return (
    <ThemeProvider theme={LightTheme}>
      <Layout>
        <Indruduction>
          <Heading1>
            Hello There!{' '}
            <span style={{ color: LightTheme.colors.primary }}>I’m Matt.</span>
          </Heading1>
          <Description size="large">
            I am a young web developer with a passion for designing cool new
            stuff, coding something exciting, taking photos of everything &amp;
            enjoying some good rock music.
            {/* SocialContainer outside of P tag + create Links*/}
            <SocialContainer>
              <Twitter />
              <Instagram />
              <GitHub />
              <Mail />
              <Facebook />
            </SocialContainer>
          </Description>
          <Image fluid={data.placeholderImage.childImageSharp.fluid} />
        </Indruduction>
        <Line />
        <Projects as="section">
          <Heading2>expierence &amp; projects</Heading2>
          <ProjectCard>
            <Card.Heading>
              Ghostbuilder.io{' '}
              <span style={{ fontWeight: `normal` }}>
                - Web App Development
              </span>
            </Card.Heading>
          </ProjectCard>
          <ProjectCard>
            <Card.Heading>
              NCM{' '}
              <span style={{ fontWeight: `normal` }}>- Content Managment</span>
            </Card.Heading>
          </ProjectCard>
          <ProjectCard>
            <Card.Heading>
              Siemens{' '}
              <span style={{ fontWeight: `normal` }}>- Java developer</span>
            </Card.Heading>
          </ProjectCard>
        </Projects>
      </Layout>
    </ThemeProvider>
  )
}

export default IndexPage
