import React from 'react'
import { graphql } from 'gatsby';
import styled from 'styled-components'

import { Layout, SEO, PostCard, ProjectCard } from '../components/common'

const Wrapper = styled.div `
    padding: 2em;
`

const PostsWrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
`

const ProjectsWrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
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

    return (
        <Layout hideAside={ false }>
            <SEO title={ title } keywords={[`blake adams`, `software`, `software developer`, `technology`, `financial independence`, `entrepreneur`, `career`, `consultancy`, `projects`, 'blog', tag]} />
            <Wrapper>
                <h1>{ postsSectionHeader }</h1>
                <PostsWrapper>
                { posts.map((node, index) => (
                    <PostCard key={ index } post={ node }/>
                ))}
                </PostsWrapper>
                <h1>{ projectsSectionHeader }</h1>
                <ProjectsWrapper>
                { projects.map((node, index) => (
                    <ProjectCard key={ index } project={ node }/>
                ))}
                </ProjectsWrapper>
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
                frontmatter{
                    title
                    date(formatString: "DD MMMM, YYYY")
                    description
                    tags
                    featuredImage {
                        publicURL
                        childImageSharp {
                            fluid(maxWidth: 300, maxHeight: 300) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
                fields {
                    slug
                }
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
                    frontmatter{
                        title
                        date(formatString: "DD MMMM, YYYY")
                        description
                        liveUrl
                        sourceUrl
                        tags
                        featuredImage {
                            publicURL
                            childImageSharp {
                                fluid(maxWidth: 300, maxHeight: 300) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                    fields {
                        slug
                    }
                }
            }
        }
    }
`


export default Tag