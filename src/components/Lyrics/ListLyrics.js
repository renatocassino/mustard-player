import React, { useEffect } from 'react'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react'
import { List, ListItem } from '@material-ui/core'

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
      <List>
        {lyrics.list.map(lyric => (
          <ListItem
            key={lyric.id}
          >
            {lyric.title}
          </ListItem>
        ))}
      </List>
    </div>
  )
}

const enhance = compose(
  inject('lyrics'),
  inject('user'),
  observer,
)

export default enhance(ListLyrics)
