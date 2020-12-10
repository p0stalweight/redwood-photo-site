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
  MonthField,
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
import GalleryCell from 'src/components/GalleryCell'


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

  const choosePhotos = (img) => {
    setImages(img)
  }


  /* MODIFY GALLERY */
  // Take the new form information and mutate the gallery
  const modifyGallery = (formData) => {
    let today = new Date('02 December 2020')
    let testDate = today.toISOString()
    const testInput = { name: `${formData.['Gallery Name']}`, latitude: parseFloat(`${formData.Latitude}`), longitude: parseFloat(`${formData.Longitude}`), tripDate: `${testDate}` }
    changeGallery({ variables: {id: galleryId, input: testInput, } })
    navigate(routes.manageGalleries())
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
  })

  const addImagesToGallery = () => {
    //upload images and modify gallery
  }

  /* Form Submission */
  const onSubmit = (formData) => {
    console.log("changing gallery")
    console.log(formData.monthYear)
    modifyGallery(formData)
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

          <Label errorClassName= "error" name="Month, Year" />
          <MonthField name="monthYear" errorClassName= "error" validation={{ required: true }}  />
          <FieldError style={{color: 'red'}}  name="monthYear"/>

          <GalleryCell id={galleryId} />

          <ImageUploader
              withIcon={false}
              buttonText="Choose images"
              onChange={choosePhotos}
              imgExtension={['.jpg', '.gif', '.png', '.gif']}
              maxFileSize={5242880}
              withPreview={true}
            />

          <Button onclick={addImagesToGallery}>Add Images to Gallery</Button>


          <Submit>Update Gallery</Submit>

        </Form>
      </div>
    </div>
}
