import React, { forwardRef } from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import './index.scss'

export const Bio = forwardRef((props, ref) => {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social, introduction } = data.site.siteMetadata

        return (
          <div ref={ref} className="bio">
            <div className="author">
              <div className="author-description">
                <GatsbyImage
                  className="author-image"
                  image={getImage(data.avatar)}
                  alt={author}
                  style={{
                    borderRadius: `100%`,
                  }}
                  imgStyle={{
                    borderRadius: `100%`,
                  }}
                />
                <div className="author-name">
                  <span className="author-name-prefix">Written by</span>
                  <Link to={'/playground'} className="author-name-content">
                    <span>@{author}</span>
                  </Link>
                  <div className="author-introduction">{introduction}</div>
                  <p className="author-socials">
                    <Link to={'/about'}>Resume</Link>
                    {social.instagram && (
                      <a href={`https://www.instagram.com/${social.instagram}`}>
                        Instagram
                      </a>
                    )}
                    {social.github && (
                      <a href={`https://github.com/${social.github}`}>GitHub</a>
                    )}
                    {social.medium && (
                      <a href={`https://medium.com/${social.medium}`}>Medium</a>
                    )}
                    {social.twitter && (
                      <a href={`https://twitter.com/${social.twitter}`}>
                        Twitter
                      </a>
                    )}
                    {social.facebook && (
                      <a href={`https://www.facebook.com/${social.facebook}`}>
                        Facebook
                      </a>
                    )}
                    {social.linkedin && (
                      <a
                        href={`https://www.linkedin.com/in/${social.linkedin}/`}
                      >
                        LinkedIn
                      </a>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      }}
    />
  )
})

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile.png/" }) {
      childImageSharp {
        gatsbyImageData(width: 72, height: 72, layout: FIXED)
      }
    }
    site {
      siteMetadata {
        author
        introduction
        social {
          twitter
          github
          medium
          facebook
          linkedin
          instagram
        }
      }
    }
  }
`

export default Bio
