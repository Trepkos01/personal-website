import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql, StaticQuery, Link } from 'gatsby';

import { PostCard, FeaturedPost } from '../../common'

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

const Blog = ({categories}) => {
    let categoryLinks = []
    _.each(categories.edges, edge => {
        if(_.get(edge, "node.frontmatter.category")){
            categoryLinks.push(edge.node.frontmatter.category)
          }
    })
    categoryLinks = _.uniq(categoryLinks)
    
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
                <RecentPosts>
                    { data.recentPosts.edges.map((node, index) => (
                        <PostCard key={ index } post={ node } color={ "white" }/>
                    )) }
                </RecentPosts>
            </BlogWrapper>
        }/>
)}

export { Blog }

let categoryNode = {
    node: PropTypes.shape({
        frontmatter: PropTypes.shape({
            category: PropTypes.string,
        })
    })
}

Blog.propTypes = {
    categories: PropTypes.shape({
        edges: PropTypes.arrayOf(categoryNode)
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