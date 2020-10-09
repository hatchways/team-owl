const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

const {
  createConnectedAccount,
  createConnectedAccountLinks,
  getConnectedAccount,
  updateConnectedAccountById,
  deleteConnectedAccountById,
  createPaymentIntent,
  getPaymentIntentById,
  getPaymentIntentSecretById,
  createCustomer,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
  getAllCustomers,
  createSetupIntent,
  getSetupIntentById,
  updateSetupIntentById,
  confirmSetupIntentById,
  cancelSetupIntentById,
  getAllSetupIntents,
  createPaymentMethod,
  getPaymentMethodById,
  updatePaymentMethodById,
  getCustomerPaymentMethods,
  attachPaymentMethodById,
  detachPaymentMethodById,
} = require('../controllers/stripe');

//connected accounts
router.post('/accounts', auth, createConnectedAccount);
router.post('/account_links', auth, createConnectedAccountLinks);
router.get('/accounts/:id', getConnectedAccount);
router.post('/accounts/:id', updateConnectedAccountById);
router.delete('/accounts/:id', deleteConnectedAccountById);

//paymentIntents
router.post('/payment_intents', auth, createPaymentIntent);
router.get('/payment_intents/:id', getPaymentIntentById);
router.get('/payment_intents/:id/secret', getPaymentIntentSecretById);

//credit card customer accounts
router.post('/customers', auth, createCustomer);
router.get('/customers/:id', getCustomerById);
router.put('/customers/:id', auth, updateCustomerById);
router.delete('/customers/:id', deleteCustomerById);
router.get('/customers', getAllCustomers);

//setupIntents - collect credit card info
router.post('/setup_intents', auth, createSetupIntent);
router.get('/setup_intents/:id', getSetupIntentById);
router.put('/setup_intents/:id', updateSetupIntentById);
router.put('/setup_intents/:id/confirm', confirmSetupIntentById);
router.put('/setup_intents/:id/cancel', cancelSetupIntentById);
router.get('/setup_intents', getAllSetupIntents);

//payment methods
router.post('/payment_methods', auth, createPaymentMethod);
router.get('/payment_methods/:id', getPaymentMethodById);
router.put('/payment_methods/:id', updatePaymentMethodById);
router.get('/payment_methods', auth, getCustomerPaymentMethods);
router.post('/payment_methods/:id/attach', auth, attachPaymentMethodById);
router.post('/payment_methods/:id/detach', detachPaymentMethodById);

module.exports = router;
