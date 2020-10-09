const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const { extractId } = require('../middleware/extractId');

router.get('/welcome', function (req, res, next) {
  res.status(200).send({ welcomeMessage: 'Step 1 (completed)' });
});

router.use('/api/contest', require('./contests'));
router.use('/api/contest/:id/submission', extractId, require('./submissions'));
router.use('/api/user', require('./users'));
router.use('/api/contestSub/', require('./contestSub'));
router.use('/api/v1/', require('./stripe'));

router.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next();
  } else {
    bodyParser.json()(req, res, next);
  }
});

router.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  (req, res) => {
    let event = req.body;

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('PaymentIntent was successful!');
        handleSuccessfulPaymentIntent(paymentIntent);
        break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        console.log('PaymentMethod was attached to a Customer!');
        break;
      case 'charge.succeeded':
        const charge = event.data.object;
        console.log('charge success!');
        break;
      case 'payment_intent.created':
        const paymentCreated = event.data.object;
        console.log('payment_intent.created!');
        break;
      default:
        return;
    }
    return res.status(200).json({ msg: 'ok' });
  }
);

const handleSuccessfulPaymentIntent = (paymentIntent) => {
  console.log(JSON.stringify(paymentIntent));
};

module.exports = router;
