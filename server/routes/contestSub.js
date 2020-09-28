const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

const {
  getSubmissions,
  dynamicGetSubmissions,
} = require('../controllers/contestSub');

router.get('/:contestId/', auth, getSubmissions);
router.get('/:contestId/submissions', auth, dynamicGetSubmissions);

module.exports = router;
