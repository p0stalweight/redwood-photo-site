import { compose, withProps } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps"
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel"


const MapComp = compose(
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
      defaultZoom={9}
      defaultCenter={{ lat: 11, lng: 12 }}
      >

      </GoogleMap>
);

const Map = () => {

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapComp/>
    </div>
  )
}

export default Map

//  API KEY
