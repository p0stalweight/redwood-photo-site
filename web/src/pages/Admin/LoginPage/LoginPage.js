import { Button, Box } from '@chakra-ui/core'
import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'

const LoginPage = () => {
  const { logIn, logOut, isAuthenticated, currentUser } = useAuth()
  return (
    <>
      <h1>LoginPage</h1>
        <Box  maxW="sm" bg="tomato" w="100%" p={4} color="white">
          <Button colorScheme="blue" onClick={isAuthenticated ? logOut : logIn}>
                  {isAuthenticated ? 'Log Out' : 'Log In'}
          </Button>

        {isAuthenticated && <p>{currentUser.email}</p>}
      </Box>
    </>

  )
}

export default LoginPage
