import React, { useEffect, useState } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import debounce from 'lodash/debounce'
import { getWordsToRhyme } from './api'

const debounceGet = debounce((currentWord, setListOfWords) => {
  getWordsToRhyme(currentWord).then(list => {
    setListOfWords(list)
  })
}, 500)

const ListOfWords = ({
  word
}) => {
  const [listOfWords, setListOfWords] = useState([])

  useEffect(() => {
    if (word === '') {
      setListOfWords([])
    }

    debounceGet(word, setListOfWords)
  }, [word])

  return (
    <div>
      List
      <List dense>
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
