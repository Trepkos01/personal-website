import React from 'react'

import { Layout, SEO } from '../components/common'
import { Intro, Current, Blog, Projects } from '../components/home'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`blake adams`, `software`, `software developer`, `technology`, `financial independence`, `entrepreneur`, `career`, `consultancy`, `blog`]} />
    <Intro/>
    <Current/>
    <Blog/>
    <Projects/>
  </Layout>
)

export default IndexPage
