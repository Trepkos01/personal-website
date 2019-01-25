import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby';
import PropTypes from 'prop-types'
import Img from "gatsby-image";

const RelatedPostsWrapper = styled.div`
    display: flex;
    flex-direction: column;
`
const RelatedPost = styled.div `
    padding: 1em;
    border: 1px solid lightgray;
    margin: 1em;

    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;

    @media (min-width:768px) {
        justify-content: flex-start;
    }
`

const RelatedPostThumbnail = styled.div `
    flex: 0 0 100px;
    box-shadow: 2px 2px #ccc;
    overflow:hidden;
    height: 100%
`

const RelatedPostDescription = styled.div `
    padding: 1em;

    flex: 1 0 100%;
    display: flex;
    flex-direction: column;

    @media (min-width:768px) {
        flex: 0 0 50%;
    }
`

const RelatedPosts = ({ relatedPosts }) => {  
    const posts = relatedPosts || { edges: [] }
    
    return (
        <RelatedPostsWrapper>
            <strong>Related Posts</strong>
            { posts.edges.map((node, index) => (
                <RelatedPost key={ index }>
                    <RelatedPostThumbnail>
                        <Img fluid={ node.node.frontmatter.featuredImage.childImageSharp.fluid }/>
                    </RelatedPostThumbnail>
                    <RelatedPostDescription>
                        <p><strong>{ node.node.frontmatter.title }</strong></p>
                        <p><small>{ node.node.frontmatter.date }</small></p>
                        <p><Link to={ node.node.fields.slug }>Read More.</Link></p>
                    </RelatedPostDescription>
                </RelatedPost>
            ))}
        </RelatedPostsWrapper>
    )
}

let postNode = {
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
}

RelatedPosts.proptypes = {
    relatedPosts: PropTypes.shape({
        edges: PropTypes.arrayOf(postNode)
    })
}

export { RelatedPosts }

