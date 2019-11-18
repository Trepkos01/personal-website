import React from 'react'
import { graphql } from 'gatsby';
import styled from 'styled-components'

import { Layout, SEO, PostCard } from '../components/common'

import { SeriesDictionary } from '../utils/seriesdictionary'

const Wrapper = styled.div `
    padding: 1em;
    
    @media (min-width:768px) {
        padding: 2em;
    }
`

const SectionWrapper = styled.div`
`

const HeaderWrapper = styled.div`
    margin-bottom: 1em;
`

const PostsWrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
`

const Series = ({pageContext, data}) => {
    const { series } = pageContext

    const { posts, postsCount } = data.seriesPosts || { posts: [], postsCount: 0}

    const title = `${series} Posts`

    let postsSection = ""

    if(postsCount > 0){
        postsSection = (
            <SectionWrapper>
                <HeaderWrapper>
                    <h2>{ title }</h2>
                    <span>{ SeriesDictionary.get(series) }</span>
                </HeaderWrapper>
                <PostsWrapper>
                { posts.map((node, index) => (
                    <PostCard key={ index } post={ node } color={ "#f0f8ff82;" }/>
                ))}
                </PostsWrapper>
            </SectionWrapper>
        )
    }

    return (
        <Layout hideAside={ false }>
            <SEO title={ title } keywords={[`blake adams`, `software`, `software developer`, `technology`, `financial independence`, `entrepreneur`, `career`, `consultancy`, `projects`, 'blog']} />
            <Wrapper>
                { postsSection }
            </Wrapper>
        </Layout>
    )
}

export const seriesPostsQuery = graphql`
  query($series: String) {
    seriesPosts: allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { series: { eq: $series } }, fileAbsolutePath: {regex : "\/posts/"} }
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
}
`


export default Series