import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby';
import PropTypes from 'prop-types'
import Img from "gatsby-image";

const FeaturedWrapper = styled.div `
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

const PostTag = styled.small `
    color: lightgray;
`

const FeaturedPost = ({ post }) => (
    <FeaturedWrapper>
        <FeaturedPostImage>
            <Img fluid={ post.node.frontmatter.featuredImage.childImageSharp.fluid }/>
        </FeaturedPostImage>
        <FeaturedPostExcerpt>
            <FeaturedPostTitle>{ post.node.frontmatter.title }</FeaturedPostTitle>
            <p><small>{ post.node.frontmatter.date }</small></p>
            <p>{ post.node.excerpt } <Link to={ post.node.fields.slug }>Read More</Link></p>
            <p>{ post.node.frontmatter.tags.map((node, index) => (<PostTag key={ index }> { node } </PostTag>)) }</p>
        </FeaturedPostExcerpt>
    </FeaturedWrapper>
)

export { FeaturedPost }

FeaturedPost.propTypes = {
    post: PropTypes.shape({
        node: PropTypes.shape({
            excerpt: PropTypes.string,
            frontmatter: PropTypes.shape({
                title: PropTypes.string,
                date: PropTypes.string,
                featuredImage: PropTypes.any,
                tags: PropTypes.arrayOf(PropTypes.string)
            }),
            fields: PropTypes.shape({
                slug: PropTypes.string
            })
        })
    })
}