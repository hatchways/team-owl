const express = require('express');
const router = express.Router();

const {
  createContest,
  getContestById,
  getAllContests,
  updateContest,
  deleteContest,
} = require('../controllers/contests');

router.post('/', createContest);
router.get('/', getAllContests);
router.delete('/', deleteContest);
router.get('/contest/:id', getContestById);
router.put('/contest/:id', updateContest);

module.exports = router;
