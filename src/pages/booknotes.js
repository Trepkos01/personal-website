import React from 'react'
import styled from 'styled-components'
import { graphql, StaticQuery, Link } from 'gatsby';
import Img from "gatsby-image";

import { Layout, SEO } from '../components/common'

const Wrapper = styled.div `
  padding: 2em;
  min-height: 768px;

  display: flex;
  flex-direction: column;
`

const BooknotesCard = styled.div `
    flex: 1 100%;
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

const BooknotesPage = () => (
    <Layout hideAside={ false }>
        <SEO title="Booknotes" keywords={[`blake adams`, `software`, `software developer`, `technology`, `financial independence`, `entrepreneur`, `career`, `consultancy`, `booknotes`]} />
        <StaticQuery
            query={booknotesContentQuery}
            render={data => 
                <Wrapper>
                    <h1>Booknotes</h1>
                    { data.booknotes.edges.map((node, index) => (
                        <BooknotesCard>
                            <BookCover>
                                <Img fluid={ node.node.frontmatter.coverImage.childImageSharp.fluid }/>
                            </BookCover>
                            <BooknotesDetails>
                                <p><strong>{ node.node.frontmatter.title }</strong></p>
                                <p><small>{ node.node.frontmatter.date }</small></p>
                                <p>{ node.node.frontmatter.description }</p>
                                <p><Link to={ node.node.fields.slug }>Read More</Link></p>
                            </BooknotesDetails>
                        </BooknotesCard>
                    ))}
                </Wrapper>
        }/>
    </Layout>

)

export default BooknotesPage

const booknotesContentQuery = graphql`
    query BooknotesContentQuery {
        booknotes: allMarkdownRemark(
        filter: { fileAbsolutePath: {regex : "\/booknotes/"}},
        sort: {fields: [frontmatter___date], order: DESC})
        {
            edges {
                node {
                    id
                    excerpt(pruneLength: 180)
                    frontmatter {
                        title
                        date(formatString: "DD MMMM, YYYY")
                        description
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