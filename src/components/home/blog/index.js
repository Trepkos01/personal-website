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
    align-items: flex-start;

    @media (min-width:768px) {
        flex-direction: row;
    }

    border: 1px solid lightgray;
    box-shadow: 2px 2px #ccc;
    padding: 1em;
`

const FeaturedPostImage = styled.div `
    width:100%;
    box-shadow: 2px 2px #ccc;
    flex: 1 0 200px;

    @media (min-width:768px) {
        flex: 1 0 400px;
    }
`

const FeaturedPostTitle = styled.span `
    font-weight:bold;
`

const FeaturedPostExcerpt = styled.div `
    @media (min-width:768px) {
        padding-left: 1em;
    }
`

const RecentPosts = styled.div `
    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
`

const RecentPost = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid lightgray;
    box-shadow: 2px 2px #ccc;
    padding: 1em;
    margin-bottom:1em;

    @media (min-width:768px) {
        flex-direction: row;
    }
`

const RecentPostThumbnail = styled.div `
    width:100%;
    flex: 0 0 200px;
    box-shadow: 2px 2px #ccc;
    overflow:hidden;

    @media (min-width:768px) {
        width:100px;
        height:100px;
        flex: 0 0 100px;
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