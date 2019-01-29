import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql, Link } from 'gatsby'

import { SocialIcon } from '../'

const FooterContainer = styled.footer `
    width: 100%;
    background: #336f99;

    @media(min-width:768px){
        height: 200px;
    }
`
const MainBar = styled.div `
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
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
    margin: 1em; 2em 0 2em;

    @media(min-width:768px){
        margin: 0 2em 0 2em;
    }
`
const FooterSocial = styled.div `
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    margin: 0 2em 0 2em;
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
                    <Link to='/'>Home</Link>
                    <Link to='/about'>About</Link>
                    <Link to='/blog'>Blog</Link>
                    <Link to='/projects'>Projects</Link>
                    <Link to='/booknotes'>Booknotes</Link>
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