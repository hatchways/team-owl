const express = require('express');
const router = express.Router();

const {
  createSubmission,
  getSubmissionById,
  getAllSubmissions,
  updateSubmission,
  deleteSubmission,
} = require('../controllers/submissions');

router.post('/', createSubmission);
router.get('/', getAllSubmissions);
router.delete('/', deleteSubmission);
router.get('/:id', getSubmissionById);
router.put('/:id', updateSubmission);

module.exports = router;
