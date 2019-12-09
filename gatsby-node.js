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
        posts: allMarkdownRemark(
          filter: { fileAbsolutePath: {regex : "\/content/posts/" } }
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
                series
              }
            }
          }
        }
        projects: allMarkdownRemark(
          filter: { fileAbsolutePath: {regex : "\/content/projects/" } }
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
                series
              }
            }
          }
        }
        booknotes: allMarkdownRemark(
          filter: { fileAbsolutePath: {regex : "\/content/booknotes/" } }
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
                series
              }
            }
          }
        }
      }
      `).then(result => {
        if(result.error){
            return Promise.reject(result.error)
        }

        const markdownPages = result.data.posts.edges.concat(result.data.projects.edges.concat(result.data.booknotes.edges))

        markdownPages.forEach(({ node }) => {
          createPage({
            path: node.fields.slug,
            component: returnPath(node.frontmatter.type),
            context: {
              slug: node.fields.slug,
              tags: node.frontmatter.tags,
              project: node.frontmatter.project,
              series: node.frontmatter.series
            },
          })
        })

        let tags = []
        let categories = []
        let series = []
        
        _.each(markdownPages, edge => {
          if(_.get(edge, "node.frontmatter.tags")){
            tags = tags.concat(edge.node.frontmatter.tags)
          }

          if(_.get(edge, "node.frontmatter.category")){
            categories.push(edge.node.frontmatter.category)
          }

          if(_.get(edge, "node.frontmatter.series")){
            series.push(edge.node.frontmatter.series)
          }

        })

        tags = _.uniq(tags)
        categories = _.uniq(categories)
        series = _.uniq(series)

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

        series.forEach(series => {
          createPage({
            path: `/series/${_.kebabCase(series)}/`,
            component: path.resolve(`./src/templates/series.js`),
            context: {
              series
            },
          })
        })

        resolve()
      })
    })
  }