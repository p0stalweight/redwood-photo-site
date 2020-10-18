import {
  SimpleGrid,
  Center,
  Heading,
  AspectRatio,
  Image,
} from '@chakra-ui/core'

export const QUERY = gql`
  query GalleryQuery($id: Int!) {
    gallery(id: $id) {
      id
      name
      photos {
        imageURL
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ gallery: { name, photos } }) => {
  return (
    <>
      <Center>
        <Heading>{name}</Heading>
      </Center>
      <SimpleGrid columns={[1, 2, 3]} spacing={4} mt={8}>
        {photos.map((photo, i) => (
          <AspectRatio key={i} maxWidth="400px" ratio={4 / 3}>
            <Image objectFit="cover" src={photo.imageURL} />
          </AspectRatio>
        ))}
      </SimpleGrid>
    </>
  )
}
