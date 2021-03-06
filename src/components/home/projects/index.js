import React from 'react'
import styled from 'styled-components'
import { graphql, StaticQuery } from 'gatsby';

import { ProjectCard } from '../../common'

const ProjectsWrapper = styled.div`
    max-width: 1080px;
    margin: 0 auto;
    padding: 2em;
`

const ProjectsContainer = styled.div `
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: flex-start;
`


const Projects = () => (
        <StaticQuery
            query={projectsContentQuery}
            render={data => 
                <ProjectsWrapper>
                    <h1>Projects</h1>
                    <ProjectsContainer>
                    { data.projects.edges.map((node, index) => (
                        <ProjectCard key={ index } project={ node } color={ "#c2e9fb3d" }/>
                    ))}
                    </ProjectsContainer>
                </ProjectsWrapper>
        }/>
)

export { Projects }

const projectsContentQuery = graphql`
    query ProjectsContentQuery {
        projects: allMarkdownRemark(
        filter: { fileAbsolutePath: {regex : "\/projects/"}},
        sort: {fields: [frontmatter___date], order: DESC},
            limit: 6),
        {
            edges {
                node {
                    id
                    ...ProjectsFrontmatter
                    ...MarkdownFields
                }
            }
        }
    }
` 