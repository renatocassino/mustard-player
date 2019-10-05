import React, { useState } from 'react'
import ListOfWords from './ListOfWords'
import TextField from '@material-ui/core/TextField'

const AutoCompleteRhyme = () => {
  const [word, setWord] = useState('')

  return (
    <div>
      <TextField
          id="standard-name"
          label="Word to rhyme"
          className={''}
          value={word}
          onChange={(e) => setWord(e.target.value)}
          margin="normal"
        />

        <ListOfWords word={word} />
    </div>
  )
}

export default AutoCompleteRhyme
