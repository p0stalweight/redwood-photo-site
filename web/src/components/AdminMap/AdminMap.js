import {
  compose,
  withProps,
  withStateHandlers,
} from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps'
import { routes, navigate } from '@redwoodjs/router'


const MapWithMarker = compose(
  withStateHandlers(() => ({
    isMarkerShown: false,
    markerPosition: null
  }), {
    onMapClick: ({ isMarkerShown }) => (e) => ({
        markerPosition: e.latLng,
        isMarkerShown: true,
    })
  }),
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
      onClick={props.onMapClick,  e => props.checkMarkPoint(e)}
      >
      {props.isMarkerShown && <Marker position={props.markerPosition} />}
      </GoogleMap>
);

const AdminMap = (props) => {
  const onPlaceMarker = (data) => {
    //console.log(`latitude: ${data.latLng.lat()}`)
    //console.log(`longitude: ${data.latLng.lng()}`)
    props.mapSelected({lat: data.latLng.lat(), lng: data.latLng.lng()})
  }


  return (
    <div>
      <div style={{ height: '100vh', width: '100%' }}>
        <MapWithMarker checkMarkPoint={onPlaceMarker}/>
      </div>
    </div>
  )
}

export default AdminMap

