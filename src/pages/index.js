import React from 'react'

import Layout from '../components/global/layout'
import SEO from '../components/global/seo'

import Intro from '../components/home/intro/intro'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`blake adams`, `software`, `software developer`, `technology`, `financial independence`, `entrepreneur`, `career`, `consultancy`, `blog`]} />
    <Intro/>
    
  </Layout>
)

export default IndexPage
