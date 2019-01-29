import React from 'react'
import styled from 'styled-components'

import { Layout, SEO } from '../components/common'
import { Intro, Blog, Projects, Booknotes } from '../components/home'
import { StaticQuery, graphql } from 'gatsby';

const BackgroundWrapper = styled.div `
  background-color: ${props => props.color || "inherit"};
`

const IndexPage = () => (
  <StaticQuery
        query={homeContentQuery}
        render={data => 
          <Layout hideAside={ true }>
            <SEO description = { data.short_bio } title="Home" keywords={[`blake adams`, `software`, `software developer`, `technology`, `financial independence`, `entrepreneur`, `career`, `consultancy`, `blog`]} />
            <BackgroundWrapper>
              <Intro/>
            </BackgroundWrapper>
            <BackgroundWrapper color={ "#f0f8ff82" }>
              <Blog/>
            </BackgroundWrapper>
            <BackgroundWrapper>
              <Projects/>
            </BackgroundWrapper>
            <BackgroundWrapper color={ "#f0f8ff82" }>
              <Booknotes/>
            </BackgroundWrapper>
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