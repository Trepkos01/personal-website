import React from 'react'
import { graphql } from 'gatsby';
import styled from 'styled-components'

import { Layout, SEO, PostCard, ProjectCard, BooknotesCard } from '../components/common'

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

const BooknotesWrapper = styled.div`
    display: flex;
    flex-flow: column;
`

const Category = ({pageContext, data}) => {
    const { category } = pageContext

    const { posts, postsCount } = data.categoryPosts || { posts: [], postsCount: 0}

    const { projects, projectsCount } = data.categoryProjects || { projects: [], projectsCount: 0}

    const { booknotes, booknotesCount } = data.categoryBooknotes || { booknotes: [], booknotesCount: 0}

    const postsSectionHeader = `${postsCount} post${
        postsCount === 1 ? "" : "s"
    } in the category "${category}"`
    
    const projectsSectionHeader = `${projectsCount} project${
        projectsCount === 1 ? "" : "s"
    } in the category "${category}"`

    const booknotesSectionHeader = `${booknotesCount} booknotes in the category "${category}"`

    const title = `Content in the category " ${category}"`

    return (
        <Layout hideAside={ false }>
            <SEO title={ title } keywords={[`blake adams`, `software`, `software developer`, `technology`, `financial independence`, `entrepreneur`, `career`, `consultancy`, `projects`, 'blog', category]} />
            <Wrapper>
                <h2>{ postsSectionHeader }</h2>
                <PostsWrapper>
                { posts.map((node, index) => (
                    <PostCard key={ index } post={ node }/>
                ))}
                </PostsWrapper>
                <h2>{ projectsSectionHeader }</h2>
                <ProjectsWrapper>
                { projects.map((node, index) => (
                    <ProjectCard key={ index } project={ node }/>
                ))}
                </ProjectsWrapper>
                <h2>{ booknotesSectionHeader }</h2>
                <BooknotesWrapper>
                { booknotes.map((node, index) => (
                    <BooknotesCard key={ index } booknotes={ node }/>
                ))}
                </BooknotesWrapper>
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
                    excerpt(pruneLength: 180)
                    ...BooknotesItemFrontmatter
                    ...MarkdownFields
                }
            }
        }
    }
`


export default Category
