const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

const {
  getSubmissions,
  getSubmissionsByContestAndLoggedUser,
} = require('../controllers/contestSub');

router.get('/:contestId/', auth, getSubmissions);
router.get(
  '/:contestId/submissions',
  auth,
  getSubmissionsByContestAndLoggedUser
);

module.exports = router;
