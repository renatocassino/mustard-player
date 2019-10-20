import React, { useEffect, useState } from 'react'
import { compose } from 'recompose';
import { inject, observer } from 'mobx-react';
import ListLyrics from './ListLyrics'

const Lyrics = ({
  user
}) => {
  useEffect(() => {
    if (typeof window === 'undefined') return
    user.init()

    if (window.location.hash) {
      user.setToken(window.location.hash.replace('#', ''))
    }
  }, []);

  return (
    <div>
      {user.logged
        ? <div>Welcome {user.info.givenName}!</div>
        : <a href="http://api.mustardplayer.io/auth"><img src="/btn_google_signin_dark_pressed_web@2x.png" alt="login" /></a>
      }

      {user.logged && (
        <ListLyrics />
      )}

      {user.logged && <div>
        <button onClick={() => user.logout()}>Logout</button>
      </div>}
    </div>
  )
}

const enhance = compose(
  inject('user'),
  observer,
)

export default enhance(Lyrics)
