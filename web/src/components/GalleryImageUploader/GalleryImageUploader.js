import  ImageUploader from 'react-images-upload'

const GalleryImageUploader = () => {

  const [pictures, setPictures] = React.useState([])

  const handleChange = (picture) => {
    setPictures([...pictures, picture])
    console.log(pictures)
  }

  return (
      <ImageUploader
        withIcon={false}
        buttonText="Choose images"
        onChange={handleChange}
        imgExtension={['.jpg', '.gif', '.png', '.gif']}
        maxFileSize={5242880}
        withPreview={true}
      />

  )
}

export default GalleryImageUploader
