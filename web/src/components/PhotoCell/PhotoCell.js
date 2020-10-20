import { Link, routes } from '@redwoodjs/router'
import { Image, Center, IconButton } from '@chakra-ui/core'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'

export const QUERY = gql`
  query PHOTO_DETAIL($galleryId: Int!, $order: Int!) {
    photoByGalleryAndOrder(galleryId: $galleryId, order: $order) {
      id
      order
      imageURL
      galleryId
    }
    gallerySize(id: $galleryId)
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({
  photoByGalleryAndOrder: { imageURL, order, galleryId },
  gallerySize,
}) => {
  return (
    <Center>
      <Link to={routes.photo({ galleryId, order: order - 1 })}>
        <IconButton isDisabled={order < 2} icon={<ArrowBackIcon />} size="lg" />
      </Link>
      <Image src={imageURL} height="100vh" objectFit="cover" />
      <Link to={routes.photo({ galleryId, order: order + 1 })}>
        <IconButton
          isDisabled={order == gallerySize}
          icon={<ArrowForwardIcon />}
          size="lg"
        />
      </Link>
    </Center>
  )
}
