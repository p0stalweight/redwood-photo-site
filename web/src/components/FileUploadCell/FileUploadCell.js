import { Button } from "@chakra-ui/core"
import  ImageUploader from 'react-images-upload'
import { useState } from 'react'
import sha1 from 'js-sha1'
import blobToSHA1 from 'blob-to-sha1'

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
    setImages([...images, img])
  }

  const submitImage = () => {
    uploadPhotos()
    alert("image submitted in FileUploadCell")
   }

  const uploadPhotos = async() => {
    let binaryImage = new Blob([images[0][0]])
    let sha1Image = await blobToSHA1(binaryImage)

    let proxyURL = 'https://cors-anywhere.herokuapp.com/'
       const response = await fetch(authorizationRequest.backblazeUploadUrl, {
          method: 'POST',
          headers: new Headers({
            Authorization: `${authorizationRequest.backblazeUploadAuthToken}`,
            'X-Bz-File-Name': `${images[0][0]['name']}`,
            'Content-Type': `${images[0][0]['type']}`,
            'X-Bz-Content-Sha1': `${sha1Image}`,
          }),
          body: binaryImage,
        })
          let responseJson = await response.json()
          console.log(responseJson)
      }

  return<div>

  {JSON.stringify(authorizationRequest)}
  <p>FileUploadCell</p>
  <Button onClick={() => submitImage()}> Submit Image</Button>

  <ImageUploader
        withIcon={false}
        buttonText="Choose images"
        onChange={choosePhotos}
        imgExtension={['.jpg', '.gif', '.png', '.gif']}
        maxFileSize={5242880}
        withPreview={true}
      />

  </div>

}
