import React from 'react'
import { Link } from 'gatsby'
import { TARGET_CLASS } from '../../utils/visible'

import './index.scss'

export const ThumbnailItem = ({ node }) => {
  return (
    <Link className={`thumbnail ${TARGET_CLASS}`} to={node.fields.slug}>
      <div key={node.fields.slug}>
        {/* <img
          src="/tumb/icon-48x48.png"
          style={{ margin: '0', marginTop: '20px' }}
        /> */}
        <h3>{node.frontmatter.title || node.fields.slug}</h3>
        <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
      </div>
    </Link>
  )
}
