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
    
    @media (min-width:768px) {
        flex-direction: row;
        padding:1em;
        margin: 1em;
    }

    @media (min-width:960px) {
        background: linear-gradient(to right, #aad2f5 0%, #ffffff00 50%, #ffffff00 100%) left bottom rgba(0,0,0,0) no-repeat;
    }

    background: linear-gradient(to bottom, #aad2f5 0%, #ffffff00 50%, #ffffff00 100%) left bottom rgba(0,0,0,0) no-repeat;

    border-bottom: lightgray 1px solid;
    box-shadow: 6px 9px 20px 0px #0000003d;

    /*border: 1px solid lightgray;
    box-shadow: 2px 2px #ccc;

    background-color: ${props => props.color || "inherit"};*/

    
    
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
    color: hsla(0,0%,0%,0.8);
`

const FeaturedPost = ({ post, color }) => (
    <FeaturedWrapper color={ color }>
        <FeaturedPostImage>
            <Img fluid={ post.node.frontmatter.featuredImage.childImageSharp.fluid }/>
        </FeaturedPostImage>
        <FeaturedPostExcerpt>
            <FeaturedPostTitle>{ post.node.frontmatter.title }</FeaturedPostTitle>
            <p><small>{ post.node.frontmatter.date }</small></p>
            <p>{ post.node.frontmatter.description } <Link to={ post.node.fields.slug }>Read More...</Link></p>
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
    }),
    color: PropTypes.string
}