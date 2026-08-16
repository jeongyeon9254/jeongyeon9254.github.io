import { useEffect, useState, useCallback } from 'react'
import qs from 'query-string'
import { CATEGORY_TYPE } from '../constants'
import * as ScrollManager from '../utils/scroll'

let DEST_POS

export function useCategory(DEST) {
  const [category, setCategory] = useState(CATEGORY_TYPE.ALL)
  DEST_POS = DEST
  // 뒤로가기(popstate)로 카테고리가 바뀔 때만 쓴다.
  // 목록보다 아래에 있었다면 목록 시작점까지만 끌어올린다.
  const adjustScroll = () => {
    if (window.scrollY > DEST_POS) {
      ScrollManager.go(DEST_POS)
    }
  }
  const selectCategory = useCallback(category => {
    // 탭을 눌러도 스크롤은 건드리지 않는다. 보고 있던 위치를 그대로 둔다.
    setCategory(category)
    window.history.pushState(
      { category },
      '',
      `${window.location.pathname}?${qs.stringify({ category })}`
    )
  }, [])
  const changeCategory = useCallback((withScroll = true) => {
    const { category } = qs.parse(location.search)
    const target = category == null ? CATEGORY_TYPE.ALL : category

    setCategory(target)
    if (withScroll) {
      adjustScroll()
    }
  }, [])

  useEffect(() => {
    ScrollManager.init()
    return () => {
      ScrollManager.destroy()
    }
  }, [])

  useEffect(() => {
    window.addEventListener('popstate', changeCategory)

    return () => {
      window.removeEventListener('popstate', changeCategory)
    }
  }, [])

  useEffect(() => {
    changeCategory(false)
  }, [])

  return [category, selectCategory]
}
