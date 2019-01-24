import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql, Link } from 'gatsby';
import Img from "gatsby-image";

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
    padding: 1em;
    border: 1px solid lightgray;
    margin: 1em;

    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;

    @media (min-width:768px) {
        justify-content: flex-start;
    }
`

const BookCover = styled.div `
    flex: 0 0 200px;
    box-shadow: 2px 2px #ccc;
    overflow:hidden;
    height: 100%
`

const BooknotesDetails = styled.div `
    padding: 1em;

    flex: 1 0 100%;
    display: flex;
    flex-direction: column;

    @media (min-width:768px) {
        flex: 0 0 50%;
    }
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
                <BooknoteWrapper>
                    <BookCover>
                        <Img fluid={ data.latestBooknotes.edges[0].node.frontmatter.coverImage.childImageSharp.fluid }/>
                    </BookCover>
                    <BooknotesDetails>
                        <p><strong>{ data.latestBooknotes.edges[0].node.frontmatter.title }</strong></p>
                        <p><small>{ data.latestBooknotes.edges[0].node.frontmatter.date }</small></p>
                        <p>{ data.latestBooknotes.edges[0].node.frontmatter.description }</p>
                        <p><Link to={ data.latestBooknotes.edges[0].node.fields.slug }>Read My Notes</Link></p>
                    </BooknotesDetails>
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
                        coverImage {
                            publicURL
                            childImageSharp {
                                fluid(maxWidth: 200, maxHeight: 200) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                    fields {
                        slug
                    }
                }
            }
        }
    }
`