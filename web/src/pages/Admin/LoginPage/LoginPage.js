import { Button, Box, Center, VStack } from '@chakra-ui/core'
import { Link, routes, navigate } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'

const LoginPage = () => {
  const { logIn, logOut, isAuthenticated, currentUser } = useAuth()
  const toGalleries = () => {
    navigate(routes.adminManageGalleries())
  }
  return (
    <>
      <Center>
        <Box  maxW="lg" bg='#3FA8B9' w="100%" p={20} color="white">
          <VStack spacing="24px">
            <Button colorScheme="blue" onClick={isAuthenticated ? logOut : logIn}>
              {isAuthenticated ? 'Log Out' : 'Log In'}
            </Button>
            <Button colorScheme="blue" onClick= { toGalleries }> Manage Galleries </Button>
            {isAuthenticated && <p>{currentUser.email}</p>}
          </VStack>
        </Box>
      </Center>
    </>

  )
}

export default LoginPage
