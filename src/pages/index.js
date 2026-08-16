import { graphql } from 'gatsby'
import _ from 'lodash'
import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react'
import { Bio } from '../components/bio'
import { Category } from '../components/category'
import { Contents } from '../components/contents'
import { Head } from '../components/head'
import { CATEGORY_TYPE, HOME_TITLE } from '../constants'
import { useCategory } from '../hooks/useCategory'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useRenderedCount } from '../hooks/useRenderedCount'
import { useScrollEvent } from '../hooks/useScrollEvent'
import { Layout } from '../layout'
import * as Dom from '../utils/dom'
import * as EventManager from '../utils/event-manager'

const BASE_LINE = 80

function getDistance(currentPos) {
  return Dom.getDocumentHeight() - currentPos
}

export default ({ data, location }) => {
  const { siteMetadata } = data.site
  const { countOfInitialPost } = siteMetadata.configs
  const posts = data.allMarkdownRemark.edges
  const categories = useMemo(
    () => _.uniq(posts.map(({ node }) => node.frontmatter.category)),
    []
  )
  // 탭에 붙일 글 개수. All 은 전체 글 수를 그대로 쓴다.
  const countByCategory = useMemo(
    () =>
      posts.reduce(
        (acc, { node }) => {
          const { category } = node.frontmatter
          acc[category] = (acc[category] || 0) + 1
          return acc
        },
        { [CATEGORY_TYPE.ALL]: posts.length }
      ),
    []
  )
  const bioRef = useRef(null)
  const [DEST, setDEST] = useState(316)
  const [count, countRef, increaseCount, resetCount] = useRenderedCount()
  const [category, selectCategory] = useCategory(DEST)

  // 스크롤 핸들러는 마운트 시 한 번만 묶이므로 최신 카테고리를 ref 로 넘긴다.
  const categoryRef = useRef(category)
  useEffect(() => {
    categoryRef.current = category
  }, [category])

  const handleSelectCategory = useCallback(
    nextCategory => {
      resetCount()
      selectCategory(nextCategory)
    },
    [selectCategory]
  )

  useEffect(
    tabRef => {
      setDEST(
        !bioRef.current
          ? 316
          : bioRef.current.getBoundingClientRect().bottom +
              window.pageYOffset +
              24
      )
    },
    [bioRef.current]
  )

  useIntersectionObserver()
  useScrollEvent(() => {
    const currentPos = window.scrollY + window.innerHeight
    const isTriggerPos = () => getDistance(currentPos) < BASE_LINE
    // 전체 글 수가 아니라 지금 보고 있는 카테고리의 글 수와 비교해야
    // 목록을 다 내려받은 뒤에도 계속 카운트가 올라가지 않는다.
    const doesNeedMore = () =>
      (countByCategory[categoryRef.current] || 0) >
      countRef.current * countOfInitialPost

    return EventManager.toFit(increaseCount, {
      dismissCondition: () => !isTriggerPos(),
      triggerCondition: () => isTriggerPos() && doesNeedMore(),
    })()
  })

  return (
    <Layout location={location} title={siteMetadata.title}>
      <Head title={HOME_TITLE} keywords={siteMetadata.keywords} />
      <Bio ref={bioRef} />
      <Category
        categories={categories}
        category={category}
        countByCategory={countByCategory}
        selectCategory={handleSelectCategory}
      />
      <Contents
        posts={posts}
        countOfInitialPost={countOfInitialPost}
        count={count}
        category={category}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        configs {
          countOfInitialPost
        }
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { category: { ne: null }, draft: { eq: false } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 200, truncate: true)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            category
            draft
          }
        }
      }
    }
  }
`
