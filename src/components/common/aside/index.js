import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'

import { SocialIcon, RelatedPosts } from "../../common"

const Wrapper = styled.div `
    display: flex;
    flex-direction: column;
    padding: 2em;

    flex: 1 1 auto;

    ${({ hide }) => hide && `
        display: none;
    `}

    @media all and (min-width: 800px) {
        padding-top: 100px;
        flex: 1 0;
        width: 40%;
    }
`

const About = styled.div `

`

const Social = styled.div `
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
`

const Aside = ({ hide, relatedPosts }) => { 
    
    return (
        <StaticQuery
        query={asideContentQuery}
        render={data => (
            <Wrapper hide={ hide }>
                <About>
                    <h3>About</h3>
                    <p>{ data.site.siteMetadata.description }</p>
                </About>
                <Social>
                    { data.site.siteMetadata.social.map((node) => (
                        <SocialIcon url={ node.url } key={ node.name } social={ node.name }/>
                    ))}
                </Social>
                <RelatedPosts relatedPosts={ relatedPosts }/>
            </Wrapper>
        )}/>
    )
}

export { Aside }

let postNode = PropTypes.shape({
    node: PropTypes.shape({
      frontmatter: PropTypes.shape({
          title: PropTypes.string,
          date: PropTypes.string,
          description: PropTypes.string,
          featuredImage: PropTypes.any,
          tags: PropTypes.arrayOf(PropTypes.string)
      }),
      fields: PropTypes.shape({
          slug: PropTypes.string
      })
    })
})

Aside.propTypes = {
    hide: PropTypes.bool,
    relatedPosts: PropTypes.shape({
        edges: PropTypes.arrayOf(postNode)
    })
}

const asideContentQuery = graphql`
    query AsideContentQuery {
        site {
            siteMetadata {
                description
                social {
                    name
                    url
                }
            }
        }
    }`