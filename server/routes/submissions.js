const express = require('express');
const router = express.Router();
const multer = require('multer');

const {
  createSubmission,
  getSubmissionById,
  getAllSubmissions,
  updateSubmission,
  deleteSubmission,
} = require('../controllers/submissions');

const multerMultiple = multer({
  dest: 'temp/',
  limits: { fieldSize: 8 * 1024 * 1024 },
}).array('submissionPic');

router.post('/', multerMultiple, createSubmission);
router.get('/', getAllSubmissions);
router.delete('/', deleteSubmission);
router.get('/:id', getSubmissionById);
router.put('/:id', updateSubmission);

module.exports = router;
