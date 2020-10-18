import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

const DELETE_GALLERY_MUTATION = gql`
  mutation DeleteGalleryMutation($id: Int!) {
    deleteGallery(id: $id) {
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

const GalleriesList = ({ galleries }) => {
  const { addMessage } = useFlash()
  const [deleteGallery] = useMutation(DELETE_GALLERY_MUTATION, {
    onCompleted: () => {
      addMessage('Gallery deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete gallery ' + id + '?')) {
      deleteGallery({ variables: { id }, refetchQueries: ['GALLERIES'] })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Created at</th>
            <th>Icon image url</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {galleries.map((gallery) => (
            <tr key={gallery.id}>
              <td>{truncate(gallery.id)}</td>
              <td>{truncate(gallery.name)}</td>
              <td>{timeTag(gallery.createdAt)}</td>
              <td>{truncate(gallery.iconImageURL)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.adminGallery({ id: gallery.id })}
                    title={'Show gallery ' + gallery.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.adminEditGallery({ id: gallery.id })}
                    title={'Edit gallery ' + gallery.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete gallery ' + gallery.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(gallery.id)}
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

export default GalleriesList
