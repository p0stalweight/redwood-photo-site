import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import PhotoForm from 'src/components/PhotoForm'

export const QUERY = gql`
  query FIND_PHOTO_BY_ID($id: Int!) {
    photo: photo(id: $id) {
      id
      order
      imageURL
      createdAt
      galleryId
    }
  }
`
const UPDATE_PHOTO_MUTATION = gql`
  mutation UpdatePhotoMutation($id: Int!, $input: UpdatePhotoInput!) {
    updatePhoto(id: $id, input: $input) {
      id
      order
      imageURL
      createdAt
      galleryId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ photo }) => {
  const { addMessage } = useFlash()
  const [updatePhoto, { loading, error }] = useMutation(UPDATE_PHOTO_MUTATION, {
    onCompleted: () => {
      navigate(routes.photos())
      addMessage('Photo updated.', { classes: 'rw-flash-success' })
    },
  })

  const onSave = (input, id) => {
    const castInput = Object.assign(input, {
      galleryId: parseInt(input.galleryId),
    })
    updatePhoto({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Photo {photo.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <PhotoForm
          photo={photo}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
