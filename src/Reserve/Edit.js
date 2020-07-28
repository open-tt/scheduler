import React from 'react'
import moment from 'moment'
import context from 'lib/context'
import { withRouter } from 'react-router-dom'
import { Form } from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import useViewport from 'useViewport'

import { STORAGE } from 'lib/constants'
import CardSection from 'form/CardSection'
import Reservations from '../Reservations'
import Loading from 'Loading'
import useClub, { ClubProvider } from 'useClub';
import * as storage from 'lib/storage'

const toDatetime = ({ date, time }) => {
  const { month, day, year } = date
  const m = moment(`${year}-${month}-${day} ${time}`)
  return m.format('YYYY-MM-DD HH:mm ZZ')
}

const getReservations = ({ blocks, date, club }) => {
  return blocks.map(block => ({
    club,
    club_id: club.id,
    "start_date": toDatetime({ date, time: block.start }),
    "end_date": toDatetime({ date, time: block.end }),
    "size": 1,
    "reservation_type": "play",
  }))
}

const CheckoutForm = withRouter(({ history, amountInCents, blocks, date }) => {
  const { club } = useClub()
  const stripe = useStripe()
  const elements = useElements()
  const reservations = getReservations({ blocks, date, club })

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
          storage.setObject(STORAGE.RESERVE, {})
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
        <form onSubmit={handleSubmit} className="StripeForm">
          <label>Test Card: 4242-4242-4242-4242</label>
          <CardSection />
          <label data-error>{submitError}</label><br />
          <button disabled={!stripe}>Confirm order</button>
        </form>
      )}
    />
  )
})

const stripePromise = loadStripe("pk_test_aggmgLA6W1bMgAD9bVfscNyL")

const Selection = ({ blocks, date }) => {
  const { club } = useClub()
  const reservations = getReservations({ blocks, date, club })

  return (
    <>
      <label data-faded>Selected Reservations</label>
      <Reservations reservations={reservations} />
    </>
  )
}

const _Edit = ({ onCancel }) => {
  const { club, loading } = useClub()
  const { vw, vh } = useViewport()
  const collapse = vw < 768

  if (loading) {
    return <Loading />
  }

  if (!club) {
    return 'Club not found.'
  }

  const data = storage.getObject(STORAGE.RESERVE)
  const blocks = data.blocks || []
  const date = data.date || {}

  console.log(blocks)

  const amountInCents = 1000

  return (
    <div>
      <div data-row>
        <div data-col="12">
          <h1>Confirm Reservations</h1>
          <div data-row="2" />
        </div>
      </div>

      {collapse ?
        (
          <div data-row>
            <div data-col="12">
              <Selection blocks={blocks} date={date} />
              <label data-faded>Reservations For</label>
              <p>{context.state.user.name}</p>
              <p>{context.state.user.email}</p>
              <div data-row="2" />
              <label data-faded>Total Due</label>
              <p>${(amountInCents / 100).toFixed(2)}</p>
              <div data-row="2" />
              <Elements stripe={stripePromise}>
                <CheckoutForm blocks={blocks} date={date} amountInCents={amountInCents} />
              </Elements>
            </div>
          </div>
        )
        : (
          <div data-row>
            <div data-col="6">
              <Selection blocks={blocks} date={date} />
            </div>
            <div data-col="6">
              <label data-faded>Reservations For</label>
              <p>{context.state.user.name}</p>
              <p>{context.state.user.email}</p>
              <div data-row="2" />
              <label data-faded>Total Due</label>
              <p>${(amountInCents / 100).toFixed(2)}</p>
              <div data-row="2" />
              <Elements stripe={stripePromise}>
                <CheckoutForm blocks={blocks} date={date} amountInCents={amountInCents} />
              </Elements>
            </div>
          </div>
        )}
    </div>
  )
}

export const Edit = () => (
  <ClubProvider>
    <_Edit />
  </ClubProvider>
)