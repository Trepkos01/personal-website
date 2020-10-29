import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby';
import PropTypes from 'prop-types'
import Img from 'gatsby-image';

import { Tech } from '../'

const ProjectWrapper = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 0 100%;

    border: 1px solid lightgray;
    margin: 1em auto;

    :hover {
        box-shadow: 6px 9px 20px 0px #0000003d
    }

    @media (min-width:768px) {
        flex: 0 0 45%;
    }

    background-color: ${props => props.color || "inherit"};
`

const ProjectImage = styled.div `
    width:100%;
    flex: 0 0 200px;
    overflow: hidden;

    @media (min-width:768px) {
        flex: 0 0 auto;
        overflow: hidden;
    }
`

const ProjectDescription = styled.div `
    margin: 1em;
`

const ProjectLinks = styled.div `
    margin: 1em;
    text-align: center;
`

const ProjectCard = ({ project, color }) => (
    <ProjectWrapper color={ color }>
        <ProjectImage>
            <Img fluid={ project.node.frontmatter.featuredImage.childImageSharp.fluid }/>
        </ProjectImage>
        <Tech tech = { project.node.frontmatter.tags }/>
        <ProjectDescription>
            <p><strong> { project.node.frontmatter.title } </strong></p>
            <p> { project.node.frontmatter.description } </p>
        </ProjectDescription>
        <ProjectLinks>
            <p><Link to={ `/${project.node.fields.slug}` }>Read More</Link></p>
            {((node) => {
                    if(node.node.frontmatter.liveUrl !== "")
                        return <p><a href={ node.node.frontmatter.liveUrl } >View Live</a></p>
            })(project)}
            {((node) => {
                    if(node.node.frontmatter.sourceUrl !== "")
                        return <p><a href= { node.node.frontmatter.sourceUrl }>View Source</a></p>
            })(project)}
        </ProjectLinks>
    </ProjectWrapper> 
)

export { ProjectCard }

ProjectCard.propTypes = {
    project: PropTypes.shape({
        node: PropTypes.shape({
            frontmatter: PropTypes.shape({
                title: PropTypes.string,
                description: PropTypes.string,
                featuredImage: PropTypes.any,
                tags: PropTypes.arrayOf(PropTypes.string),
                liveUrl: PropTypes.string,
                sourceUrl: PropTypes.string
            }),
            fields: PropTypes.shape({
                slug: PropTypes.string
            })
        })
    }),
    color: PropTypes.string
}