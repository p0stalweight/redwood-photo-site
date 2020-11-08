import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import DndPhotoGrid from 'src/components/DndPhotoGrid'
import { useState } from 'react'

const GalleryForm = (props) => {
  const [photos, setPhotos] = useState(props?.gallery?.photos || [])

  const onSubmit = (data) => {
    props.onSave({ ...data, photos }, props?.gallery?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>
        <TextField
          name="name"
          defaultValue={props.gallery?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="name" className="rw-field-error" />

        <Label
          name="iconImageURL"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Icon image url
        </Label>
        <TextField
          name="iconImageURL"
          defaultValue={props.gallery?.iconImageURL}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="iconImageURL" className="rw-field-error" />

        <DndPhotoGrid photos={photos} setPhotos={setPhotos} />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default GalleryForm
