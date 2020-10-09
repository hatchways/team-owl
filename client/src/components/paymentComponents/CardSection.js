import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import { InputLabel, Box } from '@material-ui/core';
import './CardSectionStyles.css';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

function CardSection() {
  return (
    <Box width={400}>
      <InputLabel>
        Card details
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </InputLabel>
    </Box>
  );
}

export default CardSection;
