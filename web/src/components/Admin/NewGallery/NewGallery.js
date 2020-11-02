import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import GalleryForm from 'src/components/Admin/GalleryForm'

import { QUERY } from 'src/components/Admin/GalleriesCell'

const CREATE_GALLERY_MUTATION = gql`
  mutation CreateGalleryMutation($input: CreateGalleryInput!) {
    createGallery(input: $input) {
      id
    }
  }
`

const NewGallery = () => {
  const { addMessage } = useFlash()
  const [createGallery, { loading, error }] = useMutation(
    CREATE_GALLERY_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.adminGalleries())
        addMessage('Gallery created.', { classes: 'rw-flash-success' })
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const onSave = (input) => {
    createGallery({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Gallery</h2>
      </header>
      <div className="rw-segment-main">
        <GalleryForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewGallery
