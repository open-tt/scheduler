import React from 'react'
import { CardElement } from '@stripe/react-stripe-js'

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Source Sans Pro", Arial, Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
}

const CardSection = () => {
  return (
    <div className="form-field">
      <label data-faded>
        Payment details
      </label>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
    </div>
  )
}

export default CardSection