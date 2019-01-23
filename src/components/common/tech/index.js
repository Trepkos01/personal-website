import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { PostgreSQL, Ruby, Rails } from '../svg'

const returnTechIcon = (name) => ({
    "ruby" : <Ruby key="ruby" style={{width:'50px', height:'50px'}}/>,
    "rails" : <Rails key="rails" style={{width:'50px', height:'50px'}}/>,
    "postgresql" : <PostgreSQL key="postgresql" style={{width:'50px', height:'50px'}}/>,
})[name]

const ProjectTechWrapper = styled.div `
    display: flex;
    flex-flow: row wrap;
    justify-content: center;

    margin: 1em;
`

const Tech = ({ tech }) => (
    <ProjectTechWrapper>
        { tech.map((node) => (returnTechIcon(node))) }
    </ProjectTechWrapper>
)

export { Tech }

Tech.propTypes = {
    tech: PropTypes.arrayOf(PropTypes.string)
}


