import { Link, routes } from '@redwoodjs/router'
import MainLayout from 'src/layouts/MainLayout'
import { Image, HStack, Center, IconButton, AspectRatio } from '@chakra-ui/core'
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
    <MainLayout>
      <Center pt="2rem">
        <HStack>
          <Link to={routes.photo({ galleryId, order: order - 1 })}>
            <IconButton
              isDisabled={order < 2}
              icon={<ArrowBackIcon />}
              variant="outline"
              isRound
              size="lg"
            />
          </Link>
          <AspectRatio width="700px" ratio={4 / 3}>
            <Image src={imageURL} objectFit="cover" />
          </AspectRatio>
          <Link to={routes.photo({ galleryId, order: order + 1 })}>
            <IconButton
              isDisabled={order == gallerySize}
              icon={<ArrowForwardIcon />}
              isRound
              variant="outline"
              size="lg"
            />
          </Link>
        </HStack>
      </Center>
    </MainLayout>
  )
}
