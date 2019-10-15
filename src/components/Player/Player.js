import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import WaveWidget from './WaveWidget'
import LoaderAudio from './LoaderAudio'
import { fancyTimeFormat } from '../../helpers/time'
import getGlobal from '../../helpers/getGlobal'
import MediaInfo from './MediaInfo'
import Playlist from './Playlist'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react'
import MediaControl from './MediaControl'
import CuePoint from './CuePoint'

const Player = ({ playlist }) => {
  const [shouldRender, setShouldRender] = useState(false)
  const [currentTime, setCurrentTime] = useState(null)

  const runEvents = () => {
    if (!window.wavesurfer) return

    const newTime = fancyTimeFormat(window.wavesurfer.getCurrentTime())
    if(newTime !== currentTime) {
      setCurrentTime(newTime)
    }
  }

  useEffect(() => {
    getGlobal('WaveSurfer').then(() => {
      setShouldRender(true)
      setInterval(runEvents, 400)
    })
  }, [])

  if (!shouldRender) return <div>Loading...</div>

  const wavesurfer = window.wavesurfer
  return (
    <div className="player">
      <div className="player__title">{playlist.song ? playlist.song.mediaInfo.title : 'loading...'}</div>
      <WaveWidget />
      <MediaInfo />
      <MediaControl wavesurfer={wavesurfer} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <CuePoint wavesurfer={wavesurfer} />
        </Grid>
        <Grid item xs={12} md={9}>
          <LoaderAudio wavesurfer={wavesurfer} />
          <Playlist wavesurfer={wavesurfer} />
        </Grid>
      </Grid>
    </div>
  )
}

const enhance = compose(
  inject('playlist'),
  observer,
)

export default enhance(Player)
