import React, { useEffect, useState } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const ListOfWords = ({
  loading,
  word,
  words = [],
}) => {
  if (loading) return <div>Loading....</div>

  return (
    <div>
      <List dense style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {word === '' && (
          <ListItem>
            <ListItemText
              primary={'Digite uma palavra para buscar rimas'}
            />
          </ListItem>
        )}
        {words && word !== '' && words.length === 0 && (
          <ListItem>
            <ListItemText
              primary={'Nenhuma palavra encontrada'}
            />
          </ListItem>
        )}
        {words && word !== '' && words.map(currentWord => (
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
