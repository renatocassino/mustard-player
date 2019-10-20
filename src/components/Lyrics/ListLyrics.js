import React, { useEffect } from 'react'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react'

const ListLyrics = ({
  lyrics,
  user,
}) => {
  useEffect(() => {
    lyrics.loadLyrics()
  }, [])

  if (!lyrics.list) {
    return <div>Loading....</div>
  }

  return (
    <div>
      {lyrics.list.map(lyric => (
        <div>{lyric.title}</div>
      ))}
    </div>
  )
}

const enhance = compose(
  inject('lyrics'),
  inject('user'),
  observer,
)

export default enhance(ListLyrics)
