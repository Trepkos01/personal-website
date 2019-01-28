import React from 'react'
import styled from 'styled-components'
import { graphql, StaticQuery } from 'gatsby';

import { Layout, SEO, BooknotesCard } from '../components/common'

const Wrapper = styled.div `
  padding: 2em;
  min-height: 768px;

  display: flex;
  flex-direction: column;
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
                        <BooknotesCard key={ index } booknotes={ node }/>
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
                    ...BooknotesFrontmatter
                    ...MarkdownFields
                }
            }
        }
    }
`