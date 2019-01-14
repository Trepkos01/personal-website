import React from 'react'

import Layout from '../components/global/layout'
import Image from '../components/global/image'
import SEO from '../components/global/seo'

import About from '../components/home/about'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`blake adams`, `software`, `software developer`, `technology`, `financial independence`, `entrepreneur`, `career`, `consultancy`, `blog`]} />
    <About/>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
  </Layout>
)

export default IndexPage
