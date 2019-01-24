module.exports = {
  siteMetadata: {
    siteUrl: "localhost:8000",
    title: `Blake Adams`,
    description: `Blake Adams is a writer, software developer, technical consultant, and financial independence enthusiast living in Oxford, MS.`,
    author: {
      name: `Blake Adams`,
      short_bio: `Hey, I'm <strong>Blake Adams</strong> and this is my personal web space where I share my work, my thoughts, my feels, and anything else that you might find useful on your visit here. I'm a software developer and computer scientist by training but I have interests that fall all over the map as you'll probably discover. I'm available for contract software development work and technical consulting.`
    },
    canonical_url: 'https://www.blakeadams.io',
    social: [
      {
        name: "Facebook",
        url: "http://www.facebook.com/blakeadamsio"
      },
      {
        name: "Twitter",
        url: "https://twitter.com/SBlakeAdams"
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/stephen-adams-2a899ba5/"
      },
      {
        name: "YouTube",
        url: "https://www.youtube.com/channel/UCPYOHE5lSkKs9N5eA6hDlfw"
      },
      {
        name: "GitHub",
        url: "https://github.com/Trepkos01"
      },
      {
        name: "Medium",
        url: "https://medium.com/@sbadams662"
      },
      {
        name: "Keybase",
        url: "https://keybase.io/sbadams"
      }
    ]
  },
  plugins: [
    `gatsby-plugin-react-svg`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      }
    },
    {
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/content/posts`,
				name: 'posts',
			},
    },
    {
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/content/projects`,
				name: 'projects',
			},
    },
    {
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/content/booknotes`,
				name: 'booknotes',
			},
		},
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        excerpt_separator: '<!-- end -->',
				plugins: [
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 1080,
							linkImagesToOriginal: true,
						},
					},
					{
						resolve: 'gatsby-remark-responsive-iframe',
						options: {
							wrapperStyle: 'margin-bottom: 1.0725rem',
						},
					},
          'gatsby-remark-prismjs',
          'gatsby-remark-smartypants',
          'gatsby-remark-copy-linked-files'
        ]
      }
    },
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
