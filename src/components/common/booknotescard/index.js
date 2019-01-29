import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby';
import PropTypes from 'prop-types'
import Img from 'gatsby-image';

const BooknoteWrapper = styled.div `
    padding: 1em;
    border: 1px solid lightgray;
    margin: 1em;

    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;

    @media (min-width:768px) {
        justify-content: flex-start;
    }

    background-color: ${props => props.color || "inherit"};
`

const BookCover = styled.div `
    flex: 0 0 200px;
    box-shadow: 2px 2px #ccc;
    overflow:hidden;
    height: 100%
`

const BooknotesDetails = styled.div `
    padding: 1em;

    flex: 1 0 100%;
    display: flex;
    flex-direction: column;

    @media (min-width:768px) {
        flex: 1 0 50%;
    }
`

const BooknotesCard = ({ booknotes, color }) => (
    <BooknoteWrapper color={ color }>
        <BookCover>
            <Img fluid={ booknotes.node.frontmatter.coverImage.childImageSharp.fluid }/>
        </BookCover>
        <BooknotesDetails>
            <p><strong>{ booknotes.node.frontmatter.title }</strong></p>
            <p><small>{ booknotes.node.frontmatter.date }</small></p>
            <p>{ booknotes.node.frontmatter.description }</p>
            <p><Link to={ booknotes.node.fields.slug }>Read My Notes</Link></p>
        </BooknotesDetails>
    </BooknoteWrapper>
)

export { BooknotesCard }

BooknotesCard.propTypes = {
    booknotes: PropTypes.shape({
        node: PropTypes.shape({
            frontmatter: PropTypes.shape({
                title: PropTypes.string,
                date: PropTypes.string,
                description: PropTypes.string,
                coverImage: PropTypes.any,
            }),
            fields: PropTypes.shape({
                slug: PropTypes.string
            })
        })
    }),
    color: PropTypes.string
}