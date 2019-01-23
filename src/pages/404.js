import React from 'react'
import styled from 'styled-components'
import { Layout, SEO } from '../components/common'

const Wrapper = styled.div `
  padding: 2em;
  min-height: 768px;
`

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Wrapper>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Wrapper>
  </Layout>
)

export default NotFoundPage
