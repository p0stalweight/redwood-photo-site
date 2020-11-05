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

        { <FileUploadCell/> }
    </>
  )
}

export default GalleryUploadPage
