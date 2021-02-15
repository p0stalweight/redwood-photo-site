import { useMutation } from '@redwoodjs/web'
import {
  navigate,
  routes,
  Router,
  Routes
} from '@redwoodjs/router'
import GalleryUploadForm from 'src/components/GalleryUploadForm'
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
      size
    }
    fileUploadAuth {
      authToken
      uploadUrl
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ fileUploadAuth, gallery: { galleryId, name, latitude, longitude, tripDate, photos, size } }) => {

  const [images, setImages] = useState([])

  const [imageFileNames, setImageFileNames] = useState([])

  let imageFileNamesTemp = []

  const choosePhotos = (img) => {
    setImages(img)
  }

  /* GRAPHQL MUTATIONS */

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

  /* ADD IMAGES: Adds new images to an existing gallery */
  const addImagesToGallery = async() => {
    console.log("adding images")
    await uploadPhotos()

   var photoSet = []
    for (let index = 0; index < imageFileNamesTemp.length; index++) {
      console.log("Image names during photo object creation:")
      console.log(imageFileNamesTemp[index])

      photoSet.push({ order: index + size + 1, imageURL: "https://f002.backblazeb2.com/file/redwood-photo/"+ imageFileNamesTemp[index] })
    }

    const input = { photos: photoSet }
    await addPhotosToGallery({ variables: { id: galleryId, input: input } })

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
    console.log("formData:")
    console.log(formData)
    let year = getYearFromMonthFieldString(formData.tripDate)
    let month = getMonthFromMonthFieldString(formData.tripDate)

    let tripDate = new Date()
    tripDate.setMonth(Number(month) - 1) // JS dates are indexed from 0-11, MonthField is 1-12
    tripDate.setYear(Number(year))

    let convertedTripDate = tripDate.toISOString()
    const testInput = { name: `${formData.name}`, latitude: parseFloat(`${formData.Latitude}`),
                        longitude: parseFloat(`${formData.Longitude}`), tripDate: `${convertedTripDate}` }

    changeGallery({ variables: {id: galleryId, input: testInput, } })
    navigate(routes.manageGalleries())
  }

  /* IMAGE UPLOAD */
  const uploadPhotos = async() =>  {
    const { uploadUrl, authToken } = fileUploadAuth
    let imageNames = []

    for (let index = 0; index < images.length; index++) {
      let imageFile = makeFileNameUnique([images[index]])
      imageNames.push(imageFile.name)

      let sha1Image = await blobToSHA1(imageFile)

      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: new Headers({
          Authorization: `${authToken}`,
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

      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading" style ={{ textAlign: 'center' }}>Edit Gallery: {name} </h2>
      </header>

      <Button onClick={removeGallery}>Remove Gallery</Button>

      <div className="rw-segment-main">
        <GalleryUploadForm gallery = {{ name:name, latitude:latitude, longitude: longitude, tripDate: tripDate,}} onSave={modifyGallery}/>
        <GalleryCell id={ parseInt(galleryId) } />
        <ImageUploader
          withIcon={false}
          buttonText="Choose images"
          onChange={choosePhotos}
          imgExtension={['.jpg', '.gif', '.png', '.gif']}
          maxFileSize={5242880}
          withPreview={true}
        />
        <Button onClick={addImagesToGallery}>Add Images to Gallery</Button>
      </div>
    </div>
}
