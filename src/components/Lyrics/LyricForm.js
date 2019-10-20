import React from 'react'
import BackButton from '@material-ui/icons/ArrowLeft'
import IconButton from '@material-ui/core/IconButton'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react'

const LyricForm = ({
  lyrics
}) => {
  return <div>
    <IconButton onClick={() => lyrics.resetLyric()}>
      <BackButton />
    </IconButton>

    {lyrics.lyric.title}<br />
    {lyrics.lyric.lyric}
  </div>
}

const enhance = compose(
  inject('lyrics'),
  observer,
)

export default enhance(LyricForm)
