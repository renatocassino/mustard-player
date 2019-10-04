import { cuePointToRegion } from '../convert'

export default ({ player, playlist }) => () => {
  if (!playlist.song) return

  const wavesurfer = window.wavesurfer
  wavesurfer.clearRegions()
  const cuePoints = playlist.song.cuePoints

  for(let i = 0; i < cuePoints.length; i++) {
    const cuePoint = cuePoints[i]

    const region = {
      ...cuePointToRegion(cuePoint),
      loop: player.loopActive,
      drag: true,
      resize: true,
      attributes: {
        ignoreEvents: true
      }
    }

    wavesurfer.addRegion(region)
  }

  wavesurfer.play()
}
