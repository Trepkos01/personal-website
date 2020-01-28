require('dotenv').config()

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.blakeadams.io",
    title: `Blake Adams`,
    description: `Blake Adams is a writer, software developer, technical consultant, and financial independence enthusiast living in Oxford, MS.`,
    author: {
      name: `Blake Adams`,
      short_bio: `Hey, I'm <strong>Blake Adams</strong> and this is my personal web space where I share my work, my thoughts, my feels, and anything else that you might find useful on your visit here. I'm a software developer and computer scientist by training but I have interests that fall all over the map as you'll probably discover. I'm available for contract software development work and technical consulting.`,
      long_bio: `<p>I am a professional <strong>software developer</strong> formally educated and trained at the University of Mississippi with a <strong>B.S in Computer and Information Science</strong> and a <strong>M.S. in Engineering Science with an emphasis in Computer and Information Science</strong>. The primary research focus of my graduate academic career concerned the study of <strong>Heterogeneous Computing Systems</strong> and the optimization of different algorithms and applications through the usage of such systems.</p> 
      <p>I have professional experience in the production of an <strong>Android</strong> mobile application and an <strong>AngularJS</strong> online application. Currently, I am employed with the University of Mississippi and tasked with the sole design and development of a completely customizable and <strong>scalable online EAS (Electronic Assessment System)</strong> for the University of Mississippi based on the <strong>LAMP (Linux Apache MySQL PHP) stack</strong> utilizing <strong>HTML5/CSS3/Javascript (and the jQuery library)</strong> for front-end functionality and <strong>Python (with Selenium)</strong> for Unit Tests and Integration Tests.</p> 
      <p>I am available for <strong>remote-based freelance software engineering projects, contractual work, and software/technology-related consultation.</strong></p>`
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
      /*{
        name: "YouTube",
        url: "https://www.youtube.com/channel/UCPYOHE5lSkKs9N5eA6hDlfw"
      },*/
      {
        name: "GitHub",
        url: "https://github.com/Trepkos01"
      },
      {
        name: "Medium",
        url: "https://medium.com/@sbadams662"
      },
      /*{
        name: "Keybase",
        url: "https://keybase.io/sbadams"
      }*/
    ],
    socialShare: [
      {
        name: "Facebook",
        accessToken: process.env.FACEBOOK_ACCESS_TOKEN
      },
      {
        name: "Twitter",
        accessToken: ""
      },
      {
        name: "LinkedIn",
        accessToken: ""
      },
      {
        name: "Reddit",
        accessToken: ""
      }
    ]
  },
  plugins: [
    `gatsby-plugin-feed`,
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
    {
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/content/recentworks`,
				name: 'recentworks',
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
              showCaptions: true,
              wrapperStyle: `box-shadow: 6px 9px 20px 0px #0000003d; 
                             border: 1px solid lightgray;
                             margin-top: 25px;
                             margin-bottom: 25px;`
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
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_API,
        head: true,
        aanonymize: true
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
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      }
    }
  ],
}
