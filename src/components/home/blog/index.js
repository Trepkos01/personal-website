import React from 'react'
import styled from 'styled-components'
import { graphql, StaticQuery } from 'gatsby';

import { PostCard, FeaturedPost } from '../../common'

const BlogWrapper = styled.div `
    max-width:1080px;
    margin: 0 auto;
    padding: 2em;
`

const RecentPosts = styled.div `
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
`

const Blog = () => (
    <StaticQuery
        query={blogContentQuery}
        render={data =>
        <BlogWrapper>
            <h1>Blog</h1>
            <FeaturedPost post={ data.featuredPost.edges[0] } color={ "white" }/>
            <RecentPosts>
                { data.recentPosts.edges.map((node, index) => (
                    <PostCard key={ index } post={ node } color={ "white" }/>
                )) }
            </RecentPosts>
        </BlogWrapper>
    }/>
)

export { Blog }

const blogContentQuery = graphql`
    query BlogContentQuery {
        recentPosts: allMarkdownRemark(
        filter: { fileAbsolutePath: {regex : "\/posts/"}, frontmatter: {featured: {eq: "false"}}},
        sort: {fields: [frontmatter___date], order: DESC},
            limit: 6),
        {
            edges {
                node {
                    id
                    ...PostItemFrontmatter
                    ...MarkdownFields
                }
            }
        }
        # Get the featured post's data.
        featuredPost: allMarkdownRemark(
            filter: { fileAbsolutePath: {regex : "\/posts/"}, frontmatter: {featured: {eq: "true"}}}
        ),
        {
            edges {
                node {
                    id
                    excerpt(pruneLength: 400)
                    ...PostFrontmatter
                    ...MarkdownFields
            }
        }
    }
}
`  