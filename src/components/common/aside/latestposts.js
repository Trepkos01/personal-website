import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { PostItem } from "../"

const LatestPostsWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const LatestPosts = ({ latestPosts }) => {  
    const posts = latestPosts || { edges: [] }
    return (
        <LatestPostsWrapper style={ { display: (posts.edges.length > 0) ? 'flex' : 'none' } }>
            <h3>Latest Posts</h3>
            { posts.edges.map((node, index) => (
                <PostItem key={ index } post={ node } color={ "white" }/>
            ))}
        </LatestPostsWrapper>
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

LatestPosts.proptypes = {
    latestPosts: PropTypes.shape({
        edges: PropTypes.arrayOf(postNode)
    })
}

export { LatestPosts }

