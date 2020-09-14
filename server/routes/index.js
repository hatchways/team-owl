const express = require('express');
const router = express.Router();

router.get('/welcome', function (req, res, next) {
  res.status(200).send({ welcomeMessage: 'Step 1 (completed)' });
});

router.use('/api/contest', require('./contests'));
router.use('/api/submission', require('./submissions'));

module.exports = router;
