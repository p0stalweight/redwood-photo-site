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

  const submitImage = () => {
    uploadPhotos()
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
      onCompleted: () => {
        navigate(routes.adminGalleries())
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const generateGallery = () => {
    createGallery({ variables: { name: 'SampleGallery', iconImageURL: 'www.test.com', photos: [] } })
    console.log("gallery generated")
   }

  const uploadPhotos = async() =>  {

    for (let index = 0; index < images.length; index++) {
      console.log(images[index])
      let imageFile = makeFileNameUnique([images[index]])
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

  }



  const onSave = (input) => {
    console.log(input)
  }

  return<div>
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Gallery</h2>
      </header>
      <div className="rw-segment-main">
        <GalleryForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>

    <ImageUploader
          withIcon={false}
          buttonText="Choose images"
          onChange={choosePhotos}
          imgExtension={['.jpg', '.gif', '.png', '.gif']}
          maxFileSize={5242880}
          withPreview={true}
        />

      <Button onClick={() => submitImage()}> Submit Image</Button>
      <Button onClick={() => generateGallery()}> Generate Gallery </Button>
    </div>

}
