import { Link, routes } from '@redwoodjs/router'
import GalleryPhotoCell from 'src/components/GalleryPhotoCell'

const GalleryPhotoPage = ({ galleryId, order }) => {
  return <GalleryPhotoCell galleryId={galleryId} order={order} />
}

export default GalleryPhotoPage
