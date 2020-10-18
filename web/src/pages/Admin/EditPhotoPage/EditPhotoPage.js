import PhotosLayout from 'src/layouts/Admin/PhotosLayout'
import EditPhotoCell from 'src/components/Admin/EditPhotoCell'

const EditPhotoPage = ({ id }) => {
  return (
    <PhotosLayout>
      <EditPhotoCell id={id} />
    </PhotosLayout>
  )
}

export default EditPhotoPage
