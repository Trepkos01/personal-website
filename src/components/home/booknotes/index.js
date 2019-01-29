import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby';

import { BooknotesCard } from '../../common';

const Wrapper = styled.div `
    max-width: 1080px;
    margin: auto;
    padding: 2em;
`

const Booknotes = () => (
    <StaticQuery
        query = {booknotesContentQuery}
        render = {data => 
        <Wrapper>
            <h1>What I've been reading.</h1>
            <BooknotesCard booknotes={ data.latestBooknotes.edges[0] } color={ "white" }/>
        </Wrapper>
    }/>
)

export { Booknotes }

const booknotesContentQuery = graphql`
    query ContentQuery {
        latestBooknotes: allMarkdownRemark(
        filter: { fileAbsolutePath: {regex : "\/booknotes/"}},
        sort: {fields: [frontmatter___date], order: DESC},
        limit: 1)
        {
            edges {
                node {
                    id
                    excerpt(pruneLength: 180)
                    ...BooknotesItemFrontmatter
                    ...MarkdownFields
                }
            }
        }
    }
`