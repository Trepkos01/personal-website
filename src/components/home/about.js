import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'

const Intro = styled.div `
    padding: 1em;
`
const Social = styled.div `
    display: flex;
    flex-flow: row wrap;
    padding: 1em;
    justify-content: space-around;
`
const Avatar = styled.img `

`

const Wrapper = styled.div `

`



const About = () => (
    <StaticQuery
    query={introContentQuery}
    render={data =>
    <Wrapper>
        <Avatar/>
        <Intro>{ data.site.siteMetadata.author.short_bio }</Intro>
        <Social>
        </Social>
    </Wrapper>
    }
    />
)

export default About

const introContentQuery = graphql`
    query IntroContentQuery {
        site {
            siteMetadata {
                author {
                    short_bio
                }
            }
        }
    }`