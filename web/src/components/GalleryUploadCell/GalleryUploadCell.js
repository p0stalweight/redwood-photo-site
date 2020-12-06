import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import ImageUploader from 'react-images-upload'
import { useState } from 'react'
import blobToSHA1 from 'blob-to-sha1'
import { v4 as uuidv4 } from 'uuid'

export const QUERY = gql`
  query FILE_UPLOAD_AUTH {
    fileUploadAuth {
      authToken
      uploadUrl
    }
  }
`
const CREATE_GALLERY_MUTATION = gql`
  mutation CreateGalleryMutation($input: CreateGalleryInput!) {
    gallery: createGallery(input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ fileUploadAuth }) => {
  const [images, setImages] = useState([])

  const [createGallery, { loading, error }] = useMutation(
    CREATE_GALLERY_MUTATION,
    {
      onCompleted: ({ gallery }) => {
        console.log(gallery.id)
        // TODO: Navigate to the manage galleries
      },
    }
  )

  const uploadPhotos = async () => {
    const { uploadUrl, authToken } = fileUploadAuth

    const renamedImages = images.map((file) => {
      return new File([file], uuidv4().replace(/-/g, ''), { type: file.type })
    })

    for (const image of renamedImages) {
      await fetch(uploadUrl, {
        method: 'POST',
        headers: new Headers({
          Authorization: authToken,
          'X-Bz-File-Name': image.name,
          'Content-Type': image.type,
          'X-Bz-Content-Sha1': await blobToSHA1(image),
        }),
        body: image,
      })
    }

    return renamedImages.map((file) => file.name)
  }

  /* Form Submission */
  const onSubmit = async (formData) => {
    if (images.length < 1) {
      console.log('No photos to upload, cancelled')
      return
    }

    const imageNames = await uploadPhotos()

    const photos = imageNames.map((name, i) => {
      return {
        imageURL: 'https://f002.backblazeb2.com/file/redwood-photo/' + name,
        order: i + 1,
      }
    })

    const input = { name: formData.name, photos }
    createGallery({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading" style={{ textAlign: 'center' }}>
          New Gallery
        </h2>
      </header>

      <div className="rw-segment-main">
        <Form onSubmit={onSubmit} validation={{ mode: 'onBlur' }}>
          <Label errorClassName="error" name="name">
            Name
          </Label>
          <TextField
            name="name"
            errorClassName="error"
            validation={{ required: true }}
          />
          <FieldError style={{ color: 'red' }} name="name" />

          <Label errorClassName="error" name="location">
            Location
          </Label>
          <TextField
            name="location"
            errorClassName="error"
            validation={{ required: true }}
          />
          <FieldError style={{ color: 'red' }} name="location" />

          <Label errorClassName="error" name="month">
            Month
          </Label>
          <TextField
            name="month"
            errorClassName="error"
            validation={{ required: true }}
          />
          <FieldError style={{ color: 'red' }} name="month" />

          <Label errorClassName="error" name="year">
            Year
          </Label>
          <TextField
            name="year"
            errorClassName="error"
            validation={{ required: true }}
          />
          <FieldError style={{ color: 'red' }} name="year" />

          <ImageUploader
            withIcon={false}
            buttonText="Choose images"
            onChange={setImages}
            imgExtension={['.jpg', '.gif', '.png']}
            maxFileSize={5242880}
            withPreview
          />

          <Submit>Add Gallery</Submit>
        </Form>
      </div>
    </div>
  )
}
