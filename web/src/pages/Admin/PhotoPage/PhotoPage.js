import PhotosLayout from 'src/layouts/Admin/PhotosLayout'
import PhotoCell from 'src/components/Admin/PhotoCell'

const PhotoPage = ({ id }) => {
  return (
    <PhotosLayout>
      <PhotoCell id={id} />
    </PhotosLayout>
  )
}

export default PhotoPage
