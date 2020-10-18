import { Link, routes } from '@redwoodjs/router'

import Photos from 'src/components/Admin/Photos'

export const QUERY = gql`
  query PHOTOS {
    photos {
      id
      order
      imageURL
      createdAt
      galleryId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No photos yet. '}
      <Link to={routes.adminNewPhoto()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ photos }) => {
  return <Photos photos={photos} />
}
