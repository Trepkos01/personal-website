import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const AvatarWrapper = styled.div `
    padding:1em;
    flex: 0 0 300px;
`

const AvatarImage = () => (
  <StaticQuery
    query={avatarImageQuery}
    render={data =>
        <AvatarWrapper>
            <Img fluid={data.avatarImage.childImageSharp.fluid} />
        </AvatarWrapper>
    }
  />
)

const Avatar = () => (
    <AvatarImage/>
)


export default Avatar

const avatarImageQuery = graphql`
    query AvatarImageQuery {
        avatarImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
            childImageSharp {
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid
              }
            }
          }
    }`
