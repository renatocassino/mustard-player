import React from 'react'
import BackButton from '@material-ui/icons/ArrowLeft'
import IconButton from '@material-ui/core/IconButton'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button'

const LyricForm = ({
  lyrics,
}) => {
  return <div>
    <IconButton onClick={() => lyrics.resetLyric()}>
      <BackButton />
    </IconButton>

    <div>
      <FormControl>
        <InputLabel htmlFor="my-input">Title</InputLabel>
        <Input onChange={ev => lyrics.setTitle(ev.target.value)} id="my-input" aria-describedby="title" value={lyrics.lyric.title} />
        <FormHelperText id="title">Title of your lyric.</FormHelperText>
      </FormControl>
    </div>

    <div>
      <FormControl>
        <InputLabel htmlFor="lyric-input">Lyric</InputLabel>
        <Input onChange={ev => lyrics.setLyric(ev.target.value)} id="lyric-input" multiline aria-describedby="lyric" value={lyrics.lyric.lyric} />
        <FormHelperText id="lyric">Write your lyric here</FormHelperText>
      </FormControl>
    </div>

    <Button onClick={() => lyrics.saveLyric()}>Save lyric</Button>
  </div>
}

const enhance = compose(
  inject('lyrics'),
  observer,
)

export default enhance(LyricForm)
