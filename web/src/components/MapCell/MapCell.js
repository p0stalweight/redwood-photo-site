import Map from 'src/components/Map'
import { SimpleGrid } from '@chakra-ui/core'

export const QUERY = gql`
  query GALLERIES {
    galleries {
      id
      name
      tripDate
      iconImageURL
      latitude
      longitude
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ galleries }) => {
  const galleryLatitudesAndLongitudes = () => {
    var locations = []
    galleries.forEach(gallery => {
      console.log(gallery.name)
      console.log(gallery.latitude)
      console.log(gallery.longitude)
    });
  }
  return(
    //<button onClick={galleryLatitudesAndLongitudes}>Button</button>
  <div>
  //<Map galleries={galleries} ></Map>
  </div>
)
}
