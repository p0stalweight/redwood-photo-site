import { Link, routes } from '@redwoodjs/router'
import MainLayout from "src/layouts/MainLayout/MainLayout"
import Map from 'src/components/Map'
import MapCell from 'src/components/MapCell'
import { Box } from '@chakra-ui/core'



const MapPage = () => {

  return (
    <>
    <MainLayout>
        <MapCell />
    </MainLayout>
    </>
  )
}

export default MapPage
