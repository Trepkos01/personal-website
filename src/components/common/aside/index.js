import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'

import { About } from './about'
import { Social } from './social'
import { RelatedPosts } from './relatedposts'
import { Tags } from './tags'
import { LatestPosts } from './latestposts'
import { Categories } from './categories'
import { LatestBooknotes } from "./latestbooknotes"

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

        background: linear-gradient(to right, #f0f8ff00 0%, #f0f8ff 2%, #f0f8ff 50%, #f0f8ff00 100%)
            left 
            bottom
            rgba(0,0,0,0)    
            no-repeat;
    }

    background: linear-gradient(to top, #f0f8ff00 0%, #f0f8ff 98%, #f0f8ff00 100%)
        left 
        bottom
        rgba(0,0,0,0)    
        no-repeat;
    

`

const Aside = ({ hide, asideInfo=null }) => { 
    if(asideInfo === null)
        asideInfo = {
            relatedPosts: {edges: []},
            tags: []
        }
  
    return (
        <StaticQuery
        query={asideContentQuery}
        render={data => (
            <Wrapper hide={ hide }>
                <About bio={ data.site.siteMetadata.description }/>
                <Social social={ data.site.siteMetadata.social }/>
                <RelatedPosts relatedPosts={ asideInfo.relatedPosts }/>
                <LatestPosts latestPosts={ data.latestPosts }/>
                <LatestBooknotes latestBooknotes={ data.latestBooknotes }/>
                <Tags tags={ asideInfo.tags }/>
                <Categories categories={ data.categories}/>
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
    asideInfo: PropTypes.shape({
        relatedPosts: PropTypes.shape({
          edges: PropTypes.arrayOf(postNode)
        }),
        tags: PropTypes.arrayOf(PropTypes.string)
    })
}

const asideContentQuery = graphql`
    query AsideContentQuery {
        site {
            ...SiteInformation
        }
        categories: allMarkdownRemark(filter: { fileAbsolutePath: {regex : "\/content/" } }) {
            edges {
                node {
                    frontmatter {
                        category
                    }
                }
            }
        }
        latestPosts: allMarkdownRemark(
            filter: { fileAbsolutePath: {regex : "\/posts/"}, frontmatter: {featured: {eq: "false"}}},
            sort: {fields: [frontmatter___date], order: DESC},
                limit: 5),
        {
            edges {
                node {
                    id
                    ...PostItemFrontmatter
                    ...MarkdownFields
                }
            }
        }
        latestBooknotes: allMarkdownRemark(
            filter: { fileAbsolutePath: {regex : "\/booknotes/"}},
            sort: {fields: [frontmatter___date], order: DESC},
            limit: 3)
        {
            edges {
                node {
                    id
                    excerpt(pruneLength: 180)
                    ...BooknotesItemFrontmatter
                    ...MarkdownFields
                }
            }
        } 
    }`