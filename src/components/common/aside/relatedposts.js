import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { PostItem } from "../"

const RelatedPostsWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const RelatedPosts = ({ relatedPosts }) => {  
    const posts = relatedPosts || { edges: [] }
    
    return (
        <RelatedPostsWrapper style={ { display: (posts.edges.length > 0) ? 'flex' : 'none' } }>
            <h3>Related Posts</h3>
            { posts.edges.map((node, index) => (
                <PostItem key={ index } post={ node }  color={ "white" }/>
            ))}
        </RelatedPostsWrapper>
    )
}

export { RelatedPosts }

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