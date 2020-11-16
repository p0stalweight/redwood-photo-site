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

  const choosePhotos = (img) => {
    setImages(img)
  }

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

  /* PHOTO MANAGEMENT */
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

    for (let index = 0; index < imageFileNames.length; index++) {
      const input ={ order: index + 1, imageURL: authorizationRequest.backblazeDownloadUrl + '/' + imageFileNames[index], galleryId: galleryId }
      createPhoto({ variables: { input} })
    }
  }

  /* GALLERY MANAGEMENT */
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

  const submitGallery = async() => {
    // Send photos to Backblaze
    await uploadPhotos()

    // Wait until the above calls are done before making the gallery

    // Add the gallery to database
    const input = { name: 'SampleGallery6', iconImageURL: 'www.test.com', photos: [] }
    await createGallery({ variables: { input }})
    console.log("gallery generated")
   }

  const uploadPhotos = async() =>  {
    let imageNames = []

    for (let index = 0; index < images.length; index++) {
      console.log(images[index])

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

    setImageFileNames(imageNames)
    console.log(imageFileNames)

  }

  const onSubmit = (data) => {
    console.log(data)
  }


  return<div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading">New Gallery</h2>
      </header>
      <div className="rw-segment-main">
        <Form onSubmit={onSubmit}>
          <Label name="Gallery Name" />
          <TextField name="Gallery Name" errorClassName= "error" validation={{ required: true }} />
          <FieldError name="Gallery Name"/>

          <Label name="Location" />
          <TextField name="Location" errorClassName= "error" validation={{ required: true }}  />
          <FieldError name="Location"/>

          <Label name="Month" />
          <TextField name="Month" errorClassName= "error" validation={{ required: true }}  />
          <FieldError name="Month"/>

          <Label name="Year" />
          <TextField name="Year" errorClassName= "error" validation={{ required: true }}  />
          <FieldError name="Year"/>

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
      <Button onClick={() => submitGallery()}> Add Gallery </Button>
    </div>
}
