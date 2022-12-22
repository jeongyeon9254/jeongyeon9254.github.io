import React from 'react'
import { Link } from 'gatsby'
import { TARGET_CLASS } from '../../utils/visible'

import './index.scss'

export const ThumbnailItem = ({ node }) => {
  const monthsList = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const date = node.frontmatter.date.split(' ')
  const year = date[2]
  const month = monthsList.indexOf(date[0])
  const day = date[1].replace(',', '')

  return (
    <Link className={`thumbnail ${TARGET_CLASS}`} to={node.fields.slug}>
      <div key={node.fields.slug}>
        {/* <img
          src="/tumb/icon-48x48.png"
          style={{ margin: '0', marginTop: '20px' }}
        /> */}
        <h3>{node.frontmatter.title || node.fields.slug}</h3>
        <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
        <p>{`${year}년 ${month}월 ${day}일`}</p>
      </div>
    </Link>
  )
}
