import { compose, withProps } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps"
import { routes, navigate } from '@redwoodjs/router'



const MapWithMarker = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.MAP_KEY}&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `75%`, width: '100%' }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
      <GoogleMap
      defaultZoom={7}
      defaultCenter={{ lat: 47, lng: -120 }}
      >
      </GoogleMap>
);

const AdminMap = (props) => {


  return (
    <div>
      <div style={{ height: '100vh', width: '100%' }}>
        <MapWithMarker/>
      </div>
    </div>
  )
}

export default AdminMap

