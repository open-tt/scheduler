import React, { useState, useEffect } from 'react'
import { Form, Field } from 'react-final-form'
import { withRouter, Link } from 'react-router-dom'
import FormField from './form/FormField'
import Loading from 'Loading'
import context from 'lib/context'
import { DEFAULT_SCHEDULE_CONFIG } from './lib/constants'
import useViewport from './useViewport';

const ProfileForm = () => {
  const { api, state: { user } } = context

  const updateProfile = (values) => {
    return api.updateUser({
      id: user.id,
      name: values.name
    }).then(() => {
    })
  }

  return (
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
  )
}

const PaymentConfigForm = () => {
  const { api, state: { user } } = context

  const updateProfile = (values) => {
    return api.updateUser({
      id: user.id,
      name: values.name
    }).then(() => {
    })
  }

  return (
    <Form
      onSubmit={updateProfile}
      // validate={validate}
      render={({ handleSubmit, submitSucceeded }) => (
        <form onSubmit={handleSubmit}>
          <h2>Edit Payment Settings (coming soon)</h2>
          <p data-p3>*Both Stripe keys are required to accept card payments. Find them by logging into your account on Stripe, and looking under "Standard keys" at <a href="https://dashboard.stripe.com/apikeys" target="_blank" rel="noopener noreferrer">https://dashboard.stripe.com/apikeys</a>.</p>

          <FormField
            label="Stripe Publishable Key*"
            name="stripe_public_key"
            type="text"
          // defaultValue={user.name}
          />

          <FormField
            label="Stripe Secret Key*"
            name="stripe_secret_key"
            type="text"
          // defaultValue={user.name}
          />

          {submitSucceeded && <label>Success!</label>}
          <button onClick={handleSubmit}>Update Payment Settings</button>
        </form>
      )}
    />
  )
}

const ScheduleConfigForm = () => {
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

  return (
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
          <button onClick={handleSubmit}>Update Schedule Settings</button>
        </form>
      )}
    />
  )
}

const Admin = withRouter(({ history }) => {
  const { api, state: { user } } = context
  const { vw, vh } = useViewport()

  const collapse = vw < 768

  if (!user) {
    return <Loading />
  }

  return (
    <div data-row>
      <div data-col="12">
        <h3>{user.name}</h3>
        <h1>Admin Dashboard</h1>
        <Link to="/admin/reservations">View all club reservations</Link>
        <br />
        <br />

        {collapse ? (
          <>
            <ProfileForm />
            <div data-row="3" />
            <PaymentConfigForm />
            <div data-row="3" />
            <ScheduleConfigForm />
          </>
        ) : (
            <div data-row>
              <div data-col='5'>
                <ProfileForm />
                <div data-row="2" />
                <PaymentConfigForm />
              </div>
              <div data-col="1" />
              <div data-col='6'>
                <ScheduleConfigForm />
              </div>
            </div>
          )}
      </div>
    </div >
  )
})

export default Admin
