import React, { useEffect, useState } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import debounce from 'lodash/debounce'
import { getWordsToRhyme } from '../../api/rhyme'

import { useQuery } from '@apollo/react-hooks';
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

const debounceGet = debounce((currentWord, setListOfWords) => {
  getWordsToRhyme(currentWord).then(list => {
    setListOfWords(list)
  })
}, 500)

const ListOfWords = ({
  word
}) => {
  let listOfWords = []
  const { loading, error, data } = useQuery(RHYMES_WORDS, { variables: { word } })
  if (loading) return <div>Loading...</div>

  if (error) {
    console.log(error)
    listOfWords = []
  } else {
    listOfWords = data.getRhymes.data.words || []
  }

  return (
    <div>
      <List dense style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {listOfWords && listOfWords.length === 0 && (
          <ListItem>
            <ListItemText
              primary={'Nenhuma palavra encontrada'}
            />
          </ListItem>
        )}
        {listOfWords && listOfWords.map(currentWord => (
          <ListItem>
            <ListItemText
              primary={currentWord}
            />
          </ListItem>
        ))}
      </List>

    </div>
  )
}

export default ListOfWords
