import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import PhotoForm from 'src/components/PhotoForm'

import { QUERY } from 'src/components/PhotosCell'

const CREATE_PHOTO_MUTATION = gql`
  mutation CreatePhotoMutation($input: CreatePhotoInput!) {
    createPhoto(input: $input) {
      id
    }
  }
`

const NewPhoto = () => {
  const { addMessage } = useFlash()
  const [createPhoto, { loading, error }] = useMutation(CREATE_PHOTO_MUTATION, {
    onCompleted: () => {
      navigate(routes.photos())
      addMessage('Photo created.', { classes: 'rw-flash-success' })
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onSave = (input) => {
    const castInput = Object.assign(input, {
      galleryId: parseInt(input.galleryId),
    })
    createPhoto({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Photo</h2>
      </header>
      <div className="rw-segment-main">
        <PhotoForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewPhoto
