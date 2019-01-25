import React from 'react'
import styled from 'styled-components'
import { graphql, StaticQuery } from 'gatsby';

import { Layout, SEO, ProjectCard } from '../components/common'

const Wrapper = styled.div `
  padding: 2em;
  min-height: 768px;

  display: flex;
  flex-direction: column;
`

const ProjectsContainer = styled.div `
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
`

const ProjectsPage = () => (
    <Layout hideAside={ false }>
        <SEO title="Projects" keywords={[`blake adams`, `software`, `software developer`, `technology`, `financial independence`, `entrepreneur`, `career`, `consultancy`, `projects`]} />
        <StaticQuery
            query={projectsPageContentQuery}
            render={data => 
            <Wrapper>
                    <h1>Projects</h1>
                    <ProjectsContainer>
                    { data.projects.edges.map((node, index) => (
                        <ProjectCard key={ index } project={ node }/>
                    ))}
                    </ProjectsContainer>
            </Wrapper>
        }/>
    </Layout>
)

export default ProjectsPage

const projectsPageContentQuery = graphql`
    query ProjectsPageContentQuery {
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