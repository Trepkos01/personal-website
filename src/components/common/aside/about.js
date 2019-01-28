import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const AboutWrapper = styled.div `
`

const About = ({ bio }) => (
    <AboutWrapper>
        <h3>About</h3>
        { bio }
    </AboutWrapper>
)

export { About }

About.propTypes = {
    bio: PropTypes.string
}