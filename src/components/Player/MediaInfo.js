import React from 'react'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react'
import { fancyTimeFormat } from '../../helpers/time'

const MediaInfo = ({
  playlist
}) => {
  if (playlist.currentSong === null) return <div>Loading...{playlist.currentSong}</div>

  const {
    bpm,
    duration,
    loopTime,
    currentTime,
  } = playlist.song.mediaInfo || {}

  return (
    <div className="player__media-info">
      <div className="player__media-info--line">
        <div className="player__media-info--currentTime">{currentTime}</div>
        <div className="player__media-info--duration">{duration}</div>
      </div>
      <div className="player__media-info--line">
        <div className="player__media-info--bpm">BPM: {bpm} | LoopTime: {fancyTimeFormat(loopTime)}</div>
      </div>
    </div>
  )
}

const enhance = compose(
  inject('playlist'),
  observer,
)

export default enhance(MediaInfo)
