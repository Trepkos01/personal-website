import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'gatsby'

const _ = require("lodash")

const CategoriesWrapper = styled.div `
    display: flex;
    flex-direction: column;
`

const CategoryLink = styled(Link)`
`

const Categories = ({ categories }) => {
    let categoryLinks = []
    _.each(categories.edges, edge => {
        if(_.get(edge, "node.frontmatter.category")){
            categoryLinks.push(edge.node.frontmatter.category)
          }
    })
    categoryLinks = _.uniq(categoryLinks)



return (
    <CategoriesWrapper style={ { display: (categoryLinks.length > 0) ? 'flex' : 'none' } }>
        <h3>Categories</h3>
        { categoryLinks.map((node, index) => (
                <CategoryLink key={ index } to={ `/category/${_.kebabCase(node)}/` }>{ _.upperFirst(node) }</CategoryLink>
        ))}
    </CategoriesWrapper>
)}

export { Categories }

let categoryNode = {
    node: PropTypes.shape({
        frontmatter: PropTypes.shape({
            category: PropTypes.string,
        })
    })
}

Categories.proptypes = {
    categories: PropTypes.shape({
        edges: PropTypes.arrayOf(categoryNode)
    })
}

