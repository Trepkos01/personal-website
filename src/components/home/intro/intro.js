import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import { FaFacebook, FaTwitterSquare, FaLinkedin, FaYoutube, FaMedium, FaKeybase, FaGithub } from "react-icons/fa";

import Avatar from './avatar'

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

const Stuff = styled.div `
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
`

const returnIcon = (name) => ({
        "Facebook": <FaFacebook size='2em'/>,
        "Twitter": <FaTwitterSquare size='2em'/>,
        "LinkedIn": <FaLinkedin size='2em'/>,
        "YouTube": <FaYoutube size='2em'/>,
        "Medium": <FaMedium size='2em'/>,
        "Keybase": <FaKeybase size='2em'/>,
        "GitHub": <FaGithub size='2em'/>
})[name]


const Intro = () => (
    <StaticQuery
    query={introContentQuery}
    render={data =>
    <Wrapper>
        <Stuff>
            <Avatar/>
            <Bio dangerouslySetInnerHTML={{__html: data.site.siteMetadata.author.short_bio }}/>
        </Stuff>
        <Social>
            { data.site.siteMetadata.social.map((node) => (
                <a href={ node.url } key={ node.name }>{ returnIcon(node.name) }</a>
            ))}
        </Social>
    </Wrapper>
    }
    />
)

export default Intro

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
    }`