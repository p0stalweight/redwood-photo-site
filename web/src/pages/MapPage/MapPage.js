import { Link, routes } from '@redwoodjs/router'
import MainLayout from "src/layouts/MainLayout/MainLayout"
import Map from 'src/components/Map'
import { Box} from '@chakra-ui/core'



const MapPage = () => {

  return (
    <>
    <MainLayout>
      <div style={{ height: '100vh', width: '100%' }}>
        <Map />
      </div>
    </MainLayout>
    </>
  )
}

export default MapPage
