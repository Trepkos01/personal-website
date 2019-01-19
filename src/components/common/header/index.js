import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.div `
  background: rebeccapurple;
  margin-bottom: 1.45rem;
  position: fixed;
  width: 100%;
  z-index: 2;
`

const LogoContainer = styled.div `
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const LogoTitle = styled.h1 `
  margin 0;
`

const LogoLink = styled(Link) `
  color: white;
  text-decoration: none;

  :hover{
    text-decoration: none;
  }
`

const Header = ({ siteTitle }) => (
  <HeaderContainer>
    <LogoContainer>
      <LogoTitle>
        <LogoLink to="/">{siteTitle}</LogoLink>
      </LogoTitle>
    </LogoContainer>
  </HeaderContainer>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}


export { Header }