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
    const booknotes = data.markdownRemark
    const url = data.site.siteMetadata.siteUrl + "/" + booknotes.fields.slug

    const asideInfo = {
      relatedPosts: {edges: []},
      tags: []
    }

    return (
        <Layout hideAside={ false } asideInfo={ asideInfo }>
            <SEO description={ booknotes.description } title={ booknotes.frontmatter.title } keywords={ booknotes.frontmatter.tags } />
            <BooknotesWrapper>
                <BooknotesTitle>{ booknotes.frontmatter.title }</BooknotesTitle>
                <BooknotesContent dangerouslySetInnerHTML={{ __html: booknotes.html }} />
            </BooknotesWrapper>
            <SocialShare url={ url } title={ booknotes.frontmatter.title } size={ 50 }/>
        </Layout>
    )
}

export const query = graphql`
    query($slug: String!) {
      markdownRemark(fields: { slug: { eq: $slug } }) {
        id
        html
        timeToRead
        ...MarkdownFields
        ...BooknotesItemFrontmatter
      }
      site{
        ...SiteInformation
      }
    }
  `