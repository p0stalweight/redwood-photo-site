import {
  Container,
  Box,
  Button,
  Image,
  Heading,
  Flex,
  useDisclosure,
  Link,
} from '@chakra-ui/core'
import { routes, navigate } from '@redwoodjs/router'
import GalleriesEditCell from 'src/components/GalleriesEditCell'

const ManageGalleriesPage = () => {
  const toUpload = () => {
    navigate(routes.galleryUpload())
  }
  return (
    <>
      <Container padding ="10" backgroundColor='#79BDBD' color="white">
        <h1 style ={{ textAlign: 'center', fontSize: '40px' }}>Manage Galleries</h1>
      </Container>
      <Container maxW="xl">
        <Box padding ="4">
         <Button onClick={ toUpload }>Add a new gallery</Button>
        </Box>
        <Box padding ="4">
          <p>Edit an existing gallery:</p>
        </Box>
        <GalleriesEditCell />
      </Container>
    </>
  )
}

export default ManageGalleriesPage
