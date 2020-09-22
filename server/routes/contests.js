const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

const {
  createContest,
  getContestById,
  getAllContests,
  updateContest,
  deleteContest,
} = require('../controllers/contests');

router.post('/', createContest); //auth temporarily removed for FE testing purposes
router.get('/', getAllContests);
router.delete('/:id', auth, deleteContest);
router.get('/:id', getContestById);
router.put('/:id', auth, updateContest);

module.exports = router;
