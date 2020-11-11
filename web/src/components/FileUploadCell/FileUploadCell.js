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

   const generateGallery = () => {
     // Build a gallery object
     // Build a set of photo objects that match the names for the uploaded images
     // Change for commit
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

  return<div>

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
