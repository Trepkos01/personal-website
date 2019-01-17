import React from 'react'
import styled from 'styled-components'
import { graphql, StaticQuery } from 'gatsby';
import Img from "gatsby-image";

const Wrapper = styled.div `
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

const RecentPosts = styled.div `
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
`

const RecentPost = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 0 300px;

    border: 1px solid lightgray;
    box-shadow: 2px 2px #ccc;
    padding: 1em;
    margin: 1em;

    @media (min-width:768px) {
        flex: 0 0 28%;
    }
`

const RecentPostThumbnail = styled.div `
    width:100%;
    flex: 0 0 200px;
    box-shadow: 2px 2px #ccc;
    overflow:hidden;

    @media (min-width:768px) {
        flex: 0 0 auto;
    }
`

const RecentPostTitle = styled.div `
    margin-top: 1em;

    @media (min-width:768px) {
        margin-left: 1em;
    }
`

const Blog = () => (
    <StaticQuery
        query={blogContentQuery}
        render={data => 
        <Wrapper>
            <h1>Blog</h1>
            <FeaturedPost>
                <FeaturedPostImage>
                    <Img sizes={ data.featuredPost.edges[0].node.frontmatter.featureImage.childImageSharp.sizes }/>
                </FeaturedPostImage>
                <FeaturedPostExcerpt>
                    <FeaturedPostTitle>{ data.featuredPost.edges[0].node.frontmatter.title }</FeaturedPostTitle>
                    <p><small>{ data.featuredPost.edges[0].node.frontmatter.date }</small></p>
                    <p>{ data.featuredPost.edges[0].node.excerpt } <a href="#">Read More</a></p>
                </FeaturedPostExcerpt>
            </FeaturedPost>
            <RecentPosts>
                { data.recentPosts.edges.map((node, index) => (
                    <RecentPost key={ index }>
                        <RecentPostThumbnail>
                            <Img fluid={ node.node.frontmatter.featureImage.childImageSharp.fluid }/>
                        </RecentPostThumbnail>
                        <RecentPostTitle>
                            <p><strong> { node.node.frontmatter.title } </strong></p>
                            <p> { node.node.excerpt } </p>
                            <p><a href="#">Read More..</a></p>
                        </RecentPostTitle>
                    </RecentPost>
                )) }
            </RecentPosts>
        </Wrapper>
    }/>
)

export { Blog }

const blogContentQuery = graphql`
    query BlogContentQuery {
        recentPosts: allMarkdownRemark(
        filter: { fileAbsolutePath: {regex : "\/posts/"},, frontmatter: {featured: {eq: "false"}}},
        sort: {fields: [frontmatter___date], order: DESC},
            limit: 5),
        {
            edges {
                node {
                    id
                    excerpt(pruneLength: 100)
                    frontmatter {
                        title
                        date(formatString: "DD MMMM, YYYY")
                        featureImage {
                            publicURL
                            childImageSharp {
                                fluid(maxWidth: 200, maxHeight: 200) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                        tags
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
                    excerpt(pruneLength: 280)
                    frontmatter{
                        title
                        date(formatString: "DD MMMM, YYYY")
                        featureImage {
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
            }
        }
    }
}
`  