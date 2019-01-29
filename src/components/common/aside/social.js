import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


import { SocialIcon } from "../../common"

const SocialWrapper = styled.div `
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
`

const Social = ({ social }) => (
    <SocialWrapper style={ { display: (social.length > 0) ? 'flex' : 'none' } }>
        { social.map((node) => ( <SocialIcon url={ node.url } key={ node.name } social={ node.name }/>)) }
    </SocialWrapper>
)

export { Social }

Social.propTypes = {
    social: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string,
            name: PropTypes.string
        })
    )
}


