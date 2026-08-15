import React, { useEffect } from 'react'

const THREAD_ID = 'disqus_thread'

export const Disqus = ({ post, shortName, siteUrl, slug }) => {
  const url = siteUrl + slug
  const { title } = post.frontmatter

  useEffect(() => {
    window.disqus_config = function() {
      this.page.url = url
      this.page.identifier = title
      this.page.title = title
    }

    const script = document.createElement('script')
    script.src = `https://${shortName}.disqus.com/embed.js`
    script.setAttribute('data-timestamp', String(Date.now()))
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [url, title, shortName])

  return <div id={THREAD_ID} />
}
