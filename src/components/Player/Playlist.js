import React from 'react'
import PropTypes from 'prop-types'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react'
import DeleteIcon from '@material-ui/icons/Delete';

const Playlist = ({ wavesurfer, playlist }) => {
  const deleteSong = (songId) => {
    const url = playlist.songs[playlist.currentSong].mediaInfo.url
    URL.revokeObjectURL(url)
    // dispatch(deleteSongToPlaylist(songId))
  }

  return (
    <List>
      <Subheader>Playlist</Subheader>
      {playlist.songs.map((song, idx) => {
        return (
          <ListItem key={idx}
            disabled={idx === playlist.currentSong}
            onClick={() => {
              wavesurfer.load(song.mediaInfo.url)
              playlist.currentSong = idx
            }}
            style={{ backgroundColor: idx !== playlist.currentSong ? '#FAFAFA' : '#DCEDC8' }}
            primaryText={song.mediaInfo.title}
            rightIcon={
              <a onClick={(ev) => { ev.stopPropagation(); deleteSong(idx) }}>
                <DeleteIcon />
              </a>
            }
          />
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
