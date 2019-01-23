import React from 'react'
import { graphql } from 'gatsby';
import styled from 'styled-components'
import Img from "gatsby-image";

import { Layout, SEO, SocialShare, Tech } from '../components/common'

const ProjectWrapper = styled.div `
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

const ProjectTitle = styled.h1 `
`

const ProjectContent = styled.div `
  border-bottom: 1px solid lightgray;
`

const ProjectLinks = styled.div `
  display: flex;
  flex-flow: row wrap;
  justify-content: center;

  a{
    margin: 1em;
  }
`

export default ({ data }) => {
    const post = data.markdownRemark
    const url = data.site.siteMetadata.siteUrl + "/" + post.fields.slug

    return (
        <Layout hideAside={ false }>
            <SEO description={ post.description } title={ post.frontmatter.title } keywords={ post.frontmatter.tags } />
            <ProjectWrapper>
                <FeatureImage>
                    <Img fluid={ post.frontmatter.featuredImage.childImageSharp.fluid }/>
                </FeatureImage>
                <ProjectTitle>{ post.frontmatter.title }</ProjectTitle>
                <ProjectLinks>
                  {((url) => {
                    if(url !== "")
                      return <p><a href={ url } > View Live </a></p>
                  })(post.frontmatter.liveUrl)}
                  {((url) => {
                    if(url !== "")
                      return <p><a href= { url }> View Source </a></p>
                  })(post.frontmatter.sourceUrl)}
                </ProjectLinks>
                <Tech tech={ post.frontmatter.tags }/>
                <ProjectContent dangerouslySetInnerHTML={{ __html: post.html }} />
            </ProjectWrapper>
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
          liveUrl
          sourceUrl
        }
      }
      site{
        siteMetadata{
          siteUrl
        }
      }
    }
  `