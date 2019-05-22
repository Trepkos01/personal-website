import React from 'react'
import Disqus from 'disqus-react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components'
import Img from "gatsby-image";

import { Layout, SEO, SocialShare } from '../components/common'

const _ = require("lodash")

const PostWrapper = styled.div `
  padding: 2em;
  display: flex;
  flex-direction: column;
`

const FeatureImage = styled.div `
  width: 100%;
  flex: 1 0 auto;
  overflow: hidden;
  border: 1px solid lightgray;

  box-shadow: 6px 9px 20px 0px #0000003d;

  @media (min-width:768px) {
    flex: 0 0 400px;
  }
`

const PostTitle = styled.h1 `
`

const PostDetails = styled.div `
  display: flex;
  flex-direction: column;
  margin-bottom: 2em;
  padding: 1em;
  border-bottom: 1px solid lightgray;
  font-size: small;

  p {
    margin-bottom: 0px;
  }
`
const PostTag = styled(Link)`
    color: lightgray;
    font-size: small;
`

const PostContent = styled.div `
  border-bottom: 1px solid lightgray;

  table{
    background-color: #add8e640;
    border: lightgray solid 1px;
    overflow: auto;
  }

  table > thead {
    background-color: #2196f359;
  }

  table > thead > tr > th {
    text-align: center;
    padding:5px;
    border: white solid 1px;
  }

  table > tbody > tr > td {
    text-align: center;
    padding:5px;
    border: lightblue solid 1px;
  }

`

const PostComments = styled.div `
  width: 95%;
  margin: 0 auto;
`

const PostProject = styled.div `
  padding: 1em;
  margin: 1em auto;

  display: flex;
  flex-flow: row wrap;
  border-bottom: 1px solid lightgray;
  justify-content: center;
  align-items: center;
  width: 100%;

  background-color: #f0f8ff82;

  @media (min-width:768px) {
    justify-content: flex-start;
  }
`

const PostProjectThumbnail = styled.div `
  flex: 0 0 200px;
  box-shadow: 2px 2px #ccc;
  overflow:hidden;
  height: 100%
`

const PostProjectDescription = styled.div `
  padding: 1em;

  flex: 1 0 100%;
  display: flex;
  flex-direction: column;

  @media (min-width:768px) {
      flex: 0 0 50%;
  }
`

export default ({ data }) => {
    const post = data.markdownRemark
    const url = data.site.siteMetadata.siteUrl + "/" + post.fields.slug
    const disqusShortname = 'blakeadams-io';
    const socialShares = data.site.siteMetadata.socialShare

    const disqusConfig = {
      url: url, 
      identifier: post.id,
      title: post.frontmatter.title,
    };

    const asideInfo = {
      relatedPosts: data.relatedPosts,
      tags: post.frontmatter.tags
    }

    let project = ""
    if(data.project !== null){
      project = (<PostProject>
                    <PostProjectThumbnail>
                      <Img fluid={ data.project.frontmatter.featuredImage.childImageSharp.fluid }/>
                    </PostProjectThumbnail>
                    <PostProjectDescription>
                      <p><strong>This post is about the project, { data.project.frontmatter.title }</strong></p>
                      <p>{ data.project.frontmatter.description }</p>
                      <p><Link to={ data.project.fields.slug }>Read More</Link></p>
                    </PostProjectDescription>
                 </PostProject>)
    } 

    return (
      <Layout hideAside={ false } asideInfo = { asideInfo }>
        <SEO url = { url } type = 'article' description={ post.frontmatter.description } title={ post.frontmatter.title } keywords={ post.frontmatter.tags } image={ post.frontmatter.featuredImage.childImageSharp.fluid.src } />
        <PostWrapper>
          <FeatureImage>
            <Img fluid={ post.frontmatter.featuredImage.childImageSharp.fluid }/>
          </FeatureImage>
          <PostTitle>{ post.frontmatter.title }</PostTitle>
          <PostDetails>
            <p><strong>Date:</strong> { post.frontmatter.date }</p>
            <p><strong>Time to Read:</strong> { post.timeToRead } Minutes</p>
            <p><strong>Tags:</strong> { post.frontmatter.tags.map((node, index) => (<PostTag key={ index } to={ `/tags/${_.kebabCase(node)}/` }> { node } </PostTag>)) }</p>
            <Disqus.CommentCount shortname={disqusShortname} config={disqusConfig}>Comments</Disqus.CommentCount>
          </PostDetails>
          <PostContent dangerouslySetInnerHTML={{ __html: post.html }} />
          { project }
        </PostWrapper>
        <SocialShare url={ url } title={ post.frontmatter.title } size={ 50 } socials = { socialShares }/>
        <PostComments>
          <strong>Like what you read? Don't? Discuss it.</strong>
          <Disqus.DiscussionEmbed shortname={ disqusShortname } config={ disqusConfig } />
        </PostComments>
      </Layout>
    )
  }
  
  export const query = graphql`
    query($slug: String!, $tags: [String], $project: String) {
      markdownRemark(fields: { slug: { eq: $slug } }) {
        id
        html
        timeToRead
        ...MarkdownFields
        ...PostFrontmatter
      }
      relatedPosts: allMarkdownRemark(
        limit: 5
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { tags: { in: $tags } }, fileAbsolutePath: {regex : "\/posts/"} }
      ) {
        edges {
            node {
                ...MarkdownFields
                ...PostFrontmatter
            }
        }    
      }
      project: markdownRemark(fields: { slug: { eq: $project } }) {
        id
        ...MarkdownFields
        ...ProjectsItemFrontmatter
      }
      site {
      ...SiteInformation
      }
    }
  `