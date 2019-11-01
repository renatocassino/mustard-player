import React, { useEffect, useState } from 'react'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react'
import { List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core'
import PlusOne from '@material-ui/icons/AddCircleOutline'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ListLyrics = ({
  lyrics,
}) => {
  useEffect(() => {
    lyrics.loadLyrics()
  }, [])

  const [open, setOpen] = useState(false)
  const [lyricId, setLyricId] = useState(null)

  if (!lyrics.list) {
    return <div>Loading....</div>
  }

  return (
    <div>
      <IconButton onClick={() => lyrics.newLyric()}>
        <PlusOne />
      </IconButton>
      <List>
        {lyrics.list.map(lyric => (
          <ListItem
            button
            onClick={() => lyrics.setLyricById(lyric.id)}
            key={lyric.id}
          >
            <ListItemText primary={lyric.title} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => { setOpen(true); setLyricId(lyric.id); }}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Delete lyric?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure want delete this lyric? You cannot recover this one.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {
            lyrics.delete(lyricId)
            setOpen(false)
          }} color="primary">
            Yes, delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const enhance = compose(
  inject('lyrics'),
  observer,
)

export default enhance(ListLyrics)
