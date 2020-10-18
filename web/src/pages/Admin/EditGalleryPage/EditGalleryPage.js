import GalleriesLayout from 'src/layouts/Admin/GalleriesLayout'
import EditGalleryCell from 'src/components/Admin/EditGalleryCell'

const EditGalleryPage = ({ id }) => {
  return (
    <GalleriesLayout>
      <EditGalleryCell id={id} />
    </GalleriesLayout>
  )
}

export default EditGalleryPage
