const User = require('../models/User');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const url = process.env.CLIENT_DOMAIN;

//Account - connected bank account setup
//POST - create Connected account
exports.createConnectedAccount = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    if (!user.stripeBankAcct) {
      const account = await stripe.accounts.create({
        type: 'express',
      });
      user.stripeBankAcct = account;
      user.save();
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//POST - create connected account LINK
exports.createConnectedAccountLinks = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    const accountId = user.stripeBankAcct.id;
    const accountLinks = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: url,
      return_url: url,
      type: 'account_onboarding',
    });
    res.status(200).json(accountLinks);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//GET - get connected account
exports.getConnectedAccount = async (req, res, next) => {
  const accountId = req.params.id;
  try {
    const account = await stripe.accounts.retrieve(accountId);
    res.status(200).json(account);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//POST - update connected account by Id
exports.updateConnectedAccountById = async (req, res, next) => {
  const accountId = req.params.id;
  const data = req.body;

  try {
    const account = await stripe.accounts.update(accountId, data);
    res.status(200).json(account);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//DELETE - delete connected account by Id
exports.deleteConnectedAccountById = async (req, res, next) => {
  const accountId = req.params.id;
  try {
    await stripe.accounts.del(accountId);
    res.status(200).json({ msg: 'Stripe account deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//POST - create PaymentIntent
exports.createPaymentIntent = async (req, res, next) => {
  const { amount, winnerId } = req.body;

  try {
    const winnerUser = await User.findOne({ _id: winnerId });
    const destinationAcct = winnerUser.stripeBankAcct.id;
    const user = await User.findOne({ _id: req.user.userId });
    const customerId = user.stripeCreditCustomer.id;
    const paymentMethodId = user.paymentMethodArray[0].id;
    const grossAmount = (amount * 100 + 30) * 1.029;
    const amountToCharge = Math.round(grossAmount.toFixed(2));
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountToCharge,
      currency: 'cad',
      customer: customerId,
      payment_method: paymentMethodId,
      payment_method_types: ['card'],
      off_session: true,
      confirm: true,
      transfer_data: {
        destination: destinationAcct,
      },
    });
    res.status(200).json(paymentIntent);
    return paymentIntent;
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//GET - get paymentIntent object by paymentIntentId
exports.getPaymentIntentById = async (req, res, next) => {
  const paymentIntentId = req.params.id;
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    res.status(200).json(paymentIntent);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//GET - get paymentIntentSecret by paymentIntent Id
exports.getPaymentIntentSecretById = async (req, res, next) => {
  const paymentIntentId = req.params.id;
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    res.status(200).json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//CUSTOMER API
//POST - create Stripe customer for loggedin user
exports.createCustomer = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    if (!user.stripeCreditCustomer) {
      const customer = await stripe.customers.create();
      user.stripeCreditCustomer = customer;
      user.save();
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//GET - create Stripe customer by Id
exports.getCustomerById = async (req, res, next) => {
  const customerId = req.params.id;
  try {
    const customer = await stripe.customers.retrieve(customerId);
    res.status(200).json(customer);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//PUT - update Stripe customer by Id
exports.updateCustomerById = async (req, res, next) => {
  res.status(200).json({ msg: 'update customer by Id' });
};

//DELETE - delete Stripe customer by Id
exports.deleteCustomerById = async (req, res, next) => {
  res.status(200).json({ msg: 'Delete customer by Id' });
};

//GET - get all Stripe customers
exports.getAllCustomers = async (req, res, next) => {
  res.status(200).json({ msg: 'get all customers' });
};

//SetupIntents - to setup credit card customer
//POST - create setupIntent
exports.createSetupIntent = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    const setupIntent = await stripe.setupIntents.create({
      customer: user.stripeCreditCustomer.id,
    });
    res.status(200).json(setupIntent);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//GET - get SetupIntent by Id
exports.getSetupIntentById = async (req, res, next) => {
  const setupIntentId = req.params.id;
  try {
    const setupIntent = await stripe.setupIntents.retrieve(setupIntentId);
    res.status(200).json(setupIntent);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//PUT - update SetupIntent by Id
exports.updateSetupIntentById = async (req, res, next) => {
  res.status(200).json({ msg: 'update SetupIntent by Id' });
};

//PUT - confirm SetupIntent by Id
exports.confirmSetupIntentById = async (req, res, next) => {
  res.status(200).json({ msg: 'confirm SetupIntent by Id' });
};

//PUT - cancel SetupIntent by Id
exports.cancelSetupIntentById = async (req, res, next) => {
  res.status(200).json({ msg: 'cancel SetupIntent by Id' });
};

//GET - get all SetupIntents
exports.getAllSetupIntents = async (req, res, next) => {
  res.status(200).json({ msg: 'get all SetupIntents' });
};

//PAYMENT METHODS
//GET - create PaymentMethod by Id
exports.createPaymentMethod = async (req, res, next) => {
  res.status(200).json({ msg: 'get PaymentMethod by Id' });
};

//GET - create PaymentMethod by Id
exports.getPaymentMethodById = async (req, res, next) => {
  res.status(200).json({ msg: 'create PaymentMethod by Id' });
};

//PUT - update PaymentMethod by Id
exports.updatePaymentMethodById = async (req, res, next) => {
  res.status(200).json({ msg: 'update PaymentMethod by Id' });
};

//GET - get all PaymentMethods
exports.getCustomerPaymentMethods = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    const customerId = user.stripeCreditCustomer.id;
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });
    res.status(200).json(paymentMethods);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//POST - attach PaymentMethod by Id
exports.attachPaymentMethodById = async (req, res, next) => {
  const customerId = req.params.id;
  const data = req.body;

  try {
    const user = await User.findOne({ _id: req.user.userId });
    const customer = await stripe.customers.retrieve(customerId);
    const paymentMethod = await stripe.paymentMethods.attach(
      data.payment_method,
      { customer: customerId }
    );
    user.paymentMethodArray.push(paymentMethod);
    user.save();
    console.log(customer);
    res.status(200).json(customer);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//POST - detach PaymentMethod by Id
exports.detachPaymentMethodById = async (req, res, next) => {
  res.status(200).json({ msg: 'update PaymentMethod by Id' });
};
