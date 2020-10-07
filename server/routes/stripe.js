const express = require('express');
const router = express.Router();

const {
  createStripeAccount,
  createStripeAccountLinks,
  getStripeAccount,
  updateStripeAccountById,
  deleteStripeAccountById,
  createPaymentIntent,
} = require('../controllers/stripe');

//auth removed temporarily for testing purposes
//accounts
router.post('/accounts', createStripeAccount);
router.post('/account_links', createStripeAccountLinks);
router.get('/accounts/:id', getStripeAccount);
router.post('/accounts/:id', updateStripeAccountById);
router.delete('/accounts/:id', deleteStripeAccountById);

//paymentIntents
router.post('/payments_intents', createPaymentIntent);

//GET - client secret for paymentIntent Object
router.get('/secret', async (req, res) => {
  const intent = createPaymentIntent();
  res.json({ client_secret: intent.client_secret });
});

module.exports = router;
