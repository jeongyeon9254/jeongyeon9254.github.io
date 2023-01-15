import React from 'react'

import './index.scss'

export const PostDate = ({ date }) => {
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
  const dates = date.split(' ')
  const year = dates[2]
  const month = monthsList.indexOf(dates[0])
  const day = dates[1].replace(',', '')
  return <p className="post-date">{`${year}년 ${month + 1}월 ${day}일`}</p>
}
