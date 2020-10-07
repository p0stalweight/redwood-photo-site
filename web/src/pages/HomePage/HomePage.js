import MainLayout from 'src/layouts/MainLayout'
import GalleryThumbnail from 'src/components/GalleryThumbnail'
import ImageUploader from 'src/components/ImageUploader'
import { SimpleGrid } from '@chakra-ui/core'
import mountains from './img/mountains.jpg'
import nightsky from './img/nightsky.jpg'
import ruins from './img/ruins.jpg'
import mosque from './img/mosque.jpg'
import desert from './img/desert.jpg'
import fern from './img/fern.jpg'
import lake from './img/lake.jpg'

const galleries = [
  { name: 'Mountains', src: mountains },
  { name: 'Nightsky', src: nightsky },
  { name: 'Ruins', src: ruins },
  { name: 'Mosque', src: mosque },
  { name: 'Desert', src: desert },
  { name: 'Fern', src: fern },
  { name: 'Lake', src: lake },
]

const HomePage = () => {
  return (
    <MainLayout>
      <SimpleGrid columns={[1, 2, 3]} spacing="10px" mx="10px">
        {galleries.map((props) => (
          <GalleryThumbnail key={props.name} {...props} />
        ))}
      </SimpleGrid>
      <ImageUploader />
      <p> Adding Text!</p>
      <img src="https://f002.backblazeb2.com/file/redwood-photo/R0261215.JPG"></img>

      {/* Make an upload to backblaze */}
    </MainLayout>
  )
}

export default HomePage
