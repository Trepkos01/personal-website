import React from 'react'
import styled from 'styled-components'
import { graphql, Link } from 'gatsby';

import { Layout, SEO, PostCard, FeaturedPost, SeriesItem } from '../components/common'

const _ = require("lodash")

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

const Categories = styled.div `
    @media (min-width:768px) {
        flex-direction: row;
        margin-left: 1em;
        margin-right: 1em;
    }

    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    box-shadow: 6px 9px 20px 0px #0000003d;
    background-color: white;
`

const CategoryLink = styled(Link) `
    margin: 2px;
    padding:5px;
    background-color: f0f8ff;
    font-weight: bold;
`

const Series = styled.div `
    @media (min-width:768px) {
        flex-direction: column;
        margin-left: 1em;
        margin-right: 1em;
    }

    margin-top: 2em;
    padding: 1em;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    box-shadow: 6px 9px 20px 0px #0000003d;
    background-color: white;
`

const BlogPage = ({ data }) =>{ 

    let categoryLinks = []
    _.each(data.categories.edges, edge => {
        if(_.get(edge, "node.frontmatter.category")){
            categoryLinks.push(edge.node.frontmatter.category)
          }
    })
    categoryLinks = _.uniq(categoryLinks)

    let seriesLinks = []
    let seriesInfo = new Map()

    _.each(data.blogPosts.edges, edge => {
        if(_.get(edge, "node.frontmatter.series")){
            seriesInfo.set(edge.node.frontmatter.series, 
                {title: edge.node.frontmatter.series,
                date: edge.node.frontmatter.date, 
                img: edge.node.frontmatter.featuredImage.childImageSharp.fluid,
                count: (seriesInfo.get(edge.node.frontmatter.series) === undefined ? 1 : seriesInfo.get(edge.node.frontmatter.series).count + 1)}
            )
            seriesLinks.push(edge.node.frontmatter.series)
        }
    })
    seriesLinks = _.uniq(seriesLinks)

return (
  <Layout hideAside={ false }>
    <SEO title="Blog" keywords={[`blake adams`, `software`, `software developer`, `technology`, `financial independence`, `entrepreneur`, `career`, `consultancy`, `blog`]} />
        <Wrapper>
            <FeaturedPost post={ data.featuredPost.edges[0] } color={ "#f0f8ff82" }/>
            <Categories>
                {categoryLinks.map((node, index) => (
                    <CategoryLink key={ index } to={ `/category/${_.kebabCase(node)}/` }>{ _.upperFirst(node) }</CategoryLink>
                ))}
            </Categories>
            <Series>
                {seriesLinks.map((node, index) => (
                    <SeriesItem key={ index } title={ node } date={ seriesInfo.get(node).date } postCount={ seriesInfo.get(node).count } img={ seriesInfo.get(node).img }></SeriesItem>
                ))}
            </Series>
            <BlogPosts>
                { data.blogPosts.edges.map((node, index) => (
                    <PostCard key={ index } post={ node } color={ "#f0f8ff82" }/>
                )) }
            </BlogPosts>
        </Wrapper>
  </Layout>
)}

export default BlogPage

export const blogPageContentQuery = graphql`
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
    categories: allMarkdownRemark(filter: { fileAbsolutePath: {regex : "\/content/posts/" } }) {
        edges {
            node {
                frontmatter {
                    category
                }
            }
        }
    }
}
`