import { regionToCuePoint } from '../convert'

export default playlist => region => {
  const cuePoint = regionToCuePoint(region)
  playlist.updateCuePoint(cuePoint)
}
