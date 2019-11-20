import React, { useState } from 'react'
import ListOfWords from './ListOfWords'
import { getWordsToRhyme } from '../../api/rhyme'
import TextField from '@material-ui/core/TextField'
import debounce from 'lodash/debounce'
import Card from '@material-ui/core/Card'
import { ApolloConsumer } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const RHYMES_WORDS = gql`
query($word: String) {
  getRhymes(word: $word) {
    links {
      last
      previous
      next
    }
    data {
      language
      words
    }
  }
}
`

const debounceGet = debounce(({
  currentWord, setListOfWords, setLoading, client,
}) => {
  if (currentWord === '') return

  client.query({
    query: RHYMES_WORDS,
    variables: { word: currentWord }
  }).then(({ data, loading }) => {
    setLoading(loading)
    setListOfWords(data.getRhymes.data.words || [])
  });


}, 500)

const AutoCompleteRhyme = () => {
  const [word, setWord] = useState('')
  const [listOfWords, setListOfWords] = useState([])
  const [loading, setLoading] = useState(false)

  return (
    <ApolloConsumer>
      {client => (
        <Card>
          <TextField
              id="standard-name"
              label="Word to rhyme"
              className={''}
              value={word}
              onChange={(e) => {
                setWord(e.target.value)
                debounceGet({
                  currentWord: e.target.value,
                  setListOfWords,
                  client,
                  setLoading,
                })
              }}
              margin="normal"
            />

            <ListOfWords loading={loading} word={word} words={listOfWords} />
        </Card>
      )}
    </ApolloConsumer>
  )
}

export default AutoCompleteRhyme
