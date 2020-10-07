import GalleriesLayout from 'src/layouts/GalleriesLayout'
import EditGalleryCell from 'src/components/EditGalleryCell'

const EditGalleryPage = ({ id }) => {
  return (
    <GalleriesLayout>
      <EditGalleryCell id={id} />
    </GalleriesLayout>
  )
}

export default EditGalleryPage
