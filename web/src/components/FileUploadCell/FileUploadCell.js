import { Button } from "@chakra-ui/core"
import  ImageUploader from 'react-images-upload'
import { useState } from 'react'

export const QUERY = gql`
  query {
    authorizationRequest: getAuthorizationRequest {
      authorizationToken
      backblazeApiUrl
      backblazeDownloadUrl
    }
  }
`

const submitImage = () => {
 alert("image submitted in FileUploadCell")
}

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ authorizationRequest }) => {
  const [images, setImages] = useState([])

  const choosePhotos = (img) => {
    setImages([...images, img])
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
