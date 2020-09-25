const express = require('express');
const router = express.Router();
const multer = require('multer');
const { auth } = require('../middleware/auth');

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

router.post('/', auth, multerMultiple, createSubmission);
router.get('/', getAllSubmissions);
router.delete('/:id', auth, deleteSubmission);
router.get('/:id', getSubmissionById);
router.put('/:id', auth, updateSubmission);
//router.get('/:contestId/submissions/', auth, getAllSubmissionsByContestId);

module.exports = router;
