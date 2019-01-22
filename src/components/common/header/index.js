import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.div `
  background: rebeccapurple;
  margin-bottom: 1.45rem;
  position: fixed;
  width: 100%;
  z-index: 2;

  padding: 0 2em 0 2em;

  display:flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
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
  font-weight: bold;

  :hover{
    text-decoration: none;
  }
`

const NavLinks = styled.nav `
  display: none;

  @media(min-width: 960px){
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
  }
`

const NavLink = styled(Link) `
  color: white;
  margin: 1em;
  font-weight: bold;

  :hover{
    text-decoration: none;
    color: black;
  }
`

const SideNav = styled.div `
  z-index: 4;
  height: 100%;
  width: 65%;
  position: fixed;
  background-color: rebeccapurple;

  right: -200px;
  top: 85px;

  display: none;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  ${({ toggle }) => toggle && `
    display: flex;
  `}

  @media(max-width: 360px){
    right: -100px;
  }
`

const ToggleMenu = styled.div `
  z-index: 4;
  cursor: pointer;
  /*position: absolute;
  top: 0.5em;
  right: 1em;
  display: block;*/
  font-weight: bold;
  font-size: 2em;
  color: white;
  padding: 1.45rem 1.0875rem;

  align-self: flex-end;

  ${({ sideNav }) => sideNav && `
    color: gray;
  `}

  @media(min-width: 960px){
    display: none;
  }
`

export const Header = ({ siteTitle }) => {
  const [sideNav, setSideNav] = useState(false)

  const toggle = () => setSideNav(!sideNav)

  return (
  <>
    <HeaderContainer>
      <LogoContainer>
        <LogoTitle>
          <LogoLink to="/">{ siteTitle }</LogoLink>
        </LogoTitle>
      </LogoContainer>
      <NavLinks>
        <NavLink to="/">About</NavLink>
        <NavLink to="/">Blog</NavLink>
        <NavLink to="/">Projects</NavLink>
        <NavLink to="/">Booknotes</NavLink>
      </NavLinks>
      <ToggleMenu onClick={ toggle } sideNav={ sideNav }>&#9776;</ToggleMenu>
    </HeaderContainer>
    <SideNav toggle = { sideNav }>
      <NavLink to="/">About</NavLink>
      <NavLink to="/">Blog</NavLink>
      <NavLink to="/">Projects</NavLink>
      <NavLink to="/">Booknotes</NavLink>
    </SideNav>
  </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}
