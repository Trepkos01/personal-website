import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby';

import { BooknotesCard } from '../../common';

const Wrapper = styled.div `
    background: light blue;
`

const CurrentWrapper = styled.div `
    max-width: 1080px;
    margin: 0 auto;
    padding: 2em;
`

const CurrentAnnouncements = styled.ul `
`

const Announcement = styled.li `
`

const Current = () => (
    <StaticQuery
        query = {currentContentQuery}
        render = {data => 
        <Wrapper>
            <CurrentWrapper>
                <h2>What's new?</h2>
                <CurrentAnnouncements>
                    <Announcement>Nothing, beep boop.</Announcement>
                </CurrentAnnouncements>
                <h2>What I've been reading.</h2>
                <BooknotesCard booknotes={ data.latestBooknotes.edges[0] }/>
            </CurrentWrapper>
        </Wrapper>
    }/>
)

export { Current }

const currentContentQuery = graphql`
    query CurrentContentQuery {
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