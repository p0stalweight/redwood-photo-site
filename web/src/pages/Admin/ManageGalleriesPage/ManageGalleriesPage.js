import {
  Container,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  useDisclosure,
  SimpleGrid,
} from '@chakra-ui/core'
import { routes, navigate } from '@redwoodjs/router'
import GalleriesEditCell from 'src/components/GalleriesEditCell'

const ManageGalleriesPage = () => {
  const toUpload = () => {
    navigate(routes.galleryUpload())
  }
  return (
    <>
      <Container maxW= "xl" padding ="10" backgroundColor='#79BDBD' color="white" fonts="Arial">
        <h1 style ={{ textAlign: 'center', fontFamily: "-moz-initial", fontSize: '60px' }}>Manage Galleries</h1>
      </Container>

      <Container maxW="xl">
        <SimpleGrid columns={[1, 2, 3]} spacing={10} mt={8}>
          <Button onClick={ toUpload }><p style= {{ fontSize: '25px' }}>Add a new gallery</p></Button>
          <div></div>
          <p style= {{ fontSize: '25px', fontStyle: 'oblique' }}>Select a gallery to modify it</p>
        </SimpleGrid>
        <GalleriesEditCell />
      </Container>

    </>
  )
}

export default ManageGalleriesPage
