import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Resume } from '../components/resume'

export default ({ data }) => (
  <React.Fragment>
    <Helmet>
      <html lang="ko" />
      <title>정연재 · Frontend Engineer</title>
      {/* 이력서에서만 쓰는 폰트라 이 페이지에서만 불러온다. */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
      />
    </Helmet>
    <Resume photo={data.photo} />
  </React.Fragment>
)

export const pageQuery = graphql`
  query {
    photo: file(name: { eq: "임시이력서용이미지" }) {
      childImageSharp {
        gatsbyImageData(
          width: 260
          aspectRatio: 0.7647
          layout: CONSTRAINED
          transformOptions: { fit: COVER, cropFocus: CENTER }
        )
      }
    }
  }
`
