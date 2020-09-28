import { Box, Image, Heading, Flex, useDisclosure } from '@chakra-ui/core'
import NavLink from 'src/components/NavLink'
import logo from './tree_tmp.jpg'

const MainLayout = ({ children }) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box maxW="960px" mx="auto">
      <header>
        <Flex as="nav" align="center" wrap="wrap" padding="1.5rem">
          <Image size="100px" mr="1rem" src={logo} alt="Tree logo" />
          <Flex align="center" mr={5}>
            <Heading as="h1" size="xl">
              Frank Postlewaite Photography
            </Heading>
          </Flex>

          <Box
            display={{ sm: 'block', md: 'none' }}
            ml="auto"
            onClick={onToggle}
          >
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
          display={{ sm: isOpen ? 'block' : 'none', md: 'flex' }}
          width={{ sm: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          pl="1.5rem"
        >
          <NavLink page="home">Galleries</NavLink>
          <NavLink page="about">About</NavLink>
          <NavLink page="contact">Contact</NavLink>
        </Box>
      </header>
      <Box pt={8}>{children}</Box>
    </Box>
  )
}

export default MainLayout
