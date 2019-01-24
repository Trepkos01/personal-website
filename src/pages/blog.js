import React from 'react'
import styled from 'styled-components'
import { graphql, StaticQuery, Link } from 'gatsby';
import Img from "gatsby-image";

import { Layout, SEO } from '../components/common'

const Wrapper = styled.div `
  padding: 2em;
  min-height: 768px;

  display: flex;
  flex-direction: column;
`

const FeaturedPost = styled.div `
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
    align-items: center;
    margin: 1em;

    @media (min-width:768px) {
        flex-direction: row;
        padding:1em;
    }

    border: 1px solid lightgray;
    box-shadow: 2px 2px #ccc;
`

const FeaturedPostImage = styled.div `
    width:100%;
    flex: 1 0 200px;

    @media (min-width:768px) {
        flex: 1 0 400px;
        box-shadow: 2px 2px #ccc;
    }
`

const FeaturedPostTitle = styled.span `
    font-weight:bold;
`

const FeaturedPostExcerpt = styled.div `
    padding: 1em;

    @media (min-width:768px) {
        padding 0 0 0 1em;
    }
`

const BlogPosts = styled.div `
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
`

const BlogCard = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 0 300px;

    border: 1px solid lightgray;
    padding: 1em;
    margin: 1em;

    :hover {
        box-shadow: 6px 9px 20px 0px #0000003d;
    }

    @media (min-width:768px) {
        flex: 0 0 45%;
    }

    @media (min-width:1000px) {
        flex: 0 0 22%;
    }
`

const BlogCardThumbnail = styled.div `
    width:100%;
    flex: 0 0 200px;
    box-shadow: 2px 2px #ccc;
    overflow:hidden;

    @media (min-width:768px) {
        flex: 0 0 auto;
    }
`

const BlogCardExcerpt = styled.div `
    margin-top: 1em;
`

const PostTag = styled.small `
    color: lightgray;
`

const BlogPage = () => (
  <Layout hideAside={ false }>
    <SEO title="Blog" keywords={[`blake adams`, `software`, `software developer`, `technology`, `financial independence`, `entrepreneur`, `career`, `consultancy`, `blog`]} />
    <StaticQuery
        query={blogPageContentQuery}
        render={data =>
        <Wrapper>
            <h1>Blog</h1>
            <FeaturedPost>
                <FeaturedPostImage>
                    <Img sizes={ data.featuredPost.edges[0].node.frontmatter.featuredImage.childImageSharp.sizes }/>
                </FeaturedPostImage>
                <FeaturedPostExcerpt>
                    <FeaturedPostTitle>{ data.featuredPost.edges[0].node.frontmatter.title }</FeaturedPostTitle>
                    <p><small>{ data.featuredPost.edges[0].node.frontmatter.date }</small></p>
                    <p>{ data.featuredPost.edges[0].node.excerpt } <Link to={ data.featuredPost.edges[0].node.fields.slug }>Read More</Link></p>
                    <p>{ data.featuredPost.edges[0].node.frontmatter.tags.map((node, index) => (<PostTag key={ index }> { node } </PostTag>)) }</p>
                </FeaturedPostExcerpt>
            </FeaturedPost>
            <BlogPosts>
                { data.blogPosts.edges.map((node, index) => (
                    <BlogCard key={ index }>
                        <BlogCardThumbnail>
                            <Img fluid={ node.node.frontmatter.featuredImage.childImageSharp.fluid }/>
                        </BlogCardThumbnail>
                        <BlogCardExcerpt>
                            <p><strong> { node.node.frontmatter.title } </strong></p>
                            <p> { node.node.frontmatter.description } </p>
                            <p><Link to={ node.node.fields.slug }>Read More..</Link></p>
                            <p>{ node.node.frontmatter.tags.map((node, index) => (<PostTag key={ index }> { node } </PostTag>)) }</p>
                        </BlogCardExcerpt>
                    </BlogCard>
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