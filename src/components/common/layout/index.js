import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import { Header, Footer, Aside } from '../'
import './layout.css'

const Wrapper = styled.div `
  display: flex;
  flex-flow: row wrap;
`

const Content = styled.div `
  margin: 0 auto;
  padding-top: 100px;
  width: 100%;

  flex: 1 1 auto;

  @media all and (min-width: 800px) {
    flex: 2 0px;
  }
`

const Layout = ({ children, hideAside }) => (
  <StaticQuery
    query={layoutContentQuery}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <Wrapper>
          <Content>
            { children }
          </Content>
          <Aside hide={ hideAside }/>
        </Wrapper>
        <Footer/>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  hideAside: PropTypes.bool
}

export { Layout }

const layoutContentQuery = graphql`
  query LayoutContentQuery {
    site {
      siteMetadata {
        title
      }
    }
}
`
