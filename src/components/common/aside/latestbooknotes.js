import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Img from 'gatsby-image';


const LatestBooknotesWrapper = styled.div `
    display: flex;
    flex-direction: column;
`

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

        p {
            margin-bottom: 0px;
        }
    }

    background-color: ${props => props.color || "inherit"};
`
const BookCover = styled.div `
    flex: 0 0 100px;
    box-shadow: 2px 2px #ccc;
    overflow:hidden;
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

const LatestBooknotes = ({ latestBooknotes }) => (
    <LatestBooknotesWrapper  style={ { display: (latestBooknotes !== null) ? 'flex' : 'none' } }>
    <h3>Latest Booknotes</h3>
    { latestBooknotes.edges.map((node, index) => (
        <BooknoteWrapper key={ index } color={ "white" }>
            <BookCover>
                <Img fluid={ node.node.frontmatter.coverImage.childImageSharp.fluid }/>
            </BookCover>
            <BooknotesDetails>
                <p><strong>{ node.node.frontmatter.title }</strong></p>
                <p><small>{ node.node.frontmatter.date }</small></p>
                <p><Link to={ node.node.fields.slug }>Read My Highlights in { node.node.timeToRead } Minutes</Link></p>
            </BooknotesDetails>
        </BooknoteWrapper>
    ))}
    </LatestBooknotesWrapper>
)

export { LatestBooknotes }

LatestBooknotes.propTypes = {
    latestBooknotes: PropTypes.shape({
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
    })
}