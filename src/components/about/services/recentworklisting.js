import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby';
import PropTypes from 'prop-types'
import Img from 'gatsby-image';

const RecentWorkWrapper = styled.div `
    padding: 1em;
    border: 1px solid lightgray;
    margin-top:1em;

    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;

    @media (min-width:768px) {
        justify-content: flex-start;
    }

    background-color: ${props => props.color || "inherit"};
`

const RecentWorkThumbnail = styled.div `
    flex: 0 0 100%;

    @media (min-width:768px) {
        justify-content: flex-start;
        flex: 0 0 400px;
    }
    width: 100%;
    box-shadow: 2px 2px #ccc;
    overflow:hidden;
`

const RecentWorkDescription = styled.div `
    flex: 1 0 100%;
    display: flex;
    flex-direction: column;

    @media (min-width:768px) {
        flex: 1 0 50%;
        padding: 1em;
    }
`

const RecentWorkListing = ({ recentwork, color }) => (
    <RecentWorkWrapper color={ color }>
        <RecentWorkThumbnail>
            <Img fluid={ recentwork.node.frontmatter.featuredImage.childImageSharp.fluid }/>
        </RecentWorkThumbnail>
        <RecentWorkDescription>
            <h3>{ recentwork.node.frontmatter.title }</h3>
            <p><small>{ recentwork.node.frontmatter.date }</small></p>
            <p dangerouslySetInnerHTML={{__html: recentwork.node.frontmatter.description }}/>
            <p><a href={ recentwork.node.frontmatter.liveUrl }>Check it Out Here</a></p>
            {((node) => {
                    if(node.node.frontmatter.projectSlug !== "")
                        return <p><Link to= { node.node.frontmatter.projectSlug }>Read more about it.</Link></p>
            })(recentwork)}
        </RecentWorkDescription>
    </RecentWorkWrapper>
)

export { RecentWorkListing }


RecentWorkListing.propTypes = {
    recentwork: PropTypes.shape({
        node: PropTypes.shape({
            frontmatter: PropTypes.shape({
                title: PropTypes.string,
                date: PropTypes.string,
                featureImage: PropTypes.any,
                liveUrl: PropTypes.string,
                description: PropTypes.string,
                projectSlug: PropTypes.string
            })
        })
    }),
    color: PropTypes.string
}