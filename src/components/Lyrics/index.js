import React, { useEffect } from 'react'
import { compose } from 'recompose';
import { inject, observer } from 'mobx-react'
import ListLyrics from './ListLyrics'
import { Card } from '@material-ui/core'
import LyricForm from './LyricForm'

const Lyrics = ({
  user,
  lyrics,
}) => {
  useEffect(() => {
    if (typeof window === 'undefined') return
    user.init()

    if (window.location.hash) {
      user.setToken(window.location.hash.replace('#', ''))
    }
  }, []);

  if (lyrics.loading) return <div>Loading....</div>

  return (
    <Card>
      {user.logged
        ? <div>Welcome {user.info.givenName}!</div>
        : <div>You must make login to see lyrics</div>
      }

      {user.logged && (
        <>
          {lyrics.lyric
            ? <LyricForm />
            : <ListLyrics />
          }
        </>
      )}
    </Card>
  )
}

const enhance = compose(
  inject('user'),
  inject('lyrics'),
  observer,
)

export default enhance(Lyrics)
