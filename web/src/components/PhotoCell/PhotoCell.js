import { Link, routes } from '@redwoodjs/router'
import MainLayout from 'src/layouts/MainLayout'
import { Image, HStack, Center, IconButton, AspectRatio } from '@chakra-ui/core'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

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
          {order >= 2 ? (
            <Link to={routes.photo({ galleryId, order: order - 1 })}>
              <IconButton
                icon={<ArrowLeftIcon />}
                variant="unstyled"
                size="lg"
              />
            </Link>
          ) : (
            <IconButton
              icon={<ArrowLeftIcon />}
              disabled
              variant="unstyled"
              size="lg"
            />
          )}
          <AspectRatio width="700px" ratio={4 / 3}>
            <Image src={imageURL} objectFit="cover" />
          </AspectRatio>
          {order !== gallerySize ? (
            <Link to={routes.photo({ galleryId, order: order + 1 })}>
              <IconButton
                icon={<ArrowRightIcon />}
                variant="unstyled"
                size="lg"
              />
            </Link>
          ) : (
            <IconButton
              isDisabled={order == gallerySize}
              icon={<ArrowRightIcon />}
              variant="unstyled"
              size="lg"
            />
          )}
        </HStack>
      </Center>
    </MainLayout>
  )
}
