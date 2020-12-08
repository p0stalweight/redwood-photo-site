import { useMutation } from '@redwoodjs/web'
import {
  navigate,
  routes,
  Router,
  Routes
} from '@redwoodjs/router'
import {
  DateField,
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
import { gql, useQuery } from '@apollo/client'


export const QUERY = gql`
  query GALLERY($id: Int!) {
    authorizationRequest: getAuthorizationRequest {
      authorizationToken
      backblazeApiUrl
      backblazeDownloadUrl
      backblazeUploadUrl
      backblazeUploadAuthToken
    }
    gallery(id: $id) {
      galleryId: id
      name
      latitude
      longitude
      tripDate
      photos {
        imageURL
        order
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ authorizationRequest, gallery: { galleryId, name, latitude, longitude, tripDate, photos } }) => {

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

  /* MODIFY GALLERY */
  // Take the new form information and mutate the gallery
  const modifyGallery = () => {
    let today = new Date('02 December 2020')
    let testDate = today.toISOString()
    const inputa = { name: "Updated Name", latitude: 1000.2, longitude: 2000.2, tripDate: `${testDate}` }
    let testID = Number(1)

    changeGallery({ variables: { id: 1, input: inputa, } })
  }

  const CHANGE_GALLERY_MUTATION = gql`
  mutation ChangeGallery($id: Int!, $input: ChangeGalleryInput!) {
    changeGallery(id: $id, input: $input) {
      id
    }
  }

  `
  const [changeGallery] = useMutation(CHANGE_GALLERY_MUTATION, {
    onCompleted: () => {
      console.log("gallery mutated ")
    },
    // Refresh cache
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  /* GALLERY CREATION */
  const CREATE_GALLERY_MUTATION = gql`
  mutation CreateGalleryMutation($id: CreateGalleryId!, $input: CreateGalleryInput!) {
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



  const submitGallery = async(formData) => {
    // Send photos to Backblaze
    if (images.length < 1) {
      console.log("No photos to upload, cancelled")
      return
    }

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
    console.log("changing gallery")
    changeGallery()
  }



  return<div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading" style ={{ textAlign: 'center' }}>Edit Gallery {name}</h2>
      </header>

      <div className="rw-segment-main">

        <Form onSubmit={onSubmit} validation={{ mode: 'onBlur' }}>

          <Label errorClassName= "error" name="Gallery Name" />
          <TextField name="Gallery Name" defaultValue={name} errorClassName= "error" validation={{ required: true }} />
          <FieldError style={{color: 'red'}} name="Gallery Name"/>

          <Label errorClassName= "error" name="Latitude" />
          <TextField name="Latitude" defaultValue={latitude} errorClassName= "error" validation={{ required: true }}  />
          <FieldError style={{color: 'red'}}  name="Latitude"/>

          <Label errorClassName= "error" name="Longitude" />
          <TextField name="Longitude" defaultValue={longitude} errorClassName= "error" validation={{ required: true }}  />
          <FieldError style={{color: 'red'}}  name="Longitude"/>


          <Label errorClassName= "error" name="Date" />
          <DateField name="Year" defaultValue={tripDate} errorClassName= "error" validation={{ required: true }}  />
          <FieldError style={{color: 'red'}}  name="Date"/>

          <ImageUploader
              withIcon={false}
              buttonText="Choose images"
              onChange={choosePhotos}
              imgExtension={['.jpg', '.gif', '.png', '.gif']}
              maxFileSize={5242880}
              withPreview={true}
            />

          <Submit>Update Gallery</Submit>

        </Form>
      </div>
    </div>
}
