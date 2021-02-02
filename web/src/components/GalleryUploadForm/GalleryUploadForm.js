import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
  MonthField,
} from '@redwoodjs/forms'
const GalleryUploadForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.post?.id)
  }
  return (
    <div className="rw-segment-main">
        <Form onSubmit={onSubmit} validation={{ mode: 'onBlur' }}>
          <Label errorClassName="error" name="name">
            Name
          </Label>
          <TextField
            name="name"
            errorClassName="error"
            validation={{ required: true }}
          />
          <FieldError style={{ color: 'red' }} name="name" />

          <Label errorClassName= "error" name="Latitude" />
          <TextField name="Latitude" errorClassName= "error" validation={{ required: true }}  />
          <FieldError style={{color: 'red'}}  name="Latitude"/>

          <Label errorClassName= "error" name="Longitude" />
          <TextField name="Longitude" errorClassName= "error" validation={{ required: true }}  />
          <FieldError style={{color: 'red'}}  name="Longitude"/>

          <Label errorClassName= "error" name="Trip Date" />
          <MonthField name="tripDate" errorClassName= "error" validation={{ required: true }}  />
          <FieldError style={{color: 'red'}}  name="tripDate"/>

          <Submit>Add Gallery</Submit>
        </Form>
      </div>
  )
}

export default GalleryUploadForm
