import React from 'react'
import { StaticQuery, graphql } from 'gatsby';
import { Layout, SEO } from '../components/common'

export default ({ data }) => {
    const post = data.markdownRemark
    return (
      <Layout>
        <div>
          <h1>{post.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </Layout>
    )
  }
  
  export const query = graphql`
    query($slug: String!) {
      markdownRemark(fields: { slug: { eq: $slug } }) {
        html
        frontmatter {
          title
        }
      }
    }
  `