// import { Link, routes } from '@redwoodjs/router'
import { Image, Center } from '@chakra-ui/core'

export const QUERY = gql`
  query PhotoQuery($id: Int!) {
    photo(id: $id) {
      id
      order
      imageURL
      galleryId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ photo }) => {
  return (
    <Center>
      <Image src={photo.imageURL} height="100vh" objectFit="cover" />
    </Center>
  )
}
