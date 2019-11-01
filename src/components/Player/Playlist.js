import React from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Subheader from 'material-ui/Subheader'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react'
import DeleteIcon from '@material-ui/icons/Delete';

const Playlist = ({ wavesurfer, playlist }) => {
  const deleteSong = (songId) => {
    const url = playlist.songs[playlist.currentSong].mediaInfo.url
    URL.revokeObjectURL(url)
    playlist.deleteSong(songId)
  }

  return (
    <List>
      <Subheader>Playlist</Subheader>
      {playlist.songs.map((song, idx) => {
        return (
          <ListItem button key={idx}
            disabled={idx === playlist.currentSong}
            onClick={() => {
              wavesurfer.load(song.mediaInfo.url)
              playlist.currentSong = idx
            }}
            style={{ backgroundColor: idx !== playlist.currentSong ? '#FAFAFA' : '#DCEDC8' }}
          >
            <ListItemText primary={song.mediaInfo.title} />
            {idx !== playlist.currentSong && (
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteSong(idx)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        )
      })}
    </List>
  )
}

const enhance = compose(
  inject(['playlist']),
  observer,
)

export default enhance(Playlist)
