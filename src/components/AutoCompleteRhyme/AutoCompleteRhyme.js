import React, { useState } from 'react'
import ListOfWords from './ListOfWords'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'

const AutoCompleteRhyme = () => {
  const [word, setWord] = useState('')

  return (
    <Card>
      <TextField
          id="standard-name"
          label="Word to rhyme"
          className={''}
          value={word}
          onChange={(e) => setWord(e.target.value)}
          margin="normal"
        />

        <ListOfWords word={word} />
    </Card>
  )
}

export default AutoCompleteRhyme
