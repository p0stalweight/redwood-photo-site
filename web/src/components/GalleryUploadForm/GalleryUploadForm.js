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
    props.onSave(data)
  }

  const convertUTCtoMonthYear = (date) => {
    if (date === undefined) {
      return
    }
    const month = getMonthFromMonthFieldString(date)
    const year = getYearFromMonthFieldString(date)
    return `${year}-${month}`
  }

  const getYearFromMonthFieldString = (date) => {
    let year = date.substr(0, date.indexOf('-'))
    return year
  }

  const getMonthFromMonthFieldString = (date) => {
    let month = date.substr(date.indexOf('-') + 1, 2)
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
            defaultValue={props.gallery?.name}
            errorClassName="error"
            validation={{ required: true }}
          />
          <FieldError style={{ color: 'red' }} name="name" />

          <Label errorClassName= "error" name="Latitude" />
          <TextField
            name="Latitude"
            defaultValue={props.gallery?.latitude}
            errorClassName= "error"
            validation={{ required: true }}
          />
          <FieldError style={{color: 'red'}}  name="Latitude"/>

          <Label errorClassName= "error" name="Longitude" />
          <TextField
            name="Longitude"
            defaultValue={props.gallery?.longitude}
            errorClassName= "error"
            validation={{ required: true }}
          />
          <FieldError style={{color: 'red'}}  name="Longitude"/>

          <Label errorClassName= "error" name="Trip Date" />
          <MonthField
            name="tripDate"
            defaultValue={convertUTCtoMonthYear(props.gallery?.tripDate)}
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
