import { useMutation } from '@redwoodjs/web'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import GalleryForm from 'src/components/Admin/GalleryForm'
import { Button } from "@chakra-ui/core"
import  ImageUploader from 'react-images-upload'
import { useState } from 'react'
import sha1 from 'js-sha1'
import blobToSHA1 from 'blob-to-sha1'
import UUID from 'uuidjs'


export const QUERY = gql`
  query {
    authorizationRequest: getAuthorizationRequest {
      authorizationToken
      backblazeApiUrl
      backblazeDownloadUrl
      backblazeUploadUrl
      backblazeUploadAuthToken
    }
  }
`
export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ authorizationRequest }) => {

  const [images, setImages] = useState([])

  const [imageFileNames, setImageFileNames] = useState([])

  let imageFileNamesTemp = []

  const choosePhotos = (img) => {
    setImages(img)
  }

  /* IMAGE FILE MANIPULATION */
  const makeFileNameUnique = (file) => {
    let UUID = require("uuidjs")
    let uuid = UUID.generate()
    return renameFile(file, uuid.replace(/-/g, ""))
  }

  const renameFile = (bits, name) => {
    try {
        // If this call fails, we go for Blob
        return new File(bits, name);
    }
    catch (e) {
        // If we reach this point a new File could not be constructed
        var myBlob = new Blob(bits);
        myBlob.lastModified = new Date();
        myBlob.name = name;
        return myBlob;
    }
  }

  /* PHOTO CREATION */
  const CREATE_PHOTO_MUTATION = gql`
  mutation CreatePhotoMutation($input: CreatePhotoInput!) {
    createPhoto(input: $input) {
      id
    }
  }
`

  const [createPhoto] = useMutation(CREATE_PHOTO_MUTATION, {
    onCompleted: () => {
      console.log("photo created")
    },
    // Refresh cache
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const generatePhotos = (galleryId) => {
    console.log(`generatePhotos: ${galleryId}`)
    console.log("imageFileNames array:")
    console.log(imageFileNames)

    for (let index = 0; index < imageFileNames.length; index++) {
      console.log("Image names during photo object creation:")
      console.log(imageFileNames[index])

      const input = { order: index + 1, imageURL: "https://f002.backblazeb2.com/file/redwood-photo/"+ imageFileNames[index], galleryId: galleryId }

      createPhoto({ variables: { input} })
    }

  }

  /* GALLERY CREATION */
   const CREATE_GALLERY_MUTATION = gql`
  mutation CreateGalleryMutation($input: CreateGalleryInput!) {
    createGallery(input: $input) {
      id
    }
  }

`
  const [createGallery, { loading, error }] = useMutation(
    CREATE_GALLERY_MUTATION,
    {
      onCompleted: ({createGallery}) => {
        console.log(createGallery.id)
        generatePhotos(createGallery.id)
      },
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const submitGallery = async(formData) => {
    // Send photos to Backblaze
    if (images.length < 1) {
      console.log("No photos to upload, cancelled")
      return
    }

    await uploadPhotos() // return array of photo names for use in createGallery

    // Add the gallery to database
    const input = { name: `${formData.['Gallery Name']}`, iconImageURL: "https://f002.backblazeb2.com/file/redwood-photo/" + `${imageFileNamesTemp[0]}`, photos: [] }
    await createGallery({ variables: { input }})
    console.log("gallery generated")

    // TODO: Navigate to the manage galleries
   }

  /* Upload to Backblaze */
  const uploadPhotos = async() =>  {
    let imageNames = []

    for (let index = 0; index < images.length; index++) {
      let imageFile = makeFileNameUnique([images[index]])
      imageNames.push(imageFile.name)

      let sha1Image = await blobToSHA1(imageFile)

      const response = await fetch(authorizationRequest.backblazeUploadUrl, {
        method: 'POST',
        headers: new Headers({
          Authorization: `${authorizationRequest.backblazeUploadAuthToken}`,
          'X-Bz-File-Name': `${imageFile.name}`,
          'Content-Type': `${images[index]['type']}`,
          'X-Bz-Content-Sha1': `${sha1Image}`,
        }),
          body: imageFile,
      })
        let responseJson = await response.json()
        console.log(responseJson)
     }

    setImageFileNames(imageFileNames.concat(imageNames))
    imageFileNamesTemp = imageNames

  }

  /* Form Submission */
  const onSubmit = (formData) => {
    console.log(formData)
    submitGallery(formData)
  }

  return<div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading" style ={{ textAlign: 'center' }}>New Gallery</h2>
      </header>

      <div className="rw-segment-main">

        <Form onSubmit={onSubmit} validation={{ mode: 'onBlur' }}>

          <Label errorClassName= "error" name="Gallery Name" />
          <TextField name="Gallery Name" errorClassName= "error" validation={{ required: true }} />
          <FieldError style={{color: 'red'}} name="Gallery Name"/>

          <Label errorClassName= "error" name="Location" />
          <TextField name="Location" errorClassName= "error" validation={{ required: true }}  />
          <FieldError style={{color: 'red'}}  name="Location"/>

          <Label errorClassName= "error" name="Month" />
          <TextField name="Month" errorClassName= "error" validation={{ required: true }}  />
          <FieldError style={{color: 'red'}}  name="Month"/>

          <Label errorClassName= "error" name="Year" />
          <TextField name="Year" errorClassName= "error" validation={{ required: true }}  />
          <FieldError style={{color: 'red'}}  name="Year"/>

          <ImageUploader
              withIcon={false}
              buttonText="Choose images"
              onChange={choosePhotos}
              imgExtension={['.jpg', '.gif', '.png', '.gif']}
              maxFileSize={5242880}
              withPreview={true}
            />
            <Submit>Add Gallery</Submit>

        </Form>
      </div>
    </div>
}
