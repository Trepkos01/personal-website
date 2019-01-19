import React from 'react'
import styled from 'styled-components'
import { StaticQuery } from 'gatsby';

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

const BooknoteWrapper = styled.div `
`





const Current = () => (
    <StaticQuery
        query = {currentContentQuery}
        render = {data => 
        <Wrapper>
            <CurrentWrapper>
                <h1>What's new?</h1>
                <CurrentAnnouncements>
                    <Announcement>Nothing, beep boop.</Announcement>
                </CurrentAnnouncements>
                <BooknoteWrapper>
                    <h2>What I've been reading.</h2>
                    <strong>{ data.latestBooknotes.edges[0].node.frontmatter.title }</strong>
                    <p><small>{ data.latestBooknotes.edges[0].node.frontmatter.date }</small></p>
                    <p>{ data.latestBooknotes.edges[0].node.excerpt }</p>
                    <p><a href="#">Read My Notes</a></p>
                </BooknoteWrapper>
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
                    frontmatter {
                        title
                        date(formatString: "DD MMMM, YYYY")
                    }
                }
            }
        }
    }
`