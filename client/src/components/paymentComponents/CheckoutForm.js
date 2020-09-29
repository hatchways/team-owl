import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { InputLabel, Box } from '@material-ui/core';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const cardOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        letterSpacing: '0.025em',
        '::placeholder': {
          color: '#aab7c4',
        },
        width: 400,
      },
      invalid: {
        color: '#c23d4b',
      },
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
  };

  return (
    <Box width={300}>
      <form onSubmit={handleSubmit}>
        <InputLabel>Card Details</InputLabel>
        <CardElement options={cardOptions} />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    </Box>
  );
};

export default CheckoutForm;
