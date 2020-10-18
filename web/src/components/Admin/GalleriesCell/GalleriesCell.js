import { Link, routes } from '@redwoodjs/router'

import Galleries from 'src/components/Admin/Galleries'

export const QUERY = gql`
  query GALLERIES {
    galleries {
      id
      name
      createdAt
      iconImageURL
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No galleries yet. '}
      <Link to={routes.adminNewGallery()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ galleries }) => {
  return <Galleries galleries={galleries} />
}
