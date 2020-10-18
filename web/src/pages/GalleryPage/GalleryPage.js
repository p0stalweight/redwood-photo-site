import MainLayout from 'src/layouts/MainLayout'
import GalleryCell from 'src/components/GalleryCell'

const GalleryPage = ({ id }) => {
  return (
    <MainLayout>
      <GalleryCell id={id} />
    </MainLayout>
  )
}

export default GalleryPage
