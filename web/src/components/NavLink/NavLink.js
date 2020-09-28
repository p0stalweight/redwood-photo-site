import { Link as RWLink, routes } from '@redwoodjs/router'
import { Link } from '@chakra-ui/core'

const NavLink = ({ children, page }) => (
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

export default NavLink
