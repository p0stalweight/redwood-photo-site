import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_PHOTO_MUTATION = gql`
  mutation DeletePhotoMutation($id: Int!) {
    deletePhoto(id: $id) {
      id
    }
  }
`

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
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

const Photo = ({ photo }) => {
  const { addMessage } = useFlash()
  const [deletePhoto] = useMutation(DELETE_PHOTO_MUTATION, {
    onCompleted: () => {
      navigate(routes.photos())
      addMessage('Photo deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete photo ' + id + '?')) {
      deletePhoto({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Photo {photo.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{photo.id}</td>
            </tr>
            <tr>
              <th>Order</th>
              <td>{photo.order}</td>
            </tr>
            <tr>
              <th>Image url</th>
              <td>{photo.imageURL}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(photo.createdAt)}</td>
            </tr>
            <tr>
              <th>Gallery id</th>
              <td>{photo.galleryId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editPhoto({ id: photo.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(photo.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Photo
