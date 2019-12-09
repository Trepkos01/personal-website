import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby';

import { RecentWorkListing } from './recentworklisting'

const ServicesWrapper = styled.div `
  max-width: 1080px;
  margin: 0 auto;
  margin-top: 2em;
  padding: 1em;
`

const RecentWork = styled.div `
  display: flex;
  flex-direction: column;
`

const Services = () => (
  <StaticQuery
      query={servicesContentQuery}
      render={data => 
        <ServicesWrapper>
          <h1>Contract and Consultancy Work</h1>
          <p>
            Contract and consultancy work allows me an opportunity to explore and exercise my technical skills and knowledge in the arena of business for the purpose of solving a problem that someone else has.
          </p>
          <p>
            But the technical aspect is only one component of resolving a business's problem, other areas such as marketing, SEO, and traffic generation are just as (if not more) important in ensuring the success of a business.  
          </p>
          <p>
            You can see how the challenges presented when exploring these problems can be very interesting. So if you need a technical expert in your corner for your project or business or if you would like some direction on a problem then my services are available.
          </p>
          <p>
            With that said, I won't fluff the complication of the problem or exaggerate the work involved for the purposes of accumulating more billable hours or quoting a larger project cost. If your situation can easily resolved using some WYSIWYG online service or a collection of WordPress plugins then I will be very transparent in communicating that direction to you.
          </p>
          <p>
            However, if you still rather have someone handle that aspect of your business process regardless of the technical aptitude required, I'm available. If your problem requires a much more complicated and/or customized solution then even better!  
          </p>
          <p>
            If your problem necessitates a great deal of research and work within uncharted waters, I generally bill on an hourly basis. If I already have a solution that can satisfy your requirements available, I simply bill on an per-project contractual basis. If you need copy and media on your website, I can create or gather copy and media from sources provided by you. If I'm not able to accomplish some specific task for your project then I can definitely find someone who can.
          </p>
          <h2>Here is some of my recent work.</h2>
          <RecentWork>
          { data.recentworks.edges.map((node, index) => (
            <RecentWorkListing key={ index } recentwork={ node } color={ "#ffffff" }/>
          ))}
          </RecentWork>
        </ServicesWrapper>
    }/>
)

export { Services }

const servicesContentQuery = graphql`
query ServicesContentQuery {
  recentworks: allMarkdownRemark(
    filter: { fileAbsolutePath: {regex : "\/content/recentworks/" } }
  ) {
    edges {
      node {
        frontmatter {
          title
          date
          liveUrl
          featuredImage {
            publicURL
            childImageSharp {
                fluid(maxWidth: 400, maxHeight: 400) {
                    ...GatsbyImageSharpFluid
                }
            }
          }
          description
          projectSlug
        }
      }
    }
  }
}`
