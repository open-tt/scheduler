import React from 'react'
import { Field } from 'react-final-form'

const validateRequired = required => val => {
  const exists = typeof val === 'string' ? !!val.trim() : val !== undefined
  return exists ? undefined : 'Required'
}

const FormField = ({ name, label, defaultValue, required, ...props }) => {
  return (
    <div className="form-field">
      <label>{label}</label>
      <Field
        name={name}
        validate={validateRequired(required)}
        defaultValue={defaultValue}
        render={({ input, meta, ref }) => {
          const error = meta.touched && meta.error
          return (
            <>
              {error && <label data-error>{error}</label>}
              <input {...input} {...props} required={required} />
            </>
          )
        }}
      />
    </div>
  )
}

export default FormField
