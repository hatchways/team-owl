const express = require('express');
const router = express.Router();
const { extractId } = require('../middleware/extractId');

router.get('/welcome', function (req, res, next) {
  res.status(200).send({ welcomeMessage: 'Step 1 (completed)' });
});

router.use('/api/contest', require('./contests'));
router.use('/api/contest/:id/submission', extractId, require('./submissions'));
router.use('/api/user', require('./users'));
router.use('/api/contestSub/', require('./contestSub'));
router.use('/api/v1/', require('./stripe'));

module.exports = router;
