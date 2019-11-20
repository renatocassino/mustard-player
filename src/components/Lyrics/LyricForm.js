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
import { gql } from 'apollo-boost';

const CREATE_LYRIC = gql`
mutation($title: String, $lyric: String) {
  createLyric(title: $title, lyric: $lyric) {
    id
    title
    lyric
  }
}
`

const UPDATE_LYRIC = gql`
mutation($title: String, $lyric: String, $id: String) {
  updateLyric(title: $title, lyric: $lyric, id: $id) {
    id
    title
    lyric
  }
}
`

const LyricForm = ({
  lyrics,
  client,
}) => {
  const saveLyric = () => {
    const mutation = lyrics.lyric.id ? UPDATE_LYRIC : CREATE_LYRIC
    client.mutate({
      mutation,
      variables: { ... lyrics.lyric },
      context: {
        headers: {
          authorization: `Bearer ${localStorage.token}`
        }
      }
    }).then(({ data }) => {
      if (lyrics.lyric.id) {
        lyrics.updateLyric(data.updateLyric)
      } else {
        lyrics.addLyric(data.createLyric)
      }
      
      lyrics.resetLyric()
    });
  }

  return <div>
    <IconButton onClick={() => lyrics.resetLyric()}>
      <BackButton />
    </IconButton>

    <div>
      <FormControl fullWidth>
        <InputLabel htmlFor="my-input">Title</InputLabel>
        <Input fullWidth onChange={ev => lyrics.setTitle(ev.target.value)} id="my-input" aria-describedby="title" value={lyrics.lyric.title} />
        <FormHelperText id="title">Title of your lyric.</FormHelperText>
      </FormControl>
    </div>

    <div>
      <FormControl fullWidth>
        <InputLabel htmlFor="lyric-input">Lyric</InputLabel>
        <Input rows={5} fullWidth onChange={ev => lyrics.setLyricText(ev.target.value)} id="lyric-input" multiline aria-describedby="lyric" value={lyrics.lyric.lyric} />
        <FormHelperText id="lyric">Write your lyric here</FormHelperText>
      </FormControl>
    </div>

    <Button variant="contained" color="primary" onClick={() => saveLyric()}>Save lyric</Button>
  </div>
}

const enhance = compose(
  inject('lyrics'),
  observer,
)

export default enhance(LyricForm)
