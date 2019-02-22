import React from 'react'
import styled from 'styled-components'
import { graphql, StaticQuery } from 'gatsby';

import { Layout, SEO, PostCard, FeaturedPost } from '../components/common'

const Wrapper = styled.div `
  padding: 2em;
  min-height: 768px;

  display: flex;
  flex-direction: column;
`
const BlogPosts = styled.div `
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
`

const BlogPage = () => (
  <Layout hideAside={ false }>
    <SEO title="Blog" keywords={[`blake adams`, `software`, `software developer`, `technology`, `financial independence`, `entrepreneur`, `career`, `consultancy`, `blog`]} />
    <StaticQuery
        query={blogPageContentQuery}
        render={data =>
        <Wrapper>
            <FeaturedPost post={ data.featuredPost.edges[0] } color={ "#f0f8ff82" }/>
            <BlogPosts>
                { data.blogPosts.edges.map((node, index) => (
                    <PostCard key={ index } post={ node } color={ "#f0f8ff82" }/>
                )) }
            </BlogPosts>
        </Wrapper>
    }/>
  </Layout>
)

export default BlogPage

const blogPageContentQuery = graphql`
    query BlogPageContentQuery {
        blogPosts: allMarkdownRemark(
        filter: { fileAbsolutePath: {regex : "\/posts/"}, frontmatter: {featured: {eq: "false"}}},
        sort: {fields: [frontmatter___date], order: DESC}),
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