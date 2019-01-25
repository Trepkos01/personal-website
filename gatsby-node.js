const path = require('path')
const _ = require("lodash")

const postTemplate = path.resolve(`./src/templates/post.js`)
const projectTemplate = path.resolve(`./src/templates/project.js`)
const booknoteTemplate = path.resolve(`./src/templates/booknote.js`)

const returnPath = (name) => ({
  "post": postTemplate,
  "project": projectTemplate,
  "booknote": booknoteTemplate,
})[name]

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `MarkdownRemark`) {
      const fileNode = getNode(node.parent)
      createNodeField({
        node,
        name: `slug`,
        value: fileNode.name,
      })
    }
  }

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
    return new Promise((resolve, reject) => {
      graphql(`
        {
          allMarkdownRemark(
            filter: { fileAbsolutePath: {regex : "\/content/" } }
          ) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  type
                  tags
                }
              }
            }
          }
        }
      `).then(result => {
        if(result.error){
            return Promise.reject(result.error)
        }

        const markdownPages = result.data.allMarkdownRemark.edges

        markdownPages.forEach(({ node }) => {
          createPage({
            path: node.fields.slug,
            component: returnPath(node.frontmatter.type),
            context: {
              slug: node.fields.slug,
              tags: node.frontmatter.tags
            },
          })
        })

        let tags = []
        
        _.each(markdownPages, edge => {
          if(_.get(edge, "node.frontmatter.tags")){
            tags = tags.concat(edge.node.frontmatter.tags)
          }
        })

        tags = _.uniq(tags)

        tags.forEach(tag => {
          createPage({
            path: `/tags/${_.kebabCase(tag)}/`,
            component: path.resolve(`./src/templates/tag.js`),
            context: {
              tag
            },
          })
        })

        resolve()
      })
    })
  }