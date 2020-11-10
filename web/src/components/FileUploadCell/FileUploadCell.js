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
  const imageNames = []

  const choosePhotos = (img) => {
    let UUID = require("uuidjs");
    let uuid = UUID.generate();
    let uniqueImgName = uuid
    imageNames.push(uniqueImgName.replace(/-/g, ""))
    console.log(imageNames[0])

    console.log("new image name:")
    console.log(uniqueImgName.replace(/-/g, ""))

    // Change the file name before setting
    let uniqueImg = createFile(img, uniqueImgName.replace(/-/g, ""))
    setImages([...images, uniqueImg])
  }

  const createFile = (bits, name) => {
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
    alert("image submitted in FileUploadCell")
   }

  const uploadPhotos = async() => {
    //let binaryImage = new Blob([images[0][0]])
    let sha1Image = await blobToSHA1(images[0])

       const response = await fetch(authorizationRequest.backblazeUploadUrl, {
          method: 'POST',
          headers: new Headers({
            Authorization: `${authorizationRequest.backblazeUploadAuthToken}`,
            'X-Bz-File-Name': `${images[0].name}`,
            'Content-Type': 'image/jpeg', //`${images[0][0]['type']}`,
            'X-Bz-Content-Sha1': `${sha1Image}`,
          }),
          body: images[0],
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
