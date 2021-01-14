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
import Resizer from 'react-image-file-resizer'
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

<<<<<<< HEAD
  const uploadPhotos = async () => {
    const { uploadUrl, authToken } = fileUploadAuth

    const upload = async (file) => {
      return fetch(uploadUrl, {
        method: 'POST',
        headers: new Headers({
          Authorization: authToken,
          'X-Bz-File-Name': file.name,
          'Content-Type': file.type,
          'X-Bz-Content-Sha1': await blobToSHA1(file),
        }),
        body: file,
      })
    }

    const resize = (image) =>
      new Promise((resolve) => {
        Resizer.imageFileResizer(
          image,
          500, // maxWidth
          500, // maxHeight
          image.type.substring(6), // format (trim 'image/' prefix)
          100, // quality (0..100)
          0, // rotation
          (result) => {
            const renamedFile = new File([result], image.name + 'mini', {
              type: result.type,
            })
            resolve(renamedFile)
          },
          'blob' // outputType: blob or base64 URI
        )
      })

    const renamedImages = images.map((file) => {
      return new File([file], uuidv4().replace(/-/g, ''), { type: file.type })
    })

    for (const image of renamedImages) {
      await upload(image)
      await upload(await resize(image))
    }
=======
  const submitGallery = async(formData) => {
    // Send photos to Backblaze
    /*if (images.length < 1) {
      console.log("No photos to upload, cancelled")
      return
    }*/

    await uploadPhotos() // return array of photo names for use in createGallery
    console.log("just prior to gallery creation")
    // Add the gallery to database

    let today = new Date('02 December 2020')
    let testDate = today.toISOString()
    const input = { name: `${formData.['Gallery Name']}`, latitude: 20.4, longitude: 20.5, tripDate: `${testDate}` , iconImageURL: "https://f002.backblazeb2.com/file/redwood-photo/" + `${imageFileNamesTemp[0]}`, photos: [] }
    await createGallery({ variables: { input }})
    console.log("gallery generated")

    navigate(routes.manageGalleries())
   }

  /* Upload to Backblaze */
  const uploadPhotos = async() =>  {
    let imageNames = []

    for (let index = 0; index < images.length; index++) {
      let imageFile = makeFileNameUnique([images[index]])
      imageNames.push(imageFile.name)
>>>>>>> gallery-create

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
<<<<<<< HEAD
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
=======

          <Label errorClassName= "error" name="Gallery Name" />
          <TextField name="Gallery Name" errorClassName= "error" validation={{ required: true }} />
          <FieldError style={{color: 'red'}} name="Gallery Name"/>

          <Label errorClassName= "error" name="Latitude" />
          <TextField name="Latitude" errorClassName= "error" validation={{ required: true }}  />
          <FieldError style={{color: 'red'}}  name="Latitude"/>

          <Label errorClassName= "error" name="Longitude" />
          <TextField name="Longitude" errorClassName= "error" validation={{ required: true }}  />
          <FieldError style={{color: 'red'}}  name="Longitude"/>

          <Label errorClassName= "error" name="Month" />
          <TextField name="Month" errorClassName= "error" validation={{ required: true }}  />
          <FieldError style={{color: 'red'}}  name="Month"/>

          <Label errorClassName= "error" name="Year" />
          <TextField name="Year" errorClassName= "error" validation={{ required: true }}  />
          <FieldError style={{color: 'red'}}  name="Year"/>
>>>>>>> gallery-create

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
