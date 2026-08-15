import React from 'react'

export const PostContainer = ({ html }) => (
  <div className="post-content" dangerouslySetInnerHTML={{ __html: html }} />
)
