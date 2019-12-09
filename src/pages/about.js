import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby';

import { Bio, Resume, Services } from '../components/about'
import { Layout, SEO, Social } from '../components/common'

const BackgroundWrapper = styled.div `
  background: linear-gradient(to top, 
    ${props => props.color}00 0%, 
    ${props => props.color} 5%, 
    ${props => props.color} 95%, 
    ${props => props.color}00 100%)
    left 
    bottom
    rgba(0,0,0,0)    
    no-repeat;
`

const SocialWrapper = styled.div `
  max-width: 1080px;
  margin: auto;
  margin-top: 1em;
  text-align: center;

  padding: 2em;
`

const AboutPage = () => (
  <StaticQuery
      query={aboutContentQuery}
      render={data =>
        <Layout hideAside={ true }>
          <SEO title="About Blake Adams" keywords={[`blake adams`, `software`, `software developer`, `technology`, `financial independence`, `entrepreneur`, `career`, `consultancy`, `blog`]} />
          <BackgroundWrapper>
            <Bio/>
          </BackgroundWrapper>
          <BackgroundWrapper color={ "#f0f8ff" }>
            <Services/>
          </BackgroundWrapper>
          <BackgroundWrapper color={ "#f0f8ff" }>
            <Resume/>
          </BackgroundWrapper>
          <BackgroundWrapper color={ "#f0f8ff" }>
            <SocialWrapper>
              <h3>You can follow me on:</h3>
              <Social socials={ data.site.siteMetadata.social }/>
            </SocialWrapper>
          </BackgroundWrapper>
        </Layout>
  }/>
)

export default AboutPage

const aboutContentQuery = graphql`
    query AboutContentQuery {
        site{
        ...SiteInformation
        }
        # Get the headshot image.
        headshotImage: file(relativePath: { eq: "thats-me.png" }) {
            childImageSharp {
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid
              }
            }
        }
    }`
