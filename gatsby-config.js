module.exports = {
  siteMetadata: {
    siteUrl: "https://blakeadams.io",
    title: `Blake Adams`,
    description: `Blake Adams is a writer, software developer, technical consultant, and financial independence enthusiast living in Oxford, MS.`,
    author: {
      name: `Blake Adams`,
      short_bio: `Hey, I'm <strong>Blake Adams</strong> and this is my personal web space where I share my work, my thoughts, my feels, and anything else that you might find useful on your visit here. I'm a software developer and computer scientist by training but I have interests that fall all over the map as you'll probably discover. I'm available for contract software development work and technical consulting.`,
      long_bio: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sagittis quis mi eu vulputate. Aenean ac arcu imperdiet, posuere est ut, euismod magna. Proin scelerisque purus justo, ut ullamcorper risus mollis non. Ut mattis ultricies risus ac commodo. Curabitur tristique ligula eget fringilla tristique. Nullam dapibus sollicitudin lacus. Donec ultricies tempor hendrerit. Morbi et dapibus ligula, ut mattis metus. Sed ornare dignissim nunc, non iaculis ante vulputate non. Suspendisse ac diam vel nisi sollicitudin dignissim nec quis elit. Nunc mollis finibus enim et imperdiet.</p>

      <p>Etiam eleifend magna non purus ultricies, id pretium odio tristique. In at vulputate nibh. Sed varius, nisl in accumsan finibus, sapien lacus convallis tellus, eleifend rutrum diam nunc vel sapien. Morbi tempus consequat elementum. Pellentesque pulvinar leo sed nisl molestie efficitur. Mauris metus enim, blandit vel urna id, elementum mollis nunc. Nunc id lacus lobortis, posuere mauris ut, ullamcorper sem. Duis libero tortor, hendrerit non pharetra at, viverra in quam.</p>
      
      <p>Morbi dictum scelerisque pharetra. In suscipit odio tempus arcu dapibus, eget faucibus nisl placerat. Phasellus quis sem imperdiet, suscipit justo vitae, gravida ipsum. Nunc id vestibulum tortor. Donec feugiat ante imperdiet eros pharetra mollis. Mauris dignissim leo quis nunc elementum pellentesque. Sed quis felis eros. Maecenas dapibus est ut diam viverra porttitor. Cras maximus, purus quis finibus ornare, nunc metus fringilla est, a consequat neque magna quis risus. Nunc nisl orci, aliquet at tortor eu, commodo suscipit mi. Nulla consectetur lobortis lectus ut ultrices. Vivamus pretium tempor nisl, et placerat purus ultricies non. Sed quis ornare nisi. Maecenas hendrerit ligula eu ligula aliquam, vitae luctus ex iaculis. Praesent fermentum sollicitudin fringilla. Aenean quam justo, luctus vitae pellentesque vel, volutpat vestibulum quam.</p>
      
      <p>Integer at augue non magna lacinia pharetra. Aenean vel lorem dictum diam placerat varius non vel tortor. Proin nec nisl cursus, tincidunt urna consequat, pellentesque leo. Quisque rhoncus dui at dapibus tincidunt. Morbi mollis, purus a fringilla accumsan, eros quam scelerisque nisl, id pretium mi turpis nec justo. Maecenas placerat sem metus, et aliquam est mattis eget. Donec viverra interdum fermentum. Donec vulputate mi ac ligula tempor facilisis. Nunc nisl sem, pretium eget ligula non, porttitor faucibus nisl. Cras quis mattis quam, vel pharetra velit. Nam consectetur gravida tempor. Curabitur ut suscipit dui. Nullam vel pulvinar velit. Integer eu velit eget nisl venenatis pulvinar ac quis massa. Integer nunc nisi, laoreet ut laoreet ac, posuere vitae arcu.</p>
      
      <p>Curabitur ac risus nulla. Ut sagittis elementum metus. Nulla eu euismod orci. Phasellus quis elit quis odio varius elementum a at risus. Pellentesque nunc ipsum, congue sit amet mollis eu, vestibulum eu diam. Nunc nec lectus metus. Curabitur bibendum ligula est, vehicula fringilla justo ullamcorper vitae. Pellentesque enim neque, suscipit sed ante sed, egestas imperdiet dui.</p>`
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
