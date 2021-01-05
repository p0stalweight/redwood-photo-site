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

  /* GRAPH QL MUTATIONS */

  // Add Photos
  const ADD_PHOTOS_TO_GALLERY_MUTATION = gql`
  mutation AddPhotosToGallery($id: Int!, $input: AddPhotosToGalleryInput!) {
    addPhotosToGallery(id: $id, input: $input){
      id
    }
  }
  `

  const [addPhotosToGallery] = useMutation(ADD_PHOTOS_TO_GALLERY_MUTATION, {
    onCompleted: () => {
      console.log("photos mutated ")
    },
  })

  // Change Gallery
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

  // Delete Photos in Gallery
  const DELETE_PHOTOS_IN_GALLERY_MUTATION = gql`
  mutation DeletePhotosByGallery($galleryId: Int!) {
    deletePhotosByGallery(galleryId: $galleryId) {
      galleryId
    }
  }`

  const [deletePhotosByGallery] = useMutation(DELETE_PHOTOS_IN_GALLERY_MUTATION, {
    onCompleted: () => {
      console.log("photos deleted")
    }
  })


  // Delete Gallery
  const DELETE_GALLERY_MUTATION = gql`
  mutation DeleteGallery($id: Int!) {
    deleteGallery(id: $id){
      id
    }
  }
  `

  const [deleteGallery] = useMutation(DELETE_GALLERY_MUTATION, {
    onCompleted: () => {
      console.log("gallery deleted")
    },
  })

  /* ADD IMAGES */
  const addImagesToGallery = () => {
    console.log("adding images")
    const photos = [{order: 5, imageURL: "www.test.com", galleryId: 1}, {order: 6, imageURL: "www.lets.com", galleryId}]
    const input = {photos}
    addPhotosToGallery({variables: {id: galleryId, input: input} })
  }

  /* DELETE GALLERY */
  const removeGallery = () => {
    console.log("Deleting Photos")
    deletePhotosByGallery({ variables: {galleryId: galleryId}})
    console.log("Delete Gallery")
    deleteGallery({ variables: {id: galleryId} })
    navigate(routes.manageGalleries())
  }

  /* MODIFY GALLERY */
  // Take the new form information and mutate the gallery
  const modifyGallery = (formData) => {
    let year = getYearFromMonthFieldString(formData.tripDate)
    let month = getMonthFromMonthFieldString(formData.tripDate)

    let tripDate = new Date()
    tripDate.setMonth(Number(month) - 1) // JS dates are indexed from 0-11, MonthField is 1-12
    tripDate.setYear(Number(year))

    let convertedTripDate = tripDate.toISOString()
    const testInput = { name: `${formData.['Gallery Name']}`, latitude: parseFloat(`${formData.Latitude}`),
                        longitude: parseFloat(`${formData.Longitude}`), tripDate: `${convertedTripDate}` }

    changeGallery({ variables: {id: galleryId, input: testInput, } })
    navigate(routes.manageGalleries())
  }

  /* Date Manipulation Methods*/
  // Switching between DateTime and JS Date Objects
  const convertUTCtoMonthYear = (date) => {
    const month = getMonthFromMonthFieldString(date)
    const year = getYearFromMonthFieldString(date)
    return `${year}-${month}`
  }

  const getYearFromMonthFieldString = (formData) => {
    let year = formData.substr(0, formData.indexOf('-'))
    return year
  }

  const getMonthFromMonthFieldString = (formData) => {
    let month = formData.substr(formData.indexOf('-') + 1, 2)
    return month
  }

  return<div className="rw-segment">
      <Button onClick={removeGallery}>Remove Gallery</Button>

      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading" style ={{ textAlign: 'center' }}>Edit Gallery {name}</h2>
      </header>

      <div className="rw-segment-main">

        <Form onSubmit={modifyGallery} validation={{ mode: 'onBlur' }}>

          <Label errorClassName= "error" name="Gallery Name" />
          <TextField name="Gallery Name" defaultValue={name} errorClassName= "error" validation={{ required: true }} />
          <FieldError style={{color: 'red'}} name="Gallery Name"/>

          <Label errorClassName= "error" name="Latitude" />
          <TextField name="Latitude" defaultValue={latitude} errorClassName= "error" validation={{ required: true }}  />
          <FieldError style={{color: 'red'}}  name="Latitude"/>

          <Label errorClassName= "error" name="Longitude" />
          <TextField name="Longitude" defaultValue={longitude} errorClassName= "error" validation={{ required: true }}  />
          <FieldError style={{color: 'red'}}  name="Longitude"/>

          <Label errorClassName= "error" name="Trip Date" />
          <MonthField name="tripDate" defaultValue={convertUTCtoMonthYear(tripDate)} errorClassName= "error" validation={{ required: true }}  />
          <FieldError style={{color: 'red'}}  name="tripDate"/>

          <GalleryCell id={galleryId} />

          <ImageUploader
              withIcon={false}
              buttonText="Choose images"
              onChange={choosePhotos}
              imgExtension={['.jpg', '.gif', '.png', '.gif']}
              maxFileSize={5242880}
              withPreview={true}
            />

          <Button onClick={addImagesToGallery}>Add Images to Gallery</Button>


          <Submit>Update Gallery</Submit>

        </Form>
      </div>
    </div>
}
