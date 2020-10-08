import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import CardSetupForm from '../components/paymentComponents/CheckSetupForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { getFromStorage } from '../helper/localStorage';
import UserContext from '../context/UserContext';

const stripePromise = loadStripe(
  'pk_test_51HWWbQFRhp1apXIhIWnE2plaQLEcE2x9d6lGrAMYZIcQ8aQRuhjnRevRtIeCobxESbJ7P8NWetaeHVEgE3AiGAAO009C2IawZi'
);

export default function Payments() {
  const token = getFromStorage('auth_token');
  const header = { headers: { auth_token: `Bearer ${token}` } };

  const context = useContext(UserContext);
  const { user } = context.state;

  const [intentData, setIntentData] = useState({});
  const [acctLinks, setAcctLinks] = useState('');
  const [display, setDisplay] = useState('none');
  const [bankDisplay, setBankDisplay] = useState('none');
  const [reload, setReload] = useState(false);

  const createIntent = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/setup_intents', null, header);
      const data = res.data;
      setIntentData(data.client_secret);
      setDisplay('block');
    } catch (error) {
      return console.error(error.message);
    }
  };

  const refresh = async (e) => {
    e.preventDefault();
    context.createAccount();
    setReload(!reload);
    setBankDisplay('block');
  };

  const accountLink = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/account_links', null, header);
      const data = res.data;
      setAcctLinks(data);
      window.open(data.url);
    } catch (error) {
      return console.error(error.message);
    }
  };

  useEffect(() => {
    context.createCustomer();
  }, []);

  console.log(user);

  return (
    <div>
      <Box pb={2}>
        <Box mb={1}>
          <Typography variant="h5">Payments</Typography>
        </Box>
        <Box pb={2} pt={1}>
          <Grid>
            <Button variant="contained" color="primary" onClick={createIntent}>
              Setup up Credit Card
            </Button>
            <Box pt={4}>
              <div id="card-element">
                <Elements stripe={stripePromise}>
                  <CardSetupForm intentData={intentData} display={display} />
                </Elements>
              </div>
            </Box>
          </Grid>
        </Box>
      </Box>
      <Box pt={2} pb={6}>
        <Box mb={1}>
          <Typography variant="h5">Banking Info</Typography>
        </Box>
        <Box pb={2} pt={1}>
          <Grid>
            <Button variant="contained" color="primary" onClick={refresh}>
              Setup up Bank Record
            </Button>
          </Grid>
        </Box>
        <Box pb={2} pt={1} display={bankDisplay}>
          <Grid>
            <Button variant="contained" color="primary" onClick={accountLink}>
              Leave Site to go to Stripe
            </Button>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}
