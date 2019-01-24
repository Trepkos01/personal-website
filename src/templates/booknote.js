import React from 'react'
import { graphql } from 'gatsby';
import styled from 'styled-components'

import { Layout, SEO, SocialShare } from '../components/common'

const BooknotesWrapper = styled.div `
  padding: 2em;
  display: flex;
  flex-direction: column;
`

const BooknotesTitle = styled.h1 `
`

const BooknotesContent = styled.div `
  border-bottom: 1px solid lightgray;
  min-height: 400px;
`

export default ({ data }) => {
    const post = data.markdownRemark
    const url = data.site.siteMetadata.siteUrl + "/" + post.fields.slug

    return (
        <Layout hideAside={ false }>
            <SEO description={ post.description } title={ post.frontmatter.title } keywords={ post.frontmatter.tags } />
            <BooknotesWrapper>
                <BooknotesTitle>{ post.frontmatter.title }</BooknotesTitle>
                <BooknotesContent dangerouslySetInnerHTML={{ __html: post.html }} />
            </BooknotesWrapper>
            <SocialShare url={ url } title={ post.frontmatter.title } size={ 50 }/>
        </Layout>
    )
}

export const query = graphql`
    query($slug: String!) {
      markdownRemark(fields: { slug: { eq: $slug } }) {
        id
        html
        timeToRead
        fields {
          slug
        }
        frontmatter {
          title
          date
          description
        }
      }
      site{
        siteMetadata{
          siteUrl
        }
      }
    }
  `