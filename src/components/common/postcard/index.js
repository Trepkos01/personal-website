import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby';
import PropTypes from 'prop-types'
import Img from "gatsby-image";

const PostCardWrapper = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 0 100%;

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
        flex: 0 0 28%;
    }

    background-color: ${props => props.color || "inherit"};
`

const PostCardThumbnail = styled.div `
    width:100%;
    flex: 0 0 200px;
    box-shadow: 2px 2px #ccc;
    overflow:hidden;

    @media (min-width:768px) {
        flex: 0 0 auto;
    }
`

const PostCardExcerpt = styled.div `
    margin-top: 1em;
`

const PostTag = styled.small `
    color: lightgray;
`

const PostCard = ({ post, color }) => (
    <PostCardWrapper color={ color }>
        <PostCardThumbnail>
            <Img fluid={ post.node.frontmatter.featuredImage.childImageSharp.fluid }/>
        </PostCardThumbnail>
        <PostCardExcerpt>
            <p><strong> { post.node.frontmatter.title } </strong></p>
            <p><small>{ post.node.frontmatter.date }</small></p>
            <p> { post.node.frontmatter.description } </p>
            <p><Link to={ post.node.fields.slug }>Read More...</Link></p>
            <p>{ post.node.frontmatter.tags.map((node, index) => (<PostTag key={ index }> { node } </PostTag>)) }</p>
        </PostCardExcerpt>
    </PostCardWrapper>
)

export { PostCard }

PostCard.propTypes = {
    post: PropTypes.shape({
        node: PropTypes.shape({
            frontmatter: PropTypes.shape({
                title: PropTypes.string,
                date: PropTypes.string,
                description: PropTypes.string,
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


