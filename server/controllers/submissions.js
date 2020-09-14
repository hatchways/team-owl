const Submission = require('../models/Submission');

//POST - create contest - auth
exports.createSubmission = async (req, res, next) => {
  return res.status(200).json({ msg: 'Create submission' });
};

//GET - get submission by Id
exports.getSubmissionById = async (req, res, next) => {
  return res.status(200).json({ msg: 'Get submission by Id' });
};

//GET - get all submissions
exports.getAllSubmissions = async (req, res, next) => {
  return res.status(200).json({ msg: 'Get all submissions' });
};

//PUT - update submission by Id - auth
exports.updateSubmission = async (req, res, next) => {
  return res.status(200).json({ msg: 'Update submission' });
};

//DELETE - create submission by Id - auth
exports.deleteSubmission = async (req, res, next) => {
  return res.status(200).json({ msg: 'Delete submission' });
};
