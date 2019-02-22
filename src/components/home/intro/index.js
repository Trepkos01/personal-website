import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import { Social } from "../../common"

const Bio = styled.div `
    padding: 1em;
    flex: 1 0 300px;
`
const Wrapper = styled.div `
    padding: 2em;
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
    margin: 1em;
    flex: 0 0 300px;
    box-shadow: 12px 11px 15px 0px #ccc;
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
        <Social socials={ data.site.siteMetadata.social }/>
    </Wrapper>
));

export { Intro }

const introContentQuery = graphql`
    query IntroContentQuery {
        site{
        ...SiteInformation
        }
        # Get the intro image.
        introImage: file(relativePath: { eq: "thats-me.png" }) {
            childImageSharp {
              fluid(maxWidth: 400) {
                ...GatsbyImageSharpFluid
              }
            }
        }
    }`