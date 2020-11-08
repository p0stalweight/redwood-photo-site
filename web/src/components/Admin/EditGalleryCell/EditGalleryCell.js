import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import GalleryForm from 'src/components/Admin/GalleryForm'

export const QUERY = gql`
  query FIND_GALLERY_BY_ID($id: Int!) {
    gallery(id: $id) {
      id
      name
      createdAt
      iconImageURL
      photos {
        id
        order
        imageURL
      }
    }
  }
`

const UPDATE_GALLERY_MUTATION = gql`
  mutation UpdateGalleryMutation($id: Int!, $input: UpdateGalleryInput!) {
    updateGallery(id: $id, input: $input) {
      id
      name
      createdAt
      iconImageURL
      photos {
        order
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const afterQuery = ({ gallery: { photos, ...props } }) => {
  const cleanPhotos = photos.map(({ __typename, ...photo }) => ({ ...photo }))

  return { gallery: { ...props, photos: cleanPhotos } }
}

export const Success = ({ gallery }) => {
  const { addMessage } = useFlash()
  const [updateGallery, { loading, error }] = useMutation(
    UPDATE_GALLERY_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.adminGalleries())
        addMessage('Gallery updated.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input, id) => {
    updateGallery({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Gallery {gallery.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <GalleryForm
          gallery={gallery}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
