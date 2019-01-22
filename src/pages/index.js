import React from 'react'

import { Layout, SEO } from '../components/common'
import { Intro, Current, Blog, Projects } from '../components/home'
import { StaticQuery, graphql } from 'gatsby';

const IndexPage = () => (
  <StaticQuery
        query={homeContentQuery}
        render={data => 
          <Layout>
            <SEO description = { data.short_bio } title="Home" keywords={[`blake adams`, `software`, `software developer`, `technology`, `financial independence`, `entrepreneur`, `career`, `consultancy`, `blog`]} />
            <Intro/>
            <Current/>
            <Blog/>
            <Projects/>
          </Layout>
        }/>
)

export default IndexPage

const homeContentQuery = graphql`
    query HomeContentQuery {
      site {
        siteMetadata {
          author {
            short_bio
          }
        }
      }
    }
`