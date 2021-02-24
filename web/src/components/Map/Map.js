import { compose, withProps } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps"
import { routes, navigate } from '@redwoodjs/router'



const GalleryLocationMap = compose(
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
      {props.galleries.map((props) => (
        <Marker
          key={props.id}
          position={{lat: parseFloat(props.latitude), lng: parseFloat(props.longitude)}}
          onClick={() =>{ navigate(routes.gallery({ id: props.id })) }}
          />
      ))}


      </GoogleMap>
);

const Map = (props) => {


  return (
    <div>
      <div style={{ height: '100vh', width: '100%' }}>
        <GalleryLocationMap galleries={props.galleries}/>
      </div>
    </div>
  )
}

export default Map
