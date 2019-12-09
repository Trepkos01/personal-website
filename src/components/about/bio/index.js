import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image'

const BioWrapper = styled.div `
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  padding-top: 1em;

  max-width: 1080px;
  margin: 0 auto;

  @media (min-width:768px) {
    padding: 1em;
  }
`

const HeadshotWrapper = styled.div `
  flex: 0 0 300px;

  box-shadow: 12px 11px 15px 0px #ccc;

  @media (min-width:768px) {
    flex: 0 0 400px;
  }
`

const BioText = styled.div `
  padding: 1em;
  padding-top: 2em;
  flex: 1 0 300px;

  @media (min-width:768px) {
    padding: 2em;
    flex: 1 0 500px;
  }
`

const Bio = () => (
    <StaticQuery
    query={bioContentQuery}
    render={data =>
      <BioWrapper>
          <HeadshotWrapper>
          <Img fluid={data.headshotImage.childImageSharp.fluid} />
          </HeadshotWrapper>
          <BioText>
            <p dangerouslySetInnerHTML={{__html: data.site.siteMetadata.author.long_bio }} />
            <p><a href="resume.pdf">View Resume</a></p>
            <p><strong>Email me at: </strong>blake (at) blakeadams.io</p>
          </BioText>
      </BioWrapper>
    }
  />
)

export { Bio }

const bioContentQuery = graphql`
    query BioContentQuery {
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