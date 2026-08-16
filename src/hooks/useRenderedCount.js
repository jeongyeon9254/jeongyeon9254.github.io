import { useState, useEffect, useRef } from 'react'
import * as Storage from '../utils/storage'

export function useRenderedCount() {
  const initialCount = Storage.getCount(1)
  const [count, setCount] = useState(initialCount)
  const countRef = useRef(count)
  const increaseCount = () => setCount(prev => prev + 1)
  // 카테고리를 바꾸면 목록이 처음부터 다시 시작하므로,
  // 그동안 쌓아둔 페이지 수도 되돌려 다시 10개부터 보여준다.
  const resetCount = () => setCount(1)

  useEffect(() => {
    countRef.current = count
    Storage.setCount(count)
  }, [count])

  return [count, countRef, increaseCount, resetCount]
}
