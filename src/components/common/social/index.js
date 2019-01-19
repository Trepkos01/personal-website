import React from 'react'
import PropTypes from 'prop-types'
import { FaFacebook, FaTwitterSquare, FaLinkedin, FaYoutube, FaMedium, FaKeybase, FaGithub } from "react-icons/fa";

const returnIcon = (name) => ({
    "Facebook": <FaFacebook size='2em'/>,
    "Twitter": <FaTwitterSquare size='2em'/>,
    "LinkedIn": <FaLinkedin size='2em'/>,
    "YouTube": <FaYoutube size='2em'/>,
    "Medium": <FaMedium size='2em'/>,
    "Keybase": <FaKeybase size='2em'/>,
    "GitHub": <FaGithub size='2em'/>
})[name]

const SocialIcon = ({url, social}) => (
    <a href={ url }>{ returnIcon(social) }</a> 
)

SocialIcon.propTypes = {
    url: PropTypes.string,
    social: PropTypes.string
}

export { SocialIcon }

