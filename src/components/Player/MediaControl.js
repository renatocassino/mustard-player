import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Slider from 'material-ui/Slider'
import { lifecycle, compose } from 'recompose'
import { inject, observer } from 'mobx-react'
import { addLoop, toggleActive, deleteCuePoint } from './CuePoint'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

const volumes = [
  {value: 0, icon: VolumeOffIcon},
  {value: 0.5, icon: VolumeDownIcon},
  {value: 1, icon: VolumeUpIcon}
]

const MediaControl = ({
  wavesurfer = {},
  player,
}) => {
  const { isPlaying } = player
  const [volume, setVolume] = useState(2);
  const VolumeIcon = volumes[volume].icon

  const handleVolume = () => {
    const newIdxVolume = volume+1 >= volumes.length ? 0 : volume+1
    const newVolume = volumes[newIdxVolume]
    window.wavesurfer.setVolume(newVolume.value)
    setVolume(newIdxVolume)
  }

  return (
    <React.Fragment>
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button onClick={() => wavesurfer.playPause()}>
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </Button>
        <Button onClick={() => wavesurfer.stop()}>
          <StopIcon />
        </Button>
        <Button onClick={handleVolume}>
          <VolumeIcon />
        </Button>
      </ButtonGroup>

      <Slider
        min={1} max={200}
        onChange={(ev, value) => {
          var zoomLevel = Number(value)
          wavesurfer.zoom(zoomLevel)
        }}
      />
    </React.Fragment>
  )
}

const enhance = compose(
  inject('player'),
  inject('playlist'),
  lifecycle({
    componentDidMount() {
      if(typeof window === 'undefined') return

      document.addEventListener('keydown', (ev) => {
        if (ev.target.tagName !== 'BODY') return
        const KEY_1 = 49
        const KEY_A = 65
        const KEY_D = 68
        const KEY_L = 76
        const KEY_N = 78
        const KEY_P = 80
        const KEY_RIGHT = 39
        const KEY_LEFT = 37
        const KEY_SPACE = 32
        const KEY_ENTER = 13

        if(ev.which >= KEY_1 && ev.which <= KEY_1+8) {
          const codeKey = ev.which - KEY_1
          const { cuePoints } = this.props.playlist.song

          if(codeKey >= cuePoints.length) return
          const cuePoint = cuePoints[codeKey]

          if(ev.shiftKey) {
            deleteCuePoint(this.props.playlist, cuePoint, this.props.wavesurfer)
            return
          }

          const seekTo = cuePoint.start / this.props.wavesurfer.getDuration()
          this.props.wavesurfer.seekTo(seekTo)
          return
        }

        if(ev.which === KEY_L) {
          toggleActive(this.props.player, this.props.wavesurfer)
          return
        }

        if(ev.which === KEY_N) {
          addLoop(this.props.player, this.props.wavesurfer, this.props.playlist)
          return
        }

        if(ev.which === KEY_SPACE || ev.which === KEY_P) {
          ev.preventDefault()
          this.props.wavesurfer.playPause()
        }

        if(ev.which === KEY_LEFT || ev.which === KEY_A) {
          this.props.wavesurfer.skip(-5)
        }

        if(ev.which === KEY_RIGHT || ev.which === KEY_D) {
          this.props.wavesurfer.skip(5)
        }

        if(ev.which === KEY_ENTER) {
          this.props.wavesurfer.stop()
        }
      })
    }
  }),
  observer,
)

export default enhance(MediaControl)
