import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image'

import { FaRegEnvelope, FaRegFileAlt } from "react-icons/fa";

import { Layout, SEO, Social } from '../components/common'

const Wrapper = styled.div `
`

const Bio = styled.div `
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  background-color: #f0f8ff82;

  background: linear-gradient(to top, 
    #f0f8ff00 0%, 
    #f0f8ff 5%, 
    #f0f8ff 95%, 
    #f0f8ff00 100%)
    rgba(0,0,0,0)    
    no-repeat;
`

const HeadshotWrapper = styled.div `
  padding: 1em;
  flex: 0 0 300px;

  @media (min-width:768px) {
    flex: 0 0 400px;
  }
`

const BioWrapper = styled.div `
  padding: 1em;
  flex: 1 0 300px;
`

const SocialWrapper = styled.div `
  width: 100%;
  margin: auto;
  margin-top: 1em;
  text-align: center;

  padding: 2em;

  background: linear-gradient(to top, 
    #f0f8ff00 0%, 
    #f0f8ff 5%, 
    #f0f8ff 95%, 
    #f0f8ff00 100%)
    rgba(0,0,0,0)    
    no-repeat;
`

const PersonalWrapper = styled.div `
  width: 100%;
  margin: auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 2em;
`

const PersonalLink = styled.div `
  flex: 1 0 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const AboutPage = () => (
  <StaticQuery
      query={aboutContentQuery}
      render={data =>
        <Layout hideAside={ true }>
          <SEO title="About Blake Adams" keywords={[`blake adams`, `software`, `software developer`, `technology`, `financial independence`, `entrepreneur`, `career`, `consultancy`, `blog`]} />
          <Wrapper>
            <Bio>
              <HeadshotWrapper>
                <Img fluid={data.headshotImage.childImageSharp.fluid} />
              </HeadshotWrapper>
              <BioWrapper>
                <p dangerouslySetInnerHTML={{__html: data.site.siteMetadata.author.long_bio }}/>
              </BioWrapper>
            </Bio>
            <PersonalWrapper>
              <PersonalLink>
                <FaRegEnvelope size='2em'/>
                <p>blake (at) blakeadams.io</p>
              </PersonalLink>
              <PersonalLink>
                <a href="resume.pdf"><FaRegFileAlt size='2em'/></a>
                <a href="resume.pdf">Resume</a>
              </PersonalLink>
            </PersonalWrapper>
            <SocialWrapper>
              <h3>You can follow me on:</h3>
              <Social socials={ data.site.siteMetadata.social }/>
            </SocialWrapper>
          </Wrapper>
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
        headshotImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
            childImageSharp {
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid
              }
            }
        }
    }`
