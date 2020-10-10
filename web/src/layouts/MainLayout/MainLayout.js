import {
  Container,
  Box,
  Image,
  Heading,
  Flex,
  useDisclosure,
  Link,
} from '@chakra-ui/core'
import { Link as RWLink, routes } from '@redwoodjs/router'
import logo from './tree_tmp.jpg'

const MainLayout = ({ children }) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Container maxW="xl">
      <Flex padding="1.5rem" as="header">
        <Image boxSize={100} mr="1rem" src={logo} alt="Tree logo" />

        <Heading as="h1" alignSelf={{ md: 'center' }}>
          Frank Postlewaite Photography
        </Heading>

        <Box display={{ md: 'none' }} ml="auto" onClick={onToggle}>
          <svg
            width="12px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </Box>
      </Flex>
      <Box
        as="nav"
        display={{ base: isOpen ? 'block' : 'none', md: 'flex' }}
        pl="1.5rem"
      >
        <Link as={RWLink} to={routes.home()} mr={6}>
          Galleries
        </Link>
        <Link as={RWLink} to={routes.about()} mr={6}>
          About
        </Link>
        <Link as={RWLink} to={routes.contact()} mr={6}>
          Contact
        </Link>
      </Box>

      {children}
    </Container>
  )
}

export default MainLayout
