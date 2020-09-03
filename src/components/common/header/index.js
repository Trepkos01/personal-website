import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'

const HeaderContainer = styled.div `
  background: #336f99;
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
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`

const Logo = styled.div `
  width:50px;
  border: solid 1px white;
  box-shadow: 2px 1px 20px 1px #0000003d;
  margin-right: 10px;
`

const LogoTitle = styled.h1 `
  margin: 0;
  font-size: large;
  padding-bottom: 0px;

  @media(min-width: 768px){
    display: inherit;
    font-size: 2rem;
  }
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
    color: #e4ebf963;
  }
`

const SideNav = styled.div `
  z-index: 4;
  height: 100%;
  width: 85%;
  position: fixed;
  background-color: #336f99;

  right: -50px;
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

export const Header = ({ siteTitle, logo }) => {
  const [sideNav, setSideNav] = useState(false)

  const toggle = () => setSideNav(!sideNav)

  return (
  <>
    <HeaderContainer>
      <LogoContainer>
        <Logo>
          <Link to ="/"><Img to="/" fluid={ logo } /></Link>
        </Logo>
        <LogoTitle>
          <LogoLink to="/">{ siteTitle }</LogoLink>
        </LogoTitle>
      </LogoContainer>
      <NavLinks>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/booknotes">Booknotes</NavLink>
      </NavLinks>
      <ToggleMenu onClick={ toggle } sideNav={ sideNav }>&#9776;</ToggleMenu>
    </HeaderContainer>
    <SideNav toggle = { sideNav }>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/blog">Blog</NavLink>
      <NavLink to="/projects">Projects</NavLink>
      <NavLink to="/booknotes">Booknotes</NavLink>
    </SideNav>
  </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
  logo: PropTypes.any
}

Header.defaultProps = {
  siteTitle: ``,
}