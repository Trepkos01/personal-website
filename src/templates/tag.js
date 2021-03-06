import React from 'react'
import { graphql } from 'gatsby';
import styled from 'styled-components'

import { Layout, SEO, PostCard, ProjectCard } from '../components/common'

const Wrapper = styled.div `
    padding: 1em;
    
    @media (min-width:768px) {
        padding: 2em;
    }
`

const SectionWrapper = styled.div`
`


const PostsWrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
`

const ProjectsWrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
`

const Tag = ({pageContext, data}) => {
    const { tag } = pageContext

    const { posts, postsCount } = data.taggedPosts || { posts: [], postsCount: 0}

    const { projects, projectsCount } = data.taggedProjects || { projects: [], projectsCount: 0}

    const postsSectionHeader = `${postsCount} post${
        postsCount === 1 ? "" : "s"
        } tagged with "${tag}"`
    
    const projectsSectionHeader = `${projectsCount} project${
        projectsCount === 1 ? "" : "s"
      } tagged with "${tag}"`

    const title = `Posts and Projects tagged with " ${tag}"`

    let postsSection, projectsSection = ""

    if(postsCount > 0){
        postsSection = (
            <SectionWrapper>
                <h3>{ postsSectionHeader }</h3>
                <PostsWrapper>
                { posts.map((node, index) => (
                    <PostCard key={ index } post={ node } color={ "#f0f8ff82;" }/>
                ))}
                </PostsWrapper>
            </SectionWrapper>
        )
    }

    if(projectsCount > 0){
        projectsSection = (
            <SectionWrapper>
                <h3>{ projectsSectionHeader }</h3>
                <ProjectsWrapper>
                { projects.map((node, index) => (
                    <ProjectCard key={ index } project={ node } color={ "#f0f8ff82;" }/>
                ))}
                </ProjectsWrapper>
            </SectionWrapper>
        )
    }

    return (
        <Layout hideAside={ false }>
            <SEO title={ title } keywords={[`blake adams`, `software`, `software developer`, `technology`, `financial independence`, `entrepreneur`, `career`, `consultancy`, `projects`, 'blog', tag]} />
            <Wrapper>
                { postsSection }
                { projectsSection }
            </Wrapper>
        </Layout>
    )
}

export const tagPostsQuery = graphql`
  query($tag: String) {
    taggedPosts: allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } }, fileAbsolutePath: {regex : "\/posts/"} }
    ) {
        postsCount: totalCount
        posts: edges {
            node {
                id
                excerpt(pruneLength: 180)
                ...PostItemFrontmatter
                ...MarkdownFields
            }
        }
    }
    taggedProjects: allMarkdownRemark(
        limit: 2000
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { tags: { in: [$tag] } }, fileAbsolutePath: {regex : "\/projects/"} }
      ) {
            projectsCount: totalCount
            projects: edges {
                node {
                    id
                    excerpt(pruneLength: 180)
                    ...ProjectsItemFrontmatter
                    ...MarkdownFields
                }
            }
        }
    }
`


export default Tag
