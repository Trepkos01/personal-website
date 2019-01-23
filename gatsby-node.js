const path = require('path')

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
                }
              }
            }
          }
        }
      `).then(result => {
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.slug,
            component: returnPath(node.frontmatter.type),
            context: {
              slug: node.fields.slug,
            },
          })
        })
        resolve()
      })
    })
  }