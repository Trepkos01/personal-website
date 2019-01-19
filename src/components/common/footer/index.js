import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'

import { SocialIcon } from '../'

const FooterContainer = styled.footer `
    height: 200px;
    width: 100%;
    background: rebeccapurple;
`
const MainBar = styled.div `
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;

    padding: 1em;

    a {
        color:white;
    }
`
const FooterNav = styled.div `
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;
    
    flex: 1 0 50%;
`
const FooterSocial = styled.div `
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;

    flex: 1 0 50%
`

const BottomBar = styled.div`
    margin: 0 auto;
    text-align: center;
    padding: 1em;
    color: white;
    font-size: x-small;
`


const Footer = () => (
    <StaticQuery
        query={footerContentQuery}
        render={data =>
        <FooterContainer>
            <MainBar>
                <FooterNav>
                    <a href='#'>Home</a>
                    <a href='#'>About</a>
                    <a href='#'>Blog</a>
                    <a href='#'>Projects</a>
                    <a href='#'>Booknotes</a>
                </FooterNav>
                <FooterSocial>
                { data.site.siteMetadata.social.map((node) => (
                    <SocialIcon url={ node.url } key={ node.name } social={ node.name }/>
                ))}
                </FooterSocial>
            </MainBar>
            <BottomBar>
                © {new Date().getFullYear()} Copyright - Blake Adams - Made with <a href="https://www.gatsbyjs.org">Gatsby</a>
            </BottomBar>
        </FooterContainer>
    }/>
)

export { Footer }

const footerContentQuery = graphql`
    query FooterContentQuery {
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