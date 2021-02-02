import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
  MonthField,
} from '@redwoodjs/forms'
const GalleryUploadForm = ({onSave, name, latitude, longitude, tripDate}) => {
  const onSubmit = (data) => {
    onSave(data)
  }

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
    <div className="rw-segment-main">
        <Form onSubmit={onSubmit} validation={{ mode: 'onBlur' }}>
          <Label errorClassName="error" name="name">
            Name
          </Label>
          <TextField
            name="name"
            defaultValue={name}
            errorClassName="error"
            validation={{ required: true }}
          />
          <FieldError style={{ color: 'red' }} name="name" />

          <Label errorClassName= "error" name="Latitude" />
          <TextField
            name="Latitude"
            defaultValue={latitude}
            errorClassName= "error"
            validation={{ required: true }}
          />
          <FieldError style={{color: 'red'}}  name="Latitude"/>

          <Label errorClassName= "error" name="Longitude" />
          <TextField
            name="Longitude"
            defaultValue={longitude}
            errorClassName= "error"
            validation={{ required: true }}
          />
          <FieldError style={{color: 'red'}}  name="Longitude"/>

          <Label errorClassName= "error" name="Trip Date" />
          <MonthField
            name="tripDate"
            defaultValue={convertUTCtoMonthYear(tripDate)}
            errorClassName= "error"
            validation={{ required: true }}
          />
          <FieldError style={{color: 'red'}}  name="tripDate"/>

          <Submit>Add Gallery</Submit>
        </Form>
      </div>
  )
}

export default GalleryUploadForm
