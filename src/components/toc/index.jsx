import React, { useEffect, useState } from 'react'

import * as EventManager from '../../utils/event-manager'

import './index.scss'

// h4 이하는 본문 안의 잔가지라 목차에 올리면 오히려 흐름이 안 보인다.
const HEADING_SELECTOR = 'h1, h2, h3'

// 화면 위에서 이만큼 내려온 지점을 "지금 읽고 있는 줄"로 본다.
const ACTIVE_LINE_OFFSET = 120

// 클릭으로 이동했을 때 헤딩이 화면 맨 위에 딱 붙지 않도록 띄워둔다.
const SCROLL_MARGIN = 24

// 마크다운이 만들어낸 실제 DOM에서 헤딩을 읽는다.
// id 는 gatsby-remark-autolink-headers 가 붙여준 값을 그대로 쓴다.
// 슬러그 규칙을 여기서 다시 구현하면 언젠가 어긋난다.
function readHeadings() {
  const container = document.querySelector('.post-content')

  if (!container) {
    return []
  }

  return Array.from(container.querySelectorAll(HEADING_SELECTOR))
    .filter(node => node.id && node.textContent.trim())
    .map(node => ({
      id: node.id,
      text: node.textContent.trim(),
      depth: Number(node.tagName.charAt(1)),
    }))
}

// 글마다 시작하는 헤딩 레벨이 다르다. 가장 높은 레벨을 1단으로 잡아야
// h2 부터 시작하는 글도 첫 항목이 들여쓰이지 않는다.
function withLevel(headings) {
  if (!headings.length) {
    return headings
  }

  const topDepth = Math.min(...headings.map(heading => heading.depth))

  return headings.map(heading => ({
    ...heading,
    level: Math.min(heading.depth - topDepth + 1, 3),
  }))
}

export const Toc = ({ html }) => {
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    setHeadings(withLevel(readHeadings()))
  }, [html])

  useEffect(() => {
    if (!headings.length) {
      return
    }

    const updateActive = () => {
      // 마지막 절이 짧으면 끝까지 내려도 기준선을 넘지 못한다.
      // 문서 끝에 닿았으면 마지막 항목을 켜준다.
      const reachedBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2

      if (reachedBottom) {
        setActiveId(headings[headings.length - 1].id)
        return
      }

      const passed = headings.filter(heading => {
        const node = document.getElementById(heading.id)
        return node && node.getBoundingClientRect().top <= ACTIVE_LINE_OFFSET
      })

      setActiveId(passed.length ? passed[passed.length - 1].id : headings[0].id)
    }

    const onScroll = EventManager.toFit(updateActive, {})

    updateActive()
    window.addEventListener(`scroll`, onScroll, { passive: true })
    window.addEventListener(`resize`, onScroll, { passive: true })

    return () => {
      window.removeEventListener(`scroll`, onScroll)
      window.removeEventListener(`resize`, onScroll)
    }
  }, [headings])

  // 항목이 하나뿐이면 목차가 알려주는 게 없다.
  if (headings.length < 2) {
    return null
  }

  const handleClick = (event, id) => {
    const target = document.getElementById(id)

    if (!target) {
      return
    }

    event.preventDefault()
    // blog-post 에서 a[href*="#"] 전체에 SmoothScroll 이 걸려 있다.
    // document 까지 올라가면 같은 스크롤이 두 번 돈다.
    event.stopPropagation()

    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - SCROLL_MARGIN,
      behavior: `smooth`,
    })

    setActiveId(id)
  }

  return (
    <nav className="toc" aria-label="목차">
      <p className="toc-title">목차</p>
      <ul className="toc-list">
        {headings.map(heading => (
          <li key={heading.id} className="toc-item" data-level={heading.level}>
            <a
              href={`#${heading.id}`}
              aria-current={heading.id === activeId}
              onClick={event => handleClick(event, heading.id)}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
