import {
  Container,
  Box,
  Image,
  Heading,
  Flex,
  useDisclosure,
  Link,
} from '@chakra-ui/core'
import { routes } from '@redwoodjs/router'
import GalleriesCell from 'src/components/GalleriesCell'

const ManageGalleriesPage = () => {
  return (
    <>
      <h1 style ={{ textAlign: 'center', fontSize: '40px' }}>Manage Galleries</h1>

      <Container maxW="xl">
        <p>
          Make a new gallery: <br/>
          <Link to={routes.galleryUpload()}>Gallery Upload</Link>
        </p>
        <p>Choose an existing gallery:</p>
        <GalleriesCell />
      </Container>

    </>
  )
}

export default ManageGalleriesPage
