import React, { useEffect, useState } from 'react'
import { compose } from 'recompose';
import { inject, observer } from 'mobx-react';
import ListLyrics from './ListLyrics'
import { Card } from '@material-ui/core';

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

  return (
    <Card>
      {user.logged
        ? <div>Welcome {user.info.givenName}!</div>
        : <a href="http://api.mustardplayer.io/auth"><img src="/btn_google_signin_dark_pressed_web@2x.png" alt="login" /></a>
      }

      {user.logged && (
        <>
          {lyrics.lyric
            ? <div>Letra selecionada</div>
            : <ListLyrics />
          }
        </>
      )}

      {user.logged && <div>
        <button onClick={() => user.logout()}>Logout</button>
      </div>}
    </Card>
  )
}

const enhance = compose(
  inject('user'),
  inject('lyrics'),
  observer,
)

export default enhance(Lyrics)
