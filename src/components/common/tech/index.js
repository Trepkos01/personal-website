import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { PostgreSQLIcon, RubyIcon, RailsIcon, AngularIcon, ReactIcon, NodeIcon } from '../svg'

const returnTechIcon = (name) => ({
    "postgresql" : <PostgreSQLIcon key="postgresql" style={{width:'50px', height:'50px'}}/>,
    "ruby" : <RubyIcon key="ruby" style={{width:'50px', height:'50px'}}/>,
    "rails" : <RailsIcon key="rails" style={{width:'50px', height:'50px'}}/>,
    "angular" : <AngularIcon key="angular" style={{width:'50px', height:'50px'}}/>,
    "react" : <ReactIcon key="react" style={{width:'50px', height:'50px'}}/>,
    "node" : <NodeIcon key="node" style={{width:'50px', height:'50px'}}/>
})[name]

const ProjectTechWrapper = styled.div `
    display: flex;
    flex-flow: row wrap;
    justify-content: center;

    margin: 1em;
`

const Tech = ({ tech }) => {
    return (
    <ProjectTechWrapper>
        { tech.map((node) => (returnTechIcon(node))) }
    </ProjectTechWrapper>
)}

export { Tech }

Tech.propTypes = {
    tech: PropTypes.arrayOf(PropTypes.string)
}


