import PhotosLayout from 'src/layouts/PhotosLayout'
import PhotoCell from 'src/components/PhotoCell'

const PhotoPage = ({ id }) => {
  return (
    <PhotosLayout>
      <PhotoCell id={id} />
    </PhotosLayout>
  )
}

export default PhotoPage
