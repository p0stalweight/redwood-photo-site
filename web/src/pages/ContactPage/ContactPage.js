import MainLayout from 'src/layouts/MainLayout'
import { Heading, Box } from '@chakra-ui/core'

const ContactPage = () => {
  return (
    <MainLayout>
      <Box width="250px" mt="80px" mx="auto" textAlign="center">
        <Heading>Contact Page</Heading>
        <p>built with redwoodjs and chakra-ui</p>
      </Box>
    </MainLayout>
  )
}

export default ContactPage
