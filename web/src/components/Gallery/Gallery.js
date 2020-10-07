import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_GALLERY_MUTATION = gql`
  mutation DeleteGalleryMutation($id: Int!) {
    deleteGallery(id: $id) {
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

const Gallery = ({ gallery }) => {
  const { addMessage } = useFlash()
  const [deleteGallery] = useMutation(DELETE_GALLERY_MUTATION, {
    onCompleted: () => {
      navigate(routes.galleries())
      addMessage('Gallery deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete gallery ' + id + '?')) {
      deleteGallery({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Gallery {gallery.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{gallery.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{gallery.name}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(gallery.createdAt)}</td>
            </tr>
            <tr>
              <th>Icon image url</th>
              <td>{gallery.iconImageURL}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editGallery({ id: gallery.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(gallery.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Gallery
