import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby';
import PropTypes from 'prop-types'
import Img from "gatsby-image";

const Post = styled.div `
    padding: 1em;
    border: 1px solid lightgray;
    margin: 1em;

    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;

    @media (min-width:768px) {
        justify-content: flex-start;
        
        p {
            margin-bottom: 0px;
        }
    }

    background-color: ${props => props.color || "inherit"};
`

const PostThumbnail = styled.div `
    flex: 0 0 100px;
    box-shadow: 2px 2px #ccc;
    overflow:hidden;
    height: 100%
`

const PostDescription = styled.div `
    padding: 1em;

    flex: 1 0 100%;
    display: flex;
    flex-direction: column;

    @media (min-width:768px) {
        flex: 1 0 50%;
`

const PostItem = ({ post, color }) => (
    <Post color={ color }>
        <PostThumbnail>
            <Img fluid={ post.node.frontmatter.featuredImage.childImageSharp.fluid }/>
        </PostThumbnail>
        <PostDescription>
            <p><strong>{ post.node.frontmatter.title }</strong></p>
            <p><small>{ post.node.frontmatter.date }</small></p>
            <p><Link to={ post.node.fields.slug }>Read More.</Link></p>
        </PostDescription>
    </Post>
)

export { PostItem }

PostItem.propTypes = {
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
