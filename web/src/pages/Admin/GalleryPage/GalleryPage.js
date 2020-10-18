import GalleriesLayout from 'src/layouts/Admin/GalleriesLayout'
import GalleryCell from 'src/components/Admin/GalleryCell'

const GalleryPage = ({ id }) => {
  return (
    <GalleriesLayout>
      <GalleryCell id={id} />
    </GalleriesLayout>
  )
}

export default GalleryPage
