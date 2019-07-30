import React from 'react'
import { graphql } from 'gatsby';
import styled from 'styled-components'

import { Layout, SEO, PostCard, ProjectCard, BooknotesCard } from '../components/common'

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
    border-bottom: lightgray 1px solid;
`

const ProjectsWrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    border-bottom: lightgray 1px solid;
`

const BooknotesWrapper = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    border-bottom: lightgray 1px solid;
`

const Category = ({pageContext, data}) => {
    const { category } = pageContext

    const { posts, postsCount } = data.categoryPosts || { posts: [], postsCount: 0}

    const { projects, projectsCount } = data.categoryProjects || { projects: [], projectsCount: 0}

    const { booknotes, booknotesCount } = data.categoryBooknotes || { booknotes: [], booknotesCount: 0}

    const postsSectionHeader = `${category} Blog Post${postsCount === 1 ? "" : "s"}`
    
    const projectsSectionHeader = `${category} Project${projectsCount === 1 ? "" : "s"}`

    const booknotesSectionHeader = `${category} Booknotes`

    const title = `${category} Content`

    let postsSection, projectsSection, booknotesSection = ""

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

    if(booknotesCount > 0){
        booknotesSection = (
            <SectionWrapper>
                <h3>{ booknotesSectionHeader }</h3>
                <BooknotesWrapper>
                { booknotes.map((node, index) => (
                    <BooknotesCard key={ index } booknotes={ node } color={ "#f0f8ff82;" }/>
                ))}
                </BooknotesWrapper>
            </SectionWrapper>
        )
    }


    return (
        <Layout hideAside={ false }>
            <SEO title={ title } keywords={[`blake adams`, `software`, `software developer`, `technology`, `financial independence`, `entrepreneur`, `career`, `consultancy`, `projects`, 'blog', category]} />
            <Wrapper>
                { postsSection }
                { projectsSection }
                { booknotesSection }
            </Wrapper>
        </Layout>
    )
}

export const categoryPostsQuery = graphql`
  query($category: String) {
    categoryPosts: allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } }, fileAbsolutePath: {regex : "\/posts/"} }
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
    categoryProjects: allMarkdownRemark(
        limit: 2000
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { category: { eq: $category } }, fileAbsolutePath: {regex : "\/projects/"} }
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
    categoryBooknotes: allMarkdownRemark(
        limit: 2000
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { category: { eq: $category } }, fileAbsolutePath: {regex : "\/booknotes/"} }
      ) {
            booknotesCount: totalCount
            booknotes: edges {
                node {
                    id
                    timeToRead
                    excerpt(pruneLength: 180)
                    ...BooknotesFrontmatter
                    ...MarkdownFields
                }
            }
        }
    }
`


export default Category
