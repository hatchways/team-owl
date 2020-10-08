import React, { useContext } from 'react';
import axios from 'axios';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Button, CircularProgress, Box } from '@material-ui/core';
import UserContext from '../../context/UserContext';
import { ContestContext } from '../../context/ContestContext';
import { getFromStorage } from '../../helper/localStorage';
import CardSection from './CardSection';
import Alert from '../createContestComponents/Alert';

export default function CardSetupForm({ intentData, display }) {
  const token = getFromStorage('auth_token');

  const stripe = useStripe();
  const elements = useElements();
  const context = useContext(UserContext);
  const contestContext = useContext(ContestContext);
  const { user } = context.state;
  const { alertFn } = contestContext;

  if (user.stripeCreditCustomer) {
    console.log('yes stripe cus account');
  } else {
    console.log('no stripe cus account');
  }

  if (user.stripeBankAcct) {
    console.log('yes stripe bank account');
  } else {
    console.log('no stripe bank account');
  }

  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('to save card');
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardSetup(intentData, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.name,
        },
      },
    });

    if (result.error) {
      console.log(result.error);
      return alertFn('We were not able to save your credit card info.');
    } else {
      console.log(result.setupIntent.payment_method);
      console.log(user.stripeCreditCustomer);
      try {
        const res = await axios.post(
          `/api/v1/payment_methods/${user.stripeCreditCustomer.id}/attach`,
          { payment_method: result.setupIntent.payment_method },
          {
            headers: {
              auth_token: `Bearer ${token}`,
            },
          }
        );
        const data = res.data;
        console.log(data);
        return alertFn('Your credit card info is saved.');
      } catch (error) {
        return console.error(error.message);
      }
    }
  };

  return user ? (
    <form onSubmit={handleSubmit}>
      <Box display={display}>
        <CardSection />
        <Box pt={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!stripe}
          >
            Save Card
          </Button>
          <Alert />
        </Box>
      </Box>
    </form>
  ) : (
    <CircularProgress />
  );
}
