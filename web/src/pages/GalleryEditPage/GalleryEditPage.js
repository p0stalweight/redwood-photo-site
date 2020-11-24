import { Link, routes } from '@redwoodjs/router'
import FileUploadCell from 'src/components/GalleryUploadCell'

const GalleryEditPage = () => {
  return (
    <>
      <h1>GalleryEditPage</h1>
      <p>
        This page will closely mirror the Gallery-Upload page
      </p>

      <GalleryUploadCell/>

      <p>
        My default route is named <code>galleryEdit</code>, link to me with `
        <Link to={routes.galleryEdit()}>GalleryEdit</Link>`
      </p>
    </>
  )
}

export default GalleryEditPage
