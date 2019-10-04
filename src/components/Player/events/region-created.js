import { regionToCuePoint } from '../convert'

export default playlist => (region) => {
  if(region.attributes.ignoreEvents) return
  playlist.addCuePoint(regionToCuePoint(region))
}
