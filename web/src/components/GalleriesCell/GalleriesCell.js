import GalleryThumbnail from 'src/components/GalleryThumbnail'
import { SimpleGrid } from '@chakra-ui/core'
import { Link, routes } from '@redwoodjs/router'

// placeholder images
// import mountains from './img/mountains.jpg'
// import nightsky from './img/nightsky.jpg'
// import ruins from './img/ruins.jpg'
// import mosque from './img/mosque.jpg'
// import desert from './img/desert.jpg'
// import fern from './img/fern.jpg'
// import lake from './img/lake.jpg'

// const galleries = [
//   { name: 'Mountains', iconImageURL: mountains },
//   { name: 'Nightsky', iconImageURL: nightsky },
//   { name: 'Ruins', iconImageURL: ruins },
//   { name: 'Mosque', iconImageURL: mosque },
//   { name: 'Desert', iconImageURL: desert },
//   { name: 'Fern', iconImageURL: fern },
//   { name: 'Lake', iconImageURL: lake },
// ]

export const QUERY = gql`
  query GALLERIES {
    galleries {
      id
      name
      iconImageURL
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
        <Link key={props.id} to={routes.gallery({ id: props.id })}>
          <GalleryThumbnail {...props} />
        </Link>
      ))}
    </SimpleGrid>
  )
}
