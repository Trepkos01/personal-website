import React from 'react'
import styled from 'styled-components'
import { graphql, StaticQuery, Link } from 'gatsby';
import Img from "gatsby-image";

import { Tech } from "../../common"

const Wrapper = styled.div `
`

const ProjectsWrapper = styled.div`
    max-width: 1080px;
    margin: 0 auto;
    padding: 2em;
`

const ProjectsContainer = styled.div `
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
`

const ProjectCard = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 0 275px;

    border: 1px solid lightgray;
    margin: 1em;

    :hover {
        box-shadow: 6px 9px 20px 0px #0000003d
    }

    @media (min-width:768px) {
        flex: 0 0 45%;
    }
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

const Projects = () => (
        <StaticQuery
            query={projectsContentQuery}
            render={data => 
            <Wrapper>
                <ProjectsWrapper>
                    <h1>Projects</h1>
                    <ProjectsContainer>
                    { data.projects.edges.map((node, index) => (
                    <ProjectCard key={ index }>
                            <ProjectImage>
                                <Img fluid={ node.node.frontmatter.featuredImage.childImageSharp.fluid }/>
                            </ProjectImage>
                            <Tech tech = { node.node.frontmatter.tags }/>
                            <ProjectDescription>
                                <p><strong> { node.node.frontmatter.title } </strong></p>
                                <p> { node.node.frontmatter.description } </p>
                            </ProjectDescription>
                            <ProjectLinks>
                                <p><Link to={ node.node.fields.slug }>Read More</Link></p>
                                {((node) => {
                                        if(node.node.frontmatter.liveUrl !== "")
                                            return <p><a href={ node.node.frontmatter.liveUrl } >View Live</a></p>
                                })(node)}
                                {((node) => {
                                        if(node.node.frontmatter.sourceUrl !== "")
                                            return <p><a href= { node.node.frontmatter.sourceUrl }>View Source</a></p>
                                })(node)}
                            </ProjectLinks>
                    </ProjectCard> 
                    ))}
                    </ProjectsContainer>
                </ProjectsWrapper>
            </Wrapper>
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
                    frontmatter {
                        title
                        date(formatString: "DD MMMM, YYYY")
                        description
                        featuredImage {
                            publicURL
                            childImageSharp {
                                fluid(maxWidth: 960) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                        tags
                        liveUrl
                        sourceUrl
                    }
                    fields {
                        slug
                    }
                }
            }
        }
    }
` 