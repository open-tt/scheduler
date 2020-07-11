import React from 'react'
import moment from 'moment'
import context from 'lib/context'
import { withRouter } from 'react-router-dom'
import { Form, Field, FORM_ERROR } from 'react-final-form'
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

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
      return
    }

    const paymentIntent = {
      client_secret: 'ahhh'
    }
    const promises = reservations.map(res => context.api.createReservation(res))

    Promise.all(promises)
      .then(async () => {
        console.log('Reservations saved, trying to process payment.')
        console.log('PROCESSING PAYMENT')

        // const result = await stripe.confirmCardPayment(paymentIntent.client_secret, {
        //   payment_method: {
        //     card: elements.getElement(CardElement),
        //     billing_details: {
        //       name: 'Jenny Rosen',
        //     },
        //   }
        // })

        // if (result.error) {
        //   // Show error to your customer (e.g., insufficient funds)
        //   console.log(result.error.message)

        //   // DELETE RESERVATIONS
        //   return
        // }

        // if (result.paymentIntent.status === 'succeeded') {
        //   // UPDATE RESERVATIONS
        //   // Show success
        // }

        history.push('/my-reservations')
      })
      .catch((err) => {
        // Something here...
      })
      .finally(() => {
      })
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form }) => (
        <form onSubmit={handleSubmit}>
          <CardSection />
          <button disabled={!stripe}>Confirm order</button>
        </form>
      )}
    />
  )
})


const stripePromise = loadStripe("pk_test_aggmgLA6W1bMgAD9bVfscNyL")

const Reserve = ({ blocks, date, club }) => {
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
      <div data-row="2" />

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
    </div>
  )
}

export default Reserve