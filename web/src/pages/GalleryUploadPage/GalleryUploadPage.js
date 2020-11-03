import { Link, routes } from '@redwoodjs/router'
import GalleryImageUploader from 'src/components/GalleryImageUploader'

const GalleryUploadPage = () => {
  return (
    <>
      <h1>GalleryUploadPage</h1>
      <div>
        <GalleryImageUploader/>
      </div>
        My default route is named <code>galleryUpload</code>, link to me with `
        <Link to={routes.galleryUpload()}>GalleryUpload</Link>`
    </>
  )
}

export default GalleryUploadPage
