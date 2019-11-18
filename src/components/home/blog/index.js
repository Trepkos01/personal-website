import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql, StaticQuery, Link } from 'gatsby';

import { PostCard, FeaturedPost, SeriesItem } from '../../common'


const _ = require("lodash")

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

const Blog = ({categories, series}) => {
    let categoryLinks = []
    _.each(categories.edges, edge => {
        if(_.get(edge, "node.frontmatter.category")){
            categoryLinks.push(edge.node.frontmatter.category)
          }
    })
    categoryLinks = _.uniq(categoryLinks)

    let seriesLinks = []
    let seriesInfo = new Map()

    _.each(series.edges, edge => {
        if(_.get(edge, "node.frontmatter.series")){
            seriesLinks.push(edge.node.frontmatter.series)
            seriesInfo.set(edge.node.frontmatter.series, 
                {title: edge.node.frontmatter.series,
                date: edge.node.frontmatter.date, 
                img: edge.node.frontmatter.featuredImage.childImageSharp.fluid,
                count: (seriesInfo.get(edge.node.frontmatter.series) === undefined ? 1 : seriesInfo.get(edge.node.frontmatter.series).count + 1)}
            )
          }
    })
    seriesLinks = _.uniq(seriesLinks)
    seriesLinks = _.reverse(seriesLinks)
    
    return (
        <StaticQuery
            query={blogContentQuery}
            render={data =>
            <BlogWrapper>
                <h1>Blog</h1>
                <FeaturedPost post={ data.featuredPost.edges[0] } color={ "white" }/>
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
                <RecentPosts>
                    { data.recentPosts.edges.map((node, index) => (
                        <PostCard key={ index } post={ node } color={ "white" }/>
                    )) }
                </RecentPosts>
            </BlogWrapper>
        }/>
)}

export { Blog }

Blog.propTypes = {
    categories: PropTypes.shape({
        edges: PropTypes.arrayOf(PropTypes.shape({
            node: PropTypes.shape({
                frontmatter: PropTypes.shape({
                    category: PropTypes.string,
                })
            })
        }))
    })
}
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