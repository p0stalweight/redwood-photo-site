import { Link, routes } from '@redwoodjs/router'
import GalleryEditUploadCell from 'src/components/GalleryEditUploadCell'

const GalleryEditPage = ( { id } ) => {
  return (
    <>
      <GalleryEditUploadCell id={ parseInt(id) } />
    </>
  )
}

export default GalleryEditPage
