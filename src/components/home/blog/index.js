import React from 'react'
import styled from 'styled-components'
import { graphql, StaticQuery } from 'gatsby';
import Img from "gatsby-image";

const Wrapper = styled.div `
    padding: 2em;
`

const BlogWrapper = styled.div `
    dispay: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: flex-start;
`

const FeaturedPost = styled.div `
    padding: 1em;
    flex: 0 1 100px;
`

const FeaturedPostImage = styled.div `
  
`

const RecentPosts = styled.div `
    padding: 1em;
    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
    flex: 1 0 300px;
`

const RecentPost = styled.div `
    display: flex;
    flex-flow: row nowrap;
    margin: 1em;
    flex: 0 1 auto;
    align-items: center;
`

const RecentPostThumbnail = styled.div `
    width:75px;
    height:75px;
`

const RecentPostTitle = styled.div `
    padding:2em;
`

const Blog = () => (
    <StaticQuery
        query={blogContentQuery}
        render={data => 
        <Wrapper>
            <BlogWrapper>
                <FeaturedPost>
                    <h2>{ data.featuredPost.edges[0].node.frontmatter.title }</h2>
                    <span>{ data.featuredPost.edges[0].node.frontmatter.date }</span>
                    <FeaturedPostImage>
                        <Img sizes={ data.featuredPost.edges[0].node.frontmatter.featureImage.childImageSharp.sizes }/>
                    </FeaturedPostImage>
                    <p>{ data.featuredPost.edges[0].node.excerpt }</p>
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
            </BlogWrapper>
        </Wrapper>
    }/>
)

export { Blog }

const blogContentQuery = graphql`
    query BlogContentQuery {
        recentPosts: allMarkdownRemark(
        filter: { fileAbsolutePath: {regex : "\/articles/"},, frontmatter: {featured: {eq: "false"}}},
        sort: {fields: [frontmatter___date], order: DESC},
            limit: 5),
        {
            edges {
                node {
                    id
                    excerpt
                    frontmatter {
                        title
                        date(formatString: "DD MMMM, YYYY")
                        featureImage {
                            publicURL
                            childImageSharp {
                                fluid(maxWidth: 100, maxHeight: 100) {
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
            filter: { fileAbsolutePath: {regex : "\/articles/"}, frontmatter: {featured: {eq: "true"}}}
        ),
        {
            edges {
                node {
                    id
                    excerpt
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