import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'

const SiteForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.site?.id)
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
          defaultValue={props.site?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="type"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Type
        </Label>

        <TextField
          name="type"
          defaultValue={props.site?.type}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="type" className="rw-field-error" />

        <Label
          name="commercial"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Commercial
        </Label>

        <TextField
          name="commercial"
          defaultValue={props.site?.commercial}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="commercial" className="rw-field-error" />

        <Label
          name="active"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Active
        </Label>

        <CheckboxField
          name="active"
          defaultChecked={props.site?.active}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="active" className="rw-field-error" />

        <Label
          name="contact"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Contact
        </Label>

        <TextField
          name="contact"
          defaultValue={props.site?.contact}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="contact" className="rw-field-error" />

        <Label
          name="siret"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Siret
        </Label>

        <TextField
          name="siret"
          defaultValue={props.site?.siret}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="siret" className="rw-field-error" />

        <Label
          name="mail"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Mail
        </Label>

        <TextField
          name="mail"
          defaultValue={props.site?.mail}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="mail" className="rw-field-error" />

        <Label
          name="phone"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Phone
        </Label>

        <TextField
          name="phone"
          defaultValue={props.site?.phone}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="phone" className="rw-field-error" />

        <Label
          name="billingAddress"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Billing address
        </Label>

        <TextField
          name="billingAddress"
          defaultValue={props.site?.billingAddress}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="billingAddress" className="rw-field-error" />

        <Label
          name="typeofPass"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Typeof pass
        </Label>

        <TextField
          name="typeofPass"
          defaultValue={props.site?.typeofPass}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="typeofPass" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default SiteForm
