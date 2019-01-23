import React from 'react'
import styled from 'styled-components'
import { Layout, SEO } from '../components/common'

const Wrapper = styled.div `
  padding: 2em;
  min-height: 768px;
`

const AboutPage = () => (
  <Layout hideAside={ true }>
    <SEO title="About Me" keywords={[`blake adams`, `software`, `software developer`, `technology`, `financial independence`, `entrepreneur`, `career`, `consultancy`, `blog`]} />
    <Wrapper>
      <h1>About Me</h1>
    </Wrapper>
  </Layout>
)

export default AboutPage
