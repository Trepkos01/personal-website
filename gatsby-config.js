module.exports = {
  siteMetadata: {
    title: `Blake Adams`,
    description: `Blake Adams is a software developer and technical consultant.`,
    author: `Blake Adams`,
    canonicalUrl: 'https://www.blakeadams.io'
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Blake Adams`,
        short_name: `blakeadams.io`,
        start_url: `/`,
        background_color: `#ADFCF9`,
        theme_color: `#016FB9`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
