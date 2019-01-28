import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'gatsby'

const _ = require("lodash")

const TagsWrapper = styled.div `
    display: flex;
    flex-direction: column;
`

const TagLink = styled(Link)`
`

const Tags = ({ tags }) => {

return (
    <TagsWrapper style={ { display: (tags.length > 0) ? 'flex' : 'none' } }>
        <h3>Tags</h3>
        { tags.map((node, index) => (
                <TagLink key={ index } to={ `/tags/${_.kebabCase(node)}/` }>{ _.upperFirst(node) }</TagLink>
        ))}
    </TagsWrapper>
)}

export { Tags }

Tags.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string)
}