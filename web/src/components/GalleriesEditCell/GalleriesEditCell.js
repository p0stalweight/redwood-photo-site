import GalleryThumbnail from 'src/components/GalleryThumbnail'
import { SimpleGrid } from '@chakra-ui/core'
import { Link, routes } from '@redwoodjs/router'

export const QUERY = gql`
  query GALLERIES {
    galleries {
      id
      name
      iconImageURL
      tripDate
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ galleries }) => {
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={4} mt={8}>
      {galleries.map((props) => (
        <Link key={props.id} to={routes.galleryEdit({id: props.id})}>
          <GalleryThumbnail {...props} />
        </Link>
      ))}
    </SimpleGrid>
  )
}
