import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { FaFacebook, FaTwitterSquare, FaLinkedin, FaYoutube, FaMedium, FaKeybase, FaGithub } from "react-icons/fa";

const returnIcon = (name) => ({
    "Facebook": <FaFacebook size='2em'/>,
    "Twitter": <FaTwitterSquare size='2em'/>,
    "LinkedIn": <FaLinkedin size='2em'/>,
    "YouTube": <FaYoutube size='2em'/>,
    "Medium": <FaMedium size='2em'/>,
    "Keybase": <FaKeybase size='2em'/>,
    "GitHub": <FaGithub size='2em'/>
})[name]

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
                <a href={ node.url } key={ node.name }>{ returnIcon(node.name) }</a>
            ))}
        </Social>
    </Wrapper>
));

export { Intro }

const introContentQuery = graphql`
    query IntroContentQuery {
        site {
            siteMetadata {
                author {
                    short_bio
                }
                social {
                    name
                    url
                }
            }
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