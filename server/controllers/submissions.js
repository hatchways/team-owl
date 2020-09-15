const Submission = require('../models/Submission');
const Contest = require('../models/Contest');
const User = require('../models/User');

//POST - create contest - auth
exports.createSubmission = async (req, res, next) => {
  req.params.id = req.id;
  try {
    const contest = await Contest.findOne({ _id: req.params.id });
    const user = await User.findOne({ _id: '5f60095f5d46b01ceecd35a2' });
    const urlAWS = 'pending picture url to AWS';

    //problem - same user can submit multiple submissions

    const submission = new Submission({
      contest,
      user,
      urlAWS,
    });

    await submission.save();

    res.status(200).json(submission);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
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
