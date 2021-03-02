import { compose, withProps } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
} from "react-google-maps"
import { routes, navigate } from '@redwoodjs/router'
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel"



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
        <MarkerWithLabel
          key={props.id}
          opacity={1}
          labelAnchor={new google.maps.Point(0, 0)}
          labelStyle={{backgroundColor: "white", fontSize: "16px", padding: "5px"}}
          position={{lat: parseFloat(props.latitude), lng: parseFloat(props.longitude)}}
          onClick={() =>{ navigate(routes.gallery({ id: props.id })) }}
          >
            <div>
              {props.name}
            </div>
          </MarkerWithLabel>
      ))}
      </GoogleMap>
);

const Map = (props) => {


  return (
    <div>
      <div style={{ height: '100vh', width: '100%', padding: "20px" }}>
        <GalleryLocationMap galleries={props.galleries}/>
      </div>
    </div>
  )
}

export default Map
