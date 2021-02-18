import { compose, withProps } from "recompose"
import { Link, routes } from '@redwoodjs/router'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import MainLayout from "src/layouts/MainLayout/MainLayout"

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBEcBtsbGUb59QLsEhu_f60DLvv9_na7-4&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `800px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
)


const MapPage = () => {
  return (
    <>
    <MainLayout>
      <MyMapComponent isMarkerShown />
    </MainLayout>
    </>
  )
}

export default MapPage
// AIzaSyBEcBtsbGUb59QLsEhu_f60DLvv9_na7-4 API KEY
