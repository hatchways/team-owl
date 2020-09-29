import React from 'react';
import CheckoutForm from '../components/paymentComponents/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Box, Grid, Typography } from '@material-ui/core';
import PaymentsStyles from './PaymentsStyles';

export default function Payments() {
  //const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  //const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
  const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

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
