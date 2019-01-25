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
    flex: 2 0;
    width: 60%;
  }
`

const Layout = ({ children, hideAside, relatedPosts }) => { 
  
  
  return (
    <StaticQuery
      query={layoutContentQuery}
      render={data => (
        <>
          <Header siteTitle={data.site.siteMetadata.title} />
          <Wrapper>
            <Content>
              { children }
            </Content>
            <Aside hide={ hideAside } relatedPosts={ relatedPosts }/>
          </Wrapper>
          <Footer/>
        </>
      )}
    />)
}

let postNode = PropTypes.shape({
  node: PropTypes.shape({
    frontmatter: PropTypes.shape({
        title: PropTypes.string,
        date: PropTypes.string,
        description: PropTypes.string,
        featuredImage: PropTypes.any,
        tags: PropTypes.arrayOf(PropTypes.string)
    }),
    fields: PropTypes.shape({
        slug: PropTypes.string
    })
  })
})

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  hideAside: PropTypes.bool,
  relatedPosts: PropTypes.shape({
    edges: PropTypes.arrayOf(postNode)
  })
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
