import React, { useState, useEffect } from 'react'
import { Form, Field } from 'react-final-form'
import { withRouter } from 'react-router-dom'
import FormField from './form/FormField'
import Loading from 'Loading'
import context from 'lib/context'
import { DEFAULT_SCHEDULE_CONFIG } from './lib/constants'

const Admin = withRouter(({ history }) => {
  const { api, state: { user } } = context
  const [scheduleConfig, setScheduleConfig] = useState()

  useEffect(() => {
    api.getScheduleConfig().then(config => setScheduleConfig(config))
  }, [])

  const config = scheduleConfig || DEFAULT_SCHEDULE_CONFIG

  const updateScheduleConfig = (values) => {
    return api.updateScheduleConfig({
      interval_size_in_minutes: values.interval_size_in_minutes,
      day_start_time: `0000-00-00 ${values.day_start_time}`,
      day_end_time: `0000-00-00 ${values.day_end_time}`,
      availability_per_interval: values.availability_per_interval,
      price_per_participant: values.price_per_participant
    }).then(() => {
    })
  }

  const updateProfile = (values) => {
    return api.updateUser({
      id: user.id,
      name: values.name
    }).then(() => {
    })
  }

  if (!user) {
    return <Loading />
  }

  return (
    <div data-row>
      <div data-col="12">
        <h3>{user.name}</h3>
        <h1>Admin Dashboard</h1>
        <br />

        <Form
          onSubmit={updateProfile}
          // validate={validate}
          render={({ handleSubmit, submitSucceeded }) => (
            <form onSubmit={handleSubmit}>
              <h2>Edit Profile</h2>

              <FormField
                label="Name"
                name="name"
                type="text"
                required={true}
                defaultValue={user.name}
              />

              {submitSucceeded && <label>Success!</label>}
              <button onClick={handleSubmit}>Update Profile</button>
            </form>
          )}
        />

        <br />
        <br />

        <Form
          onSubmit={updateScheduleConfig}
          // validate={validate}
          render={({ handleSubmit, submitSucceeded }) => (
            <form onSubmit={handleSubmit}>
              <h2>Edit Schedule Settings</h2>

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

              {submitSucceeded && <label>Success!</label>}
              <button onClick={handleSubmit}>Update Settings</button>
            </form>
          )}
        />
      </div>
    </div>
  )
})

export default Admin
