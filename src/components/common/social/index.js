import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FaFacebook, FaTwitterSquare, FaLinkedin, FaYoutube, FaMedium, FaKeybase, FaGithub } from "react-icons/fa";
import { FacebookIcon, FacebookShareButton, FacebookShareCount, LinkedinIcon, LinkedinShareButton, LinkedinShareCount, TwitterIcon, TwitterShareButton, RedditIcon, RedditShareButton, RedditShareCount } from 'react-share';

const returnIcon = (name) => ({
    "Facebook": <FaFacebook size='2em'/>,
    "Twitter": <FaTwitterSquare size='2em'/>,
    "LinkedIn": <FaLinkedin size='2em'/>,
    "YouTube": <FaYoutube size='2em'/>,
    "Medium": <FaMedium size='2em'/>,
    "Keybase": <FaKeybase size='2em'/>,
    "GitHub": <FaGithub size='2em'/>
})[name]

const SocialShareIcons = styled.div `
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: flex-start;

  width: 95%;
  margin: 1em auto 1em auto;
  height: 100px;
`

const SocialWrapper = styled.div `
  display: flex;
  flex-flow: row wrap;
  padding: 1em;
  justify-content: space-around;
`

const SocialIcon = ({url, social}) => (
  <a href={ url }>{ returnIcon(social) }</a> 
)

const SocialShare = ({url, title, size}) => (
    <SocialShareIcons>
          <FacebookShareButton url={ url } quote={ title } style={{textAlign:'center', margin:'1em', cursor: "pointer"}}>
            <FacebookIcon round size={ size }/>
            <FacebookShareCount url={ url }/>
          </FacebookShareButton>
          <TwitterShareButton url={ url } title={ title} style={{textAlign:'center', margin:'1em', cursor: "pointer"}}>
            <TwitterIcon round size={ size }/>
          </TwitterShareButton>
          <LinkedinShareButton url={ url } title={ title } style={{textAlign:'center', margin:'1em', cursor: "pointer"}}>
            <LinkedinIcon round size={ size }/>
            <LinkedinShareCount url={ url }/>
          </LinkedinShareButton>
          <RedditShareButton url={ url } title={ title } style={{textAlign:'center', margin:'1em', cursor: "pointer"}}>
            <RedditIcon round size={ size } />
            <RedditShareCount url={ url }/>
          </RedditShareButton>
    </SocialShareIcons>
)

const Social = ({socials}) =>  (
    <SocialWrapper>
      { socials.map((node,index) => (
        <SocialIcon key={ index } url={ node.url } social={ node.name }/>
      ))}
    </SocialWrapper>
)

SocialIcon.propTypes = {
    url: PropTypes.string,
    social: PropTypes.string
}

SocialShare.propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    size: PropTypes.number
}

let socialNode = PropTypes.shape({
  url: PropTypes.string,
  name: PropTypes.string
})

Social.propTypes = {
  socials: PropTypes.arrayOf(socialNode)
}


export { SocialIcon, SocialShare, Social }

