import { Link, routes } from '@redwoodjs/router'
import MainLayout from 'src/layouts/MainLayout'
import { Image, HStack, Center, IconButton, AspectRatio } from '@chakra-ui/core'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

export const QUERY = gql`
  query GALLERY_PHOTO($galleryId: Int!, $order: Int!) {
    photo: photoByGalleryIdAndOrder(galleryId: $galleryId, order: $order) {
      order
      imageURL
      galleryId
    }
    gallery(id: $galleryId) {
      size
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ photo: { imageURL, order, galleryId }, gallery }) => {
  return (
    <MainLayout>
      <Center pt="2rem">
        <HStack>
          {order >= 2 ? (
            <Link to={routes.galleryPhoto({ galleryId, order: order - 1 })}>
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
          {order !== gallery.size ? (
            <Link to={routes.galleryPhoto({ galleryId, order: order + 1 })}>
              <IconButton
                icon={<ArrowRightIcon />}
                variant="unstyled"
                size="lg"
              />
            </Link>
          ) : (
            <IconButton
              isDisabled={order === gallery.size}
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
