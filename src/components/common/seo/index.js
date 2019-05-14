import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

function SEO({ description, lang, meta, keywords, title, image, type, url }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription = description ||  data.site.siteMetadata.description
        const metaImage = image || data.headshotImage.childImageSharp.fluid.src
        const metaOGType = type || 'website'
        const metaURL = url || data.site.siteMetadata.siteUrl
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            meta={[
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:url`,
                content: metaURL,
              },
              {
                property: `og:title`,
                content: title,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:type`,
                content: metaOGType,
              },
              {
                property: `og:image`,
                content: `${data.site.siteMetadata.siteUrl}${metaImage}`,
              },
              {
                name: `twitter:card`,
                content: `summary`,
              },
              {
                name: `twitter:creator`,
                content: `@SBlakeAdams`,
              },
              {
                name: `twitter:title`,
                content: title,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
              {
                name: `twitter:image`,
                content: `${data.site.siteMetadata.siteUrl}${metaImage}`,
              },
              {
                name: `twitter:site`,
                content: `@SBlakeAdams`,
              }
            ]
              .concat(
                keywords.length > 0
                  ? {
                      name: `keywords`,
                      content: keywords.join(`, `),
                    }
                  : []
              )
              .concat(meta)}
          />
        )
      }}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  image: PropTypes.any,
  type: PropTypes.string,
  url: PropTypes.string
}

export { SEO }

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site{
      ...SiteInformation
    }
    # Get the headshot image.
    headshotImage: file(relativePath: { eq: "thats-me.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`