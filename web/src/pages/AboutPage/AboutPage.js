import MainLayout from 'src/layouts/MainLayout'
import { Heading } from '@chakra-ui/core'

const AboutPage = () => {
  return (
    <MainLayout>
      <Heading>About Page</Heading>
      <p>built with redwoodjs and chakra-ui</p>
    </MainLayout>
  )
}

export default AboutPage
