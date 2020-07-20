import React from 'react'
import moment from 'moment'
import context from 'lib/context'
import { withRouter } from 'react-router-dom'
import { Form } from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import useViewport from 'useViewport'

import CardSection from 'form/CardSection'
import Reservations from '../Reservations'

const toDatetime = ({ date, time }) => {
  const { month, day, year } = date
  const m = moment(`${year}-${month}-${day} ${time}`)
  return m.format('YYYY-MM-DD HH:mm')
}

const CheckoutForm = withRouter(({ history, reservations, amountInCents }) => {
  const stripe = useStripe()
  const elements = useElements()

  const onSubmit = async (values) => {
    if (!stripe || !elements) {
      console.error('Cannot process.')
      return { [FORM_ERROR]: 'Could not connect to payment provider. Please refresh.' }
    }

    try {
      const { error, token } = await stripe.createToken(elements.getElement(CardElement))

      if (error) {
        console.error('Could not create card token.', error)
        return { [FORM_ERROR]: error.message }
      }

      context.api.createReservations({
        reservations,
        cc_token: token
      })
        .then(async () => {
          history.push('/my-reservations')
        })
        .catch((err) => {
          console.error('Could not complete reservations.', error)
          return { [FORM_ERROR]: err.message }
        })
    } catch (stripeError) {
      console.error('Could not connect to Stripe.', stripeError)
      return { [FORM_ERROR]: stripeError.message }
    }
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitError }) => (
        <form onSubmit={handleSubmit}>
          <label>Test Card: 4242-4242-4242-4242 w/ any valid date</label>
          <CardSection />
          <label data-error>{submitError}</label><br />
          <button disabled={!stripe}>Confirm order</button>
        </form>
      )}
    />
  )
})

const stripePromise = loadStripe("pk_test_aggmgLA6W1bMgAD9bVfscNyL")

const Reserve = ({ blocks, date, club, onCancel }) => {
  const { vw, vh } = useViewport()
  const collapse = vw < 768

  const reservations = blocks.map(block => ({
    club,
    club_id: club.id,
    "start_date": toDatetime({ date, time: block.start }),
    "end_date": toDatetime({ date, time: block.end }),
    "size": 1,
    "reservation_type": "play",
  }))

  const amountInCents = 1000

  return (
    <div>
      <h1>Confirm Reservations</h1>
      <label onClick={onCancel}>Edit Selection</label>
      <div data-row="2" />

      {collapse ?
        (
          <>
            <label>Selected Reservations</label>
            <Reservations reservations={reservations} />
            <label>Reservations For</label>
            <p>{context.state.user.name}</p>
            <p>{context.state.user.email}</p>
            <div data-row="2" />
            <label>Total Due</label>
            <p>${(amountInCents / 100).toFixed(2)}</p>
            <div data-row="2" />
            <Elements stripe={stripePromise}>
              <CheckoutForm reservations={reservations} amountInCents={amountInCents} />
            </Elements>
          </>
        )
        : (
          <div data-row>
            <div data-col="6">
              <label>Selected Reservations</label>
              <Reservations reservations={reservations} />
            </div>
            <div data-col="6">
              <label>Reservations For</label>
              <p>{context.state.user.name}</p>
              <p>{context.state.user.email}</p>
              <div data-row="2" />
              <label>Total Due</label>
              <p>${(amountInCents / 100).toFixed(2)}</p>
              <div data-row="2" />
              <Elements stripe={stripePromise}>
                <CheckoutForm reservations={reservations} amountInCents={amountInCents} />
              </Elements>
            </div>
          </div>
        )}
    </div>
  )
}

export default Reserve