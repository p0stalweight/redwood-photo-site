// import { Link, routes } from '@redwoodjs/router'
import { Image, Center } from '@chakra-ui/core'

export const QUERY = gql`
  # query PhotoQuery($id: Int!) {
  query FIND_PHOTO_BY_GALLERY_AND_ORDER($galleryId: Int!, $order: Int!) {
    photoByGalleryAndOrder(galleryId: $galleryId, order: $order) {
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

export const Success = ({ photoByGalleryAndOrder: { imageURL } }) => {
  return (
    <Center>
      <Image src={imageURL} height="100vh" objectFit="cover" />
    </Center>
  )
}
