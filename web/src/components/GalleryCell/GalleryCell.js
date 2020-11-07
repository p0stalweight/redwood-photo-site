import { Link, routes } from '@redwoodjs/router'
import {
  SimpleGrid,
  Center,
  Heading,
  AspectRatio,
  Image,
} from '@chakra-ui/core'

export const QUERY = gql`
  query GalleryQuery($id: Int!) {
    gallery: galleryWithPhotos(id: $id) {
      id
      name
      photos {
        imageURL
        order
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ gallery: { id: galleryId, name, photos } }) => {
  return (
    <>
      <Center>
        <Heading>{name}</Heading>
      </Center>
      <SimpleGrid columns={[1, 2, 3]} spacing={4} mt={8}>
        {photos.map(({ imageURL, order }, i) => (
          <Link key={i} to={routes.galleryPhoto({ galleryId, order })}>
            <AspectRatio maxWidth="400px" ratio={4 / 3}>
              <Image objectFit="cover" src={imageURL} />
            </AspectRatio>
          </Link>
        ))}
      </SimpleGrid>
    </>
  )
}
