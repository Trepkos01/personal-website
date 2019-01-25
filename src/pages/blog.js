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
            <h1>Blog</h1>
            <FeaturedPost post={ data.featuredPost.edges[0] }/>
            <BlogPosts>
                { data.blogPosts.edges.map((node, index) => (
                    <PostCard key={ index } post={ node }/>
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
                    frontmatter {
                        title
                        date(formatString: "DD MMMM, YYYY")
                        description
                        featuredImage {
                            publicURL
                            childImageSharp {
                                fluid(maxWidth: 300, maxHeight: 300) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                        tags
                    }
                    fields {
                        slug
                    }
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
                    excerpt(pruneLength: 180)
                    frontmatter{
                        title
                        date(formatString: "DD MMMM, YYYY")
                        description
                        featuredImage {
                            publicURL
                            childImageSharp {
                                sizes(maxWidth: 960 ) {
                                    srcSet
                                    aspectRatio
                                    src
                                    sizes
                                }
                            }
                        }
                    tags
                }
                fields {
                    slug
                }
            }
        }
    }
}
`