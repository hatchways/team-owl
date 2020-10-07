const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const url = 'https://localhost:3000/edit_profile';

//Account Object

//POST - create Stripe account
exports.createStripeAccount = async (req, res, next) => {
  try {
    const account = await stripe.accounts.create({
      type: 'express',
      email: '',
    });
    res.status(200).json(account);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//POST - create Stripe account link
exports.createStripeAccountLinks = async (req, res, next) => {
  const { accountId } = req.body;
  try {
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

//GET - get Stripe account
exports.getStripeAccount = async (req, res, next) => {
  const accountId = req.params.id;
  try {
    const account = await stripe.accounts.retrieve(accountId);
    res.status(200).json(account);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//POST - update Stripe account by Id
exports.updateStripeAccountById = async (req, res, next) => {
  const accountId = req.params.id;
  try {
    const account = await stripe.accounts.update(accountId, {
      email: 'testing@gmail.com',
    });
    res.status(200).json(account);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//DELETE - delete Stripe account by Id
exports.deleteStripeAccountById = async (req, res, next) => {
  const accountId = req.params.id;
  try {
    await stripe.accounts.del(accountId);
    res.status(200).json({ msg: 'Stripe account deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//PaymentIntent Object

//POST - create PaymentIntent
exports.createPaymentIntent = async (req, res, next) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'cad',
      payment_method_types: ['card'],
      transfer_data: {
        destination: '{{CONNECTED_STRIPE_ACCOUNT_ID}}',
      },
    });
    res.status(200).json(paymentIntent);
    return paymentIntent;
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};
