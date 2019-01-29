import { graphql } from 'gatsby'

export const siteInformationFragment = graphql`
  fragment SiteInformation on Site {
    siteMetadata{
        siteUrl
        description
        author {
            short_bio
            long_bio
        }
        social {
            name
            url
        }
    }
  }
`

export const markdownFieldsFragment = graphql`
  fragment MarkdownFields on MarkdownRemark {
    fields {
        slug
    }
  }
`

export const postFrontmatterFragment = graphql`
  fragment PostFrontmatter on MarkdownRemark {
    frontmatter {
        title
        date
        tags
        description
        featuredImage {
          publicURL
          childImageSharp {
              fluid(maxWidth: 960) {
                  ...GatsbyImageSharpFluid
              }
          }
        }
      }
  }
`

export const postItemFrontMatterFragment = graphql`
  fragment PostItemFrontmatter on MarkdownRemark {
    frontmatter{
        title
        date(formatString: "DD MMMM, YYYY")
        description
        tags
        category
        featuredImage {
            publicURL
            childImageSharp {
                fluid(maxWidth: 300, maxHeight: 300) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
  }
`

export const booknotesFrontMatterFragment = graphql`
  fragment BooknotesFrontmatter on MarkdownRemark {
    frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
        description
        category
        project
        coverImage {
            publicURL
            childImageSharp {
                fluid(maxWidth: 960) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
 }
`

export const booknotesItemFrontMatterFragment = graphql`
  fragment BooknotesItemFrontmatter on MarkdownRemark {
    frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
        description
        category
        coverImage {
            publicURL
            childImageSharp {
                fluid(maxWidth: 200, maxHeight: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
 }
`

export const projectsFrontMatterFragment = graphql`
  fragment ProjectsFrontmatter on MarkdownRemark {
    frontmatter {
        title
        date
        tags
        description
        featuredImage {
          publicURL
          childImageSharp {
              fluid(maxWidth: 960) {
                  ...GatsbyImageSharpFluid
              }
          }
        }
        liveUrl
        sourceUrl
      }
 }
`

export const projectsItemFrontMatterFragment = graphql`
  fragment ProjectsItemFrontmatter on MarkdownRemark {
    frontmatter{
        title
        date(formatString: "DD MMMM, YYYY")
        description
        liveUrl
        sourceUrl
        tags
        featuredImage {
            publicURL
            childImageSharp {
                fluid(maxWidth: 300, maxHeight: 300) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
 }
`