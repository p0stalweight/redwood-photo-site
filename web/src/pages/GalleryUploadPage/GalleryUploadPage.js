import { Link, routes } from '@redwoodjs/router'
import GalleryImageUploader from 'src/components/GalleryImageUploader'
import FileUploadCell from 'src/components/FileUploadCell'

const GalleryUploadPage = () => {

  return (
    <>
      <h1>GalleryUploadPage</h1>
      <div>
        <GalleryImageUploader/>
      </div>
        My default route is named <code>galleryUpload</code>, link to me with `
        <Link to={routes.galleryUpload()}>GalleryUpload</Link>`


        { <FileUploadCell/> }
    </>
  )
}

export default GalleryUploadPage
