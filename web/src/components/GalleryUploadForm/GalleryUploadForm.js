import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
  MonthField,
} from '@redwoodjs/forms'
import { useState } from 'react'
import AdminMap from 'src/components/AdminMap'
import { Box, Flex } from '@chakra-ui/core'

const GalleryUploadForm = (props) => {

  const [coordinates, setCoordinates] = useState({lat: '0', lng: '0'})

  const onSubmit = (data) => {
    props.onSave(data)

  }

  const sendMapData = (data) => {
    console.log(`latitude: ${data.lat}, longitude: ${data.lng}`)
    setCoordinates({lat: data.lat, lng: data.lng})
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
            value={coordinates.lat}
            errorClassName= "error"
            validation={{ required: true }}
          />
          <FieldError style={{color: 'red'}}  name="Latitude"/>

          <Label errorClassName= "error" name="Longitude" />
          <TextField
            name="Longitude"
            defaultValue={props.gallery?.longitude}
            value={coordinates.lng}
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

          <AdminMap mapSelected={sendMapData} />

          <Submit>Add Gallery</Submit>
        </Form>
      </div>
  )
}

export default GalleryUploadForm
