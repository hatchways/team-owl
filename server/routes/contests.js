const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

const {
  createContest,
  getContestById,
  getAllContests,
  updateContest,
  deleteContest,
  getAllSubmissionsByContestId,
} = require('../controllers/contests');

router.post('/', auth, createContest);
router.get('/', getAllContests);
router.delete('/:id', auth, deleteContest);
router.get('/:id', getContestById); //auth removed due to 401, plus it should not be auth anyways
router.put('/:id', auth, updateContest);
router.get('/:contestId/submissions', auth, getAllSubmissionsByContestId);

module.exports = router;
