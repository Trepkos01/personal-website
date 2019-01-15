import React from 'react'

import { Layout, SEO } from '../components/common'
import { Intro, Blog } from '../components/home'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`blake adams`, `software`, `software developer`, `technology`, `financial independence`, `entrepreneur`, `career`, `consultancy`, `blog`]} />
    <Intro/>
    <Blog/>
  </Layout>
)

export default IndexPage
