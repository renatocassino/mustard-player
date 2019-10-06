import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import uuidv4 from 'uuid/v4'
import {
  play,
  stop,
  ready,
  regionCreated,
  regionUpdated,
  pause,
} from './events'
import { compose } from 'recompose'
import { inject } from 'mobx-react'

const id = uuidv4()

const wavesurferSettings = {
  container: '#waveform',
  waveColor: 'violet',
  progressColor: 'purple',
  splitChannels: true,
  height: 64,
  barWidth: 0
}

const WaveWidget = ({ player, playlist }) => {
  useEffect(() => {
    const wavesurfer = window.WaveSurfer.create(wavesurferSettings)

    wavesurfer.on('play', play(player))
    wavesurfer.on('pause', pause(player))
    wavesurfer.on('stop', stop(player))
    wavesurfer.on('ready', ready({ player, playlist }))
    wavesurfer.on('region-created', regionCreated(playlist))
    wavesurfer.on('region-update-end', regionUpdated(playlist))

    window.wavesurfer = wavesurfer
  }, [])

  return (
    <div className="player__wave" id="waveform" />
  )
}

const enhance = compose(
  inject('player'),
  inject('playlist')
)

export default enhance(WaveWidget)
