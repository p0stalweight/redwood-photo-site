import { Link, routes } from '@redwoodjs/router'
import GalleryCell from 'src/components/GalleryCell'
import GalleriesCell from 'src/components/GalleriesCell'

const GalleryManagePage = () => {
  return (
    <>
      <h1 style ={{ textAlign: 'center', fontSize: '40px' }}>Manage Galleries</h1>

      <p>
        Make a new gallery: <br/>
        <Link to={routes.galleryUpload()}>Gallery Upload</Link>
      </p>

      <GalleriesCell />

      <p>
        STUB: Display grid of gallery thumbnails with delete buttons that link to edit gallery page
      </p>

    </>
  )
}

export default GalleryManagePage
