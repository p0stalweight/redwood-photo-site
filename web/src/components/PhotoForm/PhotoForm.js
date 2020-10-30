import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const PhotoForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.photo?.id)
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
          name="order"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Order
        </Label>
        <NumberField
          name="order"
          defaultValue={props.photo?.order}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="order" className="rw-field-error" />

        <Label
          name="imageURL"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Image url
        </Label>
        <TextField
          name="imageURL"
          defaultValue={props.photo?.imageURL}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="imageURL" className="rw-field-error" />

        <Label
          name="galleryId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Gallery id
        </Label>
        <NumberField
          name="galleryId"
          defaultValue={props.photo?.galleryId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="galleryId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PhotoForm
