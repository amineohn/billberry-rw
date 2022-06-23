import { useState } from 'react'

import {
  Form,
  FormError,
  FieldError,
  Label,
  DatetimeLocalField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

//import Combo from 'src/components/Combobox'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const TaskForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.task?.id)
  }
  /*
  const data = [
    { id: 1, name: 'Durward Reynolds', unavailable: false },
    { id: 2, name: 'Kenton Towne', unavailable: false },
    { id: 3, name: 'Therese Wunsch', unavailable: false },
    { id: 4, name: 'Benedict Kessler', unavailable: true },
    { id: 5, name: 'Katelyn Rohan', unavailable: false },
  ]
  const [query, setQuery] = useState('')*/
  console.log(props)
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
          name="plannedAt"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Planned at
        </Label>

        <DatetimeLocalField
          name="plannedAt"
          defaultValue={formatDatetime(props.task?.plannedAt)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="plannedAt" className="rw-field-error" />

        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="start"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Start
        </Label>

        <DatetimeLocalField
          name="plannedAt"
          defaultValue={formatDatetime(props.task?.start)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="start" className="rw-field-error" />

        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="end"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          end
        </Label>

        <DatetimeLocalField
          name="plannedAt"
          defaultValue={formatDatetime(props.task?.end)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="end" className="rw-field-error" />

        <Label
          name="workerId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Worker id
        </Label>
        {/*
          <Combo
            data={data as any}
            query={query}
            onChange={(event) => setQuery(event.target.value)}
            setQuery={() => setQuery('')}
          /> */}
        <NumberField
          name="workerId"
          defaultValue={props.task?.workerId}
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
          defaultValue={props.task?.customerId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="customerId" className="rw-field-error" />

        <Label
          name="siteId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Site id
        </Label>

        <NumberField
          name="siteId"
          defaultValue={props.task?.siteId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="siteId" className="rw-field-error" />

        <Label
          name="containerId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Container id
        </Label>

        <NumberField
          name="containerId"
          defaultValue={props.task?.containerId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="containerId" className="rw-field-error" />

        <Label
          name="materialId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Material id
        </Label>

        <NumberField
          name="materialId"
          defaultValue={props.task?.materialId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="materialId" className="rw-field-error" />

        <Label
          name="serviceId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Service id
        </Label>

        <NumberField
          name="serviceId"
          defaultValue={props.task?.serviceId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="serviceId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default TaskForm
