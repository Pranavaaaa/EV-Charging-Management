import 'leaflet/dist/leaflet.css'
import * as L from 'leaflet'

// Fix marker icon issues
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('../../node_modules/leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('../../node_modules/leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('../../node_modules/leaflet/dist/images/marker-shadow.png', import.meta.url).href
})

export { L }