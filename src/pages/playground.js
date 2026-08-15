import React from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../layout'
import { Head } from '../components/head'
import { Game2048 } from '../components/game-2048'

export default ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <Head
        title="Playground"
        description="쉬어가는 페이지. 2048 한 판 하고 가세요."
        keywords={[`2048`, `game`, `playground`]}
      />
      <Game2048 />
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
