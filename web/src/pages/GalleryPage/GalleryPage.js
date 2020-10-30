import GalleriesLayout from 'src/layouts/GalleriesLayout'
import GalleryCell from 'src/components/GalleryCell'

const GalleryPage = ({ id }) => {
  return (
    <GalleriesLayout>
      <GalleryCell id={id} />
    </GalleriesLayout>
  )
}

export default GalleryPage
