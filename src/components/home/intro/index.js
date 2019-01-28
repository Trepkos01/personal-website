import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { SocialIcon } from "../../common"

const Bio = styled.div `
    padding: 1em;
    flex: 1 0 300px;
`
const Social = styled.div `
    display: flex;
    flex-flow: row wrap;
    padding: 1em;
    justify-content: space-around;
`

const Wrapper = styled.div `
    padding:2em;
    max-width: 1080px;
    margin: auto
`

const BioWrapper = styled.div `
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: center;
`

const ImageWrapper = styled.div `
    padding:1em;
    flex: 0 0 300px;
`

const HighOrderIntro = (WrappedComponent) => (
    (props) => 
    <StaticQuery
        query={introContentQuery}
        render={data => <WrappedComponent {...props} data={data}/>
    }/>
)

const IntroImage = HighOrderIntro(({data, ...props}) => (
    <ImageWrapper>
        <Img fluid={data.introImage.childImageSharp.fluid} />
    </ImageWrapper>
));

const Intro = HighOrderIntro(({data, ...props}) => (
    <Wrapper>
        <BioWrapper>
            <IntroImage/>
            <Bio dangerouslySetInnerHTML={{__html: data.site.siteMetadata.author.short_bio }}/>
        </BioWrapper>
        <Social>
            { data.site.siteMetadata.social.map((node) => (
                <SocialIcon url={ node.url } key={ node.name } social={ node.name }/>
            ))}
        </Social>
    </Wrapper>
));

export { Intro }

const introContentQuery = graphql`
    query IntroContentQuery {
        site{
        ...SiteInformation
        }
        # Get the intro image.
        introImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
            childImageSharp {
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid
              }
            }
        }
    }`