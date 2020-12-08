import { Link, routes } from '@redwoodjs/router'
import GalleryEditUploadCell from 'src/components/GalleryEditUploadCell'

const GalleryEditPage = ({ id }) => {
  console.log(id)
  return (
    <>
      <h1>GalleryEditPage</h1>
      <GalleryEditUploadCell id={id} />

    </>
  )
}

export default GalleryEditPage
