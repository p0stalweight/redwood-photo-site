import { Link as RWLink, routes } from '@redwoodjs/router'
import { Box, Image, Heading, Flex, Link } from '@chakra-ui/core'
import logo from './tree_tmp.jpg'

const MenuItems = ({ children, page }) => (
  <Link
    as={RWLink}
    to={routes[page]()}
    mt={{ base: 4, md: 0 }}
    mr={6}
    display="block"
  >
    {children}
  </Link>
)

const Header = () => {
  const [show, setShow] = React.useState(false)
  const handleToggle = () => setShow(!show)

  return (
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
          onClick={handleToggle}
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
        display={{ sm: show ? 'block' : 'none', md: 'flex' }}
        width={{ sm: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
        pl="1.5rem"
      >
        <MenuItems page="home">Galleries</MenuItems>
        <MenuItems page="about">About</MenuItems>
        <MenuItems page="contact">Contact</MenuItems>
      </Box>
    </header>
  )
}

const MainLayout = ({ children }) => {
  return (
    <Box maxW="960px" width={['100%', '95%']} mx="auto">
      <Header />
      <Box width="250px" mt="80px" mx="auto" textAlign="center">
        {children}
      </Box>
    </Box>
  )
}

export default MainLayout
