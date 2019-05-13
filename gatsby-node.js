const path = require('path')
const _ = require("lodash")

const postTemplate = path.resolve(`./src/templates/post.js`)
const projectTemplate = path.resolve(`./src/templates/project.js`)
const booknoteTemplate = path.resolve(`./src/templates/booknote.js`)

const ignoreBlogNumber = new RegExp("[0-9]+~(.+)")

const returnPath = (name) => ({
  "post": postTemplate,
  "project": projectTemplate,
  "booknote": booknoteTemplate,
})[name]

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `MarkdownRemark`) {
      const fileNode = getNode(node.parent)
      const fileNodeTitle = fileNode.name.match(ignoreBlogNumber)[1]
      createNodeField({
        node,
        name: `slug`,
        value: fileNodeTitle,
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
                  category
                  project
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
              tags: node.frontmatter.tags,
              project: node.frontmatter.project
            },
          })
        })

        let tags = []
        let categories = []
        
        _.each(markdownPages, edge => {
          if(_.get(edge, "node.frontmatter.tags")){
            tags = tags.concat(edge.node.frontmatter.tags)
          }

          if(_.get(edge, "node.frontmatter.category")){
            categories.push(edge.node.frontmatter.category)
          }

        })

        tags = _.uniq(tags)
        categories = _.uniq(categories)

        tags.forEach(tag => {
          createPage({
            path: `/tags/${_.kebabCase(tag)}/`,
            component: path.resolve(`./src/templates/tag.js`),
            context: {
              tag
            },
          })
        })
        
        categories.forEach(category => {
          createPage({
            path: `/category/${_.kebabCase(category)}/`,
            component: path.resolve(`./src/templates/category.js`),
            context: {
              category
            },
          })
        })

        resolve()
      })
    })
  }