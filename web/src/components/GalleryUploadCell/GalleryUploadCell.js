import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import GalleryUploadForm from 'src/components/GalleryUploadForm'
import ImageUploader from 'react-images-upload'
import Resizer from 'react-image-file-resizer'
import { useState } from 'react'
import blobToSHA1 from 'blob-to-sha1'
import { v4 as uuidv4 } from 'uuid'

export const QUERY = gql`
  query FILE_UPLOAD_AUTH {
    fileUploadAuth {
      authToken
      uploadUrl
    }
  }
`
const CREATE_GALLERY_MUTATION = gql`
  mutation CreateGalleryMutation($input: CreateGalleryInput!) {
    gallery: createGallery(input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ fileUploadAuth }) => {
  const [images, setImages] = useState([])

  const [createGallery, { loading, error }] = useMutation(
    CREATE_GALLERY_MUTATION,
    {
      onCompleted: ({ gallery }) => {
        console.log(gallery.id)
        // TODO: Navigate to the manage galleries
      },
    }
  )

  const uploadPhotos = async () => {
    const { uploadUrl, authToken } = fileUploadAuth

    const upload = async (file) => {
      return fetch(uploadUrl, {
        method: 'POST',
        headers: new Headers({
          Authorization: authToken,
          'X-Bz-File-Name': file.name,
          'Content-Type': file.type,
          'X-Bz-Content-Sha1': await blobToSHA1(file),
        }),
        body: file,
      })
    }

    const resize = (image) =>
      new Promise((resolve) => {
        Resizer.imageFileResizer(
          image,
          500, // maxWidth
          500, // maxHeight
          image.type.substring(6), // format (trim 'image/' prefix)
          100, // quality (0..100)
          0, // rotation
          (result) => {
            const renamedFile = new File([result], image.name + 'mini', {
              type: result.type,
            })
            resolve(renamedFile)
          },
          'blob' // outputType: blob or base64 URI
        )
      })

    const renamedImages = images.map((file) => {
      return new File([file], uuidv4().replace(/-/g, ''), { type: file.type })
    })

    for (const image of renamedImages) {
      await upload(image)
      await upload(await resize(image))
    }

    return renamedImages.map((file) => file.name)
  }

  /* Form Submission */
  const onSubmit = async (formData) => {
    if (images.length < 1) {
      console.log('No photos to upload, cancelled')
      return
    }

    const imageNames = await uploadPhotos()

    let year = getYearFromMonthFieldString(formData.tripDate)
    let month = getMonthFromMonthFieldString(formData.tripDate)
    let tripDate = new Date()
    tripDate.setMonth(Number(month) - 1) // JS dates are indexed from 0-11, MonthField is 1-12
    tripDate.setYear(Number(year))
    let convertedTripDate = tripDate.toISOString()

    const photos = imageNames.map((name, i) => {
      return {
        imageURL: 'https://f002.backblazeb2.com/file/redwood-photo/' + name,
        order: i + 1,
      }
    })

    const input = { name: formData.name,
                    iconImageURL: "https://f002.backblazeb2.com/file/redwood-photo/"+ imageNames[0],
                    latitude: parseFloat(`${formData.Latitude}`),
                    longitude: parseFloat(`${formData.Longitude}`),
                    tripDate: `${convertedTripDate}`,
                    photos,
                  }
    createGallery({ variables: { input } })
    console.log("Gallery Created!")
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

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading" style={{ textAlign: 'center' }}>
          New Gallery
        </h2>
      </header>
      <GalleryUploadForm onSave={onSubmit}/>
      <ImageUploader
        withIcon={false}
        buttonText="Choose images"
        onChange={setImages}
        imgExtension={['.jpg', '.gif', '.png']}
        maxFileSize={5242880}
        withPreview
      />
    </div>
  )
}
