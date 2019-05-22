import React from 'react'
import { graphql } from 'gatsby';
import styled from 'styled-components'
import Img from "gatsby-image";

import { Layout, SEO, SocialShare } from '../components/common'

const BooknotesWrapper = styled.div `
  padding: 2em;
  display: flex;
  flex-direction: column;
`

const BookCover = styled.div `
  height: 100%;
  width: 200px;
  border: lightgray solid 1px;
  margin: auto;

  box-shadow: 6px 9px 20px 0px #0000003d;
`

const BooknotesTitle = styled.h1 `
`

const BooknotesDetails = styled.div `
  border-bottom: lightblue solid 1px;
  margin-bottom: 15px;
`

const BooknotesContent = styled.div `
  border-bottom: 1px solid lightgray;
  min-height: 400px;
`

export default ({ data }) => {
    const booknotes = data.markdownRemark
    const url = data.site.siteMetadata.siteUrl + "/" + booknotes.fields.slug
    const socialShares = data.site.siteMetadata.socialShare

    const asideInfo = {
      relatedPosts: {edges: []},
      tags: []
    }

    return (
        <Layout hideAside={ false } asideInfo={ asideInfo }>
            <SEO url = { url } type = 'article' description={ booknotes.frontmatter.description } title={ booknotes.frontmatter.title } keywords={ booknotes.frontmatter.tags }  image={ booknotes.frontmatter.coverImage.childImageSharp.fluid.src }/>
            <BooknotesWrapper>
                <BookCover><Img fluid={ booknotes.frontmatter.coverImage.childImageSharp.fluid }/></BookCover>
                <BooknotesDetails>
                  <BooknotesTitle>{ booknotes.frontmatter.title }</BooknotesTitle>
                    <p><strong>By { booknotes.frontmatter.author }</strong></p>
                    <p><strong>Date:</strong> { booknotes.frontmatter.date }</p>
                    <p><strong>Just the Highlights in :</strong> { booknotes.timeToRead } Minutes</p>
                    <p><strong>Buy the book <a href={ booknotes.frontmatter.book_url }>Here</a></strong></p>
                </BooknotesDetails>
                <BooknotesContent dangerouslySetInnerHTML={{ __html: booknotes.html }} />
            </BooknotesWrapper>
            <SocialShare url={ url } title={ booknotes.frontmatter.title } size={ 50 } socials = { socialShares }/>
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
        ...BooknotesFrontmatter
      }
      site{
        ...SiteInformation
      }
    }
  `