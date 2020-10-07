import PhotosLayout from 'src/layouts/PhotosLayout'
import EditPhotoCell from 'src/components/EditPhotoCell'

const EditPhotoPage = ({ id }) => {
  return (
    <PhotosLayout>
      <EditPhotoCell id={id} />
    </PhotosLayout>
  )
}

export default EditPhotoPage
