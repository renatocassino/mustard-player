import React, { useEffect } from 'react'
import PropType from 'prop-types'
import { inject } from "mobx-react"
import { compose } from 'recompose';
import RaisedButton from 'material-ui/RaisedButton'
import { fancyTimeFormat } from '../../helpers/time'

const loadAudioBuffer = (arrayBuffer) => {
  const AudioContext = window.AudioContext || window.webkitAudioContext
  const context = new AudioContext()

  return new Promise((resolve, reject) => {
    context.decodeAudioData(arrayBuffer, resolve, reject)
  }).then(buffer => {
    try {
      const detect = require('bpm-detective')
      const bpm = detect(buffer)
      const loopTime = 60*8/bpm
      const duration = fancyTimeFormat(buffer.duration)

      return { bpm, loopTime, duration }

    } catch (err) {
      console.error(err)
    }
  })
}

const LoaderAudio = ({
  playlist,
}) => {
  const loaderSong = async ({ arrayBuffer, blob, state={} }, mustLoad=true) => {
    const url = await URL.createObjectURL(blob)
    const songState = await loadAudioBuffer(arrayBuffer)
    const newState = {
      ...songState,
      ...state,
      url,
    }

    if (mustLoad) {
      window.wavesurfer.load(url)
    }

    playlist.addSongToPlaylist({ mediaInfo: newState, cuePoints: [] }, mustLoad)
  }

  const setNewSong = (ev) => {
    const target = ev.target
    if (ev.target.files.length === 0) return

    var fileReader  = new FileReader()
    const blob = ev.target.files[0]

    fileReader.readAsArrayBuffer(blob)
    fileReader.onload = function() {
      const title = target.value.split(/(\\|\/)/g).pop()
      var arrayBuffer = this.result

      loaderSong({ blob, arrayBuffer, state: { title } })
    }
  }

  const setNewSongUsingUrl = async (urlToFetch, title, mustLoad=true) => {
    let response = await fetch(urlToFetch)
    const blob = await response.blob()

    response = await fetch(urlToFetch)
    const arrayBuffer = await response.arrayBuffer()

    loaderSong({ arrayBuffer, blob, state: { title } }, mustLoad)
  }

  useEffect(async () => {
    if (typeof window === 'undefined') return
    const location = window.location
    let baseUrl = `${location.protocol}//${location.host}/`

    if (location.host.match(/github/i)) {
      baseUrl = 'https://raw.githubusercontent.com/tacnoman/rapletter/master/public'
    }

    setNewSongUsingUrl(`${baseUrl}/audios/royce-boom.mp3`, 'Royce Da 5\'9 - Boom.mp3', false)
    setNewSongUsingUrl(`${baseUrl}/audios/Ante-Up-Instrumental.mp3`, 'Ante Up Instrumental.mp3', false)
    setNewSongUsingUrl(`${baseUrl}/audios/DJ-Mitsu-The-Beats-Yeah-Yall.mp3`, 'DJ-Mitsu-The-Beats-Yeah-Yall.mp3', false)
    setNewSongUsingUrl(`${baseUrl}/audios/Pela-manha-Beat-Molla-Dj-Instrumental.mp3`, 'Pela manhã Beat - Molla DJ', true)
  }, [])

  return (
    <div style={{ flexGrow: 1 }}>
      <div>
        <h3>Load your files here</h3>
      </div>
      <RaisedButton
        label="Choose a song"
        labelPosition="before"
        style={{ margin: 12 }}
        containerElement="label"
      >
        <input type="file" id="mediaFile" style={{
          cursor: 'pointer',
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          width: '100%',
          opacity: 0,
        }} onChange={setNewSong}
        accept="audio/*" />
      </RaisedButton>
    </div>
  )
}

const enhance = compose(
  inject('playlist')
)

export default enhance(LoaderAudio)
