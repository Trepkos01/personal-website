import React from 'react'
import styled from 'styled-components'

import { Layout, SEO } from '../components/common'
import { Intro, Blog, Projects, Booknotes } from '../components/home'
import { StaticQuery, graphql } from 'gatsby';

const BackgroundWrapper = styled.div `

  background: linear-gradient(to top, 
    ${props => props.color}00 0%, 
    ${props => props.color} 5%, 
    ${props => props.color} 95%, 
    ${props => props.color}00 100%)
    left 
    bottom
    rgba(0,0,0,0)    
    no-repeat;
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
            <BackgroundWrapper color={ "#f0f8ff" }>
              <Blog/>
            </BackgroundWrapper>
            <BackgroundWrapper>
              <Projects/>
            </BackgroundWrapper>
            <BackgroundWrapper color={ "#f0f8ff" }>
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