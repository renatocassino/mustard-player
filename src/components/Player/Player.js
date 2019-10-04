import React, { useEffect, useState } from 'react'
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
      <CuePoint wavesurfer={wavesurfer} />
      <LoaderAudio wavesurfer={wavesurfer} />
      <Playlist wavesurfer={wavesurfer} />
    </div>
  )
}

const enhance = compose(
  inject('playlist'),
  observer,
)

export default enhance(Player)
