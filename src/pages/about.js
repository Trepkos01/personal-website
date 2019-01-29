import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image'

import { Layout, SEO, Social } from '../components/common'

const Wrapper = styled.div `
  padding: 2em;
  min-height: 768px;
`

const Bio = styled.div `
  display: flex;
  flex-flow: row wrap;
  background-color: #f0f8ff82;
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
  width: 50%;
  margin: auto;
  margin-top: 1em;
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
                <p><a href="resume.pdf">Resume</a></p>
              </BioWrapper>
            </Bio>
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
