import React from 'react'
import { graphql } from 'gatsby';
import styled from 'styled-components'
import Img from "gatsby-image";

import { Layout, SEO, SocialShare, Tech, PostItem } from '../components/common'

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

const RelatedPostsWrapper = styled.div `
`

export default ({ data }) => {
    const project = data.markdownRemark
    const url = data.site.siteMetadata.siteUrl + "/" + project.fields.slug

    let projectPosts = ""
    if(data.projectPosts !== null)
      projectPosts = (<RelatedPostsWrapper>
                        <h1>Posts about this Project</h1>
                        { data.projectPosts.edges.map((node, index) => (
                        <PostItem key={ index } post={ node } color={ "#f0f8ff82;" }/>
                        ))}
                      </RelatedPostsWrapper>)

    const asideInfo = {
      relatedPosts: data.relatedPosts,
      tags: project.frontmatter.tags
    }

    return (
        <Layout hideAside={ false } asideInfo={ asideInfo }>
            <SEO description={ project.description } title={ project.frontmatter.title } keywords={ project.frontmatter.tags } />
            <ProjectWrapper>
                <FeatureImage>
                    <Img fluid={ project.frontmatter.featuredImage.childImageSharp.fluid }/>
                </FeatureImage>
                <ProjectTitle>{ project.frontmatter.title }</ProjectTitle>
                <ProjectLinks>
                  {((url) => {
                    if(url !== "")
                      return <p><a href={ url } > View Live </a></p>
                  })(project.frontmatter.liveUrl)}
                  {((url) => {
                    if(url !== "")
                      return <p><a href= { url }> View Source </a></p>
                  })(project.frontmatter.sourceUrl)}
                </ProjectLinks>
                <Tech tech={ project.frontmatter.tags }/>
                <ProjectContent dangerouslySetInnerHTML={{ __html: project.html }} />
                <SocialShare url={ url } title={ project.frontmatter.title } size={ 50 }/>
                { projectPosts }
            </ProjectWrapper>
        </Layout>
    )
}

export const query = graphql`
    query($slug: String!, $tags: [String]) {
      markdownRemark(fields: { slug: { eq: $slug } }) {
        id
        html
        timeToRead
        ...MarkdownFields
        ...ProjectsFrontmatter
      }
      site{
        ...SiteInformation
      }
      projectPosts: allMarkdownRemark(
        limit: 5
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { tags: { in: [$slug] } }, fileAbsolutePath: {regex : "\/posts/"} }
      ) {
        edges {
            node {
                ...MarkdownFields
                ...PostFrontmatter
            }
        }    
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
    }
  `