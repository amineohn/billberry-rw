import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'



const MissionForm = (props) => {
  const onSubmit = (data) => {

  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.mission?.id)
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
          name="status"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Status
        </Label>
        
          <TextField
            name="status"
            defaultValue={props.mission?.status}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="status" className="rw-field-error" />

        <Label
          name="workerId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Worker id
        </Label>
        
          <NumberField
            name="workerId"
            defaultValue={props.mission?.workerId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="workerId" className="rw-field-error" />

        <Label
          name="customerId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Customer id
        </Label>
        
          <NumberField
            name="customerId"
            defaultValue={props.mission?.customerId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="customerId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit
            disabled={props.loading}
            className="rw-button rw-button-blue"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default MissionForm
