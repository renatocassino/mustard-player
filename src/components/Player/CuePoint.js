import React from 'react'
import PropTypes from 'prop-types'
import { fancyTimeFormat } from '../../helpers/time'
import { Icon } from 'react-fa'
import IconButton from '@material-ui/core/IconButton'
import PlayIcon from '@material-ui/icons/PlayArrowOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import { colorGenerator } from '../../helpers/colorGenerator'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import TextField from '@material-ui/core/TextField'

export const deleteCuePoint = (playlist, cuePoint, wavesurfer) => {
  playlist.removeCuePoint(cuePoint.id)
  const waveCuePoint = wavesurfer.regions.list[cuePoint.id]
  if (waveCuePoint) waveCuePoint.remove()
}

export const addLoop = (player, wavesurfer, playlist) => {
  const currentTime = wavesurfer.getCurrentTime()
  const endTime = currentTime + playlist.song.mediaInfo.loopTime

  wavesurfer.addRegion({
    start: currentTime,
    end: endTime,
    color: colorGenerator(),
    loop: player.loopActive,
    drag: true,
    resize: true
  })
}

export const toggleActive = (player, wavesurfer) => {
  player.toggleActiveLoop()

  if (!wavesurfer.regions) return
  for(let regionId in wavesurfer.regions.list) {
    const region = wavesurfer.regions.list[regionId]
    region.loop = player.loopActive
  }
}

const CuePoint = inject('playlist')(({
  cuePoint,
  wavesurfer,
  playlist,
}) => (
  <Card>
    <CardHeader
      avatar={
        <IconButton aria-label="settings" onClick={() => {
          const seekTo = cuePoint.start / wavesurfer.getDuration()
          wavesurfer.seekTo(seekTo)
        }}>
          <PlayIcon />
        </IconButton>
      }
      title={
        <div>
          <TextField
            type="time"
            readOnly
            label="Start at"
            value={fancyTimeFormat(cuePoint.start || 0)}
          />
          <TextField
            type="time"
            label="Finish at"
            readOnly
            value={fancyTimeFormat(cuePoint.end || 0)}
          />
        </div>
      }
      action={
        <IconButton
          aria-label="Delete"
          onClick={() => deleteCuePoint(playlist, cuePoint, wavesurfer)}
        >
          <DeleteIcon />
        </IconButton>
      }
    />
  </Card>
))

CuePoint.protoTypes = {
  cuePoint: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
    id: PropTypes.integer
  }),
  wavesurfer: PropTypes.object
}

const CuePoints = ({ wavesurfer, player, playlist }) => {
  if (!playlist.song) return <div>Loading...</div>
  return (
    <div className="cue-point">
      <div className="cue-point__control">
        <span>CuePoints</span>
        <IconButton
          tooltip="Active loops"
          onClick={() => toggleActive(player, wavesurfer)}
          style={{ color: player.loopActive ? 'rgba(0, 100, 0, 0.6)' : null, fontSize: '20px' }}
        >
          <Icon name="retweet" />
        </IconButton>

        <IconButton
          tooltip="Add cuepoint"
          onClick={() => addLoop(player, wavesurfer, playlist)}
          style={{fontSize: '20px'}}
        >
          <Icon name="plus" />
        </IconButton>
      </div>
      <div className="cue-point__points-area">
        {playlist.song.cuePoints.map((cuePoint) => (
          <CuePoint
            key={cuePoint.id}
            cuePoint={cuePoint}
            wavesurfer={wavesurfer} />
        ))}
      </div>
    </div>
  )
}

const enhance = compose(
  inject('player'),
  inject('playlist'),
  observer,
)

export default enhance(CuePoints)
