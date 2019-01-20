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

  display:flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
`

const LogoContainer = styled.div `
  max-width:640px;
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

const NavLinks = styled.nav `
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
`

const NavLink = styled(Link) `
  color: white;
  margin: 1em;
`

const Header = ({ siteTitle }) => (
  <HeaderContainer>
    <LogoContainer>
      <LogoTitle>
        <LogoLink to="/">{siteTitle}</LogoLink>
      </LogoTitle>
    </LogoContainer>
    <NavLinks>
      <NavLink to="/">About</NavLink>
      <NavLink to="/">Blog</NavLink>
      <NavLink to="/">Projects</NavLink>
      <NavLink to="/">Booknotes</NavLink>
    </NavLinks>
  </HeaderContainer>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}


export { Header }