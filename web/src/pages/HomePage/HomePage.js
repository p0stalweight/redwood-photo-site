import MainLayout from 'src/layouts/MainLayout'
import { Heading } from '@chakra-ui/core'

const HomePage = () => {
  return (
    <MainLayout>
      <Heading>Galleries</Heading>
      <p>built with redwoodjs and chakra-ui</p>
    </MainLayout>
  )
}

export default HomePage
