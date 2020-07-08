import React, { useState, useEffect } from 'react'
import { Form, Field } from 'react-final-form'
import context from 'lib/context'
import { DEFAULT_SCHEDULE_CONFIG } from './lib/constants'

const FormField = ({ label, defaultValue, ...props }) => {
  return (
    <div className="form-field">
      <label>{label}</label>
      <Field
        component="input"
        defaultValue={defaultValue}
        {...props}
      />
    </div>
  )
}

const Admin = () => {
  const { api, state: { user } } = context
  const [scheduleConfig, setScheduleConfig] = useState()

  useEffect(() => {
    api.getScheduleConfig().then(config => setScheduleConfig(config))
  }, [])

  const config = scheduleConfig || DEFAULT_SCHEDULE_CONFIG

  const onSubmit = (values) => {
    api.updateScheduleConfig({
      interval_size_in_minutes: values.interval_size_in_minutes,
      day_start_time: `0000-00-00 ${values.day_start_time}`,
      day_end_time: `0000-00-00 ${values.day_end_time}`,
      availability_per_interval: values.availability_per_interval,
      price_per_participant: values.price_per_participant
    }).then(({ auth_token }) => {
      // console.log(auth_token)
      // context.authenticate({ auth_token })
    })
  }

  if (!user) {
    return 'Loading...'
  }

  return (
    <div>
      <h1>Admin // Club {user.name}</h1>
      <br />

      <Form
        onSubmit={onSubmit}
        // validate={validate}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <h2>Schedule Config</h2>

            <FormField
              label="Reservation Length (Minutes)"
              name="interval_size_in_minutes"
              type="number"
              step={30}
              min={30}
              max={120}
              defaultValue={config.interval_size_in_minutes}
            />

            <FormField
              label="Opening Time"
              name="day_start_time"
              type="time"
              defaultValue={config.day_start_time.split(' ')[1]}
            />

            <FormField
              label="Closing Time"
              name="day_end_time"
              type="time"
              defaultValue={config.day_end_time.split(' ')[1]}
            />

            <FormField
              label="Maximum Capacity"
              name="availability_per_interval"
              type="number"
              step={1}
              min={2}
              defaultValue={config.availability_per_interval}
            />

            <FormField
              label="Price (per player, per reservation)"
              name="price_per_participant"
              type="number"
              step={1}
              min={0}
              defaultValue={config.price_per_participant}
            />

            <button onClick={handleSubmit}>update schedule config</button>
          </form>
        )} />
    </div >
  )
}

export default Admin
