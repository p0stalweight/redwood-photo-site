import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

const DELETE_PHOTO_MUTATION = gql`
  mutation DeletePhotoMutation($id: Int!) {
    deletePhoto(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const PhotosList = ({ photos }) => {
  const { addMessage } = useFlash()
  const [deletePhoto] = useMutation(DELETE_PHOTO_MUTATION, {
    onCompleted: () => {
      addMessage('Photo deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete photo ' + id + '?')) {
      deletePhoto({ variables: { id }, refetchQueries: ['PHOTOS'] })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Order</th>
            <th>Image url</th>
            <th>Created at</th>
            <th>Gallery id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {photos.map((photo) => (
            <tr key={photo.id}>
              <td>{truncate(photo.id)}</td>
              <td>{truncate(photo.order)}</td>
              <td>{truncate(photo.imageURL)}</td>
              <td>{timeTag(photo.createdAt)}</td>
              <td>{truncate(photo.galleryId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.adminPhoto({ id: photo.id })}
                    title={'Show photo ' + photo.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.adminEditPhoto({ id: photo.id })}
                    title={'Edit photo ' + photo.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete photo ' + photo.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(photo.id)}
                  >
                    Delete
                  </a>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PhotosList
