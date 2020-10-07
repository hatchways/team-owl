import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import PaymentsStyles from './PaymentsStyles';
import CheckoutForm from '../components/paymentComponents/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

export default function Payments() {
  const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

  const classes = PaymentsStyles();
  return (
    <Grid
      container
      alignContent="space-between"
      className={classes.upperBorder}
    >
      <Box mb={5}>
        <Typography variant="h5">Payments</Typography>
      </Box>
      <Grid container alignItems="center" justify="space-between">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </Grid>
    </Grid>
  );
}
