import React from 'react'
import Disqus from 'disqus-react';
import { graphql } from 'gatsby';
import styled from 'styled-components'
import Img from "gatsby-image";

import { Layout, SEO } from '../components/common'

import {
  FacebookIcon,
  FacebookShareButton,
  FacebookShareCount,
  LinkedinIcon,
  LinkedinShareButton,
  LinkedinShareCount,
  TwitterIcon,
  TwitterShareButton,
  RedditIcon,
  RedditShareButton,
  RedditShareCount
} from 'react-share';

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
  border-bottom: 1px solid lightgray;
  font-size: small;
`
const PostTag = styled.span `
    color: lightgray;
`

const PostContent = styled.div `
  border-bottom: 1px solid lightgray;
`

const PostComments = styled.div `
  width: 95%;
  margin: 0 auto;
`

const SocialShareIcons = styled.div `
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: flex-start;

  width: 95%;
  margin: 0 auto;
  height: 100px;
`

export default ({ data }) => {
    const post = data.markdownRemark
    const url = data.site.siteMetadata.siteUrl + "/" + post.fields.slug
    const disqusShortname = 'blakeadams-io';
    const disqusConfig = {
      url: url, 
      identifier: post.id,
      title: post.frontmatter.title,
    };
    return (
      <Layout>
        <SEO description={ post.description } title={ post.frontmatter.title } keywords={ post.frontmatter.tags } />
        <PostWrapper>
          <FeatureImage>
            <Img fluid={ post.frontmatter.featuredImage.childImageSharp.fluid }/>
          </FeatureImage>
          <PostTitle>{ post.frontmatter.title }</PostTitle>
          <PostDetails>
            <p><strong>Date:</strong> { post.frontmatter.date }</p>
            <p><strong>Time to Read:</strong> { post.timeToRead } Minutes</p>
            <p><strong>Tags:</strong> { post.frontmatter.tags.map((node, index) => (<PostTag key={ index }> { node } </PostTag>)) }</p>
            <Disqus.CommentCount shortname={disqusShortname} config={disqusConfig}>Comments</Disqus.CommentCount>
          </PostDetails>
          <PostContent dangerouslySetInnerHTML={{ __html: post.html }} />
        </PostWrapper>

        <SocialShareIcons>

          <FacebookShareButton url={ url } quote={ post.frontmatter.title } style={{textAlign:'center', margin:'1em'}}>
            <FacebookIcon round size={ 50 }/>
            <FacebookShareCount url={ url }/>
          </FacebookShareButton>

          <TwitterShareButton url={ url } title={ post.frontmatter.title } style={{textAlign:'center', margin:'1em'}}>
            <TwitterIcon round size={ 50 }/>
          </TwitterShareButton>

          <LinkedinShareButton url={ url } title={ post.frontmatter.title } style={{textAlign:'center', margin:'1em'}}>
            <LinkedinIcon round size={ 50 }/>
            <LinkedinShareCount url={ url }/>
          </LinkedinShareButton>

          <RedditShareButton url={ url } title={ post.frontmatter.title } style={{textAlign:'center', margin:'1em'}}>
            <RedditIcon round size={ 50 } />
            <RedditShareCount url={ url }/>
          </RedditShareButton>

        </SocialShareIcons>
        <PostComments>
          <strong>Like what you read? Don't? Discuss it.</strong>
          <Disqus.DiscussionEmbed shortname={ disqusShortname } config={ disqusConfig } />
        </PostComments>
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
          tags
          description
          featuredImage {
            publicURL
            childImageSharp {
                fluid(maxWidth: 960) {
                    ...GatsbyImageSharpFluid
                }
            }
          }
        }
      }
      site{
        siteMetadata{
          siteUrl
        }
      }
    }
  `